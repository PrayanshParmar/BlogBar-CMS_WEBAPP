import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { TabTitle } from "../utils/TabTitle";
import { MdError } from "react-icons/md";

const RegisterPage = () => {
  TabTitle("Register");
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [formValue, setFormValue] = useState({
    email: "",
    username: "",
    about: "",
    password: "",
    cpassword: "",
  });
  const [newmessage, setNewmessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const formEvent = (event: any) => {
    const { value, name } = event.target;
    setFormValue((formValue) => {
      return {
        ...formValue,
        [name]: value,
      };
    });
  };

  const handleFileChange = (event: any) => {
    // Store the selected file in the state
    setProfileImage(event.target.files[0]);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, cpassword, about } = formValue;

    // Create a FormData object to include the profile image
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cpassword", cpassword);
    formData.append("about", about);

    // Append the profileImage to the FormData
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const setPopup = (message: string) => {
      setNewmessage(message);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };
    //   Send the form data to the server
    
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    switch (data.message) {
      case "User Created":
        setPopup(data.message);
        navigate("/login");
        break;

      case "User already exist with this email":
        setPopup(data.message);
        break;

      case "User already exist with this username":
        setPopup(data.message);
        break;

      case "Both passwords do not matched":
        setPopup(data.message);
        break;

      case "Something went wrong":
        setPopup(data.message);
        break;

      case "Please fill all details":
        setPopup(data.message);
        break;

      default:
        setPopup("Something went wrong");
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

bg-slate-200
drop-shadow-lg"
      >
        {isVisible ? (
          newmessage && (
            <div
              className=" mt-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 fixed top-0  h-12 min-w-0 rounded-lg
             flex  items-center gap-2"
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
       
        w-[700px]
             bg-white
             p-4"
        >
          <div className="flex   justify-between pb-4 rounded-full">
            <div className=" text-2xl md:text-4xl order-first font-semibold text-indigo-700">
              Create an account
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
              <AiOutlineClose size={30} />
            </button>
          </div>
          <hr />
          <div className=" pt-4">
            <form method="POST" onSubmit={submit} encType="multipart/form-data">
              <div className="mt-8 bg-white p">
                <div className=" border-b border-gray-900/10 pb-6 ">
                  <h2 className=" text-2xl font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm sm:max-w-md p-[1px] border-2 border-gray-300  focus-within:border-indigo-600 ">
                          <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="block flex-1  outline-none bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                            placeholder="janesmith"
                            value={formValue.username}
                            onChange={formEvent}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full mt-2">
                    <label
                      htmlFor="about"
                      className="block text-lg font-medium leading-6 p-1 text-gray-900"
                    >
                      About
                    </label>
                    <div className=" mt-2 border-2 p-1 shadow-sm  border-gray-300 rounded-md focus-within:border-indigo-600 ">
                      <textarea
                        maxLength={200}
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full outline-none  text-gray-900  placeholder:text-gray-400  md:text-sm md:leading-6"
                        value={formValue.about}
                        onChange={formEvent}
                      ></textarea>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself, Upto 200 characters.
                    </p>
                  </div>

                  <div className="col-span-full mt-3">
                    <label
                      htmlFor="profileImage"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Profile photo
                    </label>
                    <div className="mt-2  flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="profileImage"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="profileImage"
                              name="profileImage"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-6">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          value={formValue.email}
                          onChange={formEvent}
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
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Must contain at least one number and one uppercase and
                        lowercase letter, and at least 8 or more characters.
                      </p>

                      <div className="mt-2 p-[1px] border-2 rounded-md border-gray-300  focus-within:border-indigo-600">
                        <input
                          required
                          value={formValue.password}
                          onChange={formEvent}
                          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          className="block w-full outline-none border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Confirm password
                      </label>

                      <div className="mt-2 p-[1px] border-2 rounded-md border-gray-300  focus-within:border-indigo-600">
                        <input
                          required
                          value={formValue.cpassword}
                          onChange={formEvent}
                          // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          id="cpassword"
                          name="cpassword"
                          type="password"
                          autoComplete="password"
                          className="block w-full outline-none border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 bg-white">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
                <div className="flex flex-col gap-2 px-10 pb-4 text-xl">
                  <button>
                    <div className=" text-neutral-400 text-sm text-center mt-4">
                      <p>
                        Have an account already?&nbsp;
                        <span
                          onClick={() => navigate("/login")}
                          className=" text-indigo-600 cursor-pointer hover:underline"
                        >
                          Signin
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

export default RegisterPage;
