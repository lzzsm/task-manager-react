import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

function AddTask({ onTaskAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!title.trim() || !description.trim() || !expirationDate.trim()) {
      setError("Preencha o título, a descrição e a data de expiração.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(expirationDate + "T00:00:00");

    if (selected < today) {
      setError("A data de expiração não pode ser no passado.");
      return;
    }

    setError("");
    onTaskAdd(title, description, expirationDate);
    setTitle("");
    setDescription("");
    setExpirationDate("");
  }

  return (
    <div className="space-y-3 p-5 bg-[#0d1526] border border-indigo-500/20 rounded-md">
      <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest">
        Nova tarefa
      </p>
      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <Button
        onClick={handleSubmit}
        className="w-full justify-center border-indigo-500/60 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-200"
      >
        Adicionar tarefa
      </Button>
    </div>
  );
}

export default AddTask;
