import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckBox from "@mui/material/Checkbox";
import TaskEditDialog from "./taskEditDialog"; // import new component
import api from "@/app/utils/api";
import apiRoutes from "@/app/utils/apiRoutes";
import { useHome } from "@/app/context/HomeContext";

export default function TaskItem({ task, fetchTasks }) {
  const { setLoading } = useHome();
  const [editOpen, setEditOpen] = useState(false);

  const handleToggle = async () => {
    await api.put(apiRoutes.toggleTaskStatus(task.id))
      .then(fetchTasks)
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDelete = async () => {
    await api.delete(apiRoutes.deleteTask(task.id))
      .then(fetchTasks)
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <>
      <div className="flex flex-row justify-between p-2 border-b border-gray-700 mb-6">
        <div className="flex flex-row">
          <CheckBox
            checked={task.status}
            onChange={async () => {
              setLoading(true);
              await handleToggle();
              setLoading(false);
            }}
          />
          <div className="flex flex-col ml-2 text-black">
            <h1 className={`mb-2 text-2xl ${task.status ? "line-through" : ""}`} style={{ textDecorationThickness: "2px" }}>
              {task.title}
            </h1>
            <p>{task.description}</p>
          </div>
        </div>
        <div>
          <IconButton onClick={() => setEditOpen(true)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <ClearOutlinedIcon />
          </IconButton>
        </div>
      </div>

      {/* Edit dialog */}
      <TaskEditDialog
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        task={task}
        fetchTasks={fetchTasks}
      />
    </>
  );
}
