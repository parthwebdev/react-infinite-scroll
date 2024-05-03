import React from "react";

interface Props {
  post: {
    id: number;
    title: string;
    body: string;
  };
  ref?: React.Ref<HTMLDivElement>;
}

const Post = React.forwardRef<HTMLDivElement, Props>(({ post }, ref) => {
  const { title, id } = post;

  return (
    <div className="post" ref={ref}>
      <p>Post {id}:</p>
      <h2>{title}</h2>
    </div>
  );
});

export default Post;
