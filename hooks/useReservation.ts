import { useState } from "react";
import axios from "axios";

interface Props {
  slug: string;
  partySize: string;
  day: string;
  time: string;
  bookerEmail: string;
  bookerPhone: string;
  bookerFirstName: string;
  bookerLastName: string;
  bookerOccasion: string;
  bookerRequest: string;
  setDidBook: React.Dispatch<React.SetStateAction<boolean>>
}

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async (
    {
      slug,
      partySize,
      day,
      time,
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
      setDidBook
    }: Props) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize
          }
        });
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage)
    }
  };

  return { loading, error, createReservation }
}