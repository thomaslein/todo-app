/*
 * This file is part of the Todo App 2017 project.
 *
 * @author Thomas Lein <thomaslein@gmail.com>
 */

export const BASE_URL = '/api';

/**
 * Creates request object and returns a fetch promise.
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object} body
 *
 * @return {Promise}
 */
export default (endpoint, method, body) => {
  const { Headers, fetch } = window;

  const request = {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: new Headers(),
  };

  request.headers.append('Accept', 'application/json');
  request.headers.append('Content-Type', 'application/json');

  if (body && typeof body !== 'object') {
    return new Promise((resolve, reject) => reject('Body must be an object.'));
  }

  if (body) {
    request.body = JSON.stringify(body);
  }

  return fetch(BASE_URL + endpoint, request)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return new Promise((resolve, reject) => reject(json));
      }
      return json;
    })
    .catch(err => Promise.reject(err));
}
