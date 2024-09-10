import { isLoggedInvar } from "../apollo";

function Login() {
  return (
    <div>
      <h1>LogIn</h1>
      <button onClick={() => isLoggedInvar(true)}>Log in now!</button>
    </div>
  );
}

export default Login;
