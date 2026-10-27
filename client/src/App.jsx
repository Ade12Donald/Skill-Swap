import "./App.css";
import { ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="">
      <div className=" flex justify-center h-[50vh] flex-col max-w-120 m-auto">
        <h1 className=" text-center font-medium font-heading text-4xl">
          An efficient way to share and learn together
        </h1>
        <div className="aura aura-xs rounded-2xl mx-auto mt-3.5">
          <button className=" btn rounded-2xl ">
            Get started for free <ArrowRight size={18} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
