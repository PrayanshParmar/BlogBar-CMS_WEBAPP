import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateReadingTime } from "../utils/calculateReadingTime";
import { MdOutlineDeleteForever } from "react-icons/md";

interface BlogFeedProps {
  username?: string;
  profile_img_url?: string;
  _id?: String;
  title: String;
  body: String;
  subheading: string;
  cover_photo_url: string;
  category_name: String;
  updatedAt: Date;
  matched?: boolean;
}

const BlogFeed: React.FC<BlogFeedProps> = ({
  username,
  profile_img_url,
  _id,
  title,
  body,
  subheading,
  cover_photo_url,
  category_name,
  updatedAt,
  matched,
}) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Reload the current page
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/delete-blog`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      });

      if (res.status == 200) {
        console.log("username", username);
        handleRefresh();
      } else {
        handleRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetDate = () => {
    const timestamp: Date = new Date(updatedAt);
    const dateObject = timestamp.getDate();
    return dateObject;
  };

  const GetMonth = () => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const timestamp: Date = new Date(updatedAt);
    const dateObject = month[timestamp.getMonth()];
    return dateObject;
  };

  const GetYear = () => {
    if (profile_img_url) {
      return;
    } else {
      const timestamp: Date = new Date(updatedAt);
      const dateObject = timestamp.getFullYear();
      return dateObject;
    }
  };

  GetYear();

  const readingTime = calculateReadingTime(body);

  const unDownload: any = {
    pointerEvents: "none",
  };
  return (
    <>
      <article className=" mt-4 md:mt-6  sm:h-[246px] h-[145px]  border-b  ">
        <div className=" flex flex-col  ">
          <div className=" h-6 flex flex-row gap-1  text-sm font-[500]">
            {profile_img_url ? (
              <>
                {" "}
                <a href={`/user/${username}`}>
                  <img
                    src={profile_img_url}
                    alt="pic"
                    className=" rounded-full h-[24px] w-[24px]"
                  />
                </a>
                <div className="cursor-pointer break-all py-[2px]">
                  <a href={`/user/${username}`}>{username}</a>
                </div>
                <div className=" text-gray-400 py-[3px]  font-normal ">
                  &#8226;&nbsp;{GetMonth()}&nbsp;{GetDate()}
                </div>
              </>
            ) : (
              <>
                <strong>Published on</strong>
                <div className=" text-gray-400  font-normal ">
                  &#8226;&nbsp;{GetDate()}&nbsp;{GetMonth()}&#44;&nbsp;
                  {GetYear()}
                </div>
              </>
            )}
          </div>
          <div className=" mt-3 max-h-[210px] min-h-0 flex  ">
            <div className=" block w-full max-sm:min-w-0 cursor-pointer">
            <a href={`/blog/${_id}`}>

              <div className=" pb-2   ">
                <h2 className=" font-bold text-sm sm:text-xl line-clamp-2">
                  {title}
                </h2>
              </div>
              <div className=" max-[640px]:hidden sm:h-[72px]">
                <p className=" text-base font-normal font-serif line-clamp-3">
                  {subheading}
                </p>
              </div>
              <div className=" py-8 max-[640px]:py-2  h-auto cursor-default ">
                <div className=" flex flex-row gap-3 text-[13px] font-normal">
                  <div className=" hidden sm:flex border rounded-full bg-gray-200 py-[2px] px-2 text-center">
                    <span>{category_name}</span>
                  </div>
                  <div className="pt-1">
                    <span className="pt-1">{`${readingTime} min read`}</span>
                  </div>
                  <div className="hidden sm:flex">
                    <span className="pt-1">&#8226;</span>
                  </div>
                  <div className="hidden sm:flex pt-1">
                    <span>Selected for you</span>
                  </div>
                </div>
              </div>
            </a>
            </div>
            <div className="sm:ml-[24px] ">
              <div className=" h-[56px] w-[80px] sm:h-[112px]  sm:w-[114px]  ">
                <div
                  
                  className="bg-center cursor-pointer"
                >
                  <a href={`/blog/${_id}`} >
                  {cover_photo_url && (
                    <img
                      style={unDownload}
                      src={cover_photo_url}
                      alt="pic"
                      className=" h-[56px] w-[80px]  sm:h-[112px] sm:w-[114px]"
                    />
                  )}
                  </a>
                </div>
                {matched ? (
                  <div className=" mt-1 min-[640px]:mt-9 flex justify-center">
                    <button
                      className=" h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-100"
                      onClick={handleDelete}
                    >
                      <MdOutlineDeleteForever
                        title="Delete"
                        className=" h-5 w-5  fill-red-500  hover:fill-red-600"
                      />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default BlogFeed;
