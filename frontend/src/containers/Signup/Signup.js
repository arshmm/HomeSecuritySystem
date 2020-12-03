import React, { useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
} from "@material-ui/core";
import { signup } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
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
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { token } = auth;
  useEffect(() => {
    if (token) {
      props.history.push("/dashboard");
    }
    return () => {
      //
    };
  }, [token]);
  const onSubmit = (values) => {
    dispatch(signup(values.name, values.email, values.password));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
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
              label="Name"
              type="text"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              style={{ margin: "1rem" }}
              label="email"
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
              label="Password"
              type="password"
              variant="outlined"
              style={{ margin: "1rem" }}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <TextField
              label="Re Password"
              type="password"
              variant="outlined"
              style={{ margin: "1rem" }}
              name="passwordConfirmation"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.passwordConfirmation &&
                Boolean(formik.errors.passwordConfirmation)
              }
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
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
