import React from "react";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
const LikeAndUnlikeBtn = (props) => {
  return (
    <div className="rounded-pill d-flex justify-content-center align-items-baseline border w-auto  like--bg cursor-pointer me-2">
      <span className="border-end border-1 p-auto d-block pe-1 createPost--btn--left px-1 py-1 px-lg-2 py-lg-2" onClick={props.onLike}>
        <RxThickArrowUp className="post--icon" />
        {props.like}
      </span>
      <span className="border-end-0 border-1 p-auto createPost--btn--right px-1 py-1 px-lg-2 py-lg-2" onClick={props.onUnlike}>
        <RxThickArrowDown className="post--icon createPost--btn" />
        {props.dislike}
      </span>
    </div>
  );
};

export default LikeAndUnlikeBtn;
