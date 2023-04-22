interface Props {
  images: string[];
}
const RestaurantImages: React.FunctionComponent<Props> = ({ images }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">{`${images?.length} phot${images.length > 1 ? 'os' : 'o'}`}</h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <img key={image} className="w-56 h-44 mr-1 mb-1" src={image} alt="restaurant image" />
        ))}
      </div>
    </div>
  );
};

export default RestaurantImages;
