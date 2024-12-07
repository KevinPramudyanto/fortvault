import { Link } from "react-router-dom";

const GetNotificationsCard = ({
  id,
  name,
  brand,
  workerUsername,
}: {
  id: string;
  name: string;
  brand: string;
  workerUsername: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-5 overflow-hidden bg-green-50 p-5 md:flex-row">
      <div className="font-medium">
        {workerUsername} has requested to borrow your {brand} {name}.
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link
          className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
          to={"/approvetool/" + id}
        >
          Approve
        </Link>
        <Link
          className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
          to={"/rejecttool/" + id}
        >
          Reject
        </Link>
      </div>
    </div>
  );
};

export default GetNotificationsCard;
