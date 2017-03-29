'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACLCache = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AdapterLoader = require('../Adapters/AdapterLoader');

var _RedisCacheAdapter = require('../Adapters/Cache/RedisCacheAdapter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ACLCache = function () {
  function ACLCache(ctx, ttl) {
    _classCallCheck(this, ACLCache);

    this.cache = new _RedisCacheAdapter.RedisCacheAdapter(ctx, ttl);
  }

  _createClass(ACLCache, [{
    key: 'hasReadAccess',
    value: function hasReadAccess(sessionToken, role) {
      var _this = this;

      return new Parse.Promise(function (resolve, reject) {
        _this.cache.get(sessionToken + ':' + role).then(function (hasAccess) {
          if (hasAccess == '1') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
  }, {
    key: 'setHasReadAccess',
    value: function setHasReadAccess(sessionToken, role) {
      this.cache.put(sessionToken + ':' + role, 1);
    }
  }]);

  return ACLCache;
}();

exports.ACLCache = ACLCache;