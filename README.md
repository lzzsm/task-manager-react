# ✅ Task Manager

Gerenciador de tarefas construído com React, Vite e Tailwind CSS. Projeto desenvolvido com foco em boas práticas de código, acessibilidade e UI consistente.

## Stack

- **React 19** — componentes funcionais, hooks e roteamento com React Router v7
- **Tailwind CSS v4** — estilização utility-first com tema escuro customizado
- **Vite** — bundler e dev server
- **uuid** — geração de IDs únicos por tarefa
- **tailwind-merge** — merge seguro de classes Tailwind conflitantes
- **lucide-react** — ícones

## Funcionalidades

- Adicionar tarefas com título, descrição e data de expiração
- Validação de formulário com feedback de erro
- Marcar tarefas como concluídas
- Exclusão com confirmação inline
- Visualização de detalhes da tarefa em página dedicada
- Contador de tarefas concluídas em tempo real
- Persistência via `localStorage`
- Estado vazio ilustrado quando não há tarefas

## Como rodar

```bash
npm install
npm run dev
```