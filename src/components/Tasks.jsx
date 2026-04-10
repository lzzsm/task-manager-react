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
      <div className="flex flex-col items-center justify-center gap-3 p-10 bg-[#0d1526] border border-indigo-500/20 rounded-md text-slate-600">
        <ClipboardList size={36} />
        <p className="text-sm">Nenhuma tarefa adicionada ainda.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 p-5 bg-[#0d1526] border border-indigo-500/20 rounded-md">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex gap-2 items-center p-2 rounded-md border border-transparent hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-150"
        >
          <Button
            onClick={() => onTaskToggle(task.id)}
            aria-label={
              task.isCompleted
                ? "Marcar como pendente"
                : "Marcar como concluída"
            }
            className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-indigo-400 hover:text-indigo-300"
          >
            {task.isCompleted ? (
              <SquareCheckBig size={18} />
            ) : (
              <Square size={18} />
            )}
          </Button>

          <span
            className={`flex-1 min-w-0 truncate text-sm ${
              task.isCompleted
                ? "line-through text-slate-600"
                : "text-slate-300"
            }`}
          >
            {task.title}
          </span>

          {confirmingId === task.id ? (
            <>
              <Button
                onClick={handleCancelDelete}
                className="text-xs px-3 border-slate-600/60 text-slate-400 hover:bg-slate-500/20 hover:border-slate-500 hover:text-slate-300"
                aria-label="Cancelar exclusão"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => handleConfirmDelete(task.id)}
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
                className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-slate-500 hover:text-slate-300"
              >
                <ChevronRightIcon size={18} />
              </Button>
              <Button
                onClick={() => handleDeleteClick(task.id)}
                aria-label={`Excluir tarefa ${task.title}`}
                className="border-transparent hover:border-transparent hover:bg-transparent p-1 text-slate-500 hover:text-red-400"
              >
                <TrashIcon size={18} />
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
