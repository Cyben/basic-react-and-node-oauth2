import './App.css';
import { Login } from "./components/Login"
import { OauthCB } from "./components/OauthCB"
import { Logout } from "./components/Logout"
import { ProtectedAPICall } from "./components/ProtectedAPICall"
import { PublicAPICall } from "./components/PublicAPICall"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/login"
          rel="noopener noreferrer"
        >
          <h2 style={{ color: "lightgreen" }}>Log In</h2>
        </a>

        <a
          className="App-link"
          href="/public-api-call"
          rel="noopener noreferrer"
        >
          <h4 style={{ color: "white" }}>Public api</h4>
        </a>

        <a
          className="App-link"
          href="/protected-api-call"
          rel="noopener noreferrer"
        >
          <h4 style={{ color: "white" }}>Protected api</h4>
        </a>

        <a
          className="App-link"
          href="/logout"
          rel="noopener noreferrer"
        >
          <h2 style={{ color: "red" }}>Log Out</h2>
        </a>

        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/oauth-callback">
              <OauthCB />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/protected-api-call">
              <ProtectedAPICall />
            </Route>
            <Route path="/public-api-call">
              <PublicAPICall />
            </Route>
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
