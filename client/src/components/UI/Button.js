import React from "react";

const Button = (props) => {
  return (
    <button type={props.type || "button"} onClick={props.onClick} className={props.className} disabled={props.disable}>
      {props.children}
    </button>
  );
};

export default Button;
