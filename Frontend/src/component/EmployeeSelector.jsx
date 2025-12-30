import React from "react";
import "./EmployeeSelector.css";

function EmployeeSelector({ employees, onSelect }) {
  return (
    <div className="card">
      <label>Select Employee: </label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Choose --</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeeSelector;
