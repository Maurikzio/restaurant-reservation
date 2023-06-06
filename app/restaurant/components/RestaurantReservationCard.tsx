"use client";
import { useState } from "react";
import { partySize as partySizes, times } from "../../../data";
import DatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime, Time } from "@/utils/convertToDisplayTime";

interface Props {
  openTime: string;
  closeTime: string;
  slug: string;
}

const RestaurantReservationCard: React.FunctionComponent<Props> = ({
  openTime,
  closeTime,
  slug,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };

  const filterTimesByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  return (
    <div className="fixed w-[25%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
        >
          {partySizes.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-28"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimesByRestaurantOpenWindow().map((time) => (
              <option value={time.time} key={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data?.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((t) => {
              return t.available ? (
                <Link
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 mr-3 rounded"
                  href={`/reserve/${slug}?date=${day}T${t.time}&partySize=${partySize}`}
                >
                  <p className="text-small font-bold">
                    {convertToDisplayTime(t.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RestaurantReservationCard;
