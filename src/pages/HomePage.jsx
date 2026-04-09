import { useEffect, useState } from "react";
import { v4 } from "uuid";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import Title from "../components/Title";

export default function HomePage() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskToggle(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function onTaskDelete(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function onTaskAdd(title, description, expirationDate) {
    setTasks((prev) => [
      ...prev,
      { id: v4(), title, description, expirationDate, isCompleted: false },
    ]);
  }

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
