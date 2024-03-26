import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An Error Occured!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
      <div className="error_msg">
        <h1>{title}</h1>
        <p>{message}</p>
        <p>
          Go to <Link to="/">the Home page</Link>
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
