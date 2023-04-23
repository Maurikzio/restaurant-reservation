import { Item } from "@prisma/client";
import RestaurantMenuCard from "./RestaurantMenuCard";

interface Props {
  menu: Item[];
}

const RestaurantMenu: React.FunctionComponent<Props> = ({ menu }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.map(item => (
            <RestaurantMenuCard key={item.id} menuItem={item}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RestaurantMenu;
