import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import Title from "../components/Title";

export default function HomePage({
  tasks,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete,
}) {
  const completed = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="min-h-screen w-screen bg-[#070d1a] flex justify-center p-6">
      <div className="w-full max-w-lg space-y-4">
        <div className="mb-6">
          <Title>Gerenciador de Tarefas</Title>
          {tasks.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              {completed} de {tasks.length} concluída
              {tasks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <AddTask onTaskAdd={onTaskAdd} />
        <Tasks
          tasks={tasks}
          onTaskToggle={onTaskToggle}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}
