const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up the body-parser middleware to parse incoming request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sample initial to-do items
let todos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Read a book', completed: false },
];

// Route to render the To-Do List page
app.get('/', (req, res) => {
  res.render('index', { todos });
});

// Route to add a new to-do item
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTodo = {
      id: todos.length + 1,
      task,
      completed: false,
    };
    todos.push(newTodo);
    res.redirect('/');
  } else {
    res.status(400).json({ message: 'Task cannot be empty' });
  }
});

// Route to mark a to-do item as completed
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].completed = true;
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'To-do item not found' });
  }
});

// Route to delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
