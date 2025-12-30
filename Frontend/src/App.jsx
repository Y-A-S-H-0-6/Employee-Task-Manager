import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSelector from "./component/EmployeeSelector";
import TaskList from "./component/TaskList";
import TaskForm from "./component/TaskForm";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/employees`);
      console.log("✅ Employees fetched:", res.data);
      setEmployees(res.data);
    } catch (err) {
      console.error("❌ Error fetching employees:", err);
    }
  };

  const fetchTasks = async (employeeId) => {
    const res = await axios.get(`${API}/tasks/${employeeId}`);
    setTasks(res.data);
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployee(id);
    fetchTasks(id);
    setEditingTask(null);
  };

  const handleAddTask = async (task) => {
    await axios.post(`${API}/tasks`, task);
    fetchTasks(selectedEmployee);
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      console.log("🔄 Updating task:", id, updatedTask);
      await axios.put(`${API}/tasks/${id}`, updatedTask);
      fetchTasks(selectedEmployee);
      setEditingTask(null);
    } catch (err) {
      console.error(
        "❌ Failed to update task:",
        err.response?.data || err.message
      );
    }
  };

  // const handleUpdateTask = async (id, updatedTask) => {
  //   await axios.put(`${API}/tasks/${id}`, updatedTask);
  //   fetchTasks(selectedEmployee);
  //   setEditingTask(null);
  // };

  const handleDeleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks(selectedEmployee);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>🧑‍💻 Employee Task Manager</h2>
      <div className="top-controls">
        <div className="employee-select">
          <EmployeeSelector
            employees={employees}
            onSelect={handleSelectEmployee}
          />
        </div>

        {selectedEmployee && (
          <>
            <div className="task-form-wrapper">
              <TaskForm
                employeeId={selectedEmployee}
                onAdd={handleAddTask}
                onUpdate={handleUpdateTask}
                editingTask={editingTask}
              />
            </div>

            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
