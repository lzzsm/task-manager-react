import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import TaskPage from "./pages/TaskPage";

function HomePage() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function onDeleteTaskClick(taskId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  }

  function onTaskAddSubmit(title, description, expirationDate) {
    setTasks([
      ...tasks,
      { id: v4(), title, description, expirationDate, isCompleted: false },
    ]);
  }

  return (
    <div className="h-screen w-screen bg-slate-500 flex justify-center p-6">
      <div className="w-125 space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onTaskAddSubmit={onTaskAddSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
