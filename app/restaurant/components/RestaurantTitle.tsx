import React from "react";

interface Props {
  name: string;
}

const RestaurantTitle: React.FunctionComponent<Props> = ({ name }) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{name}</h1>
    </div>
  );
};

export default RestaurantTitle;