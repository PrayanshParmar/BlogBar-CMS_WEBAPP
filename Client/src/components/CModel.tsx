import React, { useCallback, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CommentFeed from "./CommentFeed";
import { useAuth } from "../context/AuthContext";

interface modelProps {
  BlogId: String;
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  disabled?: boolean;
}

const CModel: React.FC<modelProps> = ({
  BlogId,
  isOpen,
  onClose,
  title,
  disabled,
}) => {
  const Auth: any = useAuth();
  const [user, setUser]: any = useState(null);
  const [comment, setComment] = useState([]);
  const [commentLength, setCommentLength] = useState(0);
  const [body, setBody] = useState("");

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = Auth.getAuth();
        setUser(res);
      } catch (error) {
        console.error("error");
      }
    };

    checkAuth();
  }, [Auth]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/get-comments/${BlogId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const commentData = await res.json();
        setComment(commentData.length > 0 ? commentData : null);
        setCommentLength(commentData.length);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const checkBodyIsEmpty = () => {
    if (body === "") {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    checkBodyIsEmpty();
  }, [body]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = Auth.getAuth();
        setUser(res);
      } catch (error) {
        console.error("error");
      }
    };

    checkAuth();
  }, [Auth]);

  useEffect(() => {
    checkBodyIsEmpty();
  }, [body]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogId = BlogId;
    const authorId = user.id;
    const res = await fetch("/post-comment", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        blogId,
        authorId,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      fetchData();
      setBody("");
    } else {
      console.log("something went wrong");
    }
  };

 

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onclose]);

  if (!isOpen) {
    return null;
  }

 



  return (
    <div
      
      className=" 
      
     cursor-pointer
     fixed
flex 
justify-end
w-full
z-50 
h-full
 overflow-auto
outline-none 
focus:outline-non

bg-[#000000]
  bg-opacity-5
"
    >
      <div onClick={handleClose} className=" cursor-pointer hidden sm:block grow"></div>
      <div
        
        className="  
         grow-0
         cursor-default
        shadowC
        overflow-auto
        h-full
         rounded-2xl
       sm:rounded-none
  justify-center 
   w-full
    sm:w-[414px]
         bg-white
         
         "
      >
        <div className="flex h-[74.1px] items-center  justify-between p-6 ">
          <div className=" text-xl font-medium text-black">{`${title} (${commentLength})`}</div>
          <div className="hover:rounded-full hover:bg-slate-100 flex items-center justify-center pt-1 w-[20px] ">
            <button
              onClick={handleClose}
              className="text-black   cursor-pointer "
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div id="post-comment" className=" min-h-[233px] h-[233px] px-6 ">
          <div
            id="post-comment-d"
            className=" min-h-[199px] h-[199px] py-[14px] border rounded-md  "
          >
            <div className=" h-[32px] mb-[6px] px-4 flex justify-start items-center">
              <div className=" w-fit h-fit">
                <img
                  src={user?.profile_img_url}
                  alt={user?.username}
                  className=" h-[32px] w-[32px] rounded-full"
                />
              </div>
              <div className=" text-[14px] font-medium">
                <span className=" capitalize ml-3">{user?.username}</span>
              </div>
            </div>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className=" pt-[14px] px-[14px] min-h-[133px] h-[133px] flex flex-col justify-between"
            >
              <textarea
                className=" grow text-[15px] font-medium outline-none  w-full  resize-none   scroll-tab "
                name="comment"
                id="comment"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What are your thoughts?"
              />
              <div className=" grow-0 h-[32px] mb-[6px] px-4 flex justify-end items-center">
                <div className=" text-[14px] font-medium flex flex-row  gap-3">
                  <button
                  onClick={() => setBody('')}
                   type="reset" className=" no-underline">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={` h-full w-fit p-2 border rounded-3xl bg-[#1A8917] text-white
                    ${
                      isButtonDisabled? 
                      " cursor-not-allowed opacity-20 ":" cursor-pointer"
                    }

                  `}
                  disabled={isButtonDisabled}
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <CommentFeed commentData={comment} />
      </div>
    </div>
  );
};

export default CModel;
