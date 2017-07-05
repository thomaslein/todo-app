/*
 * This file is part of the Eggs todo 2017 project.
 *
 * @author Thomas Lein <thomaslein@gmail.com>
 */

import Model from './model/model';
import Controller from './controller/controller';
import MainView from './views/MainView';

export default class App {
  constructor() {
    const model = new Model();
    const controller = new Controller(model);
    const mainView = new MainView(controller, model);
  }
}
