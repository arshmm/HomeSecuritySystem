import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Detections from "./containers/Detections/Detections";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import User from "./containers/Users/User";

function App() {
  const token = useSelector((state) => state.auth.token);
  let routes = (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        {token && (
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={User} />
            <Route path="/detections" component={Detections} />
            <Redirect to="/" />
          </Switch>
        )}
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
  return routes;
}

export default App;
