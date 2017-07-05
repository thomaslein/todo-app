export default class Controller {
  constructor(model) {
    this.model = model;
  }

  updateTodo(id) {
    this.model.updateTodo(id);
  }

  addTodo(value) {
    this.model.saveTodo(value);
  }

  removeTodo(id) {
    this.model.deleteTodo(id);
  }
}
