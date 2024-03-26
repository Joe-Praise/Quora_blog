import React, { useImperativeHandle, useRef } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div className={`mb-3 ${props.isValid === false ? "invalid" : ""}`}>
      <label htmlFor={props.id} className={`form-label fw-bold.`}>{props.label}</label>
      <input
        placeholder={props.placeholder}
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={`form-control input-outline ${props.className}`}
      />
    </div>
  );
});

export default Input;
