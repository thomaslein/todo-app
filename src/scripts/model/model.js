/*
* This file is part of the Todo App 2017 project.
*
* @author Thomas Lein <thomaslein@gmail.com>
*/

import EventEmitter from 'events';
import api from '../utils/api';

import {
  ADD_TODO,
  REMOVE_TODO,
  READY,
} from '../constants/app';

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.fetch();

    this.todos = [];
  }

  getTodos = () => {
    return this.todos;
  }

/**
 * Creates a request to get all tasks and returns a promise.
 *
 * @return {Promise}
 */
  fetch = () => {
    return new Promise((resolve, reject) => {
      api('/todos', 'get')
      .then((result) => {
        result.map((item, idx, collection) => {
          this.todos.push(item);

          if (idx === collection.length - 1) {
            this.emit(READY, this.todos.reverse());
          }
        })

        resolve(result);
      });
    });
  }

/**
 * Creates a request to save a task and returns a promise.
 *
 * @param {String} value
 *
 * @return {Promise}
 */
  saveTodo = (value) => {
    if (value !== '') {
      return new Promise((resolve, reject) => {
        api('/todos', 'post', { task: value })
        .then((result) => {
          this.todos.push(result);
          this.emit(ADD_TODO, result);

          resolve(result);
        });
      });
    }
  }

/**
 * Creates a request to delete a task and returns a promise.
 *
 * @param {String} id
 *
 * @return {Promise}
 */
  deleteTodo = (id) => {
    if (id !== '') {
      return new Promise((resolve, reject) => {
        api(`/todos/${id}`, 'delete')
        .then((result) => {
          this.todos.forEach((todo, idx) => {
            if (todo._id === id){
              this.emit(REMOVE_TODO, todo);
              this.todos.splice(idx, 1);
            }
          });

          resolve(result);
        });
      });
    }
  }

/**
 * Creates request to mark a task as
 * complete and returns a promise.
 *
 * @param {String} id
 *
 * @return {Promise}
 */
  updateTodo = (id) => {
    if (id !== '') {
      return new Promise((resolve, reject) => {
        api(`/todos/${id}`, 'put', { complete: true })
        .then((result) => {
          if (result.complete) {
            this.todos.forEach((todo, idx) => {
              if (todo._id === result._id){
                this.emit(REMOVE_TODO, result);
              }
            });
          }
          resolve(result);
        });
      });
    }
  }
}
