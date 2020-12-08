import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import Webcam from "react-webcam";

const Dashboard = () => {
  return (
    <Layout>
      <Grid container justify="center">
        <Typography variant="h1">Welcome to HomeSec</Typography>
        <Typography variant="h4">You've been protected!</Typography>
      </Grid>
      <Grid container justify="center">
        <Paper style={{ padding: "0.5rem" }} elevation={10}>
          {/* <Webcam /> */}
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
