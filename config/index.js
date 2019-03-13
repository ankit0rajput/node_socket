'use strict';

/**
 * Module dependencies.
 */

const path = require('path');

const development = require('./env/development');
const localhost = require('./env/localhost');
const production = require('./env/production');


const defaults = {
  root: path.join(__dirname, '..')
};

/**
 * Expose
 */

module.exports = {
  development: Object.assign({}, development, defaults),
  localhost: Object.assign({}, localhost, defaults),
  production: Object.assign({}, production, defaults)
}[process.env.NODE_ENV || 'localhost'];
