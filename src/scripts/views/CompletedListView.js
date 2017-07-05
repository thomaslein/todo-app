export default class CompletedListView {
  constructor(element) {
    this.element = element;
  }

  append = (element) => {
    this.element.appendChild(element);
  }

  addCompletedTodoToDom = (todo) => {
    const item = document.createElement('li');

    item.dataset.id = todo._id;

    this.element.insertBefore(item, this.element.firstChild)

    item.innerHTML = `<span>${todo.task}</span>`;
  }
}
