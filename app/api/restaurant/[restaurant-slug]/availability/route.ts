import { NextResponse } from 'next/server';
import { times } from '../../../../../data';
import prisma from "@/lib/prisma";

interface Params {
  params: {
    'restaurant-slug': string
  }
};

export async function GET(request: Request, { params }: Params, response: Response) {
  const { ['restaurant-slug']: slug } = params;
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day');
  const time = searchParams.get('time');
  const partySize = searchParams.get('partySize');

  if (!day || !time || !partySize || !slug) {
    return NextResponse.json(
      { errorMessage: "Invalid data" },
      { status: 400 }
    );
  }

  // Find all the search times
  const searchTimes = times.find(t => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return NextResponse.json(
      { errorMessage: "Invalid data" },
      { status: 400 }
    );
  }

  //2 find all bookings between searchTimes
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
      }
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    }
  })

  // Compressing the Bookings
  const bookingsTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach(booking => {
    bookingsTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((acc, table) => {
      return {
        ...acc,
        [table.table_id]: true,
      }
    }, {})
  })

  // fetch all restaurant tables
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      table: true,
      open_time: true,
      close_time: true,
    }
  })

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Invalid data" },
      { status: 400 }
    );
  }

  const tables = restaurant.table;

  // reformatting the search times
  const searchTimesWithTables = searchTimes.map(searchTime => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables
    }
  })

  // filtering out the booked tables
  searchTimesWithTables.forEach(t => {
    t.tables = t.tables.filter(table => {
      if (bookingsTablesObj[t.date.toISOString()]) {
        if (bookingsTablesObj[t.date.toISOString()][table.id]) {
          return false
        }
      }
      return true;
    })
  })

  // Determine if a timeslot is available based on the tables and party size
  const availabilities = searchTimesWithTables.map(t => {
    const sumSeats = t.tables.reduce((sum, table) => {
      return sum + table.seats
    }, 0);
    return {
      time: t.time,
      available: sumSeats >= parseInt(partySize)
    }
  })
    .filter(availability => {
      const timeOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`);
      const timeBeforeClosingHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`);

      return timeOpeningHour && timeBeforeClosingHour;
    })



  return NextResponse.json(availabilities, { status: 200 });
  // return NextResponse.json(
  //   {
  //     // searchTimes,
  //     // bookings,
  //     // bookingsTablesObj,
  //     // tables,
  //     // searchTimesWithTables,
  //     availabilities
  //   },
  //   { status: 200 }
  // );
}