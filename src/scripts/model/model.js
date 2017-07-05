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

        if(result) {
          resolve(result);
        } else {
          reject('something went wrong');
        }
      });
    });
  }

  saveTodo = (value) => {
    if (value !== '') {
      return new Promise((resolve, reject) => {
        api('/todos', 'post', { task: value })
        .then((result) => {
          this.todos.push(result);
          this.emit(ADD_TODO, result);

          if(result) {
            resolve(result);
          } else {
            reject('something went wrong');
          }
        });
      });
    }
  }

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

          if(result) {
            resolve(result);
          } else {
            reject('something went wrong');
          }
        });
      });
    }
  }

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
          if(result) {
            resolve(result);
          } else {
            reject('something went wrong');
          }
        });
      });
    }
  }
}
