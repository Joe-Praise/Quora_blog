import { Link } from "react-router-dom";

const Interest = (props) => {
  return (
    <Link to={`/space/${props.value}`} className="row align-items-center interest--hover py-2 rounded cursor-pointer link--underline d-flex">
      <div className="col-auto pe-0">
        <img
          src={props.src}
          className={`img-fluid position-relative ${props.className}`}
          alt={props.alt}
        ></img>
        <span className={`position-absolute top-1 start-80 translate-middle p-1 bg-danger border border-light rounded-circle`}>
          <span className="visually-hidden">New alerts</span>
        </span>
      </div>
      <p className="col m-0 font-tiny text-secondary text-truncate">{props.value}</p>
    </Link>
  );
};

export default Interest;
