import { logUserOut } from "../apollo";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
}

export default Home;
