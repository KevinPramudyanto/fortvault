import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const restrictedValue = Math.floor((value / 255) * 111);
    color += `00${restrictedValue.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.toUpperCase()?.[0] || ""}${name.toUpperCase()?.[1] || ""}`,
  };
}

const GetWorkersCard = ({ id, username }: { id: string; username: string }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-1 overflow-hidden rounded-full bg-green-50 p-5 md:flex-row">
      <Avatar {...stringAvatar(username)} />
      <div className="font-medium">{username}</div>
      <Link
        className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
        to={"/removeworker/" + id}
        state={username}
      >
        Remove
      </Link>
    </div>
  );
};

export default GetWorkersCard;
