const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares - funciones que se ejecutan antes de llegar a las rutas
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', require('./routes/notes.js'));
app.use('/api/users', require('./routes/users.js'));

module.exports = app;