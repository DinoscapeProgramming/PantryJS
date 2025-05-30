const bent = require('bent');

const BASE_PATH = 'https://getpantry.cloud';
const API_VERSION = '1';

class Request {
  static async get(route, parseJSON = true) {
    return Request.perform(route, 'GET', parseJSON);
  }

  static async post(route, payload) {
    return Request.perform(route, 'POST', false, payload);
  }

  static async put(route, payload, parseJSON = true) {
    return Request.perform(route, 'PUT', parseJSON, payload);
  }

  static async delete(route) {
    return Request.perform(route, 'DELETE', false);
  }

  static async perform(route, method, parseJSON, payload = {}) {
    try {
      const responseFormat = parseJSON ? 'json' : 'string';
      const action = bent(method, responseFormat);
      const response = await action(Request.path(route), payload);
      return response;
    } catch (error) {
      if (error && typeof error.text === 'function') {
        const errorMessage = await error.text();
        throw new Error(errorMessage);
      }

      throw new Error(error?.message || 'An unknown error occurred');
    }
  }

  static path(route) {
    return `${BASE_PATH}/apiv${API_VERSION}/pantry/${route}`;
  }
}

module.exports = Request;
