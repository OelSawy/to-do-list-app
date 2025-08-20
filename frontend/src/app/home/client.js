"use client";

import * as React from "react";
import Head from "next/head";
import { useSidebar } from "../context/SideBarContext";
import { handlee } from "../fonts/font";
import TaskBox from "./components/taskBox";
import { useHome } from "../context/HomeContext";
import HomeLoading from "../components/HomeLoading";
import { useState, useEffect } from "react";
import EmptyTaskList from "./components/emptyTaskList";
import ProgressBar from "./components/progressBar";
import api from "../utils/api";
import apiRoutes from "../utils/apiRoutes";
import { Button } from "@mui/material";
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TaskList from "./components/taskList";

export default function HomeClient() {

    const { filter } = useSidebar();
    const { isLoading, setLoading, taskList, setTaskList } = useHome();

    const fetchTasks = async () => {
        await api.get(apiRoutes.getTasks)
            .then(response => {
                setLoading(true);
                setTaskList(response.data.tasks);
                calculateProgress();
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            });
    }

    const calculateProgress = () => {
        const completedTasks = taskList.filter(task => task.status === true).length;
        return Math.floor((completedTasks / taskList.length) * 100);
    }

    const calculateCompleted = () => {
        const completedTasks = taskList.filter(task => task.status === true).length;
        return completedTasks;
    }

    const markAllCompleted = async () => {
    }

    const deleteCompleted = async () => {
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Home page description" />
            </Head>
            {isLoading ? <HomeLoading /> :
                <>
                    <h1 className={`text-6xl font-bold text-black pl-10 pt-10 ${handlee.className}`}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h1>
                    <TaskBox fetchTasks={fetchTasks} />
                    {taskList.length === 0 ?
                        <EmptyTaskList /> :
                        <>
                            <ProgressBar progress={calculateProgress()} />
                            <div className="mx-25 mt-5 w-[74vw]  border-2 border-transparent rounded-lg flex flex-col justify-between">
                                <div className="flex space-x-4 mt-2 flex-row justify-between w-135 rounded-3xl">
                                    <div className="w-65 bg-transparent border-2 border-[var(--complete-all)] rounded-xl">
                                        <Button
                                            className="w-full h-full flex items-center justify-center"
                                            sx={{
                                                backgroundColor: "transparent",
                                                color: "var(--complete-all)",
                                            }}
                                        >
                                            <div className="flex flex-row w-full items-center justify-center space-x-2">
                                                <BeenhereOutlinedIcon />
                                                <span className="text-lg">Mark all completed</span>
                                            </div>
                                        </Button>
                                    </div>
                                    <div className="w-65 bg-transparent border-2 border-[var(--delete-all)] rounded-xl">
                                        <Button
                                            disabled={calculateCompleted() === 0}
                                            className="w-full h-full flex items-center justify-center"
                                            sx={{
                                                backgroundColor: "transparent",
                                                color: "var(--delete-all)",
                                            }}
                                        >
                                            <div className="flex flex-row w-full items-center justify-center space-x-2">
                                                <DeleteForeverOutlinedIcon />
                                                <span className="text-lg">Delete completed [{calculateCompleted()}]</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <TaskList filter={filter} fetchTasks={fetchTasks} />
                        </>
                    }
                </>
            }
        </>
    );
}