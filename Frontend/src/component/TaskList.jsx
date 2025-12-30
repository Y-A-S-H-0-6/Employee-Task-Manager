import React from "react";
import "./TaskList.css";

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="task-list">
      <h3>📋 Task List</h3>
      {tasks.length === 0 ? (
        <p className="no-task">No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-card">
              <div className="task-header">
                <strong className="task-title">{task.title}</strong>
                <span className={`status ${task.status}`}>{task.status}</span>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-actions">
                <button className="edit-btn" onClick={() => onEdit(task)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(task.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
