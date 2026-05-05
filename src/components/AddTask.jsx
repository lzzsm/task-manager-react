import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";

function AddTask({ onTaskAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

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

  function handleChange(setter) {
    return (e) => {
      setter(e.target.value);
      setError("");
    };
  }

  function handleEnterSubmit(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3 p-5 bg-[#0d1526] border border-indigo-500/20 rounded-md"
    >
      <p className="text-xs font-medium text-indigo-400 uppercase tracking-widest">
        Nova tarefa
      </p>
      <Input
        type="text"
        placeholder="Título"
        aria-label="Título da tarefa"
        value={title}
        onChange={handleChange(setTitle)}
      />
      <Textarea
        placeholder="Descrição (Shift+Enter para quebrar linha)"
        aria-label="Descrição da tarefa"
        rows={3}
        value={description}
        onChange={handleChange(setDescription)}
        onKeyDown={handleEnterSubmit}
      />
      <Input
        type="date"
        aria-label="Data de expiração"
        value={expirationDate}
        onChange={handleChange(setExpirationDate)}
        onKeyDown={handleEnterSubmit}
      />
      {error && (
        <p className="text-red-400 text-xs" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        className="w-full justify-center border-indigo-500/60 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-indigo-200"
      >
        Adicionar tarefa
      </Button>
    </form>
  );
}

export default AddTask;
