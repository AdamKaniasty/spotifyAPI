import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx"
import Login from "./components/Login/Login.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import PlaylistPage from "./components/PlaylistPage/Page.jsx"
function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path="/dashboard/:id">
          <PlaylistPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/user">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        </Switch>
    </Router>
  );
}

export default App;
