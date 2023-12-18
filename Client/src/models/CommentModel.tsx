"use client";
import useCommentModel from "../hooks/useCommentModel";
import React, { useState, useCallback } from "react";

import CModel from "../components/CModel";

interface BlogIdProp{
    BlogId: String
    profile_img_url: string,
    username: string,
}

const CommentModel: React.FC<BlogIdProp> = (
  {
    BlogId,
    profile_img_url,
    username
  }) => {
  const commentModel = useCommentModel();
  const [isLoding, setIsLoding] = useState(false);

  const onToogle = useCallback(() => {
    if (isLoding) {
      return;
    }
    commentModel.onClose();
    
  }, [commentModel, , isLoding]);

  const onSumit = useCallback(async () => {
    try {
      setIsLoding(true);
      commentModel.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding(false);
    }
  }, [commentModel]);




  return (
    <CModel
      BlogId={BlogId}
      disabled={isLoding}
      isOpen={commentModel.isOpen}
      title="Comments"
      onClose={commentModel.onClose}
   
      
    />
  );
};

export default CommentModel;
