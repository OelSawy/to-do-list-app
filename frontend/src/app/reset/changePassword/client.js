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
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import apiRoutes from "@/app/utils/apiRoutes";
import Loading from "@/app/components/Loading";

const ChangePasswordSchema = Yup.object().shape({
    new_password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required."),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Confirm Password is required."),
});

async function changePassword(values) {

    const email = sessionStorage.getItem("email");

    const data = {
        email,
        ...values
    }

    const res = await api.post(apiRoutes.changePassword, data);

    if (res.status !== 200) {
        throw new Error("Failed to Change Password");
    }

    return res;
}

export default function ChangePasswordClient() {

    const router = useRouter();
    const [isLoading, setLoading] = React.useState(false);

    return (
        <>
            <CssBaseline />
            {isLoading ? <Loading /> : <div className="flex min-h-screen items-center justify-center bg-white from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <Typography component="h1" variant="h3" sx={{ marginBottom: 4 }}>
                            Reset Password
                        </Typography>
                    </div>

                    <Formik
                        initialValues={{ new_password: "", confirm_password: "" }}
                        validationSchema={ChangePasswordSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                setLoading(true);
                                await changePassword(values);
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
                                        name="new_password"
                                        id="new_password"
                                        type="password"
                                        placeholder="Password"
                                        value={values.new_password}
                                        onChange={handleChange}
                                        error={touched.new_password && Boolean(errors.new_password)}
                                        helperText={touched.new_password && errors.new_password}
                                    />
                                </FormControl>

                                <FormControl fullWidth className="!mb-8">
                                    <TextField
                                        name="confirm_password"
                                        id="confirm_password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        error={touched.confirm_password && Boolean(errors.confirm_password)}
                                        helperText={touched.confirm_password && errors.confirm_password}
                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    className="!text-white !text-2xl"
                                >
                                    Change Password
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>}
        </>
    );
}
