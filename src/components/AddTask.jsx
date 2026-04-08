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
    setError("");
    onTaskAdd(title, description, expirationDate);
    setTitle("");
    setDescription("");
    setExpirationDate("");
  }

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleSubmit}>Adicionar</Button>
    </div>
  );
}

export default AddTask;