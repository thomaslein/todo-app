import SubmitView from './SubmitView';
import CompletedListView from './CompletedListView';
import ListView from './ListView';

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
