import React from "react";
import ReactDom from "react-dom";
import { GrFormClose } from "react-icons/gr";
import Card from "../../UI/Card";
// import Button from "../../UI/Button";

const SignUpModal = (props) => {
  const Backdrop = () => {
    return <div className="back--drop"></div>;
  };

  const Modal = () => {
    return (
      <Card className="modal-things border-radius10">
        <GrFormClose onClick={props.onClose} className="text-left icon" />
        {props.children}

        {/* <div className="border-top text-align--right p-2 position-absolute bottom-0 start-0 end-0">
          <Button
            onClick={props.onNext}
            className="btn btn-primary rounded-pill btn-color"
          >
            {props.value}
          </Button>
        </div> */}
      </Card>
    );
  };
  return (
    <React.Fragment>
        {ReactDom.createPortal(<Backdrop/>, document.getElementById("backdrop--overlay"))}
        {ReactDom.createPortal(<Modal/>, document.getElementById("backdrop--overlay"))}
    </React.Fragment>
  );
};

export default SignUpModal;
