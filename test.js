// npm install -g nodeunit
// npm test

var _ = require('lodash'),
    env = require('./env');

module.exports = {
  'Strings': function (test) {
    test.ok(_.isString(env.NODE_ENV));
    test.ok(_.isString(env.TZ));
    test.ok(_.isString(env.sessionSecret));
    test.done();
  },
  'Numbers': function (test) {
    test.ok(_.isNumber(env.port));
    test.ok(_.isNumber(env.pageSize));
    test.ok(_.isUndefined(env.limit));
    test.ok(_.isNumber(env.logLevel));
    test.done();
  },
  'Booleans': function (test) {
    test.ok(_.isBoolean(env.gzip));
    test.done();
  },
  'Dates': function (test) {
    test.ok(_.isDate(env.minDate));
    test.done();
  },
  'Objects': function (test) {
    test.ok(_.isObject(env.log));
    test.done();
  },
  'Functions': function (test) {
    test.ok(_.isNumber(env.maxSessionLength));
    test.ok(_.isNumber(env.maxExtendedSessionLength));
    test.ok(_.isDate(env.today));
    test.done();
  }
};
