import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import User from "./containers/Users/User";

function App() {
  let routes = (
    <Fragment>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={User} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
  return routes;
}

export default App;
