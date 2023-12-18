import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TabTitle } from "../utils/TabTitle";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import AccordianFeed from "../components/AccordianFeed";

const SettingPage = () => {
  const navigate = useNavigate();
  const [user, setUser]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const Auth: any = useAuth();
  let data: any[] = [];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setUser(Auth.getAuth());
        TabTitle("Settings - BlogBar");
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

  if (user) {
    data = [
      {
        type: "email",
        accordionHeaderTitle: "Email address",
        accordionHeaderContent: user.email,
      },
      {
        type: "username",
        accordionHeaderTitle: "Username",
        accordionHeaderContent: user.username,
      },
      {
        type: "about",
        accordionHeaderTitle: "About",
        accordionHeaderContent: user.about,
      },
      {
        type: "profileImage",
        accordionHeaderTitle: "Profile image",
        accordionHeaderContent: user.profile_img_url,
      },
      {
        type: "password",
        accordionHeaderTitle: "Password",
        accordionHeaderContent: "*******",
      },
      {
        type: "delete",
        accordionHeaderTitle: "Delete Account",
        accordionHeaderContent: " ",
      },
    ];
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <NavBar />
          <div className=" h- bg-white text-black w-full min-w-0">
            <div className=" flex flex-row justify-evenly">
              <main className=" flex-auto w-full min-w-[0px] min-[905px]:max-w-[728px]">
                <div className="h-full pt-[26px] mx-4 md:mx-6">
                  <div className=" border-b h-fit max-w-full min-w-0 flex flex-col  pt-4 sm:pt-20 pb-4 ">
                    <h1 className="text-3xl sm:text-[42px] font-semibold">
                      Settings
                    </h1>
                  </div>
                  <div>
                    <AccordianFeed accordianFeedData={data} />
                  </div>
                </div>
              </main>
              <div
                id="sideBar"
                className="hidden min-[905px]:flex min-w-[338px] max-w-[368px] pl-8 pr-6 max-[1078px]:px-6  border-l "
              >
                <div className=" relative inline-block w-full h-full">
                  <div>
                    <div className="flex flex-col border-b">
                      <div
                        className=" mt-10 font-normal block
                  "
                      >
                        <div className=" font-medium text-base mb-[22px] ">
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
              </div>
            </div>
          </div>
          <div className=" w-full h-[200px] bg-white"/>
        </>
      ) : (
        <>{navigate("/login")}</>
      )}
    </>
  );
};

export default SettingPage;
