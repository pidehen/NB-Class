'use strict';

;(function () {
  function NBClass() {
    var protoProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var staticProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var self = protoProps.initialize || function () {};

    self.prototype = Object.create(protoProps);
    self.prototype.constructor = self;

    NBUtil.copy(self, NBClass, staticProps, true);

    return self;
  }

  NBClass.extend = function () {
    var protoProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var parent = this;
    var child = protoProps.initialize || function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return parent.apply(this, args);
    };
    protoProps = NBUtil.copy({}, parent.prototype, protoProps, true);

    child.prototype = Object.create(protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;

    NBUtil.copy({}, child, parent);

    return child;
  };

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return NBClass;
    });
  } else {
    window.NBClass = NBClass;
  }
})();