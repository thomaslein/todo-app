/*
* This file is part of the Todo App 2017 project.
*
* @author Thomas Lein <thomaslein@gmail.com>
*/

/**
  * Constructs the completed list view with all completed tasks
  *
  * @param {Element} element
  *
  */
export default class CompletedListView {
  constructor(element) {
    this.element = element;
  }

  /**
   * Appends a completed task to dom on initialize
   *
   * @param {Element} element
   *
   */
  append = (element) => {
    this.element.appendChild(element);
  }

  /**
   * Constructs a completed task to dom
   *
   * @param {Object} todo
   *
   */
  addCompletedTodoToDom = (todo) => {
    const item = document.createElement('li');

    item.dataset.id = todo._id;

    this.element.insertBefore(item, this.element.firstChild)

    item.innerHTML = `<span>${todo.task}</span>`;
  }
}
