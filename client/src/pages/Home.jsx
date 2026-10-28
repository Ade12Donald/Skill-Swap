import { ArrowRight } from "lucide-react";

import "./Home.css";
import { Link } from "react-router";
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <div>
      <div className=" flex justify-center h-auto mt-20 mb-20 flex-col max-w-120 m-auto">
        <h1 className=" text-center font-medium font-sans text-4xl tracking-tight">
          An efficient way to
          <span>
            <span className="text-rotate">
              <span>
                <span className="bg-teal-400 text-teal-800 px-2">GROW</span>
                <span className="bg-red-400 text-red-800 px-2">LEVEL UP</span>
                <span className="bg-blue-400 text-blue-800 px-2">
                  Contribute
                </span>
              </span>
            </span>
          </span>
          and learn together
        </h1>
        <Link to="/signUp" className="mx-auto mt-3.5">
          <div className="aura aura-xs rounded-2xl ">
            <button className=" btn rounded-2xl  text-buttonTextBlack">
              Get started for free <ArrowRight size={18} />
            </button>
          </div>
        </Link>
        <p className="text-xs mx-auto mt-2 text-minorTextBlack italic tracking-wider">
          Connect &bull; Learn &bull; Grow
        </p>
      </div>
      <HomeCard />
    </div>
  );
};

export default Home;
