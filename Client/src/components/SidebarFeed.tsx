import React, { useState, useEffect } from "react";
import BlogFeed from "./BlogFeed";
import { ring2 } from "ldrs";
import Sidebar from "./Sidebar";

interface BlogProps {
  _id: string;
  title: string;
  authorId: {
    _id?: string;
    username?: string;
    profile_img_url?: string;
  };
}

interface BlogData {
  blogData: BlogProps[];
}

const SidebarFeed: React.FC<BlogData> = ({ blogData }) => {
  const [data, setData] = useState<BlogProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      
      const shuffledData = [...blogData];
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }

      
      const slicedData = shuffledData.slice(0, 3);
      setData(slicedData);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [blogData, setLoading]);

  ring2.register();

  return (
    <>
      <div id="feed" className="h-full pt-[26px] mx-4 ">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <l-ring-2
              size="28"
              stroke="3"
              stroke-length="0.25"
              bg-opacity="0.1"
              speed="0.8"
              color="black"
            ></l-ring-2>
          </div>
        ) : (
          <>
            {data.map((blog) => (
              <Sidebar
                key={blog._id}
                username={blog.authorId.username}
                profile_img_url={blog.authorId.profile_img_url}
                title={blog.title}
                _id={blog._id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SidebarFeed;
