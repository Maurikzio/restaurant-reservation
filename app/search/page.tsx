import SearchHeader from "./components/SearchHeader";
import SearchSideBar from "./components/SearchSideBar";
import SearchRestaurantCard from "./components/SearchRestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchResturantsByCity =  (city: string | undefined) => {

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if(!city) {
    return prisma.restaurant.findMany({select});
  }

  return  prisma.restaurant.findMany({
    where: {
      location: {
        // name: city
        name: {
          equals: city.toLocaleLowerCase()
        }
      }
    },
    select
    // select: {
    //   id: true,
    //   name: true,
    //   price: true,
    //   slug: true,
    //   main_image: true,
    //   location: {
    //     select: {
    //       name: true,
    //     }
    //   },
    //   cuisine: {
    //     select: {
    //       name: true,
    //     }
    //   }
    // }
    // include: {
    //   location: true,
    //   cuisine: true,
    // }
  });

}

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
}

const SearchPage = async (props: {searchParams: {city: string}}) => {
  const restaurants = await fetchResturantsByCity(props.searchParams.city);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <SearchHeader />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines}/>
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
