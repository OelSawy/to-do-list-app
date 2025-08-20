"use client";

import { useState } from "react";
import {
    Divider,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import api from "@/app/utils/api";
import apiRoutes from "@/app/utils/apiRoutes";
import { useHome } from "@/app/context/HomeContext";

// Validation Schema
const validationSchema = Yup.object({
    title: Yup.string().required("Task title is required"),
    description: Yup.string().required("Task description is required"),
    dueDate: Yup.date().required("Due date is required"),
    label: Yup.string().required("Label is required"),
});

export default function TaskBox({ fetchTasks }) {
    const [dateOpen, setDateOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            dueDate: "",
            label: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const dueDate = new Date(values.dueDate).toISOString();
            delete values.dueDate;
            const payload = {
                ...values,
                dueDate,
            };
            try {
                await api.post(apiRoutes.addTask, payload);
                await fetchTasks();
            } catch (error) {
                console.error("Error creating task:", error);
            }
        },
    });


    const { setLoading } = useHome();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={async () => {
                setLoading(true);
                await formik.handleSubmit();
                setLoading(false);
            }}>
                <div className="mx-25 mt-10 w-[74vw] h-[30vh] border-2 border-black rounded-lg p-5 flex flex-col justify-between">
                    <div className="flex items-center space-x-2">
                        <TextField
                            fullWidth
                            name="title"
                            label="Add new task"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    background: "transparent",
                                    border: "none",
                                },
                                "& .MuiInputBase-input": {
                                    paddingLeft: "12px",
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "1.5rem",
                                    paddingLeft: "12px",
                                },
                            }}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            className="h-full flex items-center justify-center gap-2"
                        >
                            <AddIcon fontSize="large" />
                            <span className="text-3xl">Add</span>
                        </Button>

                    </div>

                    <Divider className="my-4" />

                    <TextField
                        fullWidth
                        name="description"
                        label="Add task description"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        sx={{
                            "& .MuiInputBase-root": {
                                background: "transparent",
                                border: "none",
                            },
                            "& .MuiInputBase-input": {
                                paddingLeft: "12px",
                            },
                            "& .MuiInputLabel-root": {
                                fontSize: "1.2rem",
                                paddingLeft: "12px",
                            },
                        }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <div className="flex space-x-4 mt-2 flex-row justify-between w-85 rounded-3xl">
                        <div className="w-40">
                            <DatePicker
                                label="Due Date"
                                value={formik.values.dueDate || null}
                                onChange={(newValue) => {
                                    formik.setFieldValue("dueDate", newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        variant: "outlined",
                                        helperText: "",
                                        FormHelperTextProps: { sx: { display: "none" } },
                                    },
                                }}
                            />

                        </div>
                        <div className="w-40">
                            <FormControl>
                                <Select
                                    displayEmpty
                                    className="w-40"
                                    name="label"
                                    value={formik.values.label}
                                    onChange={formik.handleChange}
                                    error={formik.touched.label && Boolean(formik.errors.label)}
                                >
                                    <MenuItem value="" disabled>
                                        <div className="h-full flex items-center justify-evenly gap-2 w-full">
                                            <LabelOutlinedIcon fontSize="small" />
                                            <span className="text-xl">Label</span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem value="important">Important</MenuItem>
                                    <MenuItem value="work">Work</MenuItem>
                                    <MenuItem value="personal">Personal</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <Dialog open={dateOpen} onClose={() => setDateOpen(false)}>
                    <DialogTitle>Select Due Date</DialogTitle>
                    <DialogContent>
                        <TextField
                            type="datetime-local"
                            fullWidth
                            name="dueDate"
                            value={formik.values.dueDate}
                            onChange={formik.handleChange}
                            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                            helperText={formik.touched.dueDate && formik.errors.dueDate}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDateOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </LocalizationProvider>
    );
}
