(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __isArray(arr) { try { return arr instanceof Array; } catch (e) { return false; } };function __objectCreate(proto) { function F() {}; F.prototype = proto; return new F(); };function __defineProperty(obj, prop, descriptor) { if (descriptor && descriptor.value !== undefined) { obj[prop] = descriptor.value; } return obj; };// ---------------------------------- //function _arrayLikeToArray(r, a) {
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
  return (r = _toPropertyKey(r)) in e ? __defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _inheritsLoose(t, o) {
  t.prototype = __objectCreate(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
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
  _proto.toSafeString = function toSafeString(value) {
    if (value === null) {
      return 'null';
    }
    if (value === undefined) {
      return 'undefined';
    }
    return value.toString();
  }

  // Método para obtener una versión segura de this.actual según el tipo esperado
  ;
  _proto.getSafeActual = function getSafeActual(type) {
    if (this.actual === null || this.actual === undefined) {
      if (type === 'array') {
        return [];
      }
      if (type === 'string') {
        return '';
      }
      if (type === 'number') {
        return NaN;
      }
      return this.actual; // null o undefined para "any"
    }
    if (type === 'array') {
      if (this.actual && this.actual.constructor === Array) {
        return this.actual;
      }
      return [];
    }
    if (type === 'string') {
      if (typeof this.actual === 'string') {
        return this.actual;
      }
      return '';
    }
    if (type === 'number') {
      if (typeof this.actual === 'number' && !isNaN(this.actual)) {
        return this.actual;
      }
      return NaN;
    }
    return this.actual; // Siempre retorna algo
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
  toThrow: function toThrow() {
    var isFunction = false;
    if (typeof this.actual === 'function') {
      isFunction = true;
    }
    var threw = false;
    if (isFunction) {
      try {
        this.actual(); // Ejecutar la función, forzando tipo para evitar TS errors
      } catch (e) {
        threw = true;
      }
    }
    this.assert(threw, 'Expected ' + this.toSafeString(this.actual) + ' to throw an error, but it did not');
    return this;
  },
  toBe: function toBe(expected) {
    var safeActual = this.getSafeActual('any');
    this.assert(safeActual === expected, 'Expected ' + expected + ' but got ' + this.toSafeString(this.actual));
    return this;
  },
  toEqual: function toEqual(expected) {
    var safeActual = this.getSafeActual('any');
    var actualStr = JSON.stringify(safeActual);
    var expectedStr = JSON.stringify(expected);
    this.assert(actualStr === expectedStr, 'Expected ' + expectedStr + ' but got ' + actualStr);
    return this;
  },
  toBeDefined: function toBeDefined() {
    this.assert(this.actual !== undefined, 'Expected value to be defined, but got undefined');
    return this;
  },
  toBeUndefined: function toBeUndefined() {
    this.assert(this.actual === undefined, 'Expected value to be undefined, but got ' + this.toSafeString(this.actual));
    return this;
  },
  toBeNull: function toBeNull() {
    this.assert(this.actual === null, 'Expected value to be null, but got ' + this.toSafeString(this.actual));
    return this;
  },
  toBeTruthy: function toBeTruthy() {
    var safeActual = this.getSafeActual('any');
    var isTruthy = !!safeActual;
    this.assert(isTruthy, 'Expected value to be truthy, but got ' + this.toSafeString(this.actual));
    return this;
  },
  toBeFalsy: function toBeFalsy() {
    var safeActual = this.getSafeActual('any');
    var isFalsy = !safeActual;
    this.assert(isFalsy, 'Expected value to be falsy, but got ' + this.toSafeString(this.actual));
    return this;
  },
  toBeArray: function toBeArray() {
    var isArray = false;
    if (this.actual && this.actual.constructor === Array) {
      isArray = true;
    }
    this.assert(isArray, 'Expected ' + this.toSafeString(this.actual) + ' to be an array');
    return this;
  },
  toBeEmpty: function toBeEmpty() {
    var isArray = false;
    var isString = false;
    if (this.actual && this.actual.constructor === Array) {
      isArray = true;
    }
    if (typeof this.actual === 'string') {
      isString = true;
    }
    // Consider null/undefined as empty (array or string)
    var isArrayOrString = isArray || isString || this.actual === null || this.actual === undefined;
    var safeActual = this.getSafeActual(isArray ? 'array' : 'string');
    this.assert(isArrayOrString && safeActual.length === 0, 'Expected ' + this.toSafeString(this.actual) + ' to be empty');
    return this;
  },
  toHaveLength: function toHaveLength(expected) {
    var isArray = false;
    var isString = false;
    if (this.actual && this.actual.constructor === Array) {
      isArray = true;
    }
    if (typeof this.actual === 'string') {
      isString = true;
    }
    // Consider null/undefined as having length 0
    var isArrayOrString = isArray || isString || this.actual === null || this.actual === undefined;
    var safeActual = this.getSafeActual(isArray ? 'array' : 'string');
    this.assert(isArrayOrString && safeActual.length === expected, 'Expected ' + this.toSafeString(this.actual) + ' to have length ' + expected + ' but got ' + safeActual.length);
    return this;
  },
  toBeNumber: function toBeNumber() {
    var safeActual = this.getSafeActual('number');
    var isNumber = false;
    if (typeof this.actual === 'number' && !isNaN(safeActual)) {
      isNumber = true;
    }
    this.assert(isNumber, 'Expected ' + this.toSafeString(this.actual) + ' to be a number');
    return this;
  },
  toBeNaN: function toBeNaN() {
    var safeActual = this.getSafeActual('number');
    this.assert(isNaN(safeActual), 'Expected ' + this.toSafeString(this.actual) + ' to be NaN');
    return this;
  },
  toBeString: function toBeString() {
    var isString = false;
    if (typeof this.actual === 'string') {
      isString = true;
    }
    this.assert(isString, 'Expected ' + this.toSafeString(this.actual) + ' to be a string');
    return this;
  },
  toBeBoolean: function toBeBoolean() {
    var isBoolean = false;
    if (typeof this.actual === 'boolean') {
      isBoolean = true;
    }
    this.assert(isBoolean, 'Expected ' + this.toSafeString(this.actual) + ' to be a boolean');
    return this;
  },
  toBeFunction: function toBeFunction() {
    var isFunction = false;
    if (typeof this.actual === 'function') {
      isFunction = true;
    }
    this.assert(isFunction, 'Expected ' + this.toSafeString(this.actual) + ' to be a function');
    return this;
  },
  toBeGreaterThan: function toBeGreaterThan(expected) {
    var safeActual = this.getSafeActual('number');
    var isGreater = false;
    if (typeof this.actual === 'number' && !isNaN(safeActual) && safeActual > expected) {
      isGreater = true;
    }
    this.assert(isGreater, 'Expected ' + this.toSafeString(this.actual) + ' to be greater than ' + expected);
    return this;
  },
  toBeLessThan: function toBeLessThan(expected) {
    var safeActual = this.getSafeActual('number');
    var isLess = false;
    if (typeof this.actual === 'number' && !isNaN(safeActual) && safeActual < expected) {
      isLess = true;
    }
    this.assert(isLess, 'Expected ' + this.toSafeString(this.actual) + ' to be less than ' + expected);
    return this;
  },
  toBeGreaterThanOrEqual: function toBeGreaterThanOrEqual(expected) {
    var safeActual = this.getSafeActual('number');
    var isGreaterOrEqual = false;
    if (typeof this.actual === 'number' && !isNaN(safeActual) && safeActual >= expected) {
      isGreaterOrEqual = true;
    }
    this.assert(isGreaterOrEqual, 'Expected ' + this.toSafeString(this.actual) + ' to be greater than or equal to ' + expected);
    return this;
  },
  toBeLessThanOrEqual: function toBeLessThanOrEqual(expected) {
    var safeActual = this.getSafeActual('number');
    var isLessOrEqual = false;
    if (typeof this.actual === 'number' && !isNaN(safeActual) && safeActual <= expected) {
      isLessOrEqual = true;
    }
    this.assert(isLessOrEqual, 'Expected ' + this.toSafeString(this.actual) + ' to be less than or equal to ' + expected);
    return this;
  },
  toContain: function toContain(expected) {
    var safeActual = this.getSafeActual('string');
    var contains = false;
    if (typeof this.actual === 'string' && safeActual.indexOf(expected) !== -1) {
      contains = true;
    }
    this.assert(contains, 'Expected ' + this.toSafeString(this.actual) + ' to contain ' + expected);
    return this;
  },
  toInclude: function toInclude(expected) {
    var isArray = false;
    if (this.actual && this.actual.constructor === Array) {
      isArray = true;
    }
    var safeActual = this.getSafeActual('array');
    var includes = false;
    if (isArray) {
      for (var i = 0; i < safeActual.length; i++) {
        if (safeActual[i] === expected) {
          includes = true;
          break;
        }
      }
    }
    this.assert(includes, 'Expected ' + this.toSafeString(this.actual) + ' to include ' + this.toSafeString(expected));
    return this;
  },
  toBeInstanceOf: function toBeInstanceOf(expected) {
    // Handle undefined and null explicitly
    if (this.actual === undefined) {
      this.assert(false, 'Expected value to be an instance of ' + (expected.name || 'unknown type') + ', but got undefined');
    }
    if (this.actual === null) {
      this.assert(false, 'Expected value to be an instance of ' + (expected.name || 'unknown type') + ', but got null');
    }
    var isInstance = false;
    // Check constructor for native JS types (Number, String, etc.) and Adobe types (CompItem, Layer, etc.)
    if (this.actual && this.actual.constructor && this.actual.constructor === expected) {
      isInstance = true;
    }
    // Fallback: Use instanceof for user-defined classes or edge cases
    else if (this.actual && this.actual instanceof expected) {
      isInstance = true;
    }
    this.assert(isInstance, 'Expected ' + this.toSafeString(this.actual) + ' to be an instance of ' + (expected.name || 'unknown type'));
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

var KT = /*#__PURE__*/function () {
  function KT() {
    _defineProperty(this, "name", 'KtCore');
    _defineProperty(this, "version", '1.0.0');
  }
  KT.salute = function salute() {
    var obj = {
      name: 'KtCore',
      version: '1.0.0'
    };
    alert(JSON.stringify(obj));
    alert("Hello from ".concat(this.name, " "));
  };
  KT.Module = function Module(name, module) {
    if (this[name]) {
      $.writeln("Module ".concat(name, " already exists"));
    }
    this[name] = module;
  };
  return KT;
}();

KT.Module('Test', describe);
describe('JS Matchers Suite', function () {
  describe('Equality and Identity', function () {
    // Happy Path: Identical values and deep equality
    it('toBe passes with identical values', function () {
      expect(true).toBe(true);
      expect(1).toBe(1);
      expect('test').toBe('test');
    });
    it('toEqual passes with deep object equality', function () {
      expect({
        a: 1,
        b: 'test'
      }).toEqual({
        a: 1,
        b: 'test'
      });
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });

    // Grey Path: Similar but not identical values
    it('toBe fails with similar but non-identical values', function () {
      expect(function () {
        return expect('1').toBe(1);
      }).toThrow();
      expect(function () {
        return expect({
          a: 1
        }).toBe({
          a: 1
        });
      }).toThrow();
    });
    it('toEqual passes with nested objects', function () {
      expect({
        a: {
          b: 2
        }
      }).toEqual({
        a: {
          b: 2
        }
      });
    });

    // Sad Path: Invalid or unexpected inputs
    it('toBe handles null and undefined', function () {
      expect(null).toBe(null);
      expect(undefined).toBe(undefined);
      expect(function () {
        return expect(null).toBe(undefined);
      }).toThrow();
    });
    it('toEqual handles null and undefined', function () {
      expect(null).toEqual(null);
      expect(function () {
        return expect(null).toEqual(undefined);
      }).toThrow();
    });
  });
  describe('Existence and Type', function () {
    // Happy Path: Correct type and existence
    it('toBeDefined passes with defined values', function () {
      expect('test').toBeDefined();
      expect(0).toBeDefined();
    });
    it('toBeUndefined passes with undefined', function () {
      var value;
      expect(value).toBeUndefined();
    });
    it('toBeNull passes with null', function () {
      expect(null).toBeNull();
    });
    it('toBeNumber passes with valid numbers', function () {
      expect(42).toBeNumber();
      expect(0).toBeNumber();
      expect(-5.5).toBeNumber();
    });
    it('toBeNaN passes with NaN', function () {
      expect(NaN).toBeNaN();
    });
    it('toBeString passes with strings', function () {
      expect('hello').toBeString();
      expect('').toBeString();
    });
    it('toBeBoolean passes with booleans', function () {
      expect(true).toBeBoolean();
      expect(false).toBeBoolean();
    });
    it('toBeFunction passes with functions', function () {
      expect(function () {}).toBeFunction();
      expect(function () {}).toBeFunction();
    });
    it('toBeArray passes with arrays', function () {
      expect([]).toBeArray();
      expect([1, 2, 3]).toBeArray();
    });

    // Grey Path: Edge cases or ambiguous inputs
    it('toBeNumber fails with NaN', function () {
      expect(function () {
        return expect(NaN).toBeNumber();
      }).toThrow();
    });
    it('toBeNaN passes with invalid number parsing', function () {
      expect(parseInt('invalid')).toBeNaN();
    });

    // Sad Path: Invalid types or unexpected inputs
    it('toBeDefined fails with undefined', function () {
      expect(function () {
        return expect(undefined).toBeDefined();
      }).toThrow();
    });
    it('toBeNull fails with non-null', function () {
      expect(function () {
        return expect(0).toBeNull();
      }).toThrow();
    });
    it('toBeNumber fails with non-numbers', function () {
      expect(function () {
        return expect('42').toBeNumber();
      }).toThrow();
      expect(function () {
        return expect(null).toBeNumber();
      }).toThrow();
    });
    it('toBeString fails with non-strings', function () {
      expect(function () {
        return expect(123).toBeString();
      }).toThrow();
    });
  });
  describe('Truthiness', function () {
    // Happy Path: Clear truthy and falsy values
    it('toBeTruthy passes with truthy values', function () {
      expect(true).toBeTruthy();
      expect(1).toBeTruthy();
      expect('test').toBeTruthy();
      expect({}).toBeTruthy();
      expect([1]).toBeTruthy();
    });
    it('toBeFalsy passes with falsy values', function () {
      expect(false).toBeFalsy();
      expect(0).toBeFalsy();
      expect('').toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
    });

    // Grey Path: Edge cases of truthiness
    it('toBeTruthy passes with non-empty arrays', function () {
      expect([0]).toBeTruthy(); // Array is truthy despite falsy content
    });

    // Sad Path: Unexpected or edge falsy/truthy cases
    it('toBeTruthy fails with falsy values', function () {
      expect(function () {
        return expect(0).toBeTruthy();
      }).toThrow();
    });
    it('toBeFalsy fails with truthy values', function () {
      expect(function () {
        return expect('non-empty').toBeFalsy();
      }).toThrow();
    });
  });
  describe('Size and Content', function () {
    // Happy Path: Correct size and content
    it('toBeEmpty passes with empty arrays and strings', function () {
      expect([]).toBeEmpty();
      expect('').toBeEmpty();
    });
    it('toHaveLength passes with matching lengths', function () {
      expect([1, 2, 3]).toHaveLength(3);
      expect('abc').toHaveLength(3);
    });
    it('toContain passes with substrings', function () {
      expect('hello world').toContain('world');
      expect('test').toContain('es');
    });
    it('toInclude passes with array elements', function () {
      expect([1, 2, 3]).toInclude(2);
      expect(['a', 'b']).toInclude('a');
    });

    // Grey Path: Edge cases of size/content
    it('toBeEmpty passes with null and undefined', function () {
      expect(null).toBeEmpty();
      expect(undefined).toBeEmpty();
    });
    it('toHaveLength passes with zero length for null/undefined', function () {
      expect(null).toHaveLength(0);
      expect(undefined).toHaveLength(0);
    });
    it('toContain fails with partial matches', function () {
      expect(function () {
        return expect('hello').toContain('world');
      }).toThrow();
    });

    // Sad Path: Invalid or unexpected inputs
    it('toBeEmpty fails with non-empty values', function () {
      expect(function () {
        return expect([1]).toBeEmpty();
      }).toThrow();
      expect(function () {
        return expect('a').toBeEmpty();
      }).toThrow();
    });
    it('toHaveLength fails with incorrect lengths', function () {
      expect(function () {
        return expect('abc').toHaveLength(2);
      }).toThrow();
    });
    it('toInclude fails with non-members', function () {
      expect(function () {
        return expect([1, 2]).toInclude(3);
      }).toThrow();
    });
  });
  describe('Numeric Comparisons', function () {
    // Happy Path: Correct comparisons
    it('toBeGreaterThan passes with greater values', function () {
      expect(5).toBeGreaterThan(3);
      expect(0).toBeGreaterThan(-1);
    });
    it('toBeLessThan passes with lesser values', function () {
      expect(3).toBeLessThan(5);
      expect(-1).toBeLessThan(0);
    });
    it('toBeGreaterThanOrEqual passes with greater or equal values', function () {
      expect(5).toBeGreaterThanOrEqual(3);
      expect(5).toBeGreaterThanOrEqual(5);
    });
    it('toBeLessThanOrEqual passes with lesser or equal values', function () {
      expect(3).toBeLessThanOrEqual(5);
      expect(5).toBeLessThanOrEqual(5);
    });

    // Grey Path: Edge cases of equality
    it('toBeGreaterThan fails with equal values', function () {
      expect(function () {
        return expect(5).toBeGreaterThan(5);
      }).toThrow();
    });
    it('toBeLessThan fails with equal values', function () {
      expect(function () {
        return expect(5).toBeLessThan(5);
      }).toThrow();
    });

    // Sad Path: Invalid numeric inputs
    it('toBeGreaterThan fails with non-numbers', function () {
      expect(function () {
        return expect('5').toBeGreaterThan(3);
      }).toThrow();
      expect(function () {
        return expect(null).toBeGreaterThan(0);
      }).toThrow();
    });
    it('toBeLessThan handles NaN', function () {
      expect(function () {
        return expect(NaN).toBeLessThan(5);
      }).toThrow();
    });
  });
  describe('Instance Checking', function () {
    var TestClass = function TestClass() {
    }; // Happy Path: Correct instance
    it('toBeInstanceOf passes with correct instance', function () {
      var instance = new TestClass();
      expect(instance).toBeInstanceOf(TestClass);
    });

    // Grey Path: Subclass or similar type
    it('toBeInstanceOf fails with subclass', function () {
      var SubClass = /*#__PURE__*/function (_TestClass) {
        function SubClass() {
          return _TestClass.apply(this, arguments) || this;
        }
        _inheritsLoose(SubClass, _TestClass);
        return SubClass;
      }(TestClass);
      var instance = new SubClass();
      expect(instance).toBeInstanceOf(TestClass); // Should pass in JS, but testing specificity
    });

    // Sad Path: Wrong type or null
    it('toBeInstanceOf fails with wrong type', function () {
      expect(function () {
        return expect({}).toBeInstanceOf(TestClass);
      }).toThrow();
      expect(function () {
        return expect(null).toBeInstanceOf(TestClass);
      }).toThrow();
    });

    //Works with Adobe built-in classes
    it('toBeInstanceOf passes with built-in classes', function () {
      var comp = app.project.items.addComp('Test', 1920, 1080, 1, 10, 30);
      expect(comp).toBeInstanceOf(CompItem);
      comp.remove();
    });
  });
});
runTests(getSuites());
thisObj.KT = KT;
})(this);//# sourceMappingURL=index.js.map
