import { ArrowRight } from "lucide-react";

import "./Home.css";
import { Link } from "react-router";
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <div>
      <div className=" flex justify-center h-[50vh] flex-col max-w-120 m-auto">
        <h1 className=" text-center font-medium font-sans text-4xl tracking-tight">
          An efficient way to share and learn together
        </h1>
        <Link to="/signUp" className="mx-auto mt-3.5">
          <div className="aura aura-xs rounded-2xl ">
            <button className=" btn rounded-2xl ">
              Get started for free <ArrowRight size={18} />
            </button>
          </div>
        </Link>
        <p className="text-xs mx-auto mt-1 text-stone-700 italic tracking-wider">
          Connect &bull; Learn &bull; Grow
        </p>
      </div>
      <HomeCard />
    </div>
  );
};

export default Home;
