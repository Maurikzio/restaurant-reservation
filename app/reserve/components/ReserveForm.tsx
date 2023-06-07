"use client";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
  partySize: string;
  date: string;
}

const ReserveForm: React.FunctionComponent<Props> = (props) => {
  const { slug, partySize, date } = props;
  const [inputs, setInputs] = useState({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccasion: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { error, loading, createReservation } = useReservation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCompleteRequest = async () => {
    const [day, time] = date.split("T");
    await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  useEffect(() => {
    if (
      inputs.bookerEmail &&
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <>
          <h1>Your are all booked up!</h1>
          <br />
          <p>Enjoy the reservation!</p>
        </>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={inputs.bookerFirstName}
            name="bookerFirstName"
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            value={inputs.bookerLastName}
            onChange={handleInputChange}
            name="bookerLastName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            value={inputs.bookerPhone}
            onChange={handleInputChange}
            name="bookerPhone"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            value={inputs.bookerEmail}
            onChange={handleInputChange}
            name="bookerEmail"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            onChange={handleInputChange}
            name="bookerOccasion"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            onChange={handleInputChange}
            name="bookerRequest"
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleCompleteRequest}
            disabled={disabled || loading}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default ReserveForm;
