import SearchHeader from "./components/SearchHeader";
import SearchSideBar from "./components/SearchSideBar";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string, 
  cuisine?: string, 
  price?: PRICE
}

const fetchResturantsByCity =  (searchParams: SearchParams) => {

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  const where: {
    location?: { name: {equals: string}}, 
    cuisine?: {name: {equals: string}}, 
    price?: {equals: PRICE}
  } = {};

  if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLocaleLowerCase(),
      }
    };

    where.location = location;
  }

  if(searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLocaleLowerCase()
      }
    };

    where.cuisine = cuisine;
  }

  if(searchParams.price) {
    const price = {
      equals: searchParams.price
    };

    where.price = price;
  }

  return  prisma.restaurant.findMany({
    where,
    select
  });
}

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
}

const SearchPage = async (props: {searchParams: SearchParams}) => {
  console.log('searchParams', props.searchParams)
  const restaurants = await fetchResturantsByCity({ 
    city: props.searchParams.city, 
    cuisine: props.searchParams.cuisine,
    price: props.searchParams.price
  });
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <SearchHeader />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={props.searchParams}/>
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map(restaurant => (
                <SearchRestaurantCard key={restaurant.id} restaurant={restaurant}/>
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;


export const metadata = {
  title: "Search | OpenTable",
};
