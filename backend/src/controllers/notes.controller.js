const notesCtrl = {}

const Note = require('../models/Note')

// Dar todas las notas
notesCtrl.getNotes = async (req, res) => {
    // Espera a recoger todas las notas para luego agregarlas al GET
    const notes = await Note.find();
    res.json(notes)
};

// Crear una nota nueva
notesCtrl.createNotes = async (req, res) => {
    // Lo que espera recibir al crear una nota
    const { title, content, date, author } = req.body;

    const newNote = new Note({
        // Es igual a title: title
        title,
        content,
        date,
        author
    })

    await newNote.save();

    res.json({ message: 'Nota creada' })
};

// Dar una nota por id
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note)
};

// Actualizar una nota por id
notesCtrl.updateNote = async (req, res) => {
    await Note.findOneAndUpdate(req.params.id, req.body)
    res.json({ message: "Nota actualizada" })
};

// Eliminar una nota por id
notesCtrl.deleteNote = async (req, res) => {
    await Note.findOneAndDelete(req.params.id);
    res.json({ message: "Nota eliminada" })
};

module.exports = notesCtrl;