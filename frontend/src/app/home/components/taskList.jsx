import { useHome } from "@/app/context/HomeContext";
import TaskItem from "./taskItem";
import { useEffect } from "react";

export default function TaskList({ filter, fetchTasks }) {

    const { taskList } = useHome();

    return (
        <div className="mx-25 mt-10 w-[74vw] p-5 flex flex-col justify-between">
            {filter === "all" ? (
                taskList.map(task => (
                    <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
                ))
            ) : (
                taskList.filter(task => task.label === filter).map(task => (
                    <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
                ))
            )}
        </div>
    );
}