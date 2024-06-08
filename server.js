const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Item = require('./models/itemModel');

const app = express();
const port = 3000;

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


mongoose.connect('mongodb://localhost/todolist')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));


app.post('/items', async (req, res) => {
    const { taskText } = req.body;
    const newItem = new Item({ taskText, done: false });
    try {
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});