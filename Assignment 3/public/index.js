// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Assignment = require('./models/assignment');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://arvinnaresh:<password>@cluster0.kswhu5z.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static files
app.use(express.static('public'));

// Your existing routes

// Route to get all assignments
app.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('publicPage', { assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new assignment
app.post('/add-assignment', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newAssignment = await Assignment.create({ title, description });
    res.json(newAssignment);
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete an assignment
app.post('/delete-assignment/:id', async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const deletedAssignment = await Assignment.findByIdAndRemove(assignmentId);
    res.json(deletedAssignment);
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other CRUD routes (update, edit) can be added similarly

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
