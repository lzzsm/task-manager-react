import { useEffect, useState } from "react";
import { v4 } from "uuid";

export function useTasks() {
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

  return { tasks, onTaskAdd, onTaskToggle, onTaskDelete };
}
