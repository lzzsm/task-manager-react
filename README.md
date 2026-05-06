# Task Manager

A clean and intuitive task management application built with React, Vite, and Tailwind CSS. This project emphasizes clean code practices, accessibility, and a consistent, modern user interface.

## Tech Stack

- React 19 — functional components, hooks, and routing with React Router v7
- Tailwind CSS v4 — utility-first styling with a custom dark theme
- Vite — fast bundling and development server
- Motion — animation library for smooth list transitions
- uuid — unique ID generation for each task
- tailwind-merge — safe merging of conflicting Tailwind classes
- lucide-react — scalable, customizable icon set

## Features

- Add tasks with title, description, and due date
- Edit tasks inline directly from the list
- Filter tasks by All, Pending, or Completed
- Expiration badges — highlights tasks due today or tomorrow, and overdue tasks
- Form validation with clear error feedback
- Delete tasks with an inline confirmation prompt
- View task details on a dedicated page
- Real-time counter of completed tasks
- Data persistence using localStorage
- Animated list with smooth entry, exit, and reorder transitions
- Illustrated empty state when no tasks exist

## Getting Started

```bash
npm install
npm run dev
```

## Testing

Tests are colocated with their modules (e.g. `useTasks.test.js` alongside `useTasks.js`) using Vitest and Testing Library.

```bash
npm test          # watch mode
npm run coverage  # coverage report
```

## Linting

```bash
npm run lint
```

Includes `eslint-plugin-jsx-a11y` for static accessibility checks.
