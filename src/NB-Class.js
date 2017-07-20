;(() => {
  var nativeSlice = Array.prototype.slice;
  var superRE = /\$super/;

  function resetProto (proto) {
    var ret = {}, value;

    for (var key in proto) {
      value = proto[key];

      if (NBUtil.getType(value) === 'function') {
        ret[key] = (function (func, superFuncName) {
          return function () {
            var args = nativeSlice.call(arguments);
            var superFunc = this.constructor.__super__[superFuncName];

            if (superRE.test(func.toString())) {
              args.unshift(superFunc.bind(this));
            }

            func.apply(this, args);
          };
        })(value, key);
      } else {
        ret[key] = value;
      }
    }

    return ret;
  }

  function NBClass (protoProps = {}, staticProps = {}) {
    const self = protoProps.initialize || function () {};

    self.prototype = Object.create(protoProps);
    self.prototype.constructor = self;

    NBUtil.copy(self, NBClass, staticProps, true);

    return self;
  }

  NBClass.extend = function (protoProps = {}) {
    const parent = this;
    const child = protoProps.initialize || function (...args) { return parent.apply(this, args); };

    protoProps = resetProto(protoProps);
    protoProps = NBUtil.copy({}, parent.prototype, protoProps, true);

    child.prototype = Object.create(protoProps);
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;

    NBUtil.copy({}, child, parent);

    return child;
  };

  if (typeof define === 'function' && define.amd) {
    define(() => NBClass);
  } else {
    window.NBClass = NBClass;
  }
})();
