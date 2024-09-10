import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInvar } from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInvar);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <NotFound />
      </Switch>
    </Router>
  );
}
export default App;
