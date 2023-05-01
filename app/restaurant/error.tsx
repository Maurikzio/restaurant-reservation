"use client";
import Image from "next/image";
import errorImage from "../../public/icons/error.png";

function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImage} alt="Error" className="w-56 mb-8" />
      <div className="bg-white p-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold"> Well, this is embarrassing!</h3>
        <p className="text-reg font-bold">{error.message}</p>
        <p className="mt-6 text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  );
}

export default Error;
