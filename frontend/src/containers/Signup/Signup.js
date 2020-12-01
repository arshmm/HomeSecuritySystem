import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@material-ui/core";
import { signup } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import useRequest from "../../utils/request";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useRequest();
  useEffect(() => {
    if (token) {
      props.history.push("/dashboard");
    }
    return () => {
      //
    };
  }, [token]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(name, email, password));
  };
  return (
    <Container maxWidth="sm" style={{ paddingTop: "10rem" }}>
      <Paper elevation={3}>
        <form onSubmit={onSubmit}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="Name"
              type="text"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="email"
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
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
