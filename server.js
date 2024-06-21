const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000'];

let todos = [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Have lunch', completed: false },
  ];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    console.log("hello from backend")
    res.status(200).json("Hello from backend");
  });
  

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.json({ message: `Todo with ID ${id} deleted successfully` });
  });

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
