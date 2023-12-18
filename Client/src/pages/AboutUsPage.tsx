import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { TabTitle } from "../utils/TabTitle";
import { wrapPreWithCode } from "../utils/convertHTMLtoJSX";
import { SiHatenabookmark } from "react-icons/si";

const AboutUsPage = () => {
  const navigate = useNavigate();

  TabTitle("About");

  return (
    <>
      <div className="h-[100px] py-4 px-2   flex border-b   w-full  justify-between items-center bg-[#242424]	 ">
        <div
          className=" flex  items-center  cursor-pointer text-white text-lg md:text-2xl font-extrabold  "
          onClick={(e) => navigate("/")}
        >
          <span>
            <SiHatenabookmark size={32} />
          </span>
          &nbsp;BLOGBAR
        </div>
      </div>
      <div className="bg-[#242424] px-2 py-4 w-full h-screen text-white">
        <h1 className=" text-[40px] sm:text-[50px]  text-white font-serif">
          Everyone has a story to tell.
        </h1>
        <p className=" mt-2 md:w-[700px] min-w-0 font-normal break-words text-white text-[21px]">
          BlogBar is a home for human stories and ideas. Here, anyone can share
          insightful perspectives, useful knowledge, and life wisdom with the
          world without building a mailing list or a following first. The
          internet is noisy and chaotic; BlogBar is quiet yet full of insight.
          It’s simple, beautiful, collaborative, and helps you find the right
          audience for whatever you have to say. We believe that what you read
          and write matters. Words can divide or empower us, inspire or
          discourage us. In a world where the most sensational and surface-level
          stories often win, we’re building a system that rewards depth, nuance,
          and time well spent. A space for thoughtful conversation more than
          drive-by takes, and substance over packaging.
        </p>
      </div>
    </>
  );
};

export default AboutUsPage;
