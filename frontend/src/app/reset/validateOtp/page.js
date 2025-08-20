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

const ValidateOtpSchema = Yup.object().shape({
    otp: Yup.string().min(6).required("OTP is required.")
});

async function validateOtp(values) {

    const email = sessionStorage.getItem("email");

    const res = await api.post(apiRoutes.validateOtp, { email, ...values });

    if (res.status !== 200) {
        throw new Error("Failed to Validate OTP");
    }

    return res;
}

export default function ValidateOtp() {

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
                            Enter the OTP we sent to your email.
                        </Typography>
                    </div>

                    <Formik
                        initialValues={{ otp: "" }}
                        validationSchema={ValidateOtpSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await validateOtp(values);
                                router.push(`/reset/changePassword`);
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
                                        name="otp"
                                        id="otp"
                                        placeholder="OTP"
                                        value={values.otp}
                                        onChange={handleChange}
                                        error={touched.otp && Boolean(errors.otp)}
                                        helperText={touched.otp && errors.otp}
                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    className="!text-white !text-xl"
                                >
                                    Verify
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
