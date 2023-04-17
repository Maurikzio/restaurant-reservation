import RestaurantHeader from "../components/RestaurantHeader";
import RestaurantNavBar from "../components/RestaurantNavBar";
import RestaurantTitle from "../components/RestaurantTitle";
import RestaurantRating from "../components/RestaurantRating";
import RestaurantDescription from "../components/RestaurantDescription";
import RestaurantImages from "../components/RestaurantImages";
import RestaurantReviews from "../components/RestaurantReviews";
import RestaurantReservationCard from "../components/RestaurantReservationCard";

const RestaurantDetails = () => {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar />
        <RestaurantTitle />
        <RestaurantRating />
        <RestaurantDescription />
        <RestaurantImages />
        <RestaurantReviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <RestaurantReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
