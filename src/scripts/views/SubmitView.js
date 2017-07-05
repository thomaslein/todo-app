/*
* This file is part of the Todo App 2017 project.
*
* @author Thomas Lein <thomaslein@gmail.com>
*/

/**
  * Constructs the submit view to add tasks
  *
  * @param {Controller} controller
  * @param {Element} element
  *
  */
export default class SubmitView {
  constructor(controller, element){
    this.controller = controller;
    this.element = element;

    const submit = this.element.querySelector('input[type="submit"]');
    this.input = this.element.querySelector('input[type="text"]');

    this.element.addEventListener('submit', this.onAddTodo);
    this.input.addEventListener('input', this.onInput);

    this.value = '';
  }

  /**
   * Form submit event
   *
   * @param {Event} evt
   *
   */
  onAddTodo = (evt) => {
    evt.preventDefault();

    this.controller.saveTodo(this.value);

    this.input.value = '';
  }

  /**
   * Text input event
   *
   * @param {Event} evt
   *
   */
  onInput = (evt) => {
    this.value = evt.target.value;
  }
}
