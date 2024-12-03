import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
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

      <div className="mt-16 text-xl font-bold sm:text-2xl">
        Built for contractors, mobile techs, mechanics and more
      </div>
      <div className="mb-5 text-justify">
        Our intuitive platform empowers you to effortlessly track, share, and
        manage your inventory, ensuring that the right equipment is always in
        the right hands at the right time. Finally, no more wasted hours
        searching for misplaced tools or spending money on unnecessary
        duplicates.
      </div>
    </>
  );
};

export default Home;
