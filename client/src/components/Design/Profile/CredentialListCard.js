import React from "react";

const CredentialListCard = (props) => {
  return (
    <li className="nav--links py-2 p-0 ">
      <span className="rounded-pill hoverLinks p-2 bg--dark--brown ">{props.children}</span>
      <span>
      {" "}{props.value}{" "}
      <span className="text-secondary">{props.period}</span>
      </span>
    </li>
  );
};

export default CredentialListCard;
