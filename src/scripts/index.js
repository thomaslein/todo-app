/*
 * This file is part of the Eggs todo 2017 project.
 *
 * @author Thomas Lein <thomaslein@gmail.com>
 */

import App from 'app';

let LOADED = false;

function bootstrap() {
  if (LOADED) return;
  LOADED = true;

  const app = new App();
}

document.addEventListener('DOMContentLoaded', bootstrap, false);
window.addEventListener('load', bootstrap, false);
