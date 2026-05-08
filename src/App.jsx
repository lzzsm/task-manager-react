import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TasksProvider from "./contexts/TasksProvider";

export default function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  );
}
