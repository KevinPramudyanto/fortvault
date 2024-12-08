import { useState } from "react";
import { socket } from "../socket.ts";

const SocketBroadcast = () => {
  const [outgoing, setOutgoing] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("message", outgoing);
    setOutgoing("");
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Start Broadcast
      </div>

      <form className="p-5 sm:p-10" onSubmit={handleSendMessage}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="outgoing">
            Message :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="outgoing"
            type="text"
            placeholder="Message"
            value={outgoing}
            onChange={(e) => setOutgoing(e.target.value)}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>
        <button className="mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900">
          Send
        </button>
      </form>
    </div>
  );
};

export default SocketBroadcast;
