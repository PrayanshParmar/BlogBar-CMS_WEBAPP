import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import im from "../assets/404.gif";
import { HiDotsHorizontal } from "react-icons/hi";
import { formatTimeDifference } from "../utils/formatTimeDifference";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  username: string;
  profile_img_url: string;
  id: String;
  body: String;
  updatedAt: Date;
}
const Comment: React.FC<CommentProps> = ({
  username,
  profile_img_url,
  id,
  body,
  updatedAt,
}) => {
  const [readmore, setReadmore] = useState(true);
  const navigate = useNavigate();
  const time = formatTimeDifference(updatedAt);
  // const lines = body.split('\n').length;

  // const words = body.split(/\s+/).filter((word) => word.length > 0);
  // const lines = words.length;

  // const words = body.split(/\s+/).filter((word) => word.length > 0);
  // const lines = words.length;
  const maxCharactersPerLine = 72; // Set the maximum number of characters per line
  const lines = body.split('\n').reduce((totalLines, line) => {
    return totalLines + Math.ceil(line.length / maxCharactersPerLine);
  }, 0);
  const wordThreshold = 5;

  return (
    <>
      <div id="comment">
        <div className=" flex flex-col pt-3  ">
          <div className=" flex justify-between">
            <div className=" flex flex-row items-center gap-2  ">
              <div className="  h-fit w-fit cursor-pointer">
                <a href={`/user/${username}`}>
                  <img
                    src={profile_img_url}
                    alt={username}
                    className="rounded-full  h-[32px] w-[32px]"
                  />
                </a>
              </div>
              <div className=" flex flex-col gap-[2px] text-sm">
                <div className=" capitalize font-semibold ">
                  <a href={`/user/${username}`}>
                    <span className=" cursor-pointer">{username}</span>
                  </a>
                </div>
                <div className=" text-gray-500">
                  <span>{time}</span>
                </div>
              </div>
            </div>
            <div className=" w-10 px-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full  ">
              <HiDotsHorizontal title="Report comment" />
            </div>
          </div>
          <div className=" pt-3 pb-2 text-sm font-medium ">
            <p
              className={` capitalize break-words 
            ${readmore ? "line-clamp-5" : "line-clamp-none"}`}
            >
              {body.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < body.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className=" pb-3 border-b">
            {lines > wordThreshold && (
              <button
                onClick={() => setReadmore(!readmore)}
                className="text-[13px] text-[#1A8917]"
              >
                {readmore ? "Read more" : "Show less"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
