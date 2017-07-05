const controller = require('../controller/controller');

module.exports = (app) => {
  app.route('/api/todos')
    .get(controller.getAllTodos)
    .post(controller.createTodo);

  app.route('/api/todos/:todoId')
    .get(controller.getTodoById)
    .put(controller.updateTodo)
    .delete(controller.deleteTodo);
};
