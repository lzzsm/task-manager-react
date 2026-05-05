import { ChevronLeftIcon, CalendarIcon, AlignLeftIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { useTasks } from "../hooks/useTasks";

export default function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks } = useTasks();

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return (
      <div className="min-h-screen w-screen bg-[#070d1a] p-6 flex justify-center">
        <div className="space-y-6 w-full max-w-lg flex flex-col items-center justify-center">
          <Title as="h2">Tarefa não encontrada.</Title>
          <Button
            onClick={() => navigate("/")}
            className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20"
          >
            Voltar para o início
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = task.expirationDate
    ? new Date(task.expirationDate + "T00:00:00").toLocaleDateString("pt-BR")
    : "Sem data";

  return (
    <div className="min-h-screen w-screen bg-[#070d1a] p-6">
      <div className="w-full max-w-lg mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="border-transparent hover:border-transparent hover:bg-indigo-500/10 p-1 text-slate-400 hover:text-white"
          >
            <ChevronLeftIcon size={20} />
          </Button>
          <Title as="h2">Detalhes da tarefa</Title>
        </div>

        <div className="bg-[#0d1526] border border-indigo-500/20 rounded-md p-5 space-y-5">
          <div>
            <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest mb-1">
              Título
            </p>
            <h3
              className={`text-lg font-semibold ${task.isCompleted ? "line-through text-slate-500" : "text-white"}`}
            >
              {task.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <CalendarIcon size={14} className="text-indigo-400" />
            <span>{formattedDate}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlignLeftIcon size={14} className="text-indigo-400" />
              <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest">
                Descrição
              </p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {task.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
