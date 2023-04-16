import NavBar from "../../../../components/NavBar";
import RestaurantHeader from "../../components/RestaurantHeader";
import RestaurantNavBar from "../../components/RestaurantNavBar";
import RestaurantMenu from "../../components/RestaurantMenu";

const RestaurantMenuPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <RestaurantHeader />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar />
            <RestaurantMenu />
          </div>
        </div>
      </main>
    </main>
  );
};

export default RestaurantMenuPage;
