import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdError } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

interface AccordianProps {
  accordionHeaderTitle: string;
  accordionHeaderContent: string;
  type: string;
}

const Accordian: React.FC<AccordianProps> = ({
  accordionHeaderTitle,
  accordionHeaderContent,
  type,
}) => {
  const Auth: any = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    accordionHeaderContent
  );
  const [image, setImage]: any = useState(null);
  const [input, setInput] = useState(accordionHeaderContent);
  const [formValue, setFormValue] = useState({
    type: "password",
    ppassword: "",
    password: "",
    cpassword: "",
  });
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
    if (type == "password") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        ppassword: "",
        password: "",
        cpassword: "",
      }));
      setIsOpen(false);
    } else if (type == "profileImage") {
      setImagePreview(accordionHeaderContent);
      setImage(null);
      setIsOpen(false);
    } else if (type == "delete") {
      setConfirmationText("");
      setIsOpen(false);
    } else {
      setInput(accordionHeaderContent);
      setIsOpen(false);
    }
  };
  const handleInputChange = (e: any) => {
    const newText = e.target.value;
    setConfirmationText(newText);

    setIsButtonDisabled(newText !== "delete");
  };

  const handleDelete = () => {
    if (!isButtonDisabled) {
      // Call the onDelete function when confirmation is successful
    } else {
      // Handle incorrect confirmation text
      alert("Confirmation text is incorrect. Please type 'delete'.");
    }
  };

  const formEvent = (event: any) => {
    const { value, name } = event.target;
    setFormValue((formValue) => {
      return {
        ...formValue,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type == "delete") {
      try {
        const res = await fetch("/updateProfile", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
          }),
        });

        const data = await res.json();

        if (res.status == 200) {
          await Auth.setAuth();
          Auth.deleteUser();
          navigate("/login");
        }else if(res.status == 422){
          setPopup(data.message);
        }else if(res.status == 400){
          setPopup(data.message);
        }else {
          console.error("Updation failed");
        }
      } catch (error) {}
    } else if (type == "password") {
      const { type, ppassword, password, cpassword } = formValue;

      try {
        const res = await fetch("/updateProfile", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            ppassword,
            password,
            cpassword,
          }),
        });

        const data = await res.json();

        if (res.status == 200) {
          await Auth.setAuth();
          setPopup(data.message)
          setIsOpen(false);
          setFormValue((prevFormValue) => ({
            ...prevFormValue,
            ppassword: "",
            password: "",
            cpassword: "",
          }));
        } else if(res.status == 422) {
          setPopup(data.message)
        }else if(res.status == 401){
          setPopup(data.message)
        }else if(res.status == 401){
          setPopup(data.message)
        }else{
          console.error("Updation failed");
        }
      } catch (error) {}

    } else if (type == "profileImage") {
      const formData = new FormData();
      formData.append("type", "profileImage");
      formData.append("profileImage", image);
      

      try {
        const res = await fetch("/updateProfile", {
          method: "PUT",
          credentials: "include",
          body: formData,
        });

        const data = await res.json();

        if (res.status == 200) {
          await Auth.setAuth();
          setIsOpen(false);
          setImage(null);
          setPopup(data.message)
        } else if(res.status == 422) {
          setPopup(data.message)
        }else{
          console.error("Updation failed");
        }
      } catch (error) {
        
      }
    } else {
      try {
        const res = await fetch("/updateProfile", {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            input,
          }),
        });
        const data = await res.json();

        if (res.status == 200) {
          await Auth.setAuth();
          setIsOpen(false);
          setPopup(data.message)
        } else if(res.status == 422) {
          setPopup(data.message)
        }else{
          console.error("Updation failed");
        }
      } catch (error) {}
    }
  };


  return (
    <div>
    {isVisible ? (
          newmessage && (
            <div className=" fixed top-0 left-0 w-full h-fit min-w-0 flex items-center justify-center">
            { newmessage == 'Updated Succesfully'?(
            <div className=" mt-1 bg-green-100 border border-green-400 text-green-700 px-4 py-3 w-fit rounded-lg
            flex  items-center gap-2
           " role="alert">
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
      <div id="Accordian" className="  my-8 h-fit  ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" w-full h-5 flex text-sm justify-between"
        >
          <span className=" font-medium">{accordionHeaderTitle}</span>
          {type == "profileImage" ? (
            <div className="min-w-[19px]">
              <img
                src={accordionHeaderContent}
                alt="userImage"
                className=" rounded-full  h-[24px] w-[24px]"
              />
            </div>
          ) : (
            <span className=" max-w-[170px]  sm:max-w-[500px] text-gray-500 font-normal line-clamp-1">
              {accordionHeaderContent}
            </span>
          )}
        </button>
        {isOpen && (
          <div id="accordion-content" className=" border-b  py-4 h-fit ">
            {type == "email" ? (
              <div>
                <form
                  onSubmit={submit}
                  className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center "
                >
                  <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                    <input
                      required
                      type="email"
                      className=" block w-full outline-none py-1.5 text-gray-900 "
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>

                  <div className=" flex gap-6">
                    <button
                      type="submit"
                      // onClick={submit}
                      className=" h-[38px] w-16 border  rounded-full border-green-500 hover:bg-green-500 text-green-500 hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 hover:bg-red-500 text-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            {type == "username" ? (
              <div>
                <form
                  onSubmit={submit}
                  className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center "
                >
                  <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                    <input
                      required
                      type="text"
                      className="block w-full outline-none py-1.5 text-gray-900"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>

                  <div className=" flex gap-6">
                    <button
                      // onClick={submit}
                      className=" h-[38px] w-16 border  rounded-full border-green-500 hover:bg-green-500 text-green-500 hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 hover:bg-red-500 text-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            {type == "about" ? (
              <div>
                <form
                  onSubmit={submit}
                  className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center "
                >
                  <div className=" min-w-0 w-[180.8px] max-w-[180.8px] border-2 p-1 shadow-sm rounded-md border-black ">
                    <textarea
                      required
                      maxLength={200}
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full outline-none   text-gray-900  placeholder:text-gray-400  md:text-sm md:leading-6"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                  </div>

                  <div className=" flex gap-6">
                    <button
                      // onClick={submit}
                      className=" h-[38px] w-16 border  rounded-full border-green-500 hover:bg-green-500 text-green-500 hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 hover:bg-red-500 text-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            {type == "profileImage" ? (
              <form
                method="PUT"
                onSubmit={submit}
                encType="multipart/form-data"
              >
                <div className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center ">
                  <div className=" min-w-0 w-[180.8px] max-[413.60px]:w-fit ">
                    <div className="min-w-[44px]">
                      <div className=" h-fit w-fit ">
                        <label
                          htmlFor="profileImage"
                          className=" cursor-pointer"
                        >
                          <img
                            src={
                              typeof imagePreview === "string"
                                ? imagePreview
                                : ""
                            }
                            alt="userImage"
                            className=" rounded-full  h-[44px] w-[44px]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" flex gap-6">
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className=" sr-only"
                    />

                    <button
                      type="submit"
                      className=" h-[38px] w-16 border  rounded-full border-green-500 hover:bg-green-500 text-green-500 hover:text-white "
                    >
                      Save
                    </button>

                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 hover:bg-red-500 text-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <></>
            )}
            {type == "password" ? (
              <div>
                <form
                  method="PUT"
                  onSubmit={submit}
                  className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center "
                >
                  <div className=" flex flex-col gap-2">
                    <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                      <input
                        autoComplete="off"
                        required
                        type="password"
                        id="ppassword"
                        name="ppassword"
                        className="block w-full outline-none py-1.5 text-gray-900"
                        placeholder="Current password"
                        value={formValue.ppassword}
                        onChange={formEvent}
                      />
                    </div>
                    <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                      <input
                        autoComplete="off"
                        required
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full outline-none py-1.5 text-gray-900"
                        placeholder="New password"
                        value={formValue.password}
                        onChange={formEvent}
                      />
                    </div>
                    <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                      <input
                        autoComplete="off"
                        required
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        className="block w-full outline-none py-1.5 text-gray-900"
                        placeholder="Confirm password"
                        value={formValue.cpassword}
                        onChange={formEvent}
                      />
                    </div>
                  </div>

                  <div className=" flex gap-6">
                    <button
                      type="submit"
                      className=" h-[38px] w-16 border  rounded-full border-green-500 hover:bg-green-500 text-green-500 hover:text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 hover:bg-red-500 text-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            {type == "delete" ? (
              <div>
                <div className=" pb-2 max-[413.60px]:flex  justify-around items-center">
                  <span className=" text-sm break-words text-gray-500">
                    Permanently delete your account and all of you content.
                  </span>
                </div>

                <form
                  method="PUT"
                  onSubmit={submit}
                  className="flex min-[413.60px]:flex-row flex-col gap-4 justify-around items-center "
                >
                  <div className="py-[1px] px-[2px] border-2  rounded border-gray-300  focus-within:border-black">
                    <input
                      autoComplete="off"
                      required
                      type="text"
                      id="confirmationInput"
                      className=" block w-full outline-none py-1.5 text-gray-900 "
                      placeholder='type "delete"'
                      value={confirmationText}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className=" flex gap-6">
                    <button
                      type="submit"
                      onClick={handleDelete}
                      className={`h-[38px] w-16 border border-black rounded-full ${
                        isButtonDisabled
                          ? "bg-red-500 opacity-[0.4] border-red-500  text-white "
                          : "bg-red-500  border-red-500  text-white hover:bg-red-600"
                      }  `}
                      disabled={isButtonDisabled}
                    >
                      Delete
                    </button>
                    <button
                      onClick={onCancel}
                      className=" h-[38px] w-16 border  rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordian;