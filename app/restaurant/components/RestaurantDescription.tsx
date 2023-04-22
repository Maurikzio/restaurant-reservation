interface Props {
  description: string;
}

const RestaurantDescription: React.FunctionComponent<Props> = ({ description }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">
        {description}
      </p>
    </div>
  );
};

export default RestaurantDescription;
