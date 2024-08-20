import { FormEvent, useState } from "react";
import "./Login.scss";
import { useLogin } from "../../hook/useLogin";
import SpinnerMini from "../../Util/SpinnerMini";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setemail] = useState("joam@gmail.com");
  const [password, setpassword] = useState("2003.2.6");
  const [error, seterror] = useState("");
  const { login, isLoading, errorApi } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      seterror("please fill in all fields");
      toast.error(error);
      return;
    }
    login({ email, password });
    if (errorApi) toast.error(errorApi.message);
  };

  return (
    <div className="Login">
      <div className="loginContainer">
        <div className="logo">
          <img
            src="https://the-wild-oasis-alamin.vercel.app/logo-light.png"
            alt=""
          />
          <h1>Login to your account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : "Log in"}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
