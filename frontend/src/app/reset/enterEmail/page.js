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
    Typography
} from "@mui/material";
import NextLink from "next/link";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import apiRoutes from "@/app/utils/apiRoutes";

const ChangeEmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required.")
});

async function requestOtp(values) {

    const res = await api.post(apiRoutes.requestOtp, values);

    if (res.status !== 200) {
        throw new Error("Failed to Request OTP");
    }

    return res;
}

export default function EnterEmail() {

    const router = useRouter();

    return (
        <>
            <CssBaseline />
            <div className="flex min-h-screen items-center justify-center bg-white from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <Typography component="h1" variant="h3" sx={{ marginBottom: 4 }}>
                            Forgot Password
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            Enter your email address below and we'll send you a link to reset your password.
                        </Typography>
                    </div>

                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ChangeEmailSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await requestOtp(values);
                                sessionStorage.setItem("email", values.email);
                                router.push(`/reset/validateOtp`);
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

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    className="!text-white !text-xl"
                                >
                                    Send Verification Code
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
