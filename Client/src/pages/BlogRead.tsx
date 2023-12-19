import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { TabTitle } from "../utils/TabTitle";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import pp from "../assets/profile.png";
import bg from "../assets/B-Tech-Degree.jpg";
import { calculateReadingTime } from "../utils/calculateReadingTime";
import NotFoundPage from "./NotFoundPage";
import { PiHandsClappingFill } from "react-icons/pi";
import { BsChat } from "react-icons/bs";
import useCommentModel from "../hooks/useCommentModel";
import CommentModel from "../models/CommentModel";
import { formatTimeDifference } from "../utils/formatTimeDifference";
import { HiDotsHorizontal } from "react-icons/hi";
import { formatNumber } from "../utils/formatNumber";
import { json } from "stream/consumers";
interface BlogProps {
  _id: string;
  title: string;
  body: string;
  subheading: string;
  cover_photo_url: string;
  category_name: string;
  updatedAt: Date;
  authorId: {
    _id?: string;
    username?: string;
    profile_img_url?: string;
  };
}
const BlogReadPage = () => {
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState<BlogProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [likes, setLikes] = useState(0);
  const [clength, setClength] = useState(0);
  let { _id } = useParams();
  const navigate = useNavigate();
  const Auth: any = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setUser(Auth.getAuth());
      } catch (error) {
        console.error("error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 550);
      }
    };

    checkAuth();
  }, [Auth, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/viewblog", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: _id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setBlog(data.query);

          setClength(data.Clength);
          TabTitle(`${data.query.title}`);
        } else if (res.status === 400) {
          navigate("/login");
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading to false when data fetching is complete
        setTimeout(() => {
          // Set loading to false when data fetching is complete
          setLoading(false);
        }, 350);
      }
    };

    fetchData();
  }, []);

  const fetchLikes = async () => {
    try {
      const res = await fetch(`/get-likes/${_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setLikes(data);
      } else {
        setLikes(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [setLikes]);

  const handleLikes = async () => {
    try {
      const res = await fetch("/post-like", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: _id,
        }),
      });

      if (res.status === 200) {
        fetchLikes();
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const commentModel = useCommentModel();
  const readingTime = calculateReadingTime(blog?.body);
  const publishedTime = formatTimeDifference(blog?.updatedAt);
  const likesCount = formatNumber(likes);

  const [isCommentSectionClicked, setIsCommentSectionClicked] = useState(false);

  const commmentSectionHandler = () => {
    setIsCommentSectionClicked(true);
    commentModel.onOpen();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <>
              {notFound ? (
                <>
                  <NotFoundPage />
                </>
              ) : (
                <>
                  {isCommentSectionClicked && (
                    <CommentModel
                      username={blog?.authorId.username || ""}
                      profile_img_url={blog?.authorId.profile_img_url || ""}
                      BlogId={blog?._id || ""}
                    />
                  )}
                  <NavBar />
                  <div
                    className="
       h-full bg-white text-black w-full min-w-0 "
                  >
                    <div>
                      <div className=" flex  justify-center">
                        <main className=" flex-auto w-[728px] min-w-0 max-w-[728px]  ">
                          <div className=" border-b h-fit max-w-full min-w-0 flex flex-col mx-2 sm:mx-4">
                            <strong className=" leading-[45px] text-4xl sm:text-[42px] my-5 sm:my-7">
                              {blog?.title}
                            </strong>
                            <div className=" border-b  pb-2 flex flex-row gap-4 items-center ">
                              <div className=" relative min-w-[44px]">
                                <img
                                  src={blog?.authorId.profile_img_url}
                                  alt="pp"
                                  className=" rounded-full hover:bg-slate-100  h-[44px] w-[44px]"
                                />

                                <a href={`/user/${blog?.authorId.username}`}>
                                  <div className=" absolute left-0 top-0 h-[44px] w-[44px] cursor-pointer rounded-full hover:bg-slate-200 hover:opacity-30 "></div>
                                </a>
                              </div>

                              <div className=" grow">
                                <div className=" flex flex-col gap-1 text-xl font-normal">
                                  <span className=" capitalize break-words hover:underline cursor-pointer ">
                                    <a
                                      href={`/user/${blog?.authorId.username}`}
                                    >
                                      {blog?.authorId.username}
                                    </a>
                                  </span>
                                  <div className=" flex flex-row text-sm  sm:text-base text-gray-500 break-words">
                                    <div>
                                      <span>{`${readingTime} min read`}</span>
                                    </div>
                                    <div>
                                      <span>&nbsp;&#8226;&nbsp;</span>
                                    </div>
                                    <div>
                                      <span>{publishedTime}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" border-b  h-[50px] py-3 flex flex-row justify-between  items-center">
                              <div className=" flex gap-4  items-center">
                                <div
                                  onClick={handleLikes}
                                  className=" grow min-w-[20px]  cursor-pointer w-[70px] flex items-center gap-2"
                                >
                                  <PiHandsClappingFill
                                    title="Clap"
                                    size={20}
                                    className="  fill-slate-700 hover:fill-black"
                                  />
                                  <span className=" grow-0  text-[#6B6B6B] text-[13px] ">
                                    {likesCount}
                                  </span>
                                </div>

                                <div
                                  onClick={commmentSectionHandler}
                                  className=" grow-0 cursor-pointer w-14 flex items-center gap-2"
                                >
                                  <button>
                                    <BsChat
                                      title="Comments"
                                      size={20}
                                      className=" fill-slate-700 hover:fill-black"
                                    />
                                  </button>
                                  <span className="  text-[#6B6B6B] text-[13px] ">
                                    {clength}
                                  </span>
                                </div>
                              </div>

                              <div className="w-10 p-2 h-full">
                                <HiDotsHorizontal
                                  title="More"
                                  className=" fill-gray-500 cursor-pointer hover:fill-black"
                                />
                              </div>
                            </div>
                            <div
                              id="blog"
                              className=" mt-3 sm:mt-7  break-words "
                            >
                              <h2 className=" text-gray-600  text-lg font-normal sm:text-xl ">
                                {blog?.subheading}
                              </h2>
                              {blog?.cover_photo_url && (
                                <div className="h-fit my-4 sm:my-6 w-full tj aye flex justify-center">
                                  <img
                                    src={blog?.cover_photo_url}
                                    alt="Cover photo"
                                    className="h-auto w-auto"
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <div
                                id="body"
                                className="my-2 sm:my-4 text-base font-normal sm:text-lg pb-2 border-b "
                              >
                                {React.createElement("div", {
                                  dangerouslySetInnerHTML: {
                                    __html: blog?.body,
                                  },
                                })}{" "}
                              </div>
                              <div className="border rounded-full bg-gray-200 py-[5px] mb-2 px-4 h-fit w-fit text-center">
                                <span>{blog?.category_name}</span>
                              </div>
                            </div>
                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            navigate("/login")
          )}
        </>
      )}
    </>
  );
};

export default BlogReadPage;
