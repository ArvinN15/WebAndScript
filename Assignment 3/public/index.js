// index.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory to 'views'
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// ... (other configurations)

app.get('/public', (req, res) => {
  console.log('Accessed /public route');
  // Render the HTML file directly
  res.sendFile(path.join(__dirname, 'views', 'publicPage.html'));
});

// Express route to add an assignment
app.post('/add-assignment', async (req, res) => {
  const { title, description } = req.body;

  try {
    // Create a new assignment in the database
    const newAssignment = await Assignment.create({ title, description });

    // Retrieve all assignments from the database
    const assignments = await Assignment.find();

    // Send the assignments back to the client
    res.render('publicPage', { assignments });
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).json({ error: 'Failed to add assignment' });
  }
});

// ... (remaining code)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
