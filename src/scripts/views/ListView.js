import TweenMax from '../lib/gsap/TweenMax';

import {
  ADD_TODO,
  READY,
  REMOVE_TODO,
} from '../constants/app';

export default class ListView {
  constructor(controller, model, element, completedListView) {

    this.controller = controller;
    this.model = model;
    this.element = element;
    this.completedListView = completedListView;

    this.model.on(READY, this.populateList);
    this.model.on(ADD_TODO, this.addTodoToDom);
    this.model.on(REMOVE_TODO, this.removeTodoFromDom);
  }

  /**
   * Populates the todo list when app initialize
   *
   * @param {object} data
   *
   */
    populateList = (data) => {
      for (let i = 0; i < data.length; i += 1) {
        const item = document.createElement('li');

        item.dataset.id = data[i]._id;

        if (data[i].complete) {
          this.completedListView.append(item);
        } else {
          this.element.appendChild(item);
        }

        item.innerHTML = `<span>${data[i].task}</span>`;

        if (!data[i].complete) {
          this.appendUI(item);
        }
      }

      const tasks = this.element.querySelectorAll('li');
      TweenMax.staggerFrom(tasks, 0.5, {
        y: -50,
        autoAlpha: 0,
        ease: Expo.easeOut,
      }, 0.15);
    }

  /**
   * Appends UI to list element
   *
   * @param {Element} element
   *
   */
    appendUI = (element) => {

      const ui = document.createElement('div');
      const complete = document.createElement('button');
      const remove = document.createElement('button');

      complete.innerHTML = 'complete';
      complete.addEventListener('click', this.onCompleteTodo);

      remove.innerHTML = 'remove';
      remove.addEventListener('click', this.onRemoveTodo);

      element.appendChild(ui);
      ui.appendChild(complete);
      ui.appendChild(remove);

    }

  /**
   * onClick callback for complete button
   *
   * @param {Event} evt
   *
   */
    onCompleteTodo = (evt) => {
      evt.preventDefault();

      const { target } = evt;

      const wrapper = target.parentNode;

      const { id } = wrapper.parentNode.dataset;

      this.controller.updateTodo(id);
    }

  /**
   * onClick callback for remove button
   *
   * @param {Event} evt
   *
   */
    onRemoveTodo = (evt) => {
      evt.preventDefault();

      const { target } = evt;

      const wrapper = target.parentNode;

      const { id } = wrapper.parentNode.dataset;

      this.controller.removeTodo(id);
    }

    removeTodoFromDom = (todo) => {
      const { _id, complete } = todo;

      const target = this.element.querySelector(`li[data-id="${_id}"]`);

      TweenMax.to(target, 0.5, {
        y: -50,
        autoAlpha: 0,
        ease: Expo.easeIn,
        onComplete: () => {
          target.parentNode.removeChild(target);
      } });

      if (complete) {
        this.completedListView.addCompletedTodoToDom(todo);
      }
    }

    addTodoToDom = (data) => {
      const item = document.createElement('li');

      item.dataset.id = data._id;

      this.element.insertBefore(item, this.element.firstChild)

      item.innerHTML = `<span>${data.task}</span>`;

      this.appendUI(item);

      TweenMax.from(item, 1, {
        y: -50,
        autoAlpha: 0,
        ease: Expo.easeOut,
      });
    }
}
