var env = require('../env');

module.exports = {
  'Strings': function (next) {
    env.NODE_ENV.should.be.an.instanceof(String);
    env.TZ.should.be.an.instanceof(String);
    env.sessionSecret.should.be.an.instanceof(String);
    return next();
  },
  'Numbers': function (next) {
    env.port.should.be.an.instanceof(Number);
    env.pageSize.should.be.an.instanceof(Number);
    (env.limit === undefined).should.be.true;
    env.logLevel.should.be.an.instanceof(Number);
    return next();
  },
  'Booleans': function (next) {
    env.gzip.should.be.an.instanceof(Boolean);
    return next();
  },
  'Dates': function (next) {
    env.minDate.should.be.an.instanceof(Date);
    return next();
  },
  'Objects': function (next) {
    env.log.should.be.an.instanceof(Object);
    return next();
  },
  'Functions': function (next) {
    env.maxSessionLength.should.be.an.instanceof(Number);
    env.maxExtendedSessionLength.should.be.an.instanceof(Number);
    env.today.should.be.an.instanceof(Date);
    return next();
  }
};
