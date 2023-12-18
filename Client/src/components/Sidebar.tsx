import bg from "../assets/B-Tech-Degree.jpg";
import pp from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { calculateReadingTime } from "../utils/calculateReadingTime";

interface SidebarProps {
  _id: string;
  title: string;
  username?: string;
  profile_img_url?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  _id,
  title,
  username,
  profile_img_url,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div id="staff picks" className=" pb-5">
        <div
          onClick={() => navigate(`/user/${username}`)}
          className=" h-5 flex flex-row gap-1  text-[13px] font-[500] mb-2 cursor-pointer"
        >
          <button>
            <img
              // height="40" width="40"
              src={profile_img_url}
              alt="pic"
              className=" rounded-full h-[20px] w-[20px]"
            />
          </button>
          <div className=" break-all ">{username}</div>
        </div>
        <div
          onClick={() => navigate(`/blog/${_id}`)}
          className=" font-bold text-base leading-[19px] cursor-pointer"
        >
          {title}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
