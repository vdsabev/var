var _ = require('lodash'),
    async = require('async'),
    Table = require('cli-table'),
    should = require('should');

// Declare utility functions
String.prototype.repeat = function (count) {
  return new Array(count + 1).join(this);
};

// Include test files
var tests = {};
var path = './tests';
_.each(require('fs').readdirSync(path), function (file) {
  tests[file] = require(path + '/' + file);
});

// Start tests
var table = new Table({ chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' } });
var results = { passed: 0, failed: 0, skipped: 0 };
async.series(_.map(tests, function (test, file) {
  return function (next) {
    table.push([file + ':', '']);
    execute(next, test);
  };
}), function (error) {
  if (error) throw new Error(error);

  table.push(['', '']);
  table.push(['PASSED:', results.passed]);
  table.push(['FAILED:', results.failed]);
  table.push(['SKIPPED:', results.skipped]);
  console.log(table.toString());

  process.exit(0);
});

function execute(next, test, key, indent) {
  if (key !== undefined) { // Log test structure
    if (isNaN(indent)) indent = 2;

    if (!_.isFunction(test)) {
      table.push([' '.repeat(indent) + key + ':', '']);
    }
  }

  if (_.isFunction(test)) { // Execute test
    try {
      test(function (status) {
        if (status === 'skip') {
          table.push([' '.repeat(indent) + key, '?']);
          results.skipped++;
        }
        else {
          table.push([' '.repeat(indent) + key, '✓']);
          results.passed++;
        }

        next();
      });
    }
    catch (error) {
      table.push([' '.repeat(indent) + key, error && error.message || error || 'unknown error']);
      results.failed++;
      next();
    }
  }
  else if (_.isObject(test)) {
    async.series(_.map(test, function (child, key) {
      return function (next) {
        execute(next, child, key, indent + 2);
      };
    }), next);
  }
  else return next('INVALID TEST FILE STRUCTURE');
}
