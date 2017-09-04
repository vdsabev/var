/**
 * Usage:
 *   const env = require('var');
 *   const { define } = require('var/webpack');
 * Then in your webpack plugins:
 *   new webpack.DefinePlugin(define(env, (envJsonKeys) => ['NODE_ENV', ...envJsonKeys]))
 */

const envKeys = Object.keys(require(process.env.ENV_VAR_CONFIG_FILE || './env.json'));

const define = exports.define = (env, getKeys) => {
  const result = {};
  const keys = getKeys(envKeys);

  for (const key of keys) {
    result[`process.env.${key}`] = JSON.stringify(env[key]);
  }

  return result;
};
