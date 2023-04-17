import RestaurantHeader from "../../components/RestaurantHeader";
import RestaurantNavBar from "../../components/RestaurantNavBar";
import RestaurantMenu from "../../components/RestaurantMenu";

const RestaurantMenuPage = () => {
  return (
    <>
      <RestaurantHeader />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNavBar />
          <RestaurantMenu />
        </div>
      </div>
    </>
  );
};

export default RestaurantMenuPage;
