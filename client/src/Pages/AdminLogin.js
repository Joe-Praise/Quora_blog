import LoginForm from "../components/Design/Login/LoginForm";
import Card from "../components/UI/Card";

function AdminLogin() {
  return (
    <div className="login-page--bgImg">
      <Card className="modal-things adminLoginModalTweak">
        <h1 className="fs-2">Admin Login</h1>
        <p className="text-center text-primary"><span className="fw-bold">Note:</span> if you're not an admin <span className="d-block">Leave now! or risk exposing your IP Address. LOL!😈</span></p>
        <LoginForm use={"admin"} legend="fs-4" className="w-75 mx-auto"/>
      </Card>
    </div>
  );
}

export default AdminLogin;
