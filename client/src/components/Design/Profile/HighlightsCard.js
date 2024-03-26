import React from "react";
import { Link } from "react-router-dom";

const HighlightsCard = (props) => {
  return (
    <li
      className="d-flex justify-content-between py-2"
    >
      <div className="d-flex">
        <img
          className="img-fluid img--profile--thumbnail"
          src={props.src}
          alt="default png"
        />
        <div className="ps-2 ps-lg-3">
          <Link className="fw-bold fs-6 link text-dark">{props.title}</Link>
          <div className="text-secondary font-tiny">
            {props.position} · {props.item}
          </div>
        </div>
      </div>
    </li>
  );
};

export default HighlightsCard;
