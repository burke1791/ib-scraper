const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  content: String
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;