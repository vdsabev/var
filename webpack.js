var paths = require('./paths');
const envKeys = Object.keys(require(paths.get(paths.CONFIG)));

/**
 * Allows you to use environment variables via webpack's DefinePlugin, but
 * only serialize the keys you need instead of the whole environment
 *
 * Usage:
 *   const env = require('var');
 *   const { define } = require('var/webpack');
 * Then in your webpack plugins:
 *   new webpack.DefinePlugin(define(env, (envJsonKeys) => ['NODE_ENV', ...envJsonKeys]))
 * And you get:
 *   {
 *     'process.env.NODE_ENV': '"development"',
 *     'process.env....': '...'
 *   }
 */
exports.define = (env, getKeys, prefix = 'process.env.') => {
  const result = {};
  const keys = getKeys(envKeys);

  for (const key of keys) {
    result[`${prefix}${key}`] = JSON.stringify(env[key]);
  }

  return result;
};
