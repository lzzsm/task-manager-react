import { ChevronLeftIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";

function TaskPage({ tasks }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const task = tasks.find((task) => task.id === id);

  const formattedDate = task?.expirationDate
    ? new Date(task.expirationDate + "T00:00:00").toLocaleDateString("pt-BR")
    : "Sem data";

  if (!task) {
    return (
      <div className="h-screen w-screen bg-slate-500 p-6 flex justify-center">
        <div className="space-y-6 w-125 flex flex-col items-center justify-center">
          <Title as="h2">Tarefa não encontrada.</Title>
          <Button
            onClick={() => navigate("/")}
            className="text-center w-50 flex justify-center items-center gap-2"
          >
            Voltar para o início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-125 mx-auto space-y-4">
        <div className="flex justify-center relative mb-6">
          <Button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100 bg-transparent"
          >
            <ChevronLeftIcon />
          </Button>
          <Title as="h2">Detalhes da Tarefa</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-md space-y-4">
          <h3 className="text-xl font-bold text-slate-600">{task.title}</h3>
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
