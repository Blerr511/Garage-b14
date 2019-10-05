import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { routes } from "./components/nav/Routes";
import AdminPage from "./components/Admin/Admin";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route
            render={() => (
              <div>
                <Nav></Nav>
                {routes.map(route => (
                  <Route
                    key={route.route}
                    exact
                    path={route.route}
                    component={route.component}
                  />
                ))}
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
