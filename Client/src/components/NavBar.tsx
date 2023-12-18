import { useState, useEffect, useRef } from "react";
import { RxPerson } from "react-icons/rx";
import { CgMenuRight, CgMenuRightAlt } from "react-icons/cg";
import { GoHome, GoSignOut } from "react-icons/go";
import { SiHatenabookmark } from "react-icons/si";
import { RiSearchLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { PiNewspaperClipping } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [toggleO, setToggleO] = useState(false);
  const [user, setUser]: any = useState(null);
  const Auth: any = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await Auth.getAuth();
      setUser(userData); 
      if (userData === null) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
  
    checkAuth();
  }, [Auth]);

  const handleNavO = () => {
    if (toggleO === false) {
      setToggleO(!toggleO);
    } else {
      setToggleO(!toggleO);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isNavButton = (event.target as HTMLElement).closest(
        "#handleNavButton"
      ); // Replace 'your-nav-button-class' with the actual class of the button

      if (
        toggle &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !isNavButton
      ) {
        setToggle(false);
      }
    };

    const handleScroll = () => {
      if (toggle) {
        setToggle(false);
      }
    };

    // Attach the event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Detach the event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggle, dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isNavButton = (event.target as HTMLElement).closest(
        "#dropdownNavButton"
      ); // Replace 'your-nav-button-class' with the actual class of the button

      if (
        toggleO &&
        dropdownNavRef.current &&
        !dropdownNavRef.current.contains(event.target as Node) &&
        !isNavButton
      ) {
        setToggleO(false);
      }
    };

    const handleScroll = () => {
      if (toggleO) {
        setToggleO(false);
      }
    };

    // Attach the event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Detach the event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleO, dropdownNavRef]);

  const shadow = {
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 0px 4px, rgba(0, 0, 0, 0.15) 0px 2px 8px",
  };

  const handleNav = () => {
    if (toggle == false) {
      setToggle(!toggle);
    } else {
      setToggle(!toggle);
    }
  };

  const handleLogout = async () => {
    Auth.deleteUser();
    navigate("/login");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="h-[57px] px-4 md:px-6 flex  border-b w-full  justify-between items-center bg-white z-50 ">
            <div className=" flex  items-center  cursor-pointer text-indigo-600 text-lg  font-extrabold ">
              <span>
                <SiHatenabookmark
                  title="BlogBar"
                  size={34}
                  className="fill-indigo-600 "
                />
              </span>
              <div className=" hidden min-[550px]:flex  pl-2  h-[38px]  relative ">
                <form action="/search" method="GET" >
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
                  placeholder="Search"
                />
                <div className=" absolute h-[38px] inset-y-0 left-3 pl-1 flex items-center pointer-events-auto">
                  <RiSearchLine className="text-gray-600 " />
                </div>
                </form>
              </div>
            </div>

            <div className="  flex items-center justify-end gap-8 ">
              <div
                onClick={() => navigate("/write")}
                className="hidden cursor-pointer min-[905px]:flex gap-2 text-base text-gray-500 hover:text-black "
              >
                <span className=" ">
                  <BsPencilSquare size={23} />
                </span>
                Write
              </div>

              <div className="cursor-pointer min-[550px]:hidden  text-base text-gray-500 hover:text-black ">
                <a href={"/search"}>
                <RiSearchLine size={23} />
                </a>
              </div>

              <div
                onClick={handleNav}
                id="handleNavButton"
                className=" mt-[6px] cursor-pointer "
              >
                <button>
                  <img
                    // height="40" width="40"
                    src={user.profile_img_url}
                    alt={user.username}
                    className=" rounded-full h-[36px] w-[36px]"
                  />
                </button>
              </div>
            </div>

            <div
              id="dropdowm-menu"
              ref={dropdownRef}
              className={` ${
                toggle
                  ? " bg-white border border-gray-100 rounded-md h-[338px] min-[905px]:h-[250px] w-[224px] text-black flex flex-col items-start fixed top-[50px] right-1 z-50 "
                  : "hidden"
              } `}
              style={shadow}
            >
              <ul>
                <li className=" min-[905px]:hidden p-4 text-center   hover:scale-110">
                  <div className="flex gap-2 text-base  text-gray-900 hover:text-black ">
                    <span>
                      <BsPencilSquare className="text-gray-600" size={22} />
                    </span>
                    <Link to="/write">Write</Link>
                  </div>
                </li>
                <li className="  p-4 text-center  hover:text-indigo-600 hover:scale-110">
                  <div className="flex gap-2 text-base  text-gray-900 hover:text-black ">
                    <span>
                      <PiNewspaperClipping
                        className="text-gray-600"
                        size={23}
                      />
                    </span>
                    <Link to="/">Stories</Link>
                  </div>
                </li>
                <li className="  p-4 text-center  hover:text-indigo-600 hover:scale-110">
                  <div className="flex gap-2 text-base  text-gray-900 hover:text-black ">
                    <span>
                      <RxPerson className="text-gray-600" size={23} />
                    </span>
                    <Link to={`/user/${user.username}`}>Profile</Link>
                  </div>
                </li>
                <li className="  p-4 text-center  hover:text-indigo-600 hover:scale-110">
                  <div className="flex gap-2 text-base  text-gray-900 hover:text-black ">
                    <span>
                      <GoHome className="text-gray-600" size={23} />
                    </span>
                    <Link to="/">Home</Link>
                  </div>
                </li>

                <li className=" p-4 text-center flex flex-col  ">
                  <button
                    className="h-6 w-24 text-black flex flex-row hover:scale-110"
                    onClick={handleLogout}
                  >
                    <GoSignOut className="text-gray-600" size={23} />
                    <span className=" pl-2 text-gray-900 hover:text-black">
                      Sign Out
                    </span>
                  </button>
                  <p className=" text-sm font-normal text-gray-600">
                    {user.email}
                  </p>
                </li>
              </ul>
              <hr className=" md:hidden w-[224px] " />
              <div className="pl-4 min-[905px]:hidden border-t   text-gray-400  text-[11px] font-normal h-[35px] w-[224px] ">
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
        </>
      ) : (
        <>
          <div className="h-[100px] py-4 px-2  min-[870px]:px-32 flex absolute top-0 left-0   w-full  justify-between items-center bg-transparent	z-20 ">
            <div
              className=" flex  items-center  cursor-pointer text-white text-lg md:text-2xl font-extrabold  "
              onClick={(e) => navigate("/")}
            >
              <span>
                <SiHatenabookmark size={32} />
              </span>
              &nbsp;BLOGBAR
            </div>
            <div className="  items-center justify-end">
              <ul className=" hidden sm:flex text-white gap-10">
                <li className="cursor-pointer hover:underline  hover:underline-offset-4">
                  <Link to="/">Home</Link>
                </li>

                <li className="cursor-pointer hover:underline  hover:underline-offset-4">
                  <Link to="/write">Write</Link>
                </li>
                <li
                  
                  className="cursor-pointer hover:underline  hover:underline-offset-4"
                >
                 <a href="/login" > 
                  Sign In
                  </a>
                </li>
              </ul>
            </div>
            <div className=" hidden sm:flex items-center justify-end ">
              <button
                className="h-12 w-28 text-white bg-transparent border-2  border-white hover:bg-white hover:text-[#9147d1]  hover:border-[#9147d1]  "
                
              >
                <a href="/register" >
                Get started
                </a>
              </button>
            </div>
            <div
              onClick={handleNavO}
              id="dropdownNavButton"
              className="block sm:hidden cursor-pointer"
            >
              {toggleO ? (
                <CgMenuRight className="text-white text-2xl " />
              ) : (
                <CgMenuRightAlt className=" text-white text-3xl " />
              )}
            </div>

            <div
              id="dropdownNav"
              ref={dropdownNavRef}
              className={` border bg-transparent backdrop-filter backdrop-blur sm:hidden h-[300px] w-full text-white flex flex-col items-center absolute top-[84px] ${
                toggleO ? "right-[0] " : " hidden "
              } `}
            >
              <ul>
                <li className=" p-4 text-center cursor-pointer hover:underline  hover:underline-offset-4">
                  <Link to="/">Home</Link>
                </li>
                <li className=" p-4 text-center cursor-pointer hover:underline  hover:underline-offset-4 ">
                  <Link to="/about">Our story</Link>
                </li>
                <li className=" p-4 text-center cursor-pointer hover:underline  hover:underline-offset-4 ">
                  <Link to="/write">Write</Link>
                </li>
                <li
                  
                  className=" p-4 text-center cursor-pointer hover:underline  hover:underline-offset-4 "
                > 
                 <a href="/login" >
                  Sign In
                  </a>
                </li>
                <li className=" p-4  text-center ">
                  <div
                    onClick={() => navigate("/register")}
                    className=" justify-end bg-transparent border-2  border-white hover:bg-white hover:text-[#5c47d1]  hover:border-[#5c47d1]   "
                  >
                    <button className="h-10 w-24">Get started</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
