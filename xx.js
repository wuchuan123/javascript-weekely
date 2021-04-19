"use strict";
var has = Object.prototype.hasOwnProperty,
  prefix = "~";
function Events() {}
function EE(e, t, n) {
  (this.fn = e), (this.context = t), (this.once = n || !1);
}
function addListener(e, t, n, r, i) {
  if ("function" != typeof n)
    throw new TypeError("The listener must be a function");
  var o = new EE(n, r || e, i),
    s = prefix ? prefix + t : t;
  return (
    e._events[s]
      ? e._events[s].fn
        ? (e._events[s] = [e._events[s], o])
        : e._events[s].push(o)
      : ((e._events[s] = o), e._eventsCount++),
    e
  );
}
function clearEvent(e, t) {
  0 == --e._eventsCount ? (e._events = new Events()) : delete e._events[t];
}
function EventEmitter() {
  (this._events = new Events()), (this._eventsCount = 0);
}
Object.create &&
  ((Events.prototype = Object.create(null)),
  new Events().__proto__ || (prefix = !1)),
  (EventEmitter.prototype.eventNames = function () {
    var e,
      t,
      n = [];
    if (0 === this._eventsCount) return n;
    for (t in (e = this._events))
      has.call(e, t) && n.push(prefix ? t.slice(1) : t);
    return Object.getOwnPropertySymbols
      ? n.concat(Object.getOwnPropertySymbols(e))
      : n;
  }),
  (EventEmitter.prototype.listeners = function (e) {
    var t = prefix ? prefix + e : e,
      n = this._events[t];
    if (!n) return [];
    if (n.fn) return [n.fn];
    for (var r = 0, i = n.length, o = new Array(i); r < i; r++) o[r] = n[r].fn;
    return o;
  }),
  (EventEmitter.prototype.listenerCount = function (e) {
    var t = prefix ? prefix + e : e,
      n = this._events[t];
    return n ? (n.fn ? 1 : n.length) : 0;
  }),
  (EventEmitter.prototype.emit = function (e, t, n, r, i, o) {
    var s = prefix ? prefix + e : e;
    if (!this._events[s]) return !1;
    var f,
      c = this._events[s],
      v = arguments.length;
    if (c.fn) {
      switch ((c.once && this.removeListener(e, c.fn, void 0, !0), v)) {
        case 1:
          return c.fn.call(c.context), !0;
        case 2:
          return c.fn.call(c.context, t), !0;
        case 3:
          return c.fn.call(c.context, t, n), !0;
        case 4:
          return c.fn.call(c.context, t, n, r), !0;
        case 5:
          return c.fn.call(c.context, t, n, r, i), !0;
        case 6:
          return c.fn.call(c.context, t, n, r, i, o), !0;
      }
      for (l = 1, f = new Array(v - 1); l < v; l++) f[l - 1] = arguments[l];
      c.fn.apply(c.context, f);
    } else
      for (var a, p = c.length, l = 0; l < p; l++)
        switch ((c[l].once && this.removeListener(e, c[l].fn, void 0, !0), v)) {
          case 1:
            c[l].fn.call(c[l].context);
            break;
          case 2:
            c[l].fn.call(c[l].context, t);
            break;
          case 3:
            c[l].fn.call(c[l].context, t, n);
            break;
          case 4:
            c[l].fn.call(c[l].context, t, n, r);
            break;
          default:
            if (!f)
              for (a = 1, f = new Array(v - 1); a < v; a++)
                f[a - 1] = arguments[a];
            c[l].fn.apply(c[l].context, f);
        }
    return !0;
  }),
  (EventEmitter.prototype.on = function (e, t, n) {
    return addListener(this, e, t, n, !1);
  }),
  (EventEmitter.prototype.once = function (e, t, n) {
    return addListener(this, e, t, n, !0);
  }),
  (EventEmitter.prototype.removeListener = function (e, t, n, r) {
    var i = prefix ? prefix + e : e;
    if (!this._events[i]) return this;
    if (!t) return clearEvent(this, i), this;
    var o = this._events[i];
    if (o.fn)
      o.fn !== t ||
        (r && !o.once) ||
        (n && o.context !== n) ||
        clearEvent(this, i);
    else {
      for (var s = 0, f = [], c = o.length; s < c; s++)
        (o[s].fn !== t || (r && !o[s].once) || (n && o[s].context !== n)) &&
          f.push(o[s]);
      f.length
        ? (this._events[i] = 1 === f.length ? f[0] : f)
        : clearEvent(this, i);
    }
    return this;
  }),
  (EventEmitter.prototype.removeAllListeners = function (e) {
    var t;
    return (
      e
        ? ((t = prefix ? prefix + e : e),
          this._events[t] && clearEvent(this, t))
        : ((this._events = new Events()), (this._eventsCount = 0)),
      this
    );
  }),
  (EventEmitter.prototype.off = EventEmitter.prototype.removeListener),
  (EventEmitter.prototype.addListener = EventEmitter.prototype.on),
  (EventEmitter.prefixed = prefix),
  (EventEmitter.EventEmitter = EventEmitter),
  "undefined" != typeof module && (module.exports = EventEmitter);
