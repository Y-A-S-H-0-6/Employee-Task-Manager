const express = require('express');
const router = express.Router();
const db = require('../db');

// Get tasks by employee
router.get('/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  db.query('SELECT * FROM tasks WHERE employee_id = ?', [employeeId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Add new task
router.post('/', (req, res) => {
  const { title, description, employee_id , status } = req.body;
  db.query(
    'INSERT INTO tasks (title, description, employee_id, status) VALUES (?, ?, ?, ?)',
    [title, description, employee_id, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

// Update task
router.put('/:id', (req, res) => {
  const { title, description, status } = req.body;
  db.query(
    'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
    [title, description, status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

// Delete task
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

module.exports = router;
