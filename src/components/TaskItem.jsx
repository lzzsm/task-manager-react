import {
  ChevronRightIcon,
  Square,
  SquareCheckBig,
  TrashIcon,
  PencilIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ExpirationBadge from "./ExpirationBadge";
import TaskEditForm from "./TaskEditForm";
import { useTasksContext } from "../hooks/useTasksContext";

export default function TaskItem({ task }) {
  const { onTaskToggle, onTaskDelete, onTaskEdit } = useTasksContext();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditSave(title, description, date) {
    onTaskEdit(task.id, title, description, date);
    setIsEditing(false);
  }

  function handleEditStart() {
    setIsConfirming(false);
    setIsEditing(true);
  }

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onSave={handleEditSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex gap-2 items-center p-2">
      <Button
        onClick={() => onTaskToggle(task.id)}
        aria-label={
          task.isCompleted ? "Marcar como pendente" : "Marcar como concluída"
        }
        className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-indigo-400 hover:text-indigo-300 shrink-0"
      >
        {task.isCompleted ? <SquareCheckBig size={18} /> : <Square size={18} />}
      </Button>

      <div className="flex-1 min-w-0 flex items-center gap-2">
        <span
          className={`truncate text-sm ${
            task.isCompleted ? "line-through text-slate-600" : "text-slate-300"
          }`}
        >
          {task.title}
        </span>
        <ExpirationBadge
          expirationDate={task.expirationDate}
          isCompleted={task.isCompleted}
        />
      </div>

      {isConfirming ? (
        <>
          <Button
            onClick={() => setIsConfirming(false)}
            className="text-xs px-3 border-slate-600/60 text-slate-400 hover:bg-slate-500/20 hover:border-slate-500 hover:text-slate-300"
            aria-label="Cancelar exclusão"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => onTaskDelete(task.id)}
            className="text-xs px-3 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 hover:text-red-300"
            aria-label="Confirmar exclusão"
          >
            Excluir
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => navigate(`/task/${task.id}`)}
            aria-label={`Ver detalhes de ${task.title}`}
            className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-slate-500 hover:text-slate-300 shrink-0"
          >
            <ChevronRightIcon size={18} />
          </Button>
          <Button
            onClick={handleEditStart}
            aria-label={`Editar tarefa ${task.title}`}
            className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-slate-500 hover:text-indigo-400 shrink-0"
          >
            <PencilIcon size={15} />
          </Button>
          <Button
            onClick={() => setIsConfirming(true)}
            aria-label={`Excluir tarefa ${task.title}`}
            className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-slate-500 hover:text-red-400 shrink-0"
          >
            <TrashIcon size={18} />
          </Button>
        </>
      )}
    </div>
  );
}
