import { useState } from "react";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import Title from "../components/Title";
import {
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED,
} from "../constants/filters";

const FILTERS = [
  { value: FILTER_ALL, label: "Todas" },
  { value: FILTER_PENDING, label: "Pendentes" },
  { value: FILTER_COMPLETED, label: "Concluídas" },
];

export default function HomePage({
  tasks,
  onTaskAdd,
  onTaskToggle,
  onTaskDelete,
  onTaskEdit,
}) {
  const [filter, setFilter] = useState(FILTER_ALL);

  const completed = tasks.filter((t) => t.isCompleted).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTER_PENDING) return !task.isCompleted;
    if (filter === FILTER_COMPLETED) return task.isCompleted;
    return true;
  });

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

        {tasks.length > 0 && (
          <div className="flex gap-2">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-all duration-150 cursor-pointer ${
                  filter === value
                    ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300"
                    : "border-indigo-500/20 text-slate-500 hover:text-slate-300 hover:border-indigo-500/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <Tasks
          tasks={filteredTasks}
          listKey={filter}
          onTaskToggle={onTaskToggle}
          onTaskDelete={onTaskDelete}
          onTaskEdit={onTaskEdit}
        />
      </div>
    </div>
  );
}
