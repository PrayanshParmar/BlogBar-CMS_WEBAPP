import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import NavBar from "../components/NavBar";
import { TabTitle } from "../utils/TabTitle";
import Feed from "../components/Feed";
import Loader from "../components/Loader";
import NotFoundPage from "./NotFoundPage";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matched, setMatched] = useState(false);
  let { username } = useParams();
  const navigate = useNavigate();
  const [blogLength, setBlogLength] = useState();
  const [notFound, setNotFound] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/userProfile", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setCurrentUser(data.currentUser || null);
          setUser(data.user || null);
          setMatched(data.isMatched);
          setBlog(data.blog.length > 0 ? data.blog : null);
          if (data.blog.length <= 0) {
            setBlogLength(null);
          } else {
            setBlogLength(data.blog.length);
          }
          TabTitle(`${username} On BlogBar`);
        } else if (res.status === 422) {
          const data = await res.json();
          setCurrentUser(data);
          setNotFound(true);
        } else if (res.status === 403) {
          navigate("/login");
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
  }, [
    setUser,
    setCurrentUser,
    setBlog,
    setBlogLength,
    username,
    navigate,
    setNotFound,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentUser ? (
            <>
             

              {notFound ? (
                <NotFoundPage />
              ) : (<>
                <NavBar />
                <div
                  className="
       h-full bg-white text-black w-full min-w-0 "
                >
                  <div className=" flex flex-row justify-evenly">
                    <main className=" flex-auto w-full min-w-[0px] min-[905px]:max-w-[728px]  ">
                      <div className=" border-b h-fit max-w-full min-w-0 flex flex-col">
                        <div className=" h-[150px] bg-gradient-to-b min-w-[0px] min-[905px]:max-w-[728px] from-[#dcc0f5] "></div>
                        <div className="h-fit mx-4 md:mx-6">
                          <div className=" flex flex-row gap-4 items-center ">
                            <div className=" hidden max-[905px]:flex">
                              <div className=" min-w-[48px]">
                                {user && (
                                  <img
                                    src={user.profile_img_url}
                                    alt={user.username}
                                    className=" rounded-full  h-[48px] w-[48px]"
                                  />
                                )}
                              </div>
                            </div>
                            <div className=" grow">
                              <div className=" flex flex-col gap-2">
                                {user && (
                                  <>
                                    <span className=" text-2xl min-[640px]:text-4xl font-semibold capitalize break-words ">
                                      {user.username}
                                    </span>
                                    <span className=" hidden max-[905px]:flex text-base text-gray-500 font-mono">
                                      {user.about}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            {matched ? (
                              <div className="hidden max-[905px]:flex justify-end">
                                <a href="/me/settings">
                                  <HiDotsHorizontal
                                    className="fill-[#9147d1]"
                                    title="Edit Profile"
                                  />
                                </a>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className=" pt-6">
                            <span className="  text-sm  underline underline-offset-[5.5px] decoration-1 decoration-[#9147d1] sm:text-base">
                              Blogs
                            </span>
                          </div>
                        </div>
                      </div>
                      {blog ? (
                        <>
                          <Feed blogData={blog} matched={matched} />
                        </>
                      ) : (
                        <div className=" w-full h-fit mt-6  flex  justify-center ">
                          <div className="text-2xl sm:text-3xl">
                            <strong>No blog found</strong>
                          </div>
                        </div>
                      )}
                    </main>
                    <div
                      id="sideBar"
                      className="hidden min-[905px]:flex min-w-[338px]
                        max-w-[368px] pl-8 pr-6 max-[1078px]:px-6  border-l"
                    >
                      <div className=" relative inline-block w-full h-full">
                        <div className=" sticky top-0">
                          <div className="flex flex-col border-b">
                            <div className=" mt-10 font-normal ">
                              <div className="max-w-full h-[88px]">
                                <div>
                                  {user && (
                                    <img
                                      src={user.profile_img_url}
                                      alt={user.username}
                                      className=" rounded-full  h-[88px] w-[88px]  "
                                    />
                                  )}
                                </div>
                              </div>
                              <div className=" mt-4 font-medium text-[17px] break-words">
                                {user && (
                                  <span className="capitalize ">
                                    {user.username}
                                  </span>
                                )}
                              </div>
                              <div className=" mt-2 max-h-fit">
                                <span className=" break-words font-mono text-sm text-gray-500">
                                  {user.about}
                                </span>
                              </div>
                              {blogLength ? (
                                <div className=" mt-2 max-h-fit mb-2 ">
                                  <span className="break-words text-sm text-gray-500">{`Published ${blogLength} blogs`}</span>
                                </div>
                              ) : (
                                <></>
                              )}
                              {matched ? (
                                <div className=" my-8 text-[13px]">
                                  <div
                                    id="settingPageRedirect"
                                    className="text-[#9147d1]"
                                  >
                                    <a
                                      href="/me/settings"
                                      className=" no-underline hover:underline"
                                    >
                                      Edit profile
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className=" text-gray-400 text-[13px]  mt-3 h-[53px] w-[224px] ">
                            <div className=" flex flex-row gap-4 ">
                              <div className="cursor-pointer hover:text-gray-500">
                                About
                              </div>
                              <div className="cursor-pointer hover:text-gray-500">
                                Terms
                              </div>
                              <div className="cursor-pointer hover:text-gray-500">
                                Privacy
                              </div>
                            </div>
                            <span>&#169; 2023 Blogbar.</span>
                          </div>
                        </div>
                      </div>
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

export default UserPage;
