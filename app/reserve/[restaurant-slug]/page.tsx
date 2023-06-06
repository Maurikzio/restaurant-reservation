import ReserveHeader from "../components/ReserveHeader";
import ReserveForm from "../components/ReserveForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Reserve at Millestones Grill | OpenTable",
};

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const ReservePage = async ({
  params,
  searchParams,
}: {
  params: { "restaurant-slug": string };
  searchParams: { date: string; partySize: string; time: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params["restaurant-slug"]);
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <ReserveForm />
      </div>
    </div>
  );
};

export default ReservePage;
