!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports, require("core-js/modules/es.array.index-of"), require("core-js/modules/es.array.slice"), require("core-js/modules/es.array.splice"), require("core-js/modules/es.object.get-prototype-of"), require("core-js/modules/es.array.join"), require("core-js/modules/es.date.to-string"), require("core-js/modules/es.object.to-string"), require("core-js/modules/es.regexp.exec"), require("core-js/modules/es.regexp.to-string"), require("core-js/modules/es.string.split"), require("core-js/modules/es.array.concat"), require("core-js/modules/es.array.filter"), require("core-js/modules/es.array.for-each"), require("core-js/modules/es.object.keys"), require("core-js/modules/es.string.match"), require("core-js/modules/web.dom-collections.for-each"), require("core-js/modules/es.array.reduce"), require("core-js/modules/es.array.map"), require("core-js/modules/es.object.assign"), require("core-js/modules/es.promise"), require("core-js/modules/es.array.find"), require("core-js/modules/es.array.iterator"), require("core-js/modules/es.string.iterator"), require("core-js/modules/web.dom-collections.iterator")) : "function" == typeof define && define.amd ? define(["exports", "core-js/modules/es.array.index-of", "core-js/modules/es.array.slice", "core-js/modules/es.array.splice", "core-js/modules/es.object.get-prototype-of", "core-js/modules/es.array.join", "core-js/modules/es.date.to-string", "core-js/modules/es.object.to-string", "core-js/modules/es.regexp.exec", "core-js/modules/es.regexp.to-string", "core-js/modules/es.string.split", "core-js/modules/es.array.concat", "core-js/modules/es.array.filter", "core-js/modules/es.array.for-each", "core-js/modules/es.object.keys", "core-js/modules/es.string.match", "core-js/modules/web.dom-collections.for-each", "core-js/modules/es.array.reduce", "core-js/modules/es.array.map", "core-js/modules/es.object.assign", "core-js/modules/es.promise", "core-js/modules/es.array.find", "core-js/modules/es.array.iterator", "core-js/modules/es.string.iterator", "core-js/modules/web.dom-collections.iterator"], t) : t(((e = e || self).test = e.test || {}, e.test.js = {}))
}(this, function (e) {
  "use strict";

  function t() {
    return Math.random().toString(36).substring(7).split("").join(".")
  }

  var w = {
    INIT: "@quick-redux/INIT".concat(t()),
    REPLACE: "@quick-redux/REPLACE".concat(t()),
    PROBE_UNKNOWN_ACTION: function () {
      return "@quick-redux/PROBE_UNKNOWN_ACTION".concat(t())
    }
  };

  function r(e) {
    return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }

  function o(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })), r.push.apply(r, o)
    }
    return r
  }

  function c(n) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? arguments[e] : {};
      e % 2 ? o(Object(i), !0).forEach(function (e) {
        var t, r, o;
        t = n, o = i[r = e], r in t ? Object.defineProperty(t, r, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : t[r] = o
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : o(Object(i)).forEach(function (e) {
        Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e))
      })
    }
    return n
  }

  function a(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = new Array(e.length); t < e.length; t++) r[t] = e[t];
        return r
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance")
    }()
  }

  function O(e) {
    if ("object" !== r(e) || null === e) return !1;
    for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t
  }

  var n = Object.getPrototypeOf(global) || global;

  function u(e) {
    n.currentState = e
  }

  function l() {
    return n.currentState
  }

  function d(e) {
    return n.__store = e
  }

  function i() {
    return n.__store
  }

  function f(e, t, r) {
    if ("function" == typeof t && "function" == typeof r || "function" == typeof r && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
    if ("function" == typeof t && void 0 === r && (r = t, t = void 0), void 0 !== r) {
      if ("function" != typeof r) throw new Error("Expected the enhancer to be a function.");
      return d(r(f)(e, t))
    }
    if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
    var o = e;
    u(t);
    var n = [], i = n, c = !1;

    function a() {
      i === n && (i = n.slice())
    }

    function s(e) {
      if (!O(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
      if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
      if (c) throw new Error("Reducers may not dispatch actions.");
      try {
        c = !0, u(o(l(), e))
      } finally {
        c = !1
      }
      for (var t = n = i, r = 0; r < t.length; r++) {
        (0, t[r])()
      }
      return e
    }

    return s({type: w.INIT}), d({
      dispatch: s, subscribe: function (t) {
        if ("function" != typeof t) throw new Error("Expected the listener to be a function.");
        if (c) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
        var r = !0;
        return a(), i.push(t), function () {
          if (r) {
            if (c) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            r = !1, a();
            var e = i.indexOf(t);
            i.splice(e, 1)
          }
        }
      }, getState: function () {
        if (c) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
        return l()
      }, replaceReducer: function (e) {
        if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
        o = e, s({type: w.REPLACE})
      }
    })
  }

  function E() {
    var e;
    return (e = console).warn.apply(e, arguments)
  }

  function s(e) {
    for (var t = Object.keys(e), g = {}, r = 0; r < t.length; r++) {
      var o = t[r];
      "production" !== process.env.NODE_ENV && void 0 === e[o] && E('No reducer provided for key "'.concat(o, '"')), "function" == typeof e[o] && (g[o] = e[o])
    }
    var b, j, n, v = Object.keys(g);
    "production" !== process.env.NODE_ENV && (b = {});
    try {
      n = g, Object.keys(n).forEach(function (e) {
        var t = n[e];
        if (void 0 === t(void 0, {type: w.INIT})) throw new Error('Reducer "'.concat(e, '" returned undefined during initialization. ') + "If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        if (void 0 === t(void 0, {type: w.PROBE_UNKNOWN_ACTION()})) throw new Error('Reducer "'.concat(e, '" returned undefined when probed with a random type. ') + "Don't try to handle ".concat(w.INIT, ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.")
      })
    } catch (e) {
      j = e
    }
    return function (e, t) {
      var r = 0 < arguments.length && void 0 !== e ? e : {}, o = 1 < arguments.length ? t : void 0;
      if (j) throw j;
      if ("production" !== process.env.NODE_ENV) {
        var n = function (e, t, r, o) {
          var n = Object.keys(t),
            i = r && r.type === w.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
          if (0 === n.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
          if (!O(e)) return "The ".concat(i, ' has unexpected type of "') + {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + 'keys: "'.concat(n.join('", "'), '"');
          var c = Object.keys(e).filter(function (e) {
            return !t.hasOwnProperty(e) && !o[e]
          });
          return c.forEach(function (e) {
            o[e] = !0
          }), r && r.type === w.REPLACE ? void 0 : 0 < c.length ? "Unexpected ".concat(1 < c.length ? "keys" : "key", " ") + '"'.concat(c.join('", "'), '" found in ').concat(i, ". ") + "Expected to find one of the known reducer keys instead: " + '"'.concat(n.join('", "'), '". Unexpected keys will be ignored.') : void 0
        }(r, g, o, b);
        n && E(n)
      }
      for (var i, c, a, s, u = !1, l = {}, d = 0; d < v.length; d++) {
        var f = v[d], p = g[f], y = r[f], h = p(y, o);
        if (void 0 === h) {
          var m = (i = f, void 0, a = (c = o) && c.type, s = a && 'action "'.concat(String(a), '"') || "an action", "Given ".concat(s, ', reducer "').concat(i, '" returned undefined. ') + "To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.");
          throw new Error(m)
        }
        l[f] = h, u = u || h !== y
      }
      return u ? l : r
    }
  }

  function p() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    return 0 === t.length ? function (e) {
      return e
    } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
      return function () {
        return e(t.apply(void 0, arguments))
      }
    })
  }

  function y() {
    for (var e = arguments.length, i = new Array(e), t = 0; t < e; t++) i[t] = arguments[t];
    return function (n) {
      return function () {
        var e = n.apply(void 0, arguments), t = function () {
          throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")
        }, r = {
          getState: e.getState, dispatch: function () {
            return t.apply(void 0, arguments)
          }
        }, o = i.map(function (e) {
          return e(r)
        });
        return c({}, e, {dispatch: t = p.apply(void 0, a(o))(e.dispatch)})
      }
    }
  }

  var h = Object.getPrototypeOf(global) || global;
  h._FUNCTION || (h._FUNCTION = {});
  var m = i();

  function g(o, e) {
    var r, n = o ? o(m.getState()) : {}, i = (r = e ? e(m.dispatch) : {}, Object.keys(r).forEach(function (e) {
      var t = r[e];
      for (h._FUNCTION[e] || (h._FUNCTION[e] = []), h._FUNCTION[e].push(t); 3 < h._FUNCTION[e].length;) h._FUNCTION[e].shift();
      r[e] = h._FUNCTION[e][h._FUNCTION[e].length - 1]
    }), r);
    return function (t) {
      function r() {
        function e() {
          var t = o ? o(m.getState()) : {};
          t && Object.keys(t).forEach(function (e) {
            n[e] = t[e], r[e] = n[e]
          })
        }

        var r = this;
        m.subscribe(function () {
          Promise.resolve().then(e)
        }), e()
      }

      var e = Object.assign(c({}, i, {}, t, {
        onInit: function () {
          var e;
          return this.__loading || (this.__loading = !0, r.call.apply(r, [this].concat(Array.prototype.slice.call(arguments)))), t.onInit && (e = t.onInit).call.apply(e, [this].concat(Array.prototype.slice.call(arguments)))
        }, onShow: function () {
          var e;
          return this.__loading || (this.__loading = !0, r.call.apply(r, [this].concat(Array.prototype.slice.call(arguments)))), t.onShow && (e = t.onShow).call.apply(e, [this].concat(Array.prototype.slice.call(arguments)))
        }
      }));
      return e.private ? e.protected = c({}, n, {}, t.private) : (t.data || (t.data = {}), e.data = c({}, n, {}, t.data)), e
    }
  }

  function b(e) {
    return "action:".concat(e)
  }

  function j(e, t) {
    var o = 0 < arguments.length && void 0 !== e ? e : [],
      n = 1 < arguments.length && void 0 !== t ? t : storageAPIDefault;
    return function () {
      return N.storage = o, function (r) {
        return function (t) {
          var e = o.find(function (e) {
            return e === t.type
          });
          return e && void 0 !== t.payload ? n.set({
            value: t.payload, key: b(t.type), complete: function () {
              return r(t)
            }
          }) : e && console.error("当前 action 存储失败，没有设置对应的 payload"), r(t)
        }
      }
    }
  }

  function v(e, t) {
    var n = 0 < arguments.length && void 0 !== e ? e : [],
      r = 1 < arguments.length && void 0 !== t ? t : storageAPIDefault, o = N.storage;
    return Promise.all(o.map(function (o) {
      var e = b(o);
      return new Promise(function (t) {
        r.get({
          key: e, success: function (e) {
            try {
              e = JSON.parse(e)
            } catch (e) {
            }
            t({data: e})
          }
        })
      }).then(function (r) {
        if (r && void 0 !== r.data && null !== r.data && "" !== r.data) return new Promise(function (t) {
          try {
            n.dispatch({type: o, payload: r.data}).then(function () {
              t()
            })
          } catch (e) {
            n.dispatch({type: o, payload: r.data}), t()
          }
        })
      })
    }))
  }

  var N = Object.getPrototypeOf(global) || global, S = v, I = {
    initStorage: v,
    initLocalStorage: S,
    createLocalStorage: j,
    getStore: i,
    combineReducers: s,
    createStore: f,
    connect: g,
    applyMiddleware: y,
    compose: p
  };
  e.applyMiddleware = y, e.combineReducers = s, e.compose = p, e.connect = g, e.createLocalStorage = j, e.createStore = f, e.default = I, e.getStore = i, e.initLocalStorage = S, e.initStorage = v, Object.defineProperty(e, "__esModule", {value: !0})
});
