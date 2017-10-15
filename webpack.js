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
 *   new webpack.DefinePlugin({
 *     'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
 *     ...define(env)
 *   })
 * And you get:
 *   {
 *     'process.env.NODE_ENV': '"development"',
 *     'process.env....': '...'
 *   }
 */
exports.define = (env, getKeys, prefix = 'process.env.') => {
  const result = {};
  const keys = typeof getKeys === 'function' ? getKeys(envKeys) : envKeys;

  for (const key of keys) {
    result[`${prefix}${key}`] = JSON.stringify(env[key]);
  }

  return result;
};
