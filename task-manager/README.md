# Task Manager — Lab 3 (Lists, Keys, and Conditionals)

## Overview

Task Manager is a small React + TypeScript app demonstrating:

- Rendering lists with unique keys

- Conditional rendering based on item properties (status, priority)
- Filtering and sorting
- Component composition and prop handling

## Setup

1. Clone / create the Vite React TS app:

npm create vite@latest task-manager -- --template react-ts
cd task-manager
npm install

2.Replace/add files in `src/` as provided in the lab files.

3.Start:

npm run dev

## Structure

- `src/types/index.ts` — TypeScript types/interfaces.
- `src/components/TaskFilter` — Filter UI.
- `src/components/TaskList` — Renders list and adds tasks / sort button.
- `src/components/TaskItem` — Individual task UI with actions.
- `src/sampleData.ts` — Sample tasks for demo.

## How to use

- Change status from dropdown to test conditional styles.
- Delete tasks using Delete button.
- Use the filter dropdowns to filter the list by status/priority.
- Click **Sort by due date** to order tasks by date.
- Click **Add Task** to create a new task.

## Notes

- This project favors simplicity and readability for learning React list patterns.
- Unique keys use `task.id`. When programmatically creating tasks, we use `crypto.randomUUID()` if available or a timestamp fallback.

## Credits

Created as part of Lab 3: Rendering Lists — Task Manager exercise.
