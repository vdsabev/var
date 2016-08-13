// Run with `npm test`

var _ = require('lodash');
var env = require('./env');

module.exports = {
  'parsing': {
    'should parse strings': function (test) {
      test.ok(_.isString(env.NODE_ENV));
      test.ok(_.isString(env.TZ));
      test.ok(_.isString(env.sessionSecret));
      test.done();
    },
    'should parse numbers': function (test) {
      test.ok(_.isNumber(env.port));
      test.ok(_.isNumber(env.pageSize));
      test.ok(_.isUndefined(env.limit));
      test.ok(_.isNumber(env.logLevel));
      test.done();
    },
    'should parse booleans': function (test) {
      test.ok(_.isBoolean(env.gzip));
      test.done();
    },
    'should parse dates': function (test) {
      test.ok(_.isDate(env.minDate));
      test.done();
    },
    'should parse objects': function (test) {
      test.ok(_.isObject(env.log));
      test.done();
    },
    'should parse functions': function (test) {
      test.ok(_.isNumber(env.maxSessionLength));
      test.ok(_.isNumber(env.maxExtendedSessionLength));
      test.ok(_.isDate(env.today));
      test.done();
    }
  },

  'getConfigFromFile': {
    'should return empty object if `env.json` doesn\'t exists': function (test) {
      var config = env.getConfigFromFile('invalid-file-path');
      test.deepEqual(config, {});
      test.done();
    }
  }
};
