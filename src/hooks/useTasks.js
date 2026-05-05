import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { STORAGE_KEY } from "../constants/storage";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
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
      { id: uuidv4(), title, description, expirationDate, isCompleted: false },
    ]);
  }

  const sortedTasks = [...tasks].sort((a, b) => a.isCompleted - b.isCompleted);

  return { tasks: sortedTasks, onTaskAdd, onTaskToggle, onTaskDelete };
}
