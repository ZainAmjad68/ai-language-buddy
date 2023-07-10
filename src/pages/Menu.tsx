import { Link } from "react-router-dom";

const Menu = () => {
  console.log('this is the menu');
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button  className="bg-cyan-900 hover:bg-cyan-800 text-white font-bold py-4 px-5 rounded-lg text-lg truncate mb-4">
        <Link to="/chat">Start a New Chat</Link>
      </button>
      <div className="flex">
        <button className="bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg mr-2">
          <Link to="/login">Login</Link>
        </button>
        <button className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg ml-2">
          <Link to="/sign-up">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};

export default Menu;
