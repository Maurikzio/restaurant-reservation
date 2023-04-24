"use client"

import React from "react";
import { useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('city') ?? '');

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location === "") {
            return;
          } else {
            router.push(`/search?city=${location.toLowerCase()}`);
          }
        }}
      >
        {`Let's go`}
      </button>
    </div>
  );
};

export default SearchBar;
