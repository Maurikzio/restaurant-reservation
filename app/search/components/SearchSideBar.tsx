import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
// import { SideBarLink } from "./SideBarLink";

interface Props {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {city?: string, cuisine?: string, price?: PRICE}
};

const SearchSideBar: React.FunctionComponent<Props> = ({ locations, cuisines, searchParams }) => {

  const prices = [
    {
      value: PRICE.CHEAP,
      label: "$"
    },
    {
      value: PRICE.REGULAR,
      label: "$$"
    },
    {
      value: PRICE.EXPENSIVE,
      label: "$$$"
    },
  ]
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map(location => (
          <Link 
            href={{ pathname: 'search', query: {...searchParams, city: location.name}}} 
            key={location.id} 
            className="font-light text-reg capitalize block"
            >
              {location.name}
            </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map(cuisine => (
          <Link 
            href={{ pathname: 'search', query: {...searchParams, cuisine: cuisine.name}}} 
            key={cuisine.id} 
            className="font-light text-reg capitalize block"
            >
              {cuisine.name}
            </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({label, value}) => (
            <Link 
              key={label}
              href={{ pathname: 'search', query: {...searchParams, price: value}}} 
              className="border w-full text-reg font-light rounded-l p-2 text-center">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
