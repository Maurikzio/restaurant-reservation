import { Metadata } from "next";
import RestaurantHeader from "../components/RestaurantHeader";

// export const metadata = {
//   title: "Millestones Grill | OpenTable",
// };

export function generateNameFromSlug(slug: string) {
  const names = slug.split('-');

  const name = names.reduce((acc, curr, idx) => {
    let word = curr[0].toUpperCase()+curr.slice(1);
    if(idx === names.length-1) {
      word = `(${word})`; 
    }
    return acc+" "+word;
  }, "");

  return name;
}

export function generateMetadata({ params }: {params: {'restaurant-slug': string}}): Metadata {
  return { title: `${generateNameFromSlug(params['restaurant-slug'])} | OpenTable`}
}

export default function RestaurantLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {'restaurant-slug': string}
}) {
  const restaurantName = generateNameFromSlug(params['restaurant-slug'])
  return (
    <main>
      <RestaurantHeader name={restaurantName}/>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
