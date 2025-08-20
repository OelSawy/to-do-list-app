"use client";

import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  CssBaseline,
  Divider,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import api from "../utils/api";
import { useRouter } from "next/navigation";
import apiRoutes from "../utils/apiRoutes";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  email: Yup.string().email("Invalid email address").required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
});

async function register(values) {
  delete values.confirmPassword;

  const res = await api.post(apiRoutes.register, values);

  if (res.status !== 200) {
    throw new Error("Failed to register");
  }

  return res;
}

export default function SignUp() {

  const router = useRouter();

  return (
    <>
      <CssBaseline />
      <div className="flex min-h-screen items-center justify-center bg-white from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <Typography component="h1" variant="h3" sx={{ marginBottom: 4 }}>
              Sign up
            </Typography>
          </div>

          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await register(values);
                router.push("/login");
              } catch (err) {
                console.error(err);
              }
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, isSubmitting, handleChange }) => (
              <Form className="space-y-4 w-full">
                <FormControl fullWidth className="!mb-8">
                  <TextField
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </FormControl>

                <FormControl fullWidth className="!mb-8">
                  <TextField
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </FormControl>

                <FormControl fullWidth className="!mb-8">
                  <TextField
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </FormControl>

                <FormControl fullWidth className="!mb-8">
                  <TextField
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </FormControl>

                <FormControl fullWidth className="!mb-8">
                  <TextField
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  className="!text-white !text-2xl"
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>

          <Divider>
            <Typography className="text-gray-500">or</Typography>
          </Divider>

          <Typography className="text-center text-gray-600 dark:text-gray-400" sx={{ marginTop: 2 }}>
            Already have an account?{" "}
            <Link component={NextLink} href="/login" sx={{ color: "var(--text-selected)", textDecoration: "none" }}>
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
