import React from "react";

const AutoSignIn = (props) => {
  return (
    <div
      className="d-flex border border-1 
    m-2 p-2 d-flex align-items-center rounded cursor-pointer sign-up-text"
    >
      {props.svg}
      <span className="ps-2">{props.text}</span>
    </div>
  );
};

export default AutoSignIn;
