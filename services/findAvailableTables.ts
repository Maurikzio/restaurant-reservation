import prisma from "@/lib/prisma";
import { times } from '../data';
import { NextResponse } from "next/server";
import { Table } from "@prisma/client";

interface Props {
  time: string;
  day: string;
  restaurant: {
    table: Table[];
    open_time: string;
    close_time: string;
  }
}

export interface AvailableTables {
  date: Date;
  time: string;
  tables: Table[];
}

export const findAvailableTables = async ({ time, day, restaurant }: Props) => {
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

  return searchTimesWithTables;
}