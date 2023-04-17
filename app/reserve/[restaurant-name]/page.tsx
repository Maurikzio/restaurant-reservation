import ReserveHeader from "../components/ReserveHeader";
import ReserveForm from "../components/ReserveForm";

const ReservePage = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <ReserveHeader />
        <ReserveForm />
      </div>
    </div>
  );
};

export default ReservePage;
