import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import HomeMarketing from "../components/home/HomeMarketing";

const Home = () => {
  const isAboveSm = useMediaQuery("(min-width:640px)");

  return (
    <>
      <div className="mb-20">
        <div className="text-2xl font-bold sm:text-3xl">
          Seamless inventory management for your business
        </div>
        <div className="mb-5 sm:text-lg">
          Keep track of your physical material, tool, and equipment
        </div>
        <Link
          to="/signup"
          className="rounded-full bg-green-800 px-6 py-3 font-bold text-white hover:bg-green-900"
        >
          Get started for free
        </Link>
      </div>

      {isAboveSm ? <HomeMarketing picNum={3} /> : <HomeMarketing picNum={1} />}
    </>
  );
};

export default Home;
