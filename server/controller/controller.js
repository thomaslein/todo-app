const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');

exports.getAllTodos = (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) res.send(err);
    res.json(todos);
  });
};

exports.createTodo = (req, res) => {
  const { body } = req;

  const todo = new Todo(body);

  todo.save((err, todo) => {
    if (err) res.send(err);

    res.json(todo);
  });
};

exports.getTodoById = (req, res) => {
  const { todoId } = req.params;

  Todo.findById(todoId, (err, todo) => {
    if (err) res.send(err);

    res.json(todo);
  });
};

exports.updateTodo = (req, res) => {
  const { todoId } = req.params;

  Todo.findOneAndUpdate({ _id: todoId }, req.body, {new: true}, (err, todo) => {
    if (err) res.send(err);

    res.json(todo);
  });
};

exports.deleteTodo = (req, res) => {
  const { todoId } = req.params;

  Todo.findByIdAndRemove({ _id: todoId }, (err, todo) => {
    if (err) res.send(err);
    res.json({ message: `${todo._id} er slettet` });
  });
};
