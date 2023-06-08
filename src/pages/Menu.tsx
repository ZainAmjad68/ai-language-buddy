import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-lg text-lg truncate mb-4">
        <Link to="/chat">Start a New Chat</Link>
      </button>
      <div className="flex">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
          Login
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Menu;

/*
const Menu = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-16 rounded-lg text-lg mb-4">
        Start A New Chat
      </button>
      <div className="flex">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-1">
          Login
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-1">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Menu;
*/