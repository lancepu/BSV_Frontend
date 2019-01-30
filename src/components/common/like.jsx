import React from "react";

// Input: liked: boolean
// Output: onClick

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={classes}
    />
  );
};

export default Like;
