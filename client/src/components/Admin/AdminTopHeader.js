import { IoNotificationsOutline } from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import NavItem from "../UI/NavItem";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import Logo from "../UI/Logo";

const AdminTopHeader = (props) => {
  const data = useRouteLoaderData("adminProfile");
  const adminUserInfo = data[0];
  return (
    <div className={`adminTopContainer py-1 px-4 ${props.className}`}>
      <div className="flex-basis--30 navSearch-container">
        <form>
          <input
            placeholder="Search Item"
            type="search"
            id="searchBar"
            // value={result}
            // onChange={searchHandler}
            className="form-control input-outline"
          />
        </form>
      </div>

      <ul className="d-flex  align-items-center m-0 p-0 notifications nav--links">
      <div className="hamburger-container" onClick={props.revealMenu}>
        <FaHamburger className="hamburger"/>
      </div>
      <NavLink to="/admin">
        <Logo
          width="100px"
          height="60px"
          className="p-0 color--white d-block d-lg-none pt-0"
          fill="#b92b27"
        />
      </NavLink>
        <NavItem className="nav--links hoverLinks navLinksWidth position-relative flex-basis--10 d-none d-lg-block">
          <BsChatLeftDots className="icons" />
          <span className="badge rounded-pill bg-danger Link--absolute xsmall-font">
            9<span className="visually-hidden">unread messages</span>
          </span>
        </NavItem>
        <NavItem className="nav--links hoverLinks navLinksWidth position-relative flex-basis--10 me-2 d-none d-lg-block">
          <IoNotificationsOutline className="icons" />
          <span className="badge rounded-pill bg-danger Link--absolute xsmall-font">
            9<span className="visually-hidden">unread messages</span>
          </span>
        </NavItem>
        <NavLink className="nav--links UserPng" to="profile">
          <figure className="me-lg-2 pt-1 me-1 img-fluid">
            <img
              src={process.env.REACT_APP_API_URL+`/uploads/${adminUserInfo.image}`}
              className="img--nav"
              alt="user AVI"
            />
          </figure>
        </NavLink>
        <NavLink className="nav--links mx-2 mx-lg-0 link--underline text-dark  flex-basis--10 d-none d-lg-block" to="profile">
          <p className="text--overflow fw-bold username-size-tiny ">{adminUserInfo.name}</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminTopHeader;
