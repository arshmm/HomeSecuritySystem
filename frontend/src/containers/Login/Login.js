import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginData = useSelector((state) => state.login);
  const { loading, user, error } = loginData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      props.history.push("/dashboard");
    }
    return () => {
      //cleanup
    };
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
              onChange={(e) => setEmail(e.target.value)}
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
        <p style={{ margin: "1rem 18rem" }}>OR</p>
        <Button
          style={{ margin: "1rem 10rem", width: "50%" }}
          variant="outlined"
          color="primary"
          onClick={() => {
            props.history.push("/signup");
          }}
        >
          SignUp
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
