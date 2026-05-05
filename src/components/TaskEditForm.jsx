import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import { CheckIcon, XIcon } from "lucide-react";

export default function TaskEditForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.expirationDate);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !date.trim()) return;
    onSave(title.trim(), description.trim(), date);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (title.trim() && description.trim() && date.trim()) {
        onSave(title.trim(), description.trim(), date);
      }
    }
    if (e.key === "Escape") onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Editar título"
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Editar descrição"
        rows={2}
        onKeyDown={handleKeyDown}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        aria-label="Editar data de expiração"
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          onClick={onCancel}
          aria-label="Cancelar edição"
          className="text-xs px-3 border-slate-600/60 text-slate-400 hover:bg-slate-500/20 hover:border-slate-500 hover:text-slate-300"
        >
          <XIcon size={14} />
        </Button>
        <Button
          type="submit"
          aria-label="Salvar edição"
          className="text-xs px-3 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400"
        >
          <CheckIcon size={14} />
        </Button>
      </div>
    </form>
  );
}
