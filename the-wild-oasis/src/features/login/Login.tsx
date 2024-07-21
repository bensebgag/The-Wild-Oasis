import "./Login.scss";
function Login() {
  return (
    <main className="Login">
      <div className="loginContainer">
        <div className="logo">
          <img
            src="https://the-wild-oasis-alamin.vercel.app/logo-light.png"
            alt=""
          />
          <h1>Login to your account</h1>
        </div>
        <form>
          <label>Email address</label>
          <input type="email" />
          <label>password</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
