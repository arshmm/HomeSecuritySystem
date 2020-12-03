import React, { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/actions";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Password should be 6 characters and should contain at least have a capital, a small alphabet, a number and a special character (any of !$#%@)"
    )
    .required("Password is required"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { token } = auth;
  useEffect(() => {
    if (token) {
      props.history.push("/dashboard");
    }
    return () => {
      //cleanup
    };
  }, [token]);
  const onSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Container maxWidth="sm" style={{ paddingTop: "10rem" }}>
      <Paper elevation={3}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="Username"
              type="text"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
