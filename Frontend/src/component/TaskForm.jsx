// TaskForm.jsx
import React, { useState, useEffect } from "react";
import "./TaskForm.css";

function TaskForm({ employeeId, onAdd, onUpdate, editingTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({ title: "", description: "", status: "pending" });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask.id, form);
    } else {
      onAdd({ ...form, employee_id: employeeId });
    }
    setForm({ title: "", description: "", status: "pending" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3 className="add-task-label">➕ Add Task</h3>

      <input
        type="text"
        placeholder="Enter task title"
        value={form.title}
        required
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Task description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">{editingTask ? "Update" : "Add"} Task</button>
    </form>
  );
}

export default TaskForm;
