import React from "react";

const CreateOptionBtn = (props) => {
  return (
    <div
      className={`d-flex w-75 justify-content-center align-items-center createPost--btn p-0 py-1 rounded-pill cursor-pointer link--underline ${props.className}`}
      onClick={props.onClick}
    >
      <div className=" p-0 pe-1 m-0">{props.children}</div>
      <div>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

export default CreateOptionBtn;
