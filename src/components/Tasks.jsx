import {
  ChevronRightIcon,
  Square,
  SquareCheckBig,
  TrashIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    navigate(`/task/${task.id}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <Button onClick={() => onTaskClick(task.id)}>
            {task.isCompleted ? <SquareCheckBig /> : <Square />}
          </Button>
          <span
            className={`bg-slate-400 text-left w-full flex items-center text-white p-2 rounded-md ${task.isCompleted ? "line-through" : ""}`}
          >
            {task.title}
          </span>
          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>
          <Button onClick={() => onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
