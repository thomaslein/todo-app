/*
* This file is part of the Todo App 2017 project.
*
* @author Thomas Lein <thomaslein@gmail.com>
*/

import SubmitView from './SubmitView';
import CompletedListView from './CompletedListView';
import ListView from './ListView';

/**
* Constructs the main view with sub views
*
* @param {Controller} controller
* @param {Model} model
*
*/
export default class MainView {
  constructor(controller, model) {
    this.controller = controller;
    this.model = model;

    this.element = document.getElementById('root');

    const form = this.element.querySelector('form');
    const submitView = new SubmitView(controller, form);

    const completedList = document.querySelector('.completed-tasks');
    const completedListView = new CompletedListView(completedList);

    const list = document.querySelector('.tasks');
    const listView = new ListView(controller, model, list, completedListView);
  }
}
