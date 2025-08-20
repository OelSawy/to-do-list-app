import CheckBox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import api from "@/app/utils/api";
import apiRoutes from "@/app/utils/apiRoutes";
import { useHome } from "@/app/context/HomeContext";

export default function TaskItem({ task, fetchTasks }) {

    const { setLoading } = useHome();

    const handleToggle = async () => {
        await api.post(apiRoutes.toggleTaskStatus(task.id))
            .then(response => {
                fetchTasks();
            })
            .catch(error => {
                console.error("Error updating task:", error);
            });
    }

    return (
        <div className="flex flex-row justify-between p-2 border-b border-gray-700 mb-6">
            <div className="flex flex-row">
                <CheckBox
                    checked={task.status}
                    onChange={async () => {
                        setLoading(true);
                        await handleToggle(task.id);
                        setLoading(false);
                    }}
                />
                <div className="flex flex-col ml-2 text-black">
                    <h1 className={`mb-2 text-2xl ${task.status ? "line-through" : ""}`} style={{ textDecorationThickness: "2px" }}>{task.title}</h1>
                    <p>{task.description ? task.description : null}</p>
                </div>
            </div>
            <div>
                <IconButton>
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton>
                    <ClearOutlinedIcon />
                </IconButton>
            </div>
        </div>
    );
}
