import prisma from "@/lib/prisma";
import { AvailableTables, findAvailableTables } from "@/services/findAvailableTables";
import { NextResponse } from "next/server";

interface Params {
  params: {
    'restaurant-slug': string
  }
};

export async function POST(request: Request, { params }: Params, response: Response) {
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

  const body = await request.json();

  if (!body) {
    return NextResponse.json(
      { errorMessage: "Invalid data" },
      { status: 400 }
    );
  }

  const { bookerEmail, bookerPhone, bookerFirstName, bookerLastName, bookerOccasion, bookerRequest } = body;

  //validate the restaurant exists and that day is within opening hours
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      table: true,
      open_time: true,
      close_time: true,
      id: true,
    }
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Invalid data" },
      { status: 400 }
    );
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      { errorMessage: "Restaurant is not open at that time" },
      { status: 400 }
    );
  }

  // Determine all available tables based on that datetime and partysize
  const searchTimeWithTables = await findAvailableTables({ time, day, restaurant }) as AvailableTables[];


  const searchTimeWithTable = searchTimeWithTables.find((t) => {
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  })

  if (!searchTimeWithTable) {
    return NextResponse.json(
      { errorMessage: "No availability, cannot book" },
      { status: 400 }
    );
  }

  const tablesCount: { 2: number[], 4: number[] } = {
    2: [],
    4: []
  };

  searchTimeWithTable.tables.forEach(table => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id)
    } else {
      tablesCount[4].push(table.id)
    }
  });

  const tablesToBook: number[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBook.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBook.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  };

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_occasion: bookerOccasion,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id,
    }
  });

  const bookingsOnTableData = tablesToBook.map(table_id => {
    return {
      table_id,
      booking_id: booking.id
    }
  })

  await prisma.bookingsOnTables.createMany({
    data: bookingsOnTableData
  })

  return NextResponse.json(booking, { status: 200 });

}