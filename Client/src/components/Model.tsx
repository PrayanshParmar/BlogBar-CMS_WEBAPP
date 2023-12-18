import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface modelProps {
  isOpen?: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  actionLabel: string
}

const Model: React.FC<modelProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
  actionLabel
}) => {
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
flex 
justify-center
md:py-3
w-full
z-50 
h-full
outline-none 
focus:outline-non
bg-slate-400
bg-opacity-25
drop-shadow-lg"
  >
    <div
      className="  
       rounded-lg
  justify-center 
   w-full
    md:w-[700px]
         bg-white
         p-4"
    >
       <div className="flex   justify-between pb-4 rounded-full">
            <div className=" text-2xl md:text-4xl order-first font-semibold text-indigo-700">
              {title}
            </div>
        
          <button
            onClick={handleClose}
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
        <div className=" pt-4">{body}</div>
      </div>
    </div>
  );
};

export default Model;
