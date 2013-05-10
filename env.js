var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    cfg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'env.json'), 'utf8')),
    env = module.exports = {};

var converters = {
  string: { // Any object that implements toString
    parse: function (x) { return x != null && x.toString() },
    validate: function (x) { return _.isString(x) }
  },
  number: { // Numbers and strings that can be parsed into numbers
    parse: parseFloat,
    validate: function (x) { return !isNaN(x) }
  },
  boolean: { // true, false, 'true' and 'false'
    parse: function (x) {
      if (typeof x === 'boolean') return x;
      if (x === 'true') return true;
      if (x === 'false') return false;
    },
    validate: _.isBoolean
  },
  date: { // Any string for which new Date() will return a valid date
    parse: function (x) { return new Date(x) },
    validate: _.isDate
  },
  function: { // Any valid JavaScript expression; "this" refers to env
    parse: function (x) { return eval(x) }
  }
};

// Add environment variables from process.env
_.extend(env, process.env);

// Parse environment variables from env.json
_.each(cfg, function (options, key) {
  if (!_.isObject(options)) options = { default: options }; // Shorthand notation

  var processValueIsDefined = process.env[key] !== undefined;
  var defaultValueIsDefined = options.default !== undefined;
  var environmentValueIsDefined = options[env.NODE_ENV] !== undefined;
  if (processValueIsDefined || defaultValueIsDefined || environmentValueIsDefined) {
    var value;
    if (processValueIsDefined) {
      _.defaults(options, { type: 'string' }); // Default type to string if necessary
      value = process.env[key];
    }
    else if (defaultValueIsDefined || environmentValueIsDefined) { // The condition is just for clarity, it's always true
      var defaultValueKey = environmentValueIsDefined ? env.NODE_ENV : 'default'; // Use corresponding key to get default value
      if (options[defaultValueKey] === undefined && !options.required) return; // Don't enforce convertion

      _.defaults(options, { type: typeof options[defaultValueKey] }); // Infer type from default value if necessary
      value = options[defaultValueKey];
      process.env[key] = value; // Put the value into process.env
    }

    var converter = converters[options.type];
    if (!converter) throw new Error('Unsupported type: ' + options.type);

    var parsedValue = converter.parse.call(env, value); // Call with env to allow for variable interdependency
    if (converter.validate && !converter.validate(parsedValue)) throw new Error('Invalid value: ' + value);

    env[key] = parsedValue;
  }
  else if (options.required) throw new Error('Required variable: ' + key);
});
