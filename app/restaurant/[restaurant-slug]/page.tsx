import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantTitle from "../components/RestaurantTitle";
import RestaurantRating from "../components/RestaurantRating";
import RestaurantDescription from "../components/RestaurantDescription";
import RestaurantImages from "../components/RestaurantImages";
import RestaurantReviews from "../components/RestaurantReviews";
import RestaurantReservationCard from "../components/RestaurantReservationCard";
import { Review } from "@prisma/client";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

export const fetchRestaurantBySlug = async (
  slug: string
): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({
  params,
}: {
  params: { "restaurant-slug": string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params["restaurant-slug"]);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <RestaurantTitle name={restaurant.name} />
        <RestaurantRating reviews={restaurant.reviews} />
        <RestaurantDescription description={restaurant.description} />
        <RestaurantImages images={restaurant.images} />
        <RestaurantReviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <RestaurantReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
        />
      </div>
    </>
  );
};

export default RestaurantDetails;
