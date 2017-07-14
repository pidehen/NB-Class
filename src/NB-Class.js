;(() => {
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
