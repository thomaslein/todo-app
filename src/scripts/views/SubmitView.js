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

  onAddTodo = (evt) => {
    evt.preventDefault();

    this.controller.addTodo(this.value);

    this.input.value = '';
  }

  onInput = (evt) => {
    this.value = evt.target.value;
  }
}
