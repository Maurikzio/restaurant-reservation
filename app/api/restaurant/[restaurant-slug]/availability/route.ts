import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { findAvailableTables, AvailableTables } from '@/services/findAvailableTables';

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
  };

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

  const searchTimesWithTables = await findAvailableTables({ time, day, restaurant }) as AvailableTables[];

  // Determine if a timeslot is available based on the tables and party size
  const availabilities = searchTimesWithTables.map(t => {
    const sumSeats = t.tables.reduce((sum, table) => {
      return sum + table.seats
    }, 0);
    return {
      time: t.time,
      available: sumSeats >= parseInt(partySize)
    }
  }).filter(availability => {
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