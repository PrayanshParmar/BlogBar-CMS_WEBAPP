import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Editor from "../components/Editor";
import { TabTitle } from "../utils/TabTitle";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const BlogPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const Auth: any = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(Auth.getAuth());
        TabTitle("Write - BlogBar");
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 550);
      }
    };

    fetchData();
  }, [setUser, Auth]);

  const [coverImage, setProfileImage] = useState(null);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [empty, setEmpty] = useState(true);


  const nextStep = () => {
    if (!title || !subHeading || category_name === '') {
      setPopup("Please fill all details");
    } else {

      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setEmpty(true);
    setStep(step - 1);
  };

  const [newmessage, setNewmessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  const setPopup = (message: string) => {
    setNewmessage(message);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1400);
  };

  const onCancel = (e: any) => {
    e.preventDefault();
    navigate("/");
  };
  const handleFileChange = (event: any) => {
    // Store the selected file in the state
    setProfileImage(event.target.files[0]);
  };

  const handlePublish = (html: string) => {
    if(html == '<p class="editor-paragraph"><br></p>'){ 
      setEmpty(true);
    }else{
    setBody(html);
    setEmpty(false);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
      formData.append("body", body);
      formData.append("subheading", subHeading);
    formData.append("category_name", category_name);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    
   
    const res = await fetch("/post-blog", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (res.status == 200) {
      setPopup(data.message)
      navigate(`/user/${user?.username}`)
    } else if(res.status == 422) {
      setPopup(data.message)
    }else if(res.status == 400) {
      setPopup(data.message)
    }else{
      console.error("Updation failed");
    }

    
  };

  return (
    <>
      <div className="w-full h-full ">
        {loading ? (
          <Loader />
        ) : user ? (
          <>
           {isVisible ? (
          newmessage && (
            <div className=" fixed top-0 left-0 w-full h-fit min-w-0 flex items-center justify-center">
            { newmessage == 'Uploaded Succesfully'?(
            <div className=" mt-1 bg-green-100 border border-green-400 text-green-700 px-4 py-3 w-fit rounded-lg
            flex  items-center gap-2
           " role="success">
             <IoCheckmarkDoneCircle className=" fill-green-700 h-[22px] w-[22px]" />
             <strong className="font-bold">{newmessage}</strong>
           </div>
            ):(
              <div className=" mt-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-fit rounded-lg
              flex  items-center gap-2
             " role="alert">
               <MdError className=" fill-red-700 h-[22px] w-[22px]" />
               <strong className="font-bold">{newmessage}</strong>
             </div>
            ) }
            </div>
          )
        ) : (
          <></>
        )}
            <NavBar />

            <form id="editor"
            method="POST"
            onSubmit={submit}
            encType="multipart/form-data"
            >
              {step === 1 && (
                <div className=" flex justify-center md:pb-3 w-full h-full focus:outline-non ">
                  <div className=" justify-center w-full md:w-[700px] border  bg-white p-4 mb-2">
                    <div className="flex   justify-center pb-4 rounded-full">
                      <div className=" text-2xl md:text-4xl order-first font-semibold text-black">
                        Get Started
                      </div>
                    </div>
                    <hr />
                    <div className=" pt-4">
                      
                        <div className=" bg-white p">
                          <div className=" border-b border-gray-900/10 pb-6 ">
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="title"
                                  className="block   text-xl  font-medium leading-6 text-gray-900"
                                >
                                  Title
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm sm:max-w-md p-[1px] border-2 border-gray-300  focus-within:border-indigo-600 ">
                                    <input
                                      required
                                      type="text"
                                      name="title"
                                      id="title"
                                      autoComplete="title"
                                      className="block flex-1  outline-none bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                                      placeholder="Once upon a time..."
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="subHeading"
                                  className="block   text-xl  font-medium leading-6 text-gray-900"
                                >
                                  Sub heading
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm sm:max-w-md p-[1px] border-2 border-gray-300  focus-within:border-indigo-600 ">
                                    <input
                                      required
                                      type="text"
                                      name="subHeading"
                                      id="subHeading"
                                      autoComplete="off"
                                      className="block flex-1  outline-none bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                                      value={subHeading}
                                      onChange={(e) => setSubHeading(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-full mt-3">
                              <label
                                htmlFor="coverImage"
                                className="block   text-xl font-medium leading-6 text-gray-900"
                              >
                                Cover photo
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
                                      htmlFor="coverImage"
                                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input
                                        id="coverImage"
                                        name="coverImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" mt-6">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4 ">
                                <label
                                  htmlFor="body"
                                  className="block  text-xl  font-medium leading-6 text-gray-900"
                                >
                                  Category Name
                                </label>
                                <div className="mt-2 p-[1px] border-2 rounded-md border-gray-300  focus-within:border-indigo-600">
                                  <input
                                    required
                                    value={category_name}
                                    onChange={(e) =>
                                      setCategory_name(e.target.value)
                                    }
                                    placeholder="Education, Startup, Tech"
                                    id="category_name"
                                    name="category_name"
                                    type="text"
                                    autoComplete="off"
                                    className="block w-full outline-none py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6 bg-white">
                            <button
                              onClick={onCancel}
                              className="rounded-md  px-3 py-2 text-lg font-semibold text-red-500 border border-red-500 shadow-sm hover:bg-red-500 hover:text-white   "
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={nextStep}
                              className="rounded-md  px-3 py-2 text-lg font-semibold text-green-500 border border-green-500 shadow-sm hover:bg-green-500 hover:text-white   "
                            >
                              Next
                            </button>
                          </div>
                        </div>
                    
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <>
                  <Editor onPublish={handlePublish} />
                  <div className=" my-3  w-full inline h-fit justify-center items-center gap-3">
                    <button
                      type="button"
                      className=" ml-3 h-8 w-20 border rounded-lg border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      className={` ml-3 h-8 w-20 border rounded-lg
                      ${empty ? " bg-green-500 border-green-500 text-white opacity-[0.4]"
                      :" border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        
                      }
                      `}
                      type="submit"

                      disabled={empty}
                    >
                      Publish
                    </button>
                  </div>
                  <div className=" block h-8"></div>
                </>
              )}
            </form>
          </>
        ) : (
          <>{navigate("/login")}</>
        )}
      </div>
    </>
  );
};

export default BlogPage;
