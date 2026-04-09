import {
  ChevronRightIcon,
  Square,
  SquareCheckBig,
  TrashIcon,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskToggle, onTaskDelete }) {
  const navigate = useNavigate();
  const [confirmingId, setConfirmingId] = useState(null);

  function handleDeleteClick(taskId) {
    setConfirmingId(taskId);
  }

  function handleConfirmDelete(taskId) {
    onTaskDelete(taskId);
    setConfirmingId(null);
  }

  function handleCancelDelete() {
    setConfirmingId(null);
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-200 rounded-md shadow text-slate-400">
        <ClipboardList size={40} />
        <p className="text-sm">Nenhuma tarefa adicionada ainda.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <Button
            onClick={() => onTaskToggle(task.id)}
            aria-label={
              task.isCompleted
                ? "Marcar como pendente"
                : "Marcar como concluída"
            }
          >
            {task.isCompleted ? <SquareCheckBig /> : <Square />}
          </Button>
          <span
            className={`bg-slate-400 text-left flex-1 min-w-0 truncate text-white p-2 rounded-md ${task.isCompleted ? "line-through" : ""}`}
          >
            {task.title}
          </span>

          {confirmingId === task.id ? (
            <>
              <Button
                onClick={handleCancelDelete}
                className="bg-slate-400 text-white text-xs px-3 font-medium"
                aria-label="Cancelar exclusão"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleConfirmDelete(task.id)}
                className="bg-red-500 text-white text-xs px-3 font-medium"
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
              >
                <ChevronRightIcon />
              </Button>
              <Button
                onClick={() => handleDeleteClick(task.id)}
                aria-label={`Excluir tarefa ${task.title}`}
              >
                <TrashIcon />
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
