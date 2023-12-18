import React, { useState, useEffect } from "react";
import BlogFeed from "./BlogFeed";
import { ring2 } from "ldrs";
import { match } from "assert";

interface BlogProps {
  _id: string;
  title: string;
  body: string;
  subheading: string;
  cover_photo_url: string;
  category_name: string;
  updatedAt: Date;
  authorId: {
    _id?: string;
    username?: string;
    profile_img_url?: string;
  };
 
}

interface BlogData {
  blogData: BlogProps[];
  matched?: boolean;
}

const Feed: React.FC<BlogData> = ({ 
  blogData,
  matched

 }) => {
  const [data, setData] = useState<BlogProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try {
      
      const shuffledData = [...blogData];
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }

      setData(shuffledData);
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
      <div id="feed" className="h-full pt-[26px] mx-4 md:mx-6">
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
              <BlogFeed
                key={blog._id}
                username={blog.authorId.username}
                profile_img_url={blog.authorId.profile_img_url}
                title={blog.title}
                _id={blog._id}
                category_name={blog.category_name}
                body={blog.body}
                subheading={blog.subheading}
                cover_photo_url={blog.cover_photo_url}
                updatedAt={blog.updatedAt}
                matched={matched}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Feed;
