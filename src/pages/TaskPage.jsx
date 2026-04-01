import { ChevronLeftIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";

function TaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((task) => task.id === id);

  const formattedDate = task?.expirationDate
    ? new Date(task.expirationDate + "T00:00:00").toLocaleDateString("pt-BR")
    : "Sem data";

  if (!task) {
    return (
      <div className="h-screen w-screen bg-slate-500 p-6 flex justify-center">
        <div className="space-y-6 w-125 flex flex-col items-center justify-center">
          <Title>Tarefa não encontrada.</Title>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-400 text-center w-50% flex justify-center items-center gap-2 text-white p-2 rounded-md"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-125 mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Detalhes da Tarefa</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md space-y-4">
          <h2 className="text-xl font-bold text-slate-600">{task.title}</h2>
          <p className="text-slate-600">
            <b>Data de Expiração:</b> {formattedDate}
          </p>
          <p className="text-slate-600">{task.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
