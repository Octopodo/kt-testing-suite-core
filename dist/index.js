(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __isArray(arr) { try { return arr instanceof Array; } catch (e) { return false; } };// ---------------------------------- //function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (__isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// lib/expect/core.ts

var Expect = /*#__PURE__*/function () {
  function Expect(actual) {
    _defineProperty(this, "actual", void 0);
    this.actual = actual;
  }
  var _proto = Expect.prototype;
  _proto.assert = function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  };
  return Expect;
}();
function createExpect(actual) {
  var matchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var expectInstance = new Expect(actual);
  for (var i = 0; i < matchers.length; i++) {
    var matcherGroup = matchers[i];
    for (var key in matcherGroup) {
      if (matcherGroup.hasOwnProperty(key)) {
        expectInstance[key] = matcherGroup[key];
      }
    }
  }
  return expectInstance;
}

// lib/expect/matchers/js.ts

var jsMatchers = {
  toBe: function toBe(expected) {
    this.assert(this.actual === expected, 'Expected ' + expected + ' but got ' + this.actual);
    return this;
  },
  toEqual: function toEqual(expected) {
    var actualStr = JSON.stringify(this.actual);
    var expectedStr = JSON.stringify(expected);
    this.assert(actualStr === expectedStr, 'Expected ' + expectedStr + ' but got ' + actualStr);
    return this;
  },
  toBeDefined: function toBeDefined() {
    this.assert(this.actual !== undefined, 'Expected value to be defined, but got undefined');
    return this;
  },
  toBeUndefined: function toBeUndefined() {
    this.assert(this.actual === undefined, 'Expected value to be undefined, but got ' + this.actual);
    return this;
  },
  toBeNull: function toBeNull() {
    this.assert(this.actual === null, 'Expected value to be null, but got ' + this.actual);
    return this;
  },
  toBeTruthy: function toBeTruthy() {
    this.assert(this.actual, 'Expected value to be truthy, but got ' + this.actual);
    return this;
  },
  toBeFalsy: function toBeFalsy() {
    this.assert(!this.actual, 'Expected value to be falsy, but got ' + this.actual);
    return this;
  },
  toBeArray: function toBeArray() {
    this.assert(this.actual instanceof Array, 'Expected ' + this.actual + ' to be an array');
    return this;
  },
  toBeEmpty: function toBeEmpty() {
    this.assert(this.actual.length === 0, 'Expected ' + this.actual + ' to be empty');
    return this;
  },
  toHaveLength: function toHaveLength(expected) {
    this.assert(this.actual.length === expected, 'Expected ' + this.actual + ' to have length ' + expected);
    return this;
  }
};

// lib/expect/matchers/aftereffects.ts

// Asumimos que CompItem está definido en tus tipos de Adobe
var afterEffectsMatchers = {
  toBeActiveComp: function toBeActiveComp() {
    this.assert(this.actual instanceof CompItem && app.project.activeItem === this.actual, 'Expected ' + (this.actual instanceof CompItem ? this.actual.name : 'unknown') + ' to be the active composition, but it is not');
    return this;
  },
  toHaveDuration: function toHaveDuration(expected) {
    var actualDuration = this.actual instanceof CompItem ? this.actual.duration : 'undefined';
    this.assert(this.actual instanceof CompItem && this.actual.duration === expected, 'Expected duration ' + expected + ' but got ' + actualDuration);
    return this;
  },
  toBeComp: function toBeComp() {
    this.assert(this.actual && this.actual.toString() === '[object CompItem]', 'Expected ' + this.actual.toString() + ' to be a composition');
    return this;
  }
};

// lib/describe.ts

var suites = [];
var currentSuite = null;
function describe(description, fn) {
  var tests = [];
  currentSuite = {
    description: description,
    tests: tests
  };
  suites.push(currentSuite);

  // Ejecutar el contenido para recolectar pruebas
  fn();
  currentSuite = null; // Resetear después de recolectar
}
function it(name, fn) {
  if (!currentSuite) {
    throw new Error('it() must be called inside a describe()');
  }
  currentSuite.tests.push({
    name: name,
    fn: fn
  });
}
function getSuites() {
  return suites;
}

function expect(actual) {
  return createExpect(actual, [jsMatchers]);
}
var AE;
(function (_AE) {
  function expect(actual) {
    return createExpect(actual, [jsMatchers, afterEffectsMatchers]);
  }
  _AE.expect = expect;
})(AE || (AE = {}));

var TestRunner = /*#__PURE__*/function () {
  function TestRunner() {
    _defineProperty(this, "passedTests", 0);
    _defineProperty(this, "failedTests", 0);
  }
  var _proto = TestRunner.prototype;
  _proto.run = function run(suites) {
    var _iterator = _createForOfIteratorHelper(suites),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var suite = _step.value;
        $.writeln("Suite: ".concat(suite.description));
        var _iterator2 = _createForOfIteratorHelper(suite.tests),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var test = _step2.value;
            $.writeln("  Test: ".concat(test.name));
            try {
              test.fn();
              this.passedTests++;
              $.writeln('    ✅ Passed');
            } catch (e) {
              this.failedTests++;
              $.writeln("    \u274C Failed: ".concat(e.message, "\n                        ").concat(e.fileName, "\n                        ").concat(e.line));
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.showResults();
  };
  _proto.showResults = function showResults() {
    $.writeln('\nTest Results:');
    $.writeln("Passed: ".concat(this.passedTests));
    $.writeln("Failed: ".concat(this.failedTests));
  };
  return TestRunner;
}();
function runTests() {
  var suites = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getSuites();
  var runner = new TestRunner();
  runner.run(suites);
}

thisObj.KT = KT;
})(this);//# sourceMappingURL=index.js.map
