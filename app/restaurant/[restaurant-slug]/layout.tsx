import { Metadata } from "next";
import RestaurantHeader from "../components/RestaurantHeader";

// export const metadata = {
//   title: "Millestones Grill | OpenTable",
// };

function generateNameFromSlug(slug: string) {
  // return slug.replaceAll('-', ' ').split(' ').map(word => word[0].toUpperCase()+word.slice(1)).join(' ')
  const names = slug.split('-');
  names[names.length-1] = `(${names[names.length - 1]})`
  return names.join(" ");
}

export function generateMetadata({ params }: {params: {'restaurant-slug': string}}): Metadata {
  return { title: generateNameFromSlug(params['restaurant-slug'])}
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
