import Stars from "@/components/Stars";
import { Review } from "@prisma/client";

interface Props {
  reviews: Review[];
}

const RestaurantReviews: React.FunctionComponent<Props> = ({ reviews }) => {
  return reviews.length ? (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        {`What ${reviews.length} people are saying`}
      </h1>
      <div>
        <div className="border-b pb-7 mb-7 flex gap-5 flex-col">
          {reviews.map((review) => (
            <div className="flex" key={review.id}>
              <div className="w-1/6 flex flex-col items-center">
                <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                  <h2 className="text-white text-2xl">
                    {review.first_name[0]}
                    {review.last_name[0]}
                  </h2>
                </div>
                <p className="text-center">
                  {review.first_name} {review.last_name}
                </p>
              </div>
              <div className="ml-10 w-5/6">
                <div className="flex items-center">
                  <div className="flex mr-5">
                    <Stars rating={review.rating} reviews={[]} />
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-lg font-light">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default RestaurantReviews;
