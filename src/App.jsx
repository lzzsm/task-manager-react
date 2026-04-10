import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, onTaskAdd, onTaskToggle, onTaskDelete } = useTasks();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              tasks={tasks}
              onTaskAdd={onTaskAdd}
              onTaskToggle={onTaskToggle}
              onTaskDelete={onTaskDelete}
            />
          }
        />
        <Route path="/task/:id" element={<TaskPage tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  );
}
