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
    Checkbox,
    FormControlLabel
} from "@mui/material";
import NextLink from "next/link";
import api from "../utils/api";
import { useRouter } from "next/navigation";
import apiRoutes from "../utils/apiRoutes";

const LogInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required."),
});

async function login(values) {

    const res = await api.post(apiRoutes.login, values);

    if (res.status !== 200) {
        throw new Error("Failed to Login");
    }

    return res;
}

export default function Login() {

    const router = useRouter();

    return (
        <>
            <CssBaseline />
            <div className="flex min-h-screen items-center justify-center bg-white from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <Typography component="h1" variant="h3" sx={{ marginBottom: 4 }}>
                            Log in
                        </Typography>
                    </div>

                    <Formik
                        initialValues={{ email: "", password: "", rememberme: false }}
                        validationSchema={LogInSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await login(values);
                                router.push("/");
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

                                <div className="flex flex-row justify-between items-center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="rememberme" color="primary" />
                                        }
                                        label="Remember me"
                                    />

                                    <Link
                                        component={NextLink}
                                        href="/reset/enterEmail"
                                        sx={{ color: "var(--text-selected)", textDecoration: "none" }}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    className="!text-white !text-2xl"
                                >
                                    Log in
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <Divider>
                        <Typography className="text-gray-500">or</Typography>
                    </Divider>

                    <Typography className="text-center text-gray-600 dark:text-gray-400" sx={{ marginTop: 2 }}>
                        Don't have an account?{" "}
                        <Link component={NextLink} href="/register" sx={{ color: "var(--text-selected)", textDecoration: "none" }}>
                            Sign up
                        </Link>
                    </Typography>
                </div>
            </div>
        </>
    );
}
