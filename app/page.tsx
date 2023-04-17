import { Inter } from "next/font/google";
import HeaderComponent from "../components/Header";
import RestaurantCard from "../components/RestaurantCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <HeaderComponent />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        <RestaurantCard />
      </div>
    </main>
  );
}
