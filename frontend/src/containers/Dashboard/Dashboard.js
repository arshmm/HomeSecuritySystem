import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <Typography variant="h1">Welcome to HomeSec</Typography>
        <Typography variant="h4">You've been protected!</Typography>
      </div>
    </Layout>
  );
};

export default Dashboard;
