import { ClipboardList } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import TaskItem from "./TaskItem";

export default function Tasks({ tasks, listKey }) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 p-10 bg-[#0d1526] border border-indigo-500/20 rounded-md text-slate-600"
      >
        <ClipboardList size={36} />
        <p className="text-sm">Nenhuma tarefa adicionada ainda.</p>
      </motion.div>
    );
  }

  return (
    <ul className="space-y-2 p-5 bg-[#0d1526] border border-indigo-500/20 rounded-md">
      <AnimatePresence key={listKey} initial={false}>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            layout
            transition={{ duration: 0.18 }}
            className="rounded-md border border-transparent hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-colors duration-150"
          >
            <TaskItem task={task} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
