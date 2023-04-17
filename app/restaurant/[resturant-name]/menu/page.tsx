import RestaurantHeader from "../../components/RestaurantHeader";
import RestaurantNavBar from "../../components/RestaurantNavBar";
import RestaurantMenu from "../../components/RestaurantMenu";

const RestaurantMenuPage = () => {
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar />
      <RestaurantMenu />
    </div>
  );
};

export default RestaurantMenuPage;
