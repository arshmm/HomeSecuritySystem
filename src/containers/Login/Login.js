import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@material-ui/core";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log("clicked");
    props.history.push("/dashboard");
  };
  return (
    <Container maxWidth="sm" style={{ paddingTop: "10rem" }}>
      <Paper elevation={3}>
        <form onSubmit={onSubmit}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="Username"
              type="text"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              style={{ margin: "1rem" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            style={{ margin: "1rem 10rem", width: "50%" }}
            variant="outlined"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
