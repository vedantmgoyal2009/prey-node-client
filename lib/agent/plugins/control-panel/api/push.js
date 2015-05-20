var keys    = require('./keys'),
    errors  = require('./errors'),
    request = require('./request');

var format  = '.json';

var check_keys = function() {
  if (!keys.present())
    throw errors.get('MISSING_KEY');
};

var post = function(endpoint, data, opts, cb) {

  check_keys();

  var url = '/devices/' + keys.get().device + '/' + endpoint + format;

  opts = opts || {};

  if (opts.status) {
    opts.headers = { 'X-Prey-Status': opts.status };
    delete opts.status;
  }

  request.post(url, data, opts, cb);
};

exports.response = function(data, opts, cb) {
  post('response', data, opts, cb);
};

exports.event = function(data, opts, cb) {
  post('events', data, opts, cb);
};

exports.data = function(data, opts, cb) {
  post('data', data, opts, cb);
};

exports.report = function(data, opts, cb) {
  post('reports', data, opts, cb);
};
