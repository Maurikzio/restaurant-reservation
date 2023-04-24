import RestaurantNavBar from "../../components/RestaurantNavBar";
import RestaurantMenu from "../../components/RestaurantMenu";
import { PrismaClient } from "@prisma/client";
import { generateNameFromSlug } from "../layout";
import { Metadata } from "next";

// export const metadata = {
//   title: "Millestones Grill Menu | OpenTable",
// };
export function generateMetadata({ params }: {params: {'restaurant-slug': string}}): Metadata {
  return { title: `${generateNameFromSlug(params['restaurant-slug'])} Menu| OpenTable`}
}

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.items;
};

const RestaurantMenuPage = async ({params}: {params: { "restaurant-slug": string }}) => {
  const menu = await fetchRestaurantMenu(params['restaurant-slug']);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params["restaurant-slug"]} />
      <RestaurantMenu menu={menu}/>
    </div>
  );
};

export default RestaurantMenuPage;
