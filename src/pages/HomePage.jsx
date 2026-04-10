import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import Title from "../components/Title";

export default function HomePage({
  tasks,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete,
}) {
  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center p-6">
      <div className="w-125 space-y-4">
        <Title>Gerenciador de Tarefas</Title>
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
