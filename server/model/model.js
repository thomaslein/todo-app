const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  date: { type: Date, default: Date.now },
  task: {
    type: String,
    Required: true,
  },
  complete: Boolean,
});

module.exports = mongoose.model('Todo', TodoSchema);
