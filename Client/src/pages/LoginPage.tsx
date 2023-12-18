import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { TabTitle } from "../utils/TabTitle";
import { MdError } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  TabTitle("Login");
  const Auth: any = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newmessage, setNewmessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleRefreshUser = () => {
    Auth.setAuth();
    navigate("/");
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const setPopup = (message: string) => {
      setNewmessage(message);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    const res = await fetch("/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    switch (data.message) {
      case "Login Succesfully":
        handleRefreshUser();
        break;

      case "Something went wrong":
        setPopup(data.message);
        break;
      case "Please fill credentials":
        setPopup(data.message);
        break;
      case "Invalid Credentials":
        setPopup(data.message);
        break;

      default:
        setPopup("Something Went Wrong");
        break;
    }
  };

  return (
    <>
      <div
        className=" 
      flex 
      justify-center
       items-center
      md:py-3
     w-full
     min-h-screen
     bg-slate-200
     "
      >
        {isVisible ? (
          newmessage && (
            <div
              className=" mt-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 fixed top-0  h-12 min-w-0 rounded-lg
             flex  items-center gap-2
            "
              role="alert"
            >
              <MdError className=" fill-red-700 h-[22px] w-[22px]" />
              <strong className="font-bold">{newmessage}</strong>
            </div>
          )
        ) : (
          <></>
        )}
        <div
          className="  
        rounded-lg
        justify-center 
        
         h-fit
         min-w-0
          max-w-[700px]
               bg-white
               p-4"
        >
          <div className="flex   justify-between pb-4 rounded-full">
            <div className=" text-2xl md:text-4xl order-first font-semibold text-indigo-700">
              Welcome Back
            </div>
            <button
              onClick={() => navigate("/")}
              className="   
             p-1
              text-black
              rounded-full
               transition
               hover:bg-slate-400
hover:bg-opacity-10 cursor-pointer "
            >
              <AiOutlineClose title="Close" size={30} />
            </button>
          </div>
          <hr />
          <div className=" pt-4">
            <form method="POST" onSubmit={submit} encType="multipart/form-data">
              <div className=" bg-white ">
                <div className=" border-b border-gray-900/10 pb-6 ">
                  <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4 ">
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2 p-[1px] border-2 rounded-md border-gray-300  focus-within:border-indigo-600">
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full outline-none py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>

                      <div className="mt-2 p-[1px] border-2 rounded-md border-gray-300  focus-within:border-indigo-600">
                        <input
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          className="block w-full outline-none border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" mt-2 md:mt-6 flex items-center justify-end gap-x-6 bg-white">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>

                <div className="flex flex-col gap-2 px-10 pb-2 md:pb-4 text-xl">
                  <button>
                    <div className=" text-neutral-400 text-sm text-center mt-4">
                      <p>
                        First time using Blogbar?&nbsp;
                        <span
                          onClick={() => navigate("/register")}
                          className=" text-indigo-600 cursor-pointer hover:underline"
                        >
                          Create an account
                        </span>
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
