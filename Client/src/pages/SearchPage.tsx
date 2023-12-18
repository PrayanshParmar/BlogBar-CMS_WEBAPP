import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TwoColLayout from "../components/TwoColLayout";
import bg from "../assets/Background-Image.svg";
import Loader from "../components/Loader";
import { TabTitle } from "../utils/TabTitle";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import SidebarFeed from "../components/SidebarFeed";
import { SiHatenabookmark } from "react-icons/si";
import { BsPlusLg } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import Feed from "../components/Feed";
import { RiSearchLine } from "react-icons/ri";

const SearchPage = () => {
  TabTitle("Search");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);
  const [sidebarBlog, setSidebarBlog] = useState([]);
  const Auth: any = useAuth();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(Auth.getAuth());
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 550);
      }
    };

    fetchData();
  }, [setUser, Auth]);

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          const res = await fetch(`search?q=${searchQuery}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          if (res.status === 200) {
            const blogData = await res.json();
            setBlog(blogData.length > 0 ? blogData : null);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const res = await fetch(`/get-blog/forYou`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const blogData = await res.json();
          setSidebarBlog(blogData.length > 0 ? blogData : null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSidebarData();
  }, []);

  const unDownload: any = {
    pointerEvents: "none",
  };

  return (
    <>
      <div className="w-ful ">
        {loading ? (
          <Loader />
        ) : user ? (
          <>
            <NavBar />
            <>
              <div className="h-full bg-white text-black w-full min-w-0   ">
                <div>
                  <div className="flex flex-row justify-evenly">
                    <main className="flex-auto w-full min-w-[0px] min-[905px]:max-w-[728px] ">
                      <div className=" px-4 md:px-6 border-b h-fit max-w-full min-w-0 flex flex-col  pt-4 sm:pt-20 pb-4 ">
                        {searchQuery === null ? (
                          <div>
                            <div className=" min-[550px]:hidden  h-[38px] mb-4  ">
                              <form
                                action="/search"
                                method="GET"
                                className=" relative"
                              >
                                <input
                                  autoComplete="off"
                                  name="q"
                                  id="q"
                                  className="bg-gray-100 
                              h-[38px] w-[240px] rounded-full 
                              text-sm font-normal text-black 
                             focus:outline-gray-100
                              outline-none
                              pl-[35px] "
                                  placeholder="What do you want to read?"
                                />
                                <div className=" absolute h-[38px] inset-y-0 left-2 pl-1 flex items-center pointer-events-auto">
                                  <RiSearchLine className="text-gray-600 " />
                                </div>
                              </form>
                            </div>
                            <div className=" text-xl sm:text-2xl">
                              <span>Search something</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className=" min-[550px]:hidden  h-[38px] mb-4  ">
                              <form
                                action="/search"
                                method="GET"
                                className=" relative"
                              >
                                <input
                                  autoComplete="off"
                                  name="q"
                                  id="q"
                                  className="bg-gray-100 
                              h-[38px] w-[240px] rounded-full 
                              text-sm font-normal text-black 
                             focus:outline-gray-100
                              outline-none
                              pl-[35px] "
                                  placeholder="What do you want to read?"
                                />
                                <div className=" absolute h-[38px] inset-y-0 left-2 pl-1 flex items-center pointer-events-auto">
                                  <RiSearchLine className="text-gray-600 " />
                                </div>
                              </form>
                            </div>
                            <h1 className="  text-2xl sm:text-[42px] font-semibold sm:font-bold ">
                              <span className="text-2xl sm:text-[42px]  opacity-60">
                                Results for&nbsp;
                              </span>
                              {`"${searchQuery}"`}
                            </h1>
                          </>
                        )}
                      </div>

                      {blog ? (
                        <>
                          <Feed blogData={blog} />
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
                      className="hidden min-[905px]:flex min-w-[338px] max-w-[368px] pl-8 pr-6 max-[1078px]:px-6  border-l "
                    >
                      <div className="relative inline-block w-full h-full">
                        <div>
                          <div className="flex flex-col border-b">
                            <div className=" mt-10 font-normal block">
                              <div className=" font-medium text-base mb-[22px] ">
                                <h2>Staff Picks</h2>
                              </div>
                              <SidebarFeed blogData={sidebarBlog} />
                            </div>
                            <div className="border-b">
                              <div className=" mt-10">
                                <div className=" px-[30px] h-[124px] w-[304px] flex flex-col">
                                  <div className=" flex flex-row justify-center ">
                                    <SiHatenabookmark className=" h-8 w-7 fill-indigo-600 " />
                                    <BsPlusLg className=" h-6 w-6 fill-gray-500 mt-1 " />
                                    <FaSquareXTwitter className="h-8 w-8 fill-black" />
                                  </div>
                                  <div className=" flex text-center">
                                    <div className=" my-5">
                                      Discover BlogBar writers you already
                                      follow on Twitter.
                                    </div>
                                  </div>
                                </div>
                                <button className=" w-[300px] h-[42px] border border-black rounded-full p-2 flex justify-center active:bg-gray-100 ">
                                  <span className=" font-medium ">
                                    Connect to Twitter
                                  </span>
                                </button>
                                <div className="  my-5  text-gray-500 font-normal  cursor-pointer flex justify-center ">
                                  <span className=" underline underline-offset-2 text-sm">
                                    Maybe Later
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className=" text-gray-400 text-sm  mt-3 h-[53px] w-[224px] ">
                              <div className=" flex flex-row gap-4 ">
                                <div
                                  onClick={() => navigate("/about")}
                                  className="cursor-pointer hover:text-gray-500"
                                >
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
                </div>
              </div>
            </>
          </>
        ) : (
          <>{navigate("/login")}</>
        )}
      </div>
    </>
  );
};

export default SearchPage;
