import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import SidebarFeed from "./SidebarFeed";
import { SiHatenabookmark } from "react-icons/si";
import { BsPlusLg } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface userTopicProps {
  userTopic: boolean;
}

const TwoColLayout: React.FC<userTopicProps> = ({ userTopic }) => {
  const [blog, setBlog] = useState([]);
  const [sidebarBlog, setSidebarBlog] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (tab: any) => {
      try {
        const res = await fetch(`/get-blog/${tab}`, {
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

    fetchData(activeTab);
  }, [activeTab]);

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

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="h-full bg-white text-black w-full min-w-0   ">
        <div>
          <div className="flex flex-row justify-evenly">
            <main className="flex-auto w-full min-w-[0px] min-[905px]:max-w-[728px] ">
              <div className="sm:pt-6 bg-white  "></div>
              <div
                className={`bg-white h-[55px] sticky top-0 z-40 mx-4 md:mx-6 ${
                  userTopic ? "" : "hidden"
                }`}
              >
                <div className="h-[18px]"></div>
                <div className="h-[36px]  relative max-sm:overflow-y-hidden whitespace-nowrap scroll-tab select-none  border-b max-[320px]:text-[10px] text-xs sm:text-sm font-medium text-gray-500 font-sans flex flex-row">
                  
                  <div
                    onClick={() => handleTabClick("forYou")}
                    className={`mr-9 w-auto  ${
                      activeTab === "forYou" ? "border-b border-b-black" : ""
                    } hover:text-black cursor-pointer`}
                  >
                    <span>For you</span>                         
                  </div>
                  <div
                    onClick={() => handleTabClick("Programming")}
                    className={`mr-9   ${
                      activeTab === "Programming" ? " border-b border-b-black" : ""
                    } hover:text-black cursor-pointer`}
                  >
                    <span>Programming</span>                    
                    
                  </div>
                  <div
                    onClick={() => handleTabClick("Technology")}
                    className={`mr-9    ${
                      activeTab === "Technology" ? "border-b border-b-black" : ""
                    } hover:text-black cursor-pointer`}
                  >
                    <span>Technology</span>
                    
                  </div>
                  <div
                    onClick={() => handleTabClick("Education")}
                    className={`mr-9    ${
                      activeTab === "Education" ? "border-b border-b-black" : ""
                    } hover:text-black cursor-pointer`}
                  >
                    <span>Education</span>
                  </div>
                  <div
                    onClick={() => handleTabClick("Startup")}
                    className={`mr-9   ${
                      activeTab === "Startup" ? "border-b border-b-black" : ""
                    } hover:text-black cursor-pointer`}
                  >
                    <span>Startup</span>
                    
                  </div>
                </div>
              </div>
              {blog ? (
                        <>
                          <Feed blogData={blog}  />
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
                              Discover BlogBar writers you already follow on
                              Twitter.
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
                         className="cursor-pointer hover:text-gray-500">
                          <a href='/about' >
                          About
                          </a>
                        </div>
                        <div className="cursor-pointer hover:text-gray-500">
                        <a href='/#' >
                          Terms
                          </a>
                        </div>
                        <div className="cursor-pointer hover:text-gray-500">
                        <a href='/#' >
                          Privacy
                          </a>
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
  );
};

export default TwoColLayout;
