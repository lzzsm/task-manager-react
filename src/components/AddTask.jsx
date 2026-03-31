import { useState } from "react";
import Input from "./Input";

function AddTask({ onTaskAddSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da Tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite o descrição da Tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        type="date"
        value={expirationDate}
        onChange={(event) => setExpirationDate(event.target.value)}
      />
      <button
        onClick={() => {
          // verificar se o título e a descrição estão preenchidos
          if (!title.trim() || !description.trim() || !expirationDate.trim()) {
            return alert(
              "Por favor, preencha o título, a descrição e a data de validade da tarefa",
            );
          }
          onTaskAddSubmit(title, description, expirationDate);
          setTitle("");
          setDescription("");
          setExpirationDate("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
