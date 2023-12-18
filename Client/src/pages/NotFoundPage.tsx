import React from "react";
import { Link } from "react-router-dom";
import notfond from "../assets/404.gif";
import NavBar from "../components/NavBar";

const NotFoundPage = () => {
  return (
    <>
      <NavBar/>
      <div className=" w-full h-screen flex justify-center bg-white ">
        <div className=" w-[900px] min-w-0 h-[700px] min-h-0  flex flex-col  items-center" >
          <strong className=" text-xl sm:text-2xl my-2 ml-6 sm:ml-12">Page Not Found</strong>
          <img src={notfond}  className=" h-[200px] w-[200px] sm:h-[400px] sm:w-[400px]" />
          <button className=" mt-4 p-1 rounded-md    bg-orange-500  border-2 text-white hover:bg-orange-600 hover:border-orange-600 "  >
            <Link to="/">Home</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
