import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import registerPage from "./components/pages/register";
import loginPage from "./components/pages/login";
import toDoPage from "./components/pages/todo";
import Header from "./components/siteHeader";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <GuestRoute path="/register" component={registerPage} />
          <ProtectedRoute path="/create" component={toDoPage} />
          <GuestRoute path="/" component={loginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
