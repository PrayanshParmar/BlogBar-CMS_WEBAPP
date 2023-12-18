import React, { useState, useEffect } from "react";

import Comment from "./Comment";

interface CommentFeedProps {
  id: String;
  body: String;
  updatedAt: Date;
  authorId: {
    _id: string;
    username: string;
    profile_img_url: string;
  };

}

interface CommentDataProps {
  commentData: CommentFeedProps[];
}

const CommentFeed: React.FC<CommentDataProps> = ({ commentData }) => {
  const [data, setData] = useState<CommentFeedProps[]>([]);

  useEffect(() => {
    try {
      setData(commentData);
    } catch (error) {}
  }, [commentData]);

  const reversedData = [...data].reverse();
  return (
    <>
      <div id="comment-feed" className=" pt-4 px-6 ">
        {/* <Comment/> */}
        <>
          {reversedData.map((comment, index) => (
            <Comment
              key={index}
              username={comment.authorId.username}
              profile_img_url={comment.authorId.profile_img_url}
              id={comment.id}
              body={comment.body}
              updatedAt={comment.updatedAt}
            />
          ))}
        </>
      </div>
    </>
  );
};

export default CommentFeed;
