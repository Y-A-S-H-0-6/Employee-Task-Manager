const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);
app.use('/employees', employeeRoutes);

app.listen(5000, () => {
  console.log(' Server running at http://localhost:5000');
});
