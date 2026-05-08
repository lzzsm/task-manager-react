import { useTasks } from "../hooks/useTasks";
import { TasksContext } from "./TasksContext";

export default function TasksProvider({ children }) {
  const taskState = useTasks();
  return (
    <TasksContext.Provider value={taskState}>{children}</TasksContext.Provider>
  );
}
