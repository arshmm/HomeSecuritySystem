import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";

function App() {
  let routes = (
    <Fragment>
      <Route path="/" exact component={Login} />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
  return routes;
}

export default App;
