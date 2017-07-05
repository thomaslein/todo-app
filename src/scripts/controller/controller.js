/*
* This file is part of the Todo App 2017 project.
*
* @author Thomas Lein <thomaslein@gmail.com>
*/

/**
* Constructs the controller with todo actions
*
* @param {Model} model
*
*/
export default class Controller {
  constructor(model) {
    this.model = model;
  }

  /**
   * Updates a task
   *
   * @param {String} id
   *
   */
  updateTodo(id) {
    this.model.updateTodo(id);
  }

  /**
   * Adds a task
   *
   * @param {String} value
   *
   */
  saveTodo(value) {
    this.model.saveTodo(value);
  }

  /**
   * Deletes a task
   *
   * @param {String} id
   *
   */
  deleteTodo(id) {
    this.model.deleteTodo(id);
  }
}
