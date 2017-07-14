var Q = QUnit;

Q.module('测试面向对象编码');

Q.test('创建只包含原型属性的类', function (assert) {
  var Person = NBClass({
    sayHello: function () {
      console.log('hello world');
    },

    getName: function () {
      return 'xiaoming';
    }
  });
  var xiaoming = new Person;

  assert.ok('call' in Person && 'prototype' in Person);
  assert.ok(!!xiaoming['sayHello']
    && !!xiaoming.getName
    && xiaoming.getName() === 'xiaoming'
    && xiaoming instanceof Person);
});

Q.test('通过传入包括构造器的对象创建类', function (assert) {
  var Animal = NBClass({
    initialize: function (name, age) {
      this.name = name;
      this.age = age;
    },

    toString: function () {
      return '狗的名字叫：' + this.name + '\n' + '它今年' + this.age + '岁了！';
    }
  });

  var dog = new Animal('麦鸡', 132);

  assert.ok(typeof Animal === 'function' && 'call' in Animal && 'prototype' in Animal);
  assert.ok(dog instanceof Animal && typeof dog.toString() === 'string');
  assert.strictEqual(dog.age, 132);
});

Q.test('创建派生类', function (assert) {
  var Animal = NBClass({
    getName: function () {
      return this.name;
    }
  }, {
    log: function () {
      return 'log';
    }
  });

  var Dog = Animal.extend({
    initialize: function (name, gender) {
      this.name = name;
      this.gender = gender;
    },
    getGender: function () {
      return this.gender;
    }
  });

  var xhg = new Dog('小花狗', '公');

  assert.strictEqual(xhg.name, '小花狗');
  assert.strictEqual(xhg.gender, '公');
  assert.ok(Dog.prototype.isPrototypeOf(xhg));
  assert.ok(xhg.constructor === Dog);
});
