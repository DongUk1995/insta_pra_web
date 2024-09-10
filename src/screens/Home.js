import { isLoggedInvar } from "../apollo";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInvar(false)}>Log out now!</button>
    </div>
  );
}

export default Home;
