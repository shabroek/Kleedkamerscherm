"use strict";

(self.webpackChunkKleedkamerscherm = self.webpackChunkKleedkamerscherm || []).push([[179], {
  370: () => {
    function xn(e) {
      return "function" == typeof e;
    }
    let Jr = !1;
    const ht = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(e) {
        if (e) {
          const t = new Error();
          console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack);
        } else Jr && console.log("RxJS: Back to a better error behavior. Thank you. <3");
        Jr = e;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return Jr;
      }
    };
    function fn(e) {
      setTimeout(() => {
        throw e;
      }, 0);
    }
    const fo = {
        closed: !0,
        next(e) {},
        error(e) {
          if (ht.useDeprecatedSynchronousErrorHandling) throw e;
          fn(e);
        },
        complete() {}
      },
      cd = Array.isArray || (e => e && "number" == typeof e.length);
    function ld(e) {
      return null !== e && "object" == typeof e;
    }
    const ho = (() => {
      function e(t) {
        return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((n, r) => `${r + 1}) ${n.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this;
      }
      return e.prototype = Object.create(Error.prototype), e;
    })();
    class fe {
      constructor(t) {
        this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._unsubscribe = t);
      }
      unsubscribe() {
        let t;
        if (this.closed) return;
        let {
          _parentOrParents: n,
          _unsubscribe: r,
          _subscriptions: i
        } = this;
        if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof fe) n.remove(this);else if (null !== n) for (let o = 0; o < n.length; ++o) n[o].remove(this);
        if (xn(r)) try {
          r.call(this);
        } catch (o) {
          t = o instanceof ho ? dd(o.errors) : [o];
        }
        if (cd(i)) {
          let o = -1,
            s = i.length;
          for (; ++o < s;) {
            const a = i[o];
            if (ld(a)) try {
              a.unsubscribe();
            } catch (u) {
              t = t || [], u instanceof ho ? t = t.concat(dd(u.errors)) : t.push(u);
            }
          }
        }
        if (t) throw new ho(t);
      }
      add(t) {
        let n = t;
        if (!t) return fe.EMPTY;
        switch (typeof t) {
          case "function":
            n = new fe(t);
          case "object":
            if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
            if (this.closed) return n.unsubscribe(), n;
            if (!(n instanceof fe)) {
              const o = n;
              n = new fe(), n._subscriptions = [o];
            }
            break;
          default:
            throw new Error("unrecognized teardown " + t + " added to Subscription.");
        }
        let {
          _parentOrParents: r
        } = n;
        if (null === r) n._parentOrParents = this;else if (r instanceof fe) {
          if (r === this) return n;
          n._parentOrParents = [r, this];
        } else {
          if (-1 !== r.indexOf(this)) return n;
          r.push(this);
        }
        const i = this._subscriptions;
        return null === i ? this._subscriptions = [n] : i.push(n), n;
      }
      remove(t) {
        const n = this._subscriptions;
        if (n) {
          const r = n.indexOf(t);
          -1 !== r && n.splice(r, 1);
        }
      }
    }
    var e;
    function dd(e) {
      return e.reduce((t, n) => t.concat(n instanceof ho ? n.errors : n), []);
    }
    fe.EMPTY = ((e = new fe()).closed = !0, e);
    const po = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
    class ue extends fe {
      constructor(t, n, r) {
        switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
          case 0:
            this.destination = fo;
            break;
          case 1:
            if (!t) {
              this.destination = fo;
              break;
            }
            if ("object" == typeof t) {
              t instanceof ue ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new fd(this, t));
              break;
            }
          default:
            this.syncErrorThrowable = !0, this.destination = new fd(this, t, n, r);
        }
      }
      [po]() {
        return this;
      }
      static create(t, n, r) {
        const i = new ue(t, n, r);
        return i.syncErrorThrowable = !1, i;
      }
      next(t) {
        this.isStopped || this._next(t);
      }
      error(t) {
        this.isStopped || (this.isStopped = !0, this._error(t));
      }
      complete() {
        this.isStopped || (this.isStopped = !0, this._complete());
      }
      unsubscribe() {
        this.closed || (this.isStopped = !0, super.unsubscribe());
      }
      _next(t) {
        this.destination.next(t);
      }
      _error(t) {
        this.destination.error(t), this.unsubscribe();
      }
      _complete() {
        this.destination.complete(), this.unsubscribe();
      }
      _unsubscribeAndRecycle() {
        const {
          _parentOrParents: t
        } = this;
        return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this;
      }
    }
    class fd extends ue {
      constructor(t, n, r, i) {
        super(), this._parentSubscriber = t;
        let o,
          s = this;
        xn(n) ? o = n : n && (o = n.next, r = n.error, i = n.complete, n !== fo && (s = Object.create(n), xn(s.unsubscribe) && this.add(s.unsubscribe.bind(s)), s.unsubscribe = this.unsubscribe.bind(this))), this._context = s, this._next = o, this._error = r, this._complete = i;
      }
      next(t) {
        if (!this.isStopped && this._next) {
          const {
            _parentSubscriber: n
          } = this;
          ht.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable ? this.__tryOrSetError(n, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t);
        }
      }
      error(t) {
        if (!this.isStopped) {
          const {
              _parentSubscriber: n
            } = this,
            {
              useDeprecatedSynchronousErrorHandling: r
            } = ht;
          if (this._error) r && n.syncErrorThrowable ? (this.__tryOrSetError(n, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe());else if (n.syncErrorThrowable) r ? (n.syncErrorValue = t, n.syncErrorThrown = !0) : fn(t), this.unsubscribe();else {
            if (this.unsubscribe(), r) throw t;
            fn(t);
          }
        }
      }
      complete() {
        if (!this.isStopped) {
          const {
            _parentSubscriber: t
          } = this;
          if (this._complete) {
            const n = () => this._complete.call(this._context);
            ht.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe());
          } else this.unsubscribe();
        }
      }
      __tryOrUnsub(t, n) {
        try {
          t.call(this._context, n);
        } catch (r) {
          if (this.unsubscribe(), ht.useDeprecatedSynchronousErrorHandling) throw r;
          fn(r);
        }
      }
      __tryOrSetError(t, n, r) {
        if (!ht.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
        try {
          n.call(this._context, r);
        } catch (i) {
          return ht.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = i, t.syncErrorThrown = !0, !0) : (fn(i), !0);
        }
        return !1;
      }
      _unsubscribe() {
        const {
          _parentSubscriber: t
        } = this;
        this._context = null, this._parentSubscriber = null, t.unsubscribe();
      }
    }
    const ei = "function" == typeof Symbol && Symbol.observable || "@@observable";
    function go(e) {
      return e;
    }
    function hd(e) {
      return 0 === e.length ? go : 1 === e.length ? e[0] : function (n) {
        return e.reduce((r, i) => i(r), n);
      };
    }
    let ge = (() => {
      class e {
        constructor(n) {
          this._isScalar = !1, n && (this._subscribe = n);
        }
        lift(n) {
          const r = new e();
          return r.source = this, r.operator = n, r;
        }
        subscribe(n, r, i) {
          const {
              operator: o
            } = this,
            s = function FD(e, t, n) {
              if (e) {
                if (e instanceof ue) return e;
                if (e[po]) return e[po]();
              }
              return e || t || n ? new ue(e, t, n) : new ue(fo);
            }(n, r, i);
          if (s.add(o ? o.call(s, this.source) : this.source || ht.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), ht.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
          return s;
        }
        _trySubscribe(n) {
          try {
            return this._subscribe(n);
          } catch (r) {
            ht.useDeprecatedSynchronousErrorHandling && (n.syncErrorThrown = !0, n.syncErrorValue = r), function ND(e) {
              for (; e;) {
                const {
                  closed: t,
                  destination: n,
                  isStopped: r
                } = e;
                if (t || r) return !1;
                e = n && n instanceof ue ? n : null;
              }
              return !0;
            }(n) ? n.error(r) : console.warn(r);
          }
        }
        forEach(n, r) {
          return new (r = pd(r))((i, o) => {
            let s;
            s = this.subscribe(a => {
              try {
                n(a);
              } catch (u) {
                o(u), s && s.unsubscribe();
              }
            }, o, i);
          });
        }
        _subscribe(n) {
          const {
            source: r
          } = this;
          return r && r.subscribe(n);
        }
        [ei]() {
          return this;
        }
        pipe(...n) {
          return 0 === n.length ? this : hd(n)(this);
        }
        toPromise(n) {
          return new (n = pd(n))((r, i) => {
            let o;
            this.subscribe(s => o = s, s => i(s), () => r(o));
          });
        }
      }
      return e.create = t => new e(t), e;
    })();
    function pd(e) {
      if (e || (e = ht.Promise || Promise), !e) throw new Error("no Promise impl found");
      return e;
    }
    const Xn = (() => {
      function e() {
        return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this;
      }
      return e.prototype = Object.create(Error.prototype), e;
    })();
    class LD extends fe {
      constructor(t, n) {
        super(), this.subject = t, this.subscriber = n, this.closed = !1;
      }
      unsubscribe() {
        if (this.closed) return;
        this.closed = !0;
        const t = this.subject,
          n = t.observers;
        if (this.subject = null, !n || 0 === n.length || t.isStopped || t.closed) return;
        const r = n.indexOf(this.subscriber);
        -1 !== r && n.splice(r, 1);
      }
    }
    class gd extends ue {
      constructor(t) {
        super(t), this.destination = t;
      }
    }
    let Nt = (() => {
      class e extends ge {
        constructor() {
          super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null;
        }
        [po]() {
          return new gd(this);
        }
        lift(n) {
          const r = new md(this, this);
          return r.operator = n, r;
        }
        next(n) {
          if (this.closed) throw new Xn();
          if (!this.isStopped) {
            const {
                observers: r
              } = this,
              i = r.length,
              o = r.slice();
            for (let s = 0; s < i; s++) o[s].next(n);
          }
        }
        error(n) {
          if (this.closed) throw new Xn();
          this.hasError = !0, this.thrownError = n, this.isStopped = !0;
          const {
              observers: r
            } = this,
            i = r.length,
            o = r.slice();
          for (let s = 0; s < i; s++) o[s].error(n);
          this.observers.length = 0;
        }
        complete() {
          if (this.closed) throw new Xn();
          this.isStopped = !0;
          const {
              observers: n
            } = this,
            r = n.length,
            i = n.slice();
          for (let o = 0; o < r; o++) i[o].complete();
          this.observers.length = 0;
        }
        unsubscribe() {
          this.isStopped = !0, this.closed = !0, this.observers = null;
        }
        _trySubscribe(n) {
          if (this.closed) throw new Xn();
          return super._trySubscribe(n);
        }
        _subscribe(n) {
          if (this.closed) throw new Xn();
          return this.hasError ? (n.error(this.thrownError), fe.EMPTY) : this.isStopped ? (n.complete(), fe.EMPTY) : (this.observers.push(n), new LD(this, n));
        }
        asObservable() {
          const n = new ge();
          return n.source = this, n;
        }
      }
      return e.create = (t, n) => new md(t, n), e;
    })();
    class md extends Nt {
      constructor(t, n) {
        super(), this.destination = t, this.source = n;
      }
      next(t) {
        const {
          destination: n
        } = this;
        n && n.next && n.next(t);
      }
      error(t) {
        const {
          destination: n
        } = this;
        n && n.error && this.destination.error(t);
      }
      complete() {
        const {
          destination: t
        } = this;
        t && t.complete && this.destination.complete();
      }
      _subscribe(t) {
        const {
          source: n
        } = this;
        return n ? this.source.subscribe(t) : fe.EMPTY;
      }
    }
    function mo(e) {
      return e && "function" == typeof e.schedule;
    }
    class yo extends ue {
      constructor(t, n, r) {
        super(), this.parent = t, this.outerValue = n, this.outerIndex = r, this.index = 0;
      }
      _next(t) {
        this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this);
      }
      _error(t) {
        this.parent.notifyError(t, this), this.unsubscribe();
      }
      _complete() {
        this.parent.notifyComplete(this), this.unsubscribe();
      }
    }
    const yd = e => t => {
        for (let n = 0, r = e.length; n < r && !t.closed; n++) t.next(e[n]);
        t.complete();
      },
      vo = function $D() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
      }(),
      vd = e => e && "number" == typeof e.length && "function" != typeof e;
    function Dd(e) {
      return !!e && "function" != typeof e.subscribe && "function" == typeof e.then;
    }
    const wd = e => {
      if (e && "function" == typeof e[ei]) return (e => t => {
        const n = e[ei]();
        if ("function" != typeof n.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
        return n.subscribe(t);
      })(e);
      if (vd(e)) return yd(e);
      if (Dd(e)) return (e => t => (e.then(n => {
        t.closed || (t.next(n), t.complete());
      }, n => t.error(n)).then(null, fn), t))(e);
      if (e && "function" == typeof e[vo]) return (e => t => {
        const n = e[vo]();
        for (;;) {
          const r = n.next();
          if (r.done) {
            t.complete();
            break;
          }
          if (t.next(r.value), t.closed) break;
        }
        return "function" == typeof n.return && t.add(() => {
          n.return && n.return();
        }), t;
      })(e);
      {
        const n = `You provided ${ld(e) ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
        throw new TypeError(n);
      }
    };
    function Do(e, t, n, r, i = new yo(e, n, r)) {
      if (!i.closed) return t instanceof ge ? t.subscribe(i) : wd(t)(i);
    }
    class wo extends ue {
      notifyNext(t, n, r, i, o) {
        this.destination.next(n);
      }
      notifyError(t, n) {
        this.destination.error(t);
      }
      notifyComplete(t) {
        this.destination.complete();
      }
    }
    function j(e, t) {
      return function (r) {
        if ("function" != typeof e) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
        return r.lift(new BD(e, t));
      };
    }
    class BD {
      constructor(t, n) {
        this.project = t, this.thisArg = n;
      }
      call(t, n) {
        return n.subscribe(new VD(t, this.project, this.thisArg));
      }
    }
    class VD extends ue {
      constructor(t, n, r) {
        super(t), this.project = n, this.count = 0, this.thisArg = r || this;
      }
      _next(t) {
        let n;
        try {
          n = this.project.call(this.thisArg, t, this.count++);
        } catch (r) {
          return void this.destination.error(r);
        }
        this.destination.next(n);
      }
    }
    function Ca(e, t) {
      return new ge(n => {
        const r = new fe();
        let i = 0;
        return r.add(t.schedule(function () {
          i !== e.length ? (n.next(e[i++]), n.closed || r.add(this.schedule())) : n.complete();
        })), r;
      });
    }
    function Re(e, t) {
      return t ? function YD(e, t) {
        if (null != e) {
          if (function qD(e) {
            return e && "function" == typeof e[ei];
          }(e)) return function zD(e, t) {
            return new ge(n => {
              const r = new fe();
              return r.add(t.schedule(() => {
                const i = e[ei]();
                r.add(i.subscribe({
                  next(o) {
                    r.add(t.schedule(() => n.next(o)));
                  },
                  error(o) {
                    r.add(t.schedule(() => n.error(o)));
                  },
                  complete() {
                    r.add(t.schedule(() => n.complete()));
                  }
                }));
              })), r;
            });
          }(e, t);
          if (Dd(e)) return function GD(e, t) {
            return new ge(n => {
              const r = new fe();
              return r.add(t.schedule(() => e.then(i => {
                r.add(t.schedule(() => {
                  n.next(i), r.add(t.schedule(() => n.complete()));
                }));
              }, i => {
                r.add(t.schedule(() => n.error(i)));
              }))), r;
            });
          }(e, t);
          if (vd(e)) return Ca(e, t);
          if (function KD(e) {
            return e && "function" == typeof e[vo];
          }(e) || "string" == typeof e) return function WD(e, t) {
            if (!e) throw new Error("Iterable cannot be null");
            return new ge(n => {
              const r = new fe();
              let i;
              return r.add(() => {
                i && "function" == typeof i.return && i.return();
              }), r.add(t.schedule(() => {
                i = e[vo](), r.add(t.schedule(function () {
                  if (n.closed) return;
                  let o, s;
                  try {
                    const a = i.next();
                    o = a.value, s = a.done;
                  } catch (a) {
                    return void n.error(a);
                  }
                  s ? n.complete() : (n.next(o), this.schedule());
                }));
              })), r;
            });
          }(e, t);
        }
        throw new TypeError((null !== e && typeof e || e) + " is not observable");
      }(e, t) : e instanceof ge ? e : new ge(wd(e));
    }
    function ke(e, t, n = Number.POSITIVE_INFINITY) {
      return "function" == typeof t ? r => r.pipe(ke((i, o) => Re(e(i, o)).pipe(j((s, a) => t(i, s, o, a))), n)) : ("number" == typeof t && (n = t), r => r.lift(new ZD(e, n)));
    }
    class ZD {
      constructor(t, n = Number.POSITIVE_INFINITY) {
        this.project = t, this.concurrent = n;
      }
      call(t, n) {
        return n.subscribe(new QD(t, this.project, this.concurrent));
      }
    }
    class QD extends wo {
      constructor(t, n, r = Number.POSITIVE_INFINITY) {
        super(t), this.project = n, this.concurrent = r, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0;
      }
      _next(t) {
        this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t);
      }
      _tryNext(t) {
        let n;
        const r = this.index++;
        try {
          n = this.project(t, r);
        } catch (i) {
          return void this.destination.error(i);
        }
        this.active++, this._innerSub(n, t, r);
      }
      _innerSub(t, n, r) {
        const i = new yo(this, n, r),
          o = this.destination;
        o.add(i);
        const s = Do(this, t, void 0, void 0, i);
        s !== i && o.add(s);
      }
      _complete() {
        this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe();
      }
      notifyNext(t, n, r, i, o) {
        this.destination.next(n);
      }
      notifyComplete(t) {
        const n = this.buffer;
        this.remove(t), this.active--, n.length > 0 ? this._next(n.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
      }
    }
    function Jn(e = Number.POSITIVE_INFINITY) {
      return ke(go, e);
    }
    function _a(e, t) {
      return t ? Ca(e, t) : new ge(yd(e));
    }
    function Cd(...e) {
      let t = Number.POSITIVE_INFINITY,
        n = null,
        r = e[e.length - 1];
      return mo(r) ? (n = e.pop(), e.length > 1 && "number" == typeof e[e.length - 1] && (t = e.pop())) : "number" == typeof r && (t = e.pop()), null === n && 1 === e.length && e[0] instanceof ge ? e[0] : Jn(t)(_a(e, n));
    }
    function Co() {
      return function (t) {
        return t.lift(new XD(t));
      };
    }
    class XD {
      constructor(t) {
        this.connectable = t;
      }
      call(t, n) {
        const {
          connectable: r
        } = this;
        r._refCount++;
        const i = new JD(t, r),
          o = n.subscribe(i);
        return i.closed || (i.connection = r.connect()), o;
      }
    }
    class JD extends ue {
      constructor(t, n) {
        super(t), this.connectable = n;
      }
      _unsubscribe() {
        const {
          connectable: t
        } = this;
        if (!t) return void (this.connection = null);
        this.connectable = null;
        const n = t._refCount;
        if (n <= 0) return void (this.connection = null);
        if (t._refCount = n - 1, n > 1) return void (this.connection = null);
        const {
            connection: r
          } = this,
          i = t._connection;
        this.connection = null, i && (!r || i === r) && i.unsubscribe();
      }
    }
    class ba extends ge {
      constructor(t, n) {
        super(), this.source = t, this.subjectFactory = n, this._refCount = 0, this._isComplete = !1;
      }
      _subscribe(t) {
        return this.getSubject().subscribe(t);
      }
      getSubject() {
        const t = this._subject;
        return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject;
      }
      connect() {
        let t = this._connection;
        return t || (this._isComplete = !1, t = this._connection = new fe(), t.add(this.source.subscribe(new tw(this.getSubject(), this))), t.closed && (this._connection = null, t = fe.EMPTY)), t;
      }
      refCount() {
        return Co()(this);
      }
    }
    const ew = (() => {
      const e = ba.prototype;
      return {
        operator: {
          value: null
        },
        _refCount: {
          value: 0,
          writable: !0
        },
        _subject: {
          value: null,
          writable: !0
        },
        _connection: {
          value: null,
          writable: !0
        },
        _subscribe: {
          value: e._subscribe
        },
        _isComplete: {
          value: e._isComplete,
          writable: !0
        },
        getSubject: {
          value: e.getSubject
        },
        connect: {
          value: e.connect
        },
        refCount: {
          value: e.refCount
        }
      };
    })();
    class tw extends gd {
      constructor(t, n) {
        super(t), this.connectable = n;
      }
      _error(t) {
        this._unsubscribe(), super._error(t);
      }
      _complete() {
        this.connectable._isComplete = !0, this._unsubscribe(), super._complete();
      }
      _unsubscribe() {
        const t = this.connectable;
        if (t) {
          this.connectable = null;
          const n = t._connection;
          t._refCount = 0, t._subject = null, t._connection = null, n && n.unsubscribe();
        }
      }
    }
    class iw {
      constructor(t, n) {
        this.subjectFactory = t, this.selector = n;
      }
      call(t, n) {
        const {
            selector: r
          } = this,
          i = this.subjectFactory(),
          o = r(i).subscribe(t);
        return o.add(n.subscribe(i)), o;
      }
    }
    function ow() {
      return new Nt();
    }
    function ne(e) {
      for (let t in e) if (e[t] === ne) return t;
      throw Error("Could not find renamed property on target object.");
    }
    function ie(e) {
      if ("string" == typeof e) return e;
      if (Array.isArray(e)) return "[" + e.map(ie).join(", ") + "]";
      if (null == e) return "" + e;
      if (e.overriddenName) return `${e.overriddenName}`;
      if (e.name) return `${e.name}`;
      const t = e.toString();
      if (null == t) return "" + t;
      const n = t.indexOf("\n");
      return -1 === n ? t : t.substring(0, n);
    }
    function Ia(e, t) {
      return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t;
    }
    const aw = ne({
      __forward_ref__: ne
    });
    function Sa(e) {
      return e.__forward_ref__ = Sa, e.toString = function () {
        return ie(this());
      }, e;
    }
    function F(e) {
      return Ma(e) ? e() : e;
    }
    function Ma(e) {
      return "function" == typeof e && e.hasOwnProperty(aw) && e.__forward_ref__ === Sa;
    }
    function xa(e) {
      return e && !!e.ɵproviders;
    }
    const _d = "https://g.co/ng/security#xss";
    class _ extends Error {
      constructor(t, n) {
        super(_o(t, n)), this.code = t;
      }
    }
    function _o(e, t) {
      return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
    }
    function $(e) {
      return "string" == typeof e ? e : null == e ? "" : String(e);
    }
    function bo(e, t) {
      throw new _(-201, !1);
    }
    function pt(e, t) {
      null == e && function ee(e, t, n, r) {
        throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`));
      }(t, e, null, "!=");
    }
    function R(e) {
      return {
        token: e.token,
        providedIn: e.providedIn || null,
        factory: e.factory,
        value: void 0
      };
    }
    function pn(e) {
      return {
        providers: e.providers || [],
        imports: e.imports || []
      };
    }
    function Eo(e) {
      return bd(e, Io) || bd(e, Id);
    }
    function bd(e, t) {
      return e.hasOwnProperty(t) ? e[t] : null;
    }
    function Ed(e) {
      return e && (e.hasOwnProperty(Ta) || e.hasOwnProperty(mw)) ? e[Ta] : null;
    }
    const Io = ne({
        ɵprov: ne
      }),
      Ta = ne({
        ɵinj: ne
      }),
      Id = ne({
        ngInjectableDef: ne
      }),
      mw = ne({
        ngInjectorDef: ne
      });
    var k = (() => ((k = k || {})[k.Default = 0] = "Default", k[k.Host = 1] = "Host", k[k.Self = 2] = "Self", k[k.SkipSelf = 4] = "SkipSelf", k[k.Optional = 8] = "Optional", k))();
    let Aa;
    function gt(e) {
      const t = Aa;
      return Aa = e, t;
    }
    function Sd(e, t, n) {
      const r = Eo(e);
      return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & k.Optional ? null : void 0 !== t ? t : void bo(ie(e));
    }
    const se = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(),
      ti = {},
      Ra = "__NG_DI_FLAG__",
      So = "ngTempTokenPath",
      vw = "ngTokenPath",
      Dw = /\n/gm,
      ww = "\u0275",
      Md = "__source";
    let ni;
    function er(e) {
      const t = ni;
      return ni = e, t;
    }
    function Cw(e, t = k.Default) {
      if (void 0 === ni) throw new _(-203, !1);
      return null === ni ? Sd(e, void 0, t) : ni.get(e, t & k.Optional ? null : void 0, t);
    }
    function x(e, t = k.Default) {
      return (function yw() {
        return Aa;
      }() || Cw)(F(e), t);
    }
    function q(e, t = k.Default) {
      return x(e, Mo(t));
    }
    function Mo(e) {
      return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
    }
    function Pa(e) {
      const t = [];
      for (let n = 0; n < e.length; n++) {
        const r = F(e[n]);
        if (Array.isArray(r)) {
          if (0 === r.length) throw new _(900, !1);
          let i,
            o = k.Default;
          for (let s = 0; s < r.length; s++) {
            const a = r[s],
              u = _w(a);
            "number" == typeof u ? -1 === u ? i = a.token : o |= u : i = a;
          }
          t.push(x(i, o));
        } else t.push(x(r));
      }
      return t;
    }
    function ri(e, t) {
      return e[Ra] = t, e.prototype[Ra] = t, e;
    }
    function _w(e) {
      return e[Ra];
    }
    function qt(e) {
      return {
        toString: e
      }.toString();
    }
    var Ft = (() => ((Ft = Ft || {})[Ft.OnPush = 0] = "OnPush", Ft[Ft.Default = 1] = "Default", Ft))(),
      kt = (() => (function (e) {
        e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom";
      }(kt || (kt = {})), kt))();
    const Kt = {},
      X = [],
      xo = ne({
        ɵcmp: ne
      }),
      Oa = ne({
        ɵdir: ne
      }),
      Na = ne({
        ɵpipe: ne
      }),
      Td = ne({
        ɵmod: ne
      }),
      Yt = ne({
        ɵfac: ne
      }),
      ii = ne({
        __NG_ELEMENT_ID__: ne
      });
    let Iw = 0;
    function Tn(e) {
      return qt(() => {
        const t = Rd(e),
          n = {
            ...t,
            decls: e.decls,
            vars: e.vars,
            template: e.template,
            consts: e.consts || null,
            ngContentSelectors: e.ngContentSelectors,
            onPush: e.changeDetection === Ft.OnPush,
            directiveDefs: null,
            pipeDefs: null,
            dependencies: t.standalone && e.dependencies || null,
            getStandaloneInjector: null,
            data: e.data || {},
            encapsulation: e.encapsulation || kt.Emulated,
            id: "c" + Iw++,
            styles: e.styles || X,
            _: null,
            schemas: e.schemas || null,
            tView: null
          };
        Pd(n);
        const r = e.dependencies;
        return n.directiveDefs = To(r, !1), n.pipeDefs = To(r, !0), n;
      });
    }
    function Mw(e) {
      return te(e) || Le(e);
    }
    function xw(e) {
      return null !== e;
    }
    function An(e) {
      return qt(() => ({
        type: e.type,
        bootstrap: e.bootstrap || X,
        declarations: e.declarations || X,
        imports: e.imports || X,
        exports: e.exports || X,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null
      }));
    }
    function Ad(e, t) {
      if (null == e) return Kt;
      const n = {};
      for (const r in e) if (e.hasOwnProperty(r)) {
        let i = e[r],
          o = i;
        Array.isArray(i) && (o = i[1], i = i[0]), n[i] = r, t && (t[i] = o);
      }
      return n;
    }
    function Be(e) {
      return qt(() => {
        const t = Rd(e);
        return Pd(t), t;
      });
    }
    function Pe(e) {
      return {
        type: e.type,
        name: e.name,
        factory: null,
        pure: !1 !== e.pure,
        standalone: !0 === e.standalone,
        onDestroy: e.type.prototype.ngOnDestroy || null
      };
    }
    function te(e) {
      return e[xo] || null;
    }
    function Le(e) {
      return e[Oa] || null;
    }
    function Je(e) {
      return e[Na] || null;
    }
    function it(e, t) {
      const n = e[Td] || null;
      if (!n && !0 === t) throw new Error(`Type ${ie(e)} does not have '\u0275mod' property.`);
      return n;
    }
    function Rd(e) {
      const t = {};
      return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        exportAs: e.exportAs || null,
        standalone: !0 === e.standalone,
        selectors: e.selectors || X,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: Ad(e.inputs, t),
        outputs: Ad(e.outputs)
      };
    }
    function Pd(e) {
      e.features?.forEach(t => t(e));
    }
    function To(e, t) {
      if (!e) return null;
      const n = t ? Je : Mw;
      return () => ("function" == typeof e ? e() : e).map(r => n(r)).filter(xw);
    }
    const Zt = 0,
      E = 1,
      z = 2,
      he = 3,
      Et = 4,
      Rn = 5,
      je = 6,
      nr = 7,
      me = 8,
      Ao = 9,
      Ro = 10,
      W = 11,
      Fa = 12,
      oi = 13,
      Od = 14,
      rr = 15,
      $e = 16,
      si = 17,
      ir = 18,
      Lt = 19,
      ai = 20,
      Nd = 21,
      ae = 22,
      ka = 1,
      Fd = 2,
      Po = 7,
      Oo = 8,
      or = 9,
      Ve = 10;
    function ot(e) {
      return Array.isArray(e) && "object" == typeof e[ka];
    }
    function It(e) {
      return Array.isArray(e) && !0 === e[ka];
    }
    function La(e) {
      return 0 != (4 & e.flags);
    }
    function ui(e) {
      return e.componentOffset > -1;
    }
    function No(e) {
      return 1 == (1 & e.flags);
    }
    function St(e) {
      return !!e.template;
    }
    function Aw(e) {
      return 0 != (256 & e[z]);
    }
    function Pn(e, t) {
      return e.hasOwnProperty(Yt) ? e[Yt] : null;
    }
    class Ow {
      constructor(t, n, r) {
        this.previousValue = t, this.currentValue = n, this.firstChange = r;
      }
      isFirstChange() {
        return this.firstChange;
      }
    }
    function On() {
      return jd;
    }
    function jd(e) {
      return e.type.prototype.ngOnChanges && (e.setInput = Fw), Nw;
    }
    function Nw() {
      const e = Ud(this),
        t = e?.current;
      if (t) {
        const n = e.previous;
        if (n === Kt) e.previous = t;else for (let r in t) n[r] = t[r];
        e.current = null, this.ngOnChanges(t);
      }
    }
    function Fw(e, t, n, r) {
      const i = this.declaredInputs[n],
        o = Ud(e) || function kw(e, t) {
          return e[$d] = t;
        }(e, {
          previous: Kt,
          current: null
        }),
        s = o.current || (o.current = {}),
        a = o.previous,
        u = a[i];
      s[i] = new Ow(u && u.currentValue, t, a === Kt), e[r] = t;
    }
    On.ngInherit = !0;
    const $d = "__ngSimpleChanges__";
    function Ud(e) {
      return e[$d] || null;
    }
    const mt = function (e, t, n) {},
      Hd = "svg";
    function Oe(e) {
      for (; Array.isArray(e);) e = e[Zt];
      return e;
    }
    function Fo(e, t) {
      return Oe(t[e]);
    }
    function st(e, t) {
      return Oe(t[e.index]);
    }
    function Vd(e, t) {
      return e.data[t];
    }
    function at(e, t) {
      const n = t[e];
      return ot(n) ? n : n[Zt];
    }
    function ko(e) {
      return 64 == (64 & e[z]);
    }
    function gn(e, t) {
      return null == t ? null : e[t];
    }
    function zd(e) {
      e[ir] = 0;
    }
    function $a(e, t) {
      e[Rn] += t;
      let n = e,
        r = e[he];
      for (; null !== r && (1 === t && 1 === n[Rn] || -1 === t && 0 === n[Rn]);) r[Rn] += t, n = r, r = r[he];
    }
    const U = {
      lFrame: ef(null),
      bindingsEnabled: !0
    };
    function Wd() {
      return U.bindingsEnabled;
    }
    function y() {
      return U.lFrame.lView;
    }
    function Z() {
      return U.lFrame.tView;
    }
    function Ne() {
      let e = qd();
      for (; null !== e && 64 === e.type;) e = e.parent;
      return e;
    }
    function qd() {
      return U.lFrame.currentTNode;
    }
    function jt(e, t) {
      const n = U.lFrame;
      n.currentTNode = e, n.isParent = t;
    }
    function Ua() {
      return U.lFrame.isParent;
    }
    function Ha() {
      U.lFrame.isParent = !1;
    }
    function ar() {
      return U.lFrame.bindingIndex++;
    }
    function Qw(e, t) {
      const n = U.lFrame;
      n.bindingIndex = n.bindingRootIndex = e, Ba(t);
    }
    function Ba(e) {
      U.lFrame.currentDirectiveIndex = e;
    }
    function za(e) {
      U.lFrame.currentQueryIndex = e;
    }
    function Jw(e) {
      const t = e[E];
      return 2 === t.type ? t.declTNode : 1 === t.type ? e[je] : null;
    }
    function Xd(e, t, n) {
      if (n & k.SkipSelf) {
        let i = t,
          o = e;
        for (; !(i = i.parent, null !== i || n & k.Host || (i = Jw(o), null === i || (o = o[rr], 10 & i.type))););
        if (null === i) return !1;
        t = i, e = o;
      }
      const r = U.lFrame = Jd();
      return r.currentTNode = t, r.lView = e, !0;
    }
    function Ga(e) {
      const t = Jd(),
        n = e[E];
      U.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1;
    }
    function Jd() {
      const e = U.lFrame,
        t = null === e ? null : e.child;
      return null === t ? ef(e) : t;
    }
    function ef(e) {
      const t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1
      };
      return null !== e && (e.child = t), t;
    }
    function tf() {
      const e = U.lFrame;
      return U.lFrame = e.parent, e.currentTNode = null, e.lView = null, e;
    }
    const nf = tf;
    function Wa() {
      const e = tf();
      e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0;
    }
    function Ge() {
      return U.lFrame.selectedIndex;
    }
    function Nn(e) {
      U.lFrame.selectedIndex = e;
    }
    function Lo(e, t) {
      for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        const o = e.data[n].type.prototype,
          {
            ngAfterContentInit: s,
            ngAfterContentChecked: a,
            ngAfterViewInit: u,
            ngAfterViewChecked: c,
            ngOnDestroy: l
          } = o;
        s && (e.contentHooks || (e.contentHooks = [])).push(-n, s), a && ((e.contentHooks || (e.contentHooks = [])).push(n, a), (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)), u && (e.viewHooks || (e.viewHooks = [])).push(-n, u), c && ((e.viewHooks || (e.viewHooks = [])).push(n, c), (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, c)), null != l && (e.destroyHooks || (e.destroyHooks = [])).push(n, l);
      }
    }
    function jo(e, t, n) {
      af(e, t, 3, n);
    }
    function $o(e, t, n, r) {
      (3 & e[z]) === n && af(e, t, n, r);
    }
    function qa(e, t) {
      let n = e[z];
      (3 & n) === t && (n &= 2047, n += 1, e[z] = n);
    }
    function af(e, t, n, r) {
      const o = r ?? -1,
        s = t.length - 1;
      let a = 0;
      for (let u = void 0 !== r ? 65535 & e[ir] : 0; u < s; u++) if ("number" == typeof t[u + 1]) {
        if (a = t[u], null != r && a >= r) break;
      } else t[u] < 0 && (e[ir] += 65536), (a < o || -1 == o) && (sC(e, n, t, u), e[ir] = (4294901760 & e[ir]) + u + 2), u++;
    }
    function sC(e, t, n, r) {
      const i = n[r] < 0,
        o = n[r + 1],
        a = e[i ? -n[r] : n[r]];
      if (i) {
        if (e[z] >> 11 < e[ir] >> 16 && (3 & e[z]) === t) {
          e[z] += 2048, mt(4, a, o);
          try {
            o.call(a);
          } finally {
            mt(5, a, o);
          }
        }
      } else {
        mt(4, a, o);
        try {
          o.call(a);
        } finally {
          mt(5, a, o);
        }
      }
    }
    const ur = -1;
    class li {
      constructor(t, n, r) {
        this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r;
      }
    }
    function Ya(e, t, n) {
      let r = 0;
      for (; r < n.length;) {
        const i = n[r];
        if ("number" == typeof i) {
          if (0 !== i) break;
          r++;
          const o = n[r++],
            s = n[r++],
            a = n[r++];
          e.setAttribute(t, s, a, o);
        } else {
          const o = i,
            s = n[++r];
          cf(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
        }
      }
      return r;
    }
    function uf(e) {
      return 3 === e || 4 === e || 6 === e;
    }
    function cf(e) {
      return 64 === e.charCodeAt(0);
    }
    function di(e, t) {
      if (null !== t && 0 !== t.length) if (null === e || 0 === e.length) e = t.slice();else {
        let n = -1;
        for (let r = 0; r < t.length; r++) {
          const i = t[r];
          "number" == typeof i ? n = i : 0 === n || lf(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
        }
      }
      return e;
    }
    function lf(e, t, n, r, i) {
      let o = 0,
        s = e.length;
      if (-1 === t) s = -1;else for (; o < e.length;) {
        const a = e[o++];
        if ("number" == typeof a) {
          if (a === t) {
            s = -1;
            break;
          }
          if (a > t) {
            s = o - 1;
            break;
          }
        }
      }
      for (; o < e.length;) {
        const a = e[o];
        if ("number" == typeof a) break;
        if (a === n) {
          if (null === r) return void (null !== i && (e[o + 1] = i));
          if (r === e[o + 1]) return void (e[o + 2] = i);
        }
        o++, null !== r && o++, null !== i && o++;
      }
      -1 !== s && (e.splice(s, 0, t), o = s + 1), e.splice(o++, 0, n), null !== r && e.splice(o++, 0, r), null !== i && e.splice(o++, 0, i);
    }
    function df(e) {
      return e !== ur;
    }
    function Uo(e) {
      return 32767 & e;
    }
    function Ho(e, t) {
      let n = function lC(e) {
          return e >> 16;
        }(e),
        r = t;
      for (; n > 0;) r = r[rr], n--;
      return r;
    }
    let Za = !0;
    function Bo(e) {
      const t = Za;
      return Za = e, t;
    }
    const ff = 255,
      hf = 5;
    let dC = 0;
    const $t = {};
    function Vo(e, t) {
      const n = pf(e, t);
      if (-1 !== n) return n;
      const r = t[E];
      r.firstCreatePass && (e.injectorIndex = t.length, Qa(r.data, e), Qa(t, null), Qa(r.blueprint, null));
      const i = Xa(e, t),
        o = e.injectorIndex;
      if (df(i)) {
        const s = Uo(i),
          a = Ho(i, t),
          u = a[E].data;
        for (let c = 0; c < 8; c++) t[o + c] = a[s + c] | u[s + c];
      }
      return t[o + 8] = i, o;
    }
    function Qa(e, t) {
      e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
    }
    function pf(e, t) {
      return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex;
    }
    function Xa(e, t) {
      if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
      let n = 0,
        r = null,
        i = t;
      for (; null !== i;) {
        if (r = _f(i), null === r) return ur;
        if (n++, i = i[rr], -1 !== r.injectorIndex) return r.injectorIndex | n << 16;
      }
      return ur;
    }
    function Ja(e, t, n) {
      !function fC(e, t, n) {
        let r;
        "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(ii) && (r = n[ii]), null == r && (r = n[ii] = dC++);
        const i = r & ff;
        t.data[e + (i >> hf)] |= 1 << i;
      }(e, t, n);
    }
    function gf(e, t, n) {
      if (n & k.Optional || void 0 !== e) return e;
      bo();
    }
    function mf(e, t, n, r) {
      if (n & k.Optional && void 0 === r && (r = null), !(n & (k.Self | k.Host))) {
        const i = e[Ao],
          o = gt(void 0);
        try {
          return i ? i.get(t, r, n & k.Optional) : Sd(t, r, n & k.Optional);
        } finally {
          gt(o);
        }
      }
      return gf(r, 0, n);
    }
    function yf(e, t, n, r = k.Default, i) {
      if (null !== e) {
        if (1024 & t[z]) {
          const s = function yC(e, t, n, r, i) {
            let o = e,
              s = t;
            for (; null !== o && null !== s && 1024 & s[z] && !(256 & s[z]);) {
              const a = vf(o, s, n, r | k.Self, $t);
              if (a !== $t) return a;
              let u = o.parent;
              if (!u) {
                const c = s[Nd];
                if (c) {
                  const l = c.get(n, $t, r);
                  if (l !== $t) return l;
                }
                u = _f(s), s = s[rr];
              }
              o = u;
            }
            return i;
          }(e, t, n, r, $t);
          if (s !== $t) return s;
        }
        const o = vf(e, t, n, r, $t);
        if (o !== $t) return o;
      }
      return mf(t, n, r, i);
    }
    function vf(e, t, n, r, i) {
      const o = function gC(e) {
        if ("string" == typeof e) return e.charCodeAt(0) || 0;
        const t = e.hasOwnProperty(ii) ? e[ii] : void 0;
        return "number" == typeof t ? t >= 0 ? t & ff : mC : t;
      }(n);
      if ("function" == typeof o) {
        if (!Xd(t, e, r)) return r & k.Host ? gf(i, 0, r) : mf(t, n, r, i);
        try {
          const s = o(r);
          if (null != s || r & k.Optional) return s;
          bo();
        } finally {
          nf();
        }
      } else if ("number" == typeof o) {
        let s = null,
          a = pf(e, t),
          u = ur,
          c = r & k.Host ? t[$e][je] : null;
        for ((-1 === a || r & k.SkipSelf) && (u = -1 === a ? Xa(e, t) : t[a + 8], u !== ur && wf(r, !1) ? (s = t[E], a = Uo(u), t = Ho(u, t)) : a = -1); -1 !== a;) {
          const l = t[E];
          if (Df(o, a, l.data)) {
            const d = pC(a, t, n, s, r, c);
            if (d !== $t) return d;
          }
          u = t[a + 8], u !== ur && wf(r, t[E].data[a + 8] === c) && Df(o, a, t) ? (s = l, a = Uo(u), t = Ho(u, t)) : a = -1;
        }
      }
      return i;
    }
    function pC(e, t, n, r, i, o) {
      const s = t[E],
        a = s.data[e + 8],
        l = function zo(e, t, n, r, i) {
          const o = e.providerIndexes,
            s = t.data,
            a = 1048575 & o,
            u = e.directiveStart,
            l = o >> 20,
            f = i ? a + l : e.directiveEnd;
          for (let h = r ? a : a + l; h < f; h++) {
            const p = s[h];
            if (h < u && n === p || h >= u && p.type === n) return h;
          }
          if (i) {
            const h = s[u];
            if (h && St(h) && h.type === n) return u;
          }
          return null;
        }(a, s, n, null == r ? ui(a) && Za : r != s && 0 != (3 & a.type), i & k.Host && o === a);
      return null !== l ? Fn(t, s, l, a) : $t;
    }
    function Fn(e, t, n, r) {
      let i = e[n];
      const o = t.data;
      if (function aC(e) {
        return e instanceof li;
      }(i)) {
        const s = i;
        s.resolving && function uw(e, t) {
          const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
          throw new _(-200, `Circular dependency in DI detected for ${e}${n}`);
        }(function J(e) {
          return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : $(e);
        }(o[n]));
        const a = Bo(s.canSeeViewProviders);
        s.resolving = !0;
        const u = s.injectImpl ? gt(s.injectImpl) : null;
        Xd(e, r, k.Default);
        try {
          i = e[n] = s.factory(void 0, o, e, r), t.firstCreatePass && n >= r.directiveStart && function oC(e, t, n) {
            const {
              ngOnChanges: r,
              ngOnInit: i,
              ngDoCheck: o
            } = t.type.prototype;
            if (r) {
              const s = jd(t);
              (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, s);
            }
            i && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i), o && ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(e, o));
          }(n, o[n], t);
        } finally {
          null !== u && gt(u), Bo(a), s.resolving = !1, nf();
        }
      }
      return i;
    }
    function Df(e, t, n) {
      return !!(n[t + (e >> hf)] & 1 << e);
    }
    function wf(e, t) {
      return !(e & k.Self || e & k.Host && t);
    }
    class cr {
      constructor(t, n) {
        this._tNode = t, this._lView = n;
      }
      get(t, n, r) {
        return yf(this._tNode, this._lView, t, Mo(r), n);
      }
    }
    function mC() {
      return new cr(Ne(), y());
    }
    function eu(e) {
      return Ma(e) ? () => {
        const t = eu(F(e));
        return t && t();
      } : Pn(e);
    }
    function _f(e) {
      const t = e[E],
        n = t.type;
      return 2 === n ? t.declTNode : 1 === n ? e[je] : null;
    }
    const dr = "__parameters__";
    function hr(e, t, n) {
      return qt(() => {
        const r = function tu(e) {
          return function (...n) {
            if (e) {
              const r = e(...n);
              for (const i in r) this[i] = r[i];
            }
          };
        }(t);
        function i(...o) {
          if (this instanceof i) return r.apply(this, o), this;
          const s = new i(...o);
          return a.annotation = s, a;
          function a(u, c, l) {
            const d = u.hasOwnProperty(dr) ? u[dr] : Object.defineProperty(u, dr, {
              value: []
            })[dr];
            for (; d.length <= l;) d.push(null);
            return (d[l] = d[l] || []).push(s), u;
          }
        }
        return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = e, i.annotationCls = i, i;
      });
    }
    class T {
      constructor(t, n) {
        this._desc = t, this.ngMetadataName = "InjectionToken", this.ɵprov = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.ɵprov = R({
          token: this,
          providedIn: n.providedIn || "root",
          factory: n.factory
        }));
      }
      get multi() {
        return this;
      }
      toString() {
        return `InjectionToken ${this._desc}`;
      }
    }
    function kn(e, t) {
      e.forEach(n => Array.isArray(n) ? kn(n, t) : t(n));
    }
    function Ef(e, t, n) {
      t >= e.length ? e.push(n) : e.splice(t, 0, n);
    }
    function Wo(e, t) {
      return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
    }
    function ut(e, t, n) {
      let r = pr(e, t);
      return r >= 0 ? e[1 | r] = n : (r = ~r, function CC(e, t, n, r) {
        let i = e.length;
        if (i == t) e.push(n, r);else if (1 === i) e.push(r, e[0]), e[0] = n;else {
          for (i--, e.push(e[i - 1], e[i]); i > t;) e[i] = e[i - 2], i--;
          e[t] = n, e[t + 1] = r;
        }
      }(e, r, t, n)), r;
    }
    function ru(e, t) {
      const n = pr(e, t);
      if (n >= 0) return e[1 | n];
    }
    function pr(e, t) {
      return function If(e, t, n) {
        let r = 0,
          i = e.length >> n;
        for (; i !== r;) {
          const o = r + (i - r >> 1),
            s = e[o << n];
          if (t === s) return o << n;
          s > t ? i = o : r = o + 1;
        }
        return ~(i << n);
      }(e, t, 1);
    }
    const gi = ri(hr("Optional"), 8),
      mi = ri(hr("SkipSelf"), 4);
    var et = (() => ((et = et || {})[et.Important = 1] = "Important", et[et.DashCase = 2] = "DashCase", et))();
    const cu = new Map();
    let VC = 0;
    const du = "__ngContext__";
    function Ue(e, t) {
      ot(t) ? (e[du] = t[ai], function GC(e) {
        cu.set(e[ai], e);
      }(t)) : e[du] = t;
    }
    let fu;
    function hu(e, t) {
      return fu(e, t);
    }
    function wi(e) {
      const t = e[he];
      return It(t) ? t[he] : t;
    }
    function pu(e) {
      return Gf(e[oi]);
    }
    function gu(e) {
      return Gf(e[Et]);
    }
    function Gf(e) {
      for (; null !== e && !It(e);) e = e[Et];
      return e;
    }
    function mr(e, t, n, r, i) {
      if (null != r) {
        let o,
          s = !1;
        It(r) ? o = r : ot(r) && (s = !0, r = r[Zt]);
        const a = Oe(r);
        0 === e && null !== n ? null == i ? Qf(t, n, a) : Ln(t, n, a, i || null, !0) : 1 === e && null !== n ? Ln(t, n, a, i || null, !0) : 2 === e ? function _u(e, t, n) {
          const r = Zo(e, t);
          r && function d_(e, t, n, r) {
            e.removeChild(t, n, r);
          }(e, r, t, n);
        }(t, a, s) : 3 === e && t.destroyNode(a), null != o && function p_(e, t, n, r, i) {
          const o = n[Po];
          o !== Oe(n) && mr(t, e, r, o, i);
          for (let a = Ve; a < n.length; a++) {
            const u = n[a];
            Ci(u[E], u, e, t, r, o);
          }
        }(t, e, o, n, i);
      }
    }
    function yu(e, t, n) {
      return e.createElement(t, n);
    }
    function qf(e, t) {
      const n = e[or],
        r = n.indexOf(t),
        i = t[he];
      512 & t[z] && (t[z] &= -513, $a(i, -1)), n.splice(r, 1);
    }
    function vu(e, t) {
      if (e.length <= Ve) return;
      const n = Ve + t,
        r = e[n];
      if (r) {
        const i = r[si];
        null !== i && i !== e && qf(i, r), t > 0 && (e[n - 1][Et] = r[Et]);
        const o = Wo(e, Ve + t);
        !function r_(e, t) {
          Ci(e, t, t[W], 2, null, null), t[Zt] = null, t[je] = null;
        }(r[E], r);
        const s = o[Lt];
        null !== s && s.detachView(o[E]), r[he] = null, r[Et] = null, r[z] &= -65;
      }
      return r;
    }
    function Kf(e, t) {
      if (!(128 & t[z])) {
        const n = t[W];
        n.destroyNode && Ci(e, t, n, 3, null, null), function s_(e) {
          let t = e[oi];
          if (!t) return Du(e[E], e);
          for (; t;) {
            let n = null;
            if (ot(t)) n = t[oi];else {
              const r = t[Ve];
              r && (n = r);
            }
            if (!n) {
              for (; t && !t[Et] && t !== e;) ot(t) && Du(t[E], t), t = t[he];
              null === t && (t = e), ot(t) && Du(t[E], t), n = t && t[Et];
            }
            t = n;
          }
        }(t);
      }
    }
    function Du(e, t) {
      if (!(128 & t[z])) {
        t[z] &= -65, t[z] |= 128, function l_(e, t) {
          let n;
          if (null != e && null != (n = e.destroyHooks)) for (let r = 0; r < n.length; r += 2) {
            const i = t[n[r]];
            if (!(i instanceof li)) {
              const o = n[r + 1];
              if (Array.isArray(o)) for (let s = 0; s < o.length; s += 2) {
                const a = i[o[s]],
                  u = o[s + 1];
                mt(4, a, u);
                try {
                  u.call(a);
                } finally {
                  mt(5, a, u);
                }
              } else {
                mt(4, i, o);
                try {
                  o.call(i);
                } finally {
                  mt(5, i, o);
                }
              }
            }
          }
        }(e, t), function c_(e, t) {
          const n = e.cleanup,
            r = t[nr];
          let i = -1;
          if (null !== n) for (let o = 0; o < n.length - 1; o += 2) if ("string" == typeof n[o]) {
            const s = n[o + 3];
            s >= 0 ? r[i = s]() : r[i = -s].unsubscribe(), o += 2;
          } else {
            const s = r[i = n[o + 1]];
            n[o].call(s);
          }
          if (null !== r) {
            for (let o = i + 1; o < r.length; o++) (0, r[o])();
            t[nr] = null;
          }
        }(e, t), 1 === t[E].type && t[W].destroy();
        const n = t[si];
        if (null !== n && It(t[he])) {
          n !== t[he] && qf(n, t);
          const r = t[Lt];
          null !== r && r.detachView(e);
        }
        !function WC(e) {
          cu.delete(e[ai]);
        }(t);
      }
    }
    function Yf(e, t, n) {
      return function Zf(e, t, n) {
        let r = t;
        for (; null !== r && 40 & r.type;) r = (t = r).parent;
        if (null === r) return n[Zt];
        {
          const {
            componentOffset: i
          } = r;
          if (i > -1) {
            const {
              encapsulation: o
            } = e.data[r.directiveStart + i];
            if (o === kt.None || o === kt.Emulated) return null;
          }
          return st(r, n);
        }
      }(e, t.parent, n);
    }
    function Ln(e, t, n, r, i) {
      e.insertBefore(t, n, r, i);
    }
    function Qf(e, t, n) {
      e.appendChild(t, n);
    }
    function Xf(e, t, n, r, i) {
      null !== r ? Ln(e, t, n, r, i) : Qf(e, t, n);
    }
    function Zo(e, t) {
      return e.parentNode(t);
    }
    let wu,
      Iu,
      th = function eh(e, t, n) {
        return 40 & e.type ? st(e, n) : null;
      };
    function Qo(e, t, n, r) {
      const i = Yf(e, r, t),
        o = t[W],
        a = function Jf(e, t, n) {
          return th(e, t, n);
        }(r.parent || t[je], r, t);
      if (null != i) if (Array.isArray(n)) for (let u = 0; u < n.length; u++) Xf(o, i, n[u], a, !1);else Xf(o, i, n, a, !1);
      void 0 !== wu && wu(o, r, t, n, i);
    }
    function Xo(e, t) {
      if (null !== t) {
        const n = t.type;
        if (3 & n) return st(t, e);
        if (4 & n) return Cu(-1, e[t.index]);
        if (8 & n) {
          const r = t.child;
          if (null !== r) return Xo(e, r);
          {
            const i = e[t.index];
            return It(i) ? Cu(-1, i) : Oe(i);
          }
        }
        if (32 & n) return hu(t, e)() || Oe(e[t.index]);
        {
          const r = rh(e, t);
          return null !== r ? Array.isArray(r) ? r[0] : Xo(wi(e[$e]), r) : Xo(e, t.next);
        }
      }
      return null;
    }
    function rh(e, t) {
      return null !== t ? e[$e][je].projection[t.projection] : null;
    }
    function Cu(e, t) {
      const n = Ve + e + 1;
      if (n < t.length) {
        const r = t[n],
          i = r[E].firstChild;
        if (null !== i) return Xo(r, i);
      }
      return t[Po];
    }
    function bu(e, t, n, r, i, o, s) {
      for (; null != n;) {
        const a = r[n.index],
          u = n.type;
        if (s && 0 === t && (a && Ue(Oe(a), r), n.flags |= 2), 32 != (32 & n.flags)) if (8 & u) bu(e, t, n.child, r, i, o, !1), mr(t, e, i, a, o);else if (32 & u) {
          const c = hu(n, r);
          let l;
          for (; l = c();) mr(t, e, i, l, o);
          mr(t, e, i, a, o);
        } else 16 & u ? ih(e, t, r, n, i, o) : mr(t, e, i, a, o);
        n = s ? n.projectionNext : n.next;
      }
    }
    function Ci(e, t, n, r, i, o) {
      bu(n, r, e.firstChild, t, i, o, !1);
    }
    function ih(e, t, n, r, i, o) {
      const s = n[$e],
        u = s[je].projection[r.projection];
      if (Array.isArray(u)) for (let c = 0; c < u.length; c++) mr(t, e, i, u[c], o);else bu(e, t, u, s[he], i, o, !0);
    }
    function oh(e, t, n) {
      "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
    }
    function sh(e, t, n) {
      const {
        mergedAttrs: r,
        classes: i,
        styles: o
      } = n;
      null !== r && Ya(e, t, r), null !== i && oh(e, t, i), null !== o && function m_(e, t, n) {
        e.setAttribute(t, "style", n);
      }(e, t, o);
    }
    class dh {
      constructor(t) {
        this.changingThisBreaksApplicationSecurity = t;
      }
      toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${_d})`;
      }
    }
    function mn(e) {
      return e instanceof dh ? e.changingThisBreaksApplicationSecurity : e;
    }
    const A_ = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
    var _e = (() => ((_e = _e || {})[_e.NONE = 0] = "NONE", _e[_e.HTML = 1] = "HTML", _e[_e.STYLE = 2] = "STYLE", _e[_e.SCRIPT = 3] = "SCRIPT", _e[_e.URL = 4] = "URL", _e[_e.RESOURCE_URL = 5] = "RESOURCE_URL", _e))();
    function vr(e) {
      const t = function Ei() {
        const e = y();
        return e && e[Fa];
      }();
      return t ? t.sanitize(_e.URL, e) || "" : function _i(e, t) {
        const n = function S_(e) {
          return e instanceof dh && e.getTypeName() || null;
        }(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${_d})`);
        }
        return n === t;
      }(e, "URL") ? mn(e) : function Mu(e) {
        return (e = String(e)).match(A_) ? e : "unsafe:" + e;
      }($(e));
    }
    const ns = new T("ENVIRONMENT_INITIALIZER"),
      wh = new T("INJECTOR", -1),
      Ch = new T("INJECTOR_DEF_TYPES");
    class _h {
      get(t, n = ti) {
        if (n === ti) {
          const r = new Error(`NullInjectorError: No provider for ${ie(t)}!`);
          throw r.name = "NullInjectorError", r;
        }
        return n;
      }
    }
    function z_(...e) {
      return {
        ɵproviders: bh(0, e),
        ɵfromNgModule: !0
      };
    }
    function bh(e, ...t) {
      const n = [],
        r = new Set();
      let i;
      return kn(t, o => {
        const s = o;
        Ru(s, n, [], r) && (i || (i = []), i.push(s));
      }), void 0 !== i && Eh(i, n), n;
    }
    function Eh(e, t) {
      for (let n = 0; n < e.length; n++) {
        const {
          providers: i
        } = e[n];
        Pu(i, o => {
          t.push(o);
        });
      }
    }
    function Ru(e, t, n, r) {
      if (!(e = F(e))) return !1;
      let i = null,
        o = Ed(e);
      const s = !o && te(e);
      if (o || s) {
        if (s && !s.standalone) return !1;
        i = e;
      } else {
        const u = e.ngModule;
        if (o = Ed(u), !o) return !1;
        i = u;
      }
      const a = r.has(i);
      if (s) {
        if (a) return !1;
        if (r.add(i), s.dependencies) {
          const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
          for (const c of u) Ru(c, t, n, r);
        }
      } else {
        if (!o) return !1;
        {
          if (null != o.imports && !a) {
            let c;
            r.add(i);
            try {
              kn(o.imports, l => {
                Ru(l, t, n, r) && (c || (c = []), c.push(l));
              });
            } finally {}
            void 0 !== c && Eh(c, t);
          }
          if (!a) {
            const c = Pn(i) || (() => new i());
            t.push({
              provide: i,
              useFactory: c,
              deps: X
            }, {
              provide: Ch,
              useValue: i,
              multi: !0
            }, {
              provide: ns,
              useValue: () => x(i),
              multi: !0
            });
          }
          const u = o.providers;
          null == u || a || Pu(u, l => {
            t.push(l);
          });
        }
      }
      return i !== e && void 0 !== e.providers;
    }
    function Pu(e, t) {
      for (let n of e) xa(n) && (n = n.ɵproviders), Array.isArray(n) ? Pu(n, t) : t(n);
    }
    const G_ = ne({
      provide: String,
      useValue: ne
    });
    function Ou(e) {
      return null !== e && "object" == typeof e && G_ in e;
    }
    function jn(e) {
      return "function" == typeof e;
    }
    const Nu = new T("Set Injector scope."),
      rs = {},
      q_ = {};
    let Fu;
    function is() {
      return void 0 === Fu && (Fu = new _h()), Fu;
    }
    class Ut {}
    class Mh extends Ut {
      get destroyed() {
        return this._destroyed;
      }
      constructor(t, n, r, i) {
        super(), this.parent = n, this.source = r, this.scopes = i, this.records = new Map(), this._ngOnDestroyHooks = new Set(), this._onDestroyHooks = [], this._destroyed = !1, Lu(t, s => this.processProvider(s)), this.records.set(wh, Dr(void 0, this)), i.has("environment") && this.records.set(Ut, Dr(void 0, this));
        const o = this.records.get(Nu);
        null != o && "string" == typeof o.value && this.scopes.add(o.value), this.injectorDefTypes = new Set(this.get(Ch.multi, X, k.Self));
      }
      destroy() {
        this.assertNotDestroyed(), this._destroyed = !0;
        try {
          for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
          for (const t of this._onDestroyHooks) t();
        } finally {
          this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), this._onDestroyHooks.length = 0;
        }
      }
      onDestroy(t) {
        this._onDestroyHooks.push(t);
      }
      runInContext(t) {
        this.assertNotDestroyed();
        const n = er(this),
          r = gt(void 0);
        try {
          return t();
        } finally {
          er(n), gt(r);
        }
      }
      get(t, n = ti, r = k.Default) {
        this.assertNotDestroyed(), r = Mo(r);
        const i = er(this),
          o = gt(void 0);
        try {
          if (!(r & k.SkipSelf)) {
            let a = this.records.get(t);
            if (void 0 === a) {
              const u = function X_(e) {
                return "function" == typeof e || "object" == typeof e && e instanceof T;
              }(t) && Eo(t);
              a = u && this.injectableDefInScope(u) ? Dr(ku(t), rs) : null, this.records.set(t, a);
            }
            if (null != a) return this.hydrate(t, a);
          }
          return (r & k.Self ? is() : this.parent).get(t, n = r & k.Optional && n === ti ? null : n);
        } catch (s) {
          if ("NullInjectorError" === s.name) {
            if ((s[So] = s[So] || []).unshift(ie(t)), i) throw s;
            return function bw(e, t, n, r) {
              const i = e[So];
              throw t[Md] && i.unshift(t[Md]), e.message = function Ew(e, t, n, r = null) {
                e = e && "\n" === e.charAt(0) && e.charAt(1) == ww ? e.slice(2) : e;
                let i = ie(t);
                if (Array.isArray(t)) i = t.map(ie).join(" -> ");else if ("object" == typeof t) {
                  let o = [];
                  for (let s in t) if (t.hasOwnProperty(s)) {
                    let a = t[s];
                    o.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : ie(a)));
                  }
                  i = `{${o.join(", ")}}`;
                }
                return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(Dw, "\n  ")}`;
              }("\n" + e.message, i, n, r), e[vw] = i, e[So] = null, e;
            }(s, t, "R3InjectorError", this.source);
          }
          throw s;
        } finally {
          gt(o), er(i);
        }
      }
      resolveInjectorInitializers() {
        const t = er(this),
          n = gt(void 0);
        try {
          const r = this.get(ns.multi, X, k.Self);
          for (const i of r) i();
        } finally {
          er(t), gt(n);
        }
      }
      toString() {
        const t = [],
          n = this.records;
        for (const r of n.keys()) t.push(ie(r));
        return `R3Injector[${t.join(", ")}]`;
      }
      assertNotDestroyed() {
        if (this._destroyed) throw new _(205, !1);
      }
      processProvider(t) {
        let n = jn(t = F(t)) ? t : F(t && t.provide);
        const r = function Y_(e) {
          return Ou(e) ? Dr(void 0, e.useValue) : Dr(function xh(e, t, n) {
            let r;
            if (jn(e)) {
              const i = F(e);
              return Pn(i) || ku(i);
            }
            if (Ou(e)) r = () => F(e.useValue);else if (function Sh(e) {
              return !(!e || !e.useFactory);
            }(e)) r = () => e.useFactory(...Pa(e.deps || []));else if (function Ih(e) {
              return !(!e || !e.useExisting);
            }(e)) r = () => x(F(e.useExisting));else {
              const i = F(e && (e.useClass || e.provide));
              if (!function Z_(e) {
                return !!e.deps;
              }(e)) return Pn(i) || ku(i);
              r = () => new i(...Pa(e.deps));
            }
            return r;
          }(e), rs);
        }(t);
        if (jn(t) || !0 !== t.multi) this.records.get(n);else {
          let i = this.records.get(n);
          i || (i = Dr(void 0, rs, !0), i.factory = () => Pa(i.multi), this.records.set(n, i)), n = t, i.multi.push(t);
        }
        this.records.set(n, r);
      }
      hydrate(t, n) {
        return n.value === rs && (n.value = q_, n.value = n.factory()), "object" == typeof n.value && n.value && function Q_(e) {
          return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy;
        }(n.value) && this._ngOnDestroyHooks.add(n.value), n.value;
      }
      injectableDefInScope(t) {
        if (!t.providedIn) return !1;
        const n = F(t.providedIn);
        return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n);
      }
    }
    function ku(e) {
      const t = Eo(e),
        n = null !== t ? t.factory : Pn(e);
      if (null !== n) return n;
      if (e instanceof T) throw new _(204, !1);
      if (e instanceof Function) return function K_(e) {
        const t = e.length;
        if (t > 0) throw function pi(e, t) {
          const n = [];
          for (let r = 0; r < e; r++) n.push(t);
          return n;
        }(t, "?"), new _(204, !1);
        const n = function pw(e) {
          const t = e && (e[Io] || e[Id]);
          return t ? (function gw(e) {
            if (e.hasOwnProperty("name")) return e.name;
            ("" + e).match(/^function\s*([^\s(]+)/);
          }(e), t) : null;
        }(e);
        return null !== n ? () => n.factory(e) : () => new e();
      }(e);
      throw new _(204, !1);
    }
    function Dr(e, t, n = !1) {
      return {
        factory: e,
        value: t,
        multi: n ? [] : void 0
      };
    }
    function Lu(e, t) {
      for (const n of e) Array.isArray(n) ? Lu(n, t) : n && xa(n) ? Lu(n.ɵproviders, t) : t(n);
    }
    class J_ {}
    class Th {}
    class tb {
      resolveComponentFactory(t) {
        throw function eb(e) {
          const t = Error(`No component factory found for ${ie(e)}. Did you add it to @NgModule.entryComponents?`);
          return t.ngComponent = e, t;
        }(t);
      }
    }
    let Ii = (() => {
      class e {}
      return e.NULL = new tb(), e;
    })();
    function nb() {
      return wr(Ne(), y());
    }
    function wr(e, t) {
      return new yn(st(e, t));
    }
    let yn = (() => {
      class e {
        constructor(n) {
          this.nativeElement = n;
        }
      }
      return e.__NG_ELEMENT_ID__ = nb, e;
    })();
    class Rh {}
    let ob = (() => {
      class e {}
      return e.ɵprov = R({
        token: e,
        providedIn: "root",
        factory: () => null
      }), e;
    })();
    class ss {
      constructor(t) {
        this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".");
      }
    }
    const sb = new ss("15.2.5"),
      ju = {},
      $u = "ngOriginalError";
    function Uu(e) {
      return e[$u];
    }
    class Cr {
      constructor() {
        this._console = console;
      }
      handleError(t) {
        const n = this._findOriginalError(t);
        this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n);
      }
      _findOriginalError(t) {
        let n = t && Uu(t);
        for (; n && Uu(n);) n = Uu(n);
        return n || null;
      }
    }
    function en(e) {
      return e instanceof Function ? e() : e;
    }
    function Oh(e, t, n) {
      let r = e.length;
      for (;;) {
        const i = e.indexOf(t, n);
        if (-1 === i) return i;
        if (0 === i || e.charCodeAt(i - 1) <= 32) {
          const o = t.length;
          if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
        }
        n = i + 1;
      }
    }
    const Nh = "ng-template";
    function yb(e, t, n) {
      let r = 0,
        i = !0;
      for (; r < e.length;) {
        let o = e[r++];
        if ("string" == typeof o && i) {
          const s = e[r++];
          if (n && "class" === o && -1 !== Oh(s.toLowerCase(), t, 0)) return !0;
        } else {
          if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]);) if (o.toLowerCase() === t) return !0;
            return !1;
          }
          "number" == typeof o && (i = !1);
        }
      }
      return !1;
    }
    function Fh(e) {
      return 4 === e.type && e.value !== Nh;
    }
    function vb(e, t, n) {
      return t === (4 !== e.type || n ? e.value : Nh);
    }
    function Db(e, t, n) {
      let r = 4;
      const i = e.attrs || [],
        o = function _b(e) {
          for (let t = 0; t < e.length; t++) if (uf(e[t])) return t;
          return e.length;
        }(i);
      let s = !1;
      for (let a = 0; a < t.length; a++) {
        const u = t[a];
        if ("number" != typeof u) {
          if (!s) if (4 & r) {
            if (r = 2 | 1 & r, "" !== u && !vb(e, u, n) || "" === u && 1 === t.length) {
              if (Mt(r)) return !1;
              s = !0;
            }
          } else {
            const c = 8 & r ? u : t[++a];
            if (8 & r && null !== e.attrs) {
              if (!yb(e.attrs, c, n)) {
                if (Mt(r)) return !1;
                s = !0;
              }
              continue;
            }
            const d = wb(8 & r ? "class" : u, i, Fh(e), n);
            if (-1 === d) {
              if (Mt(r)) return !1;
              s = !0;
              continue;
            }
            if ("" !== c) {
              let f;
              f = d > o ? "" : i[d + 1].toLowerCase();
              const h = 8 & r ? f : null;
              if (h && -1 !== Oh(h, c, 0) || 2 & r && c !== f) {
                if (Mt(r)) return !1;
                s = !0;
              }
            }
          }
        } else {
          if (!s && !Mt(r) && !Mt(u)) return !1;
          if (s && Mt(u)) continue;
          s = !1, r = u | 1 & r;
        }
      }
      return Mt(r) || s;
    }
    function Mt(e) {
      return 0 == (1 & e);
    }
    function wb(e, t, n, r) {
      if (null === t) return -1;
      let i = 0;
      if (r || !n) {
        let o = !1;
        for (; i < t.length;) {
          const s = t[i];
          if (s === e) return i;
          if (3 === s || 6 === s) o = !0;else {
            if (1 === s || 2 === s) {
              let a = t[++i];
              for (; "string" == typeof a;) a = t[++i];
              continue;
            }
            if (4 === s) break;
            if (0 === s) {
              i += 4;
              continue;
            }
          }
          i += o ? 1 : 2;
        }
        return -1;
      }
      return function bb(e, t) {
        let n = e.indexOf(4);
        if (n > -1) for (n++; n < e.length;) {
          const r = e[n];
          if ("number" == typeof r) return -1;
          if (r === t) return n;
          n++;
        }
        return -1;
      }(t, e);
    }
    function kh(e, t, n = !1) {
      for (let r = 0; r < t.length; r++) if (Db(e, t[r], n)) return !0;
      return !1;
    }
    function Lh(e, t) {
      return e ? ":not(" + t.trim() + ")" : t;
    }
    function Ib(e) {
      let t = e[0],
        n = 1,
        r = 2,
        i = "",
        o = !1;
      for (; n < e.length;) {
        let s = e[n];
        if ("string" == typeof s) {
          if (2 & r) {
            const a = e[++n];
            i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
          } else 8 & r ? i += "." + s : 4 & r && (i += " " + s);
        } else "" !== i && !Mt(s) && (t += Lh(o, i), i = ""), r = s, o = o || !Mt(r);
        n++;
      }
      return "" !== i && (t += Lh(o, i)), t;
    }
    const H = {};
    function S(e) {
      jh(Z(), y(), Ge() + e, !1);
    }
    function jh(e, t, n, r) {
      if (!r) if (3 == (3 & t[z])) {
        const o = e.preOrderCheckHooks;
        null !== o && jo(t, o, n);
      } else {
        const o = e.preOrderHooks;
        null !== o && $o(t, o, 0, n);
      }
      Nn(n);
    }
    function Bh(e, t = null, n = null, r) {
      const i = Vh(e, t, n, r);
      return i.resolveInjectorInitializers(), i;
    }
    function Vh(e, t = null, n = null, r, i = new Set()) {
      const o = [n || X, z_(e)];
      return r = r || ("object" == typeof e ? void 0 : ie(e)), new Mh(o, t || is(), r || null, i);
    }
    let tn = (() => {
      class e {
        static create(n, r) {
          if (Array.isArray(n)) return Bh({
            name: ""
          }, r, n, "");
          {
            const i = n.name ?? "";
            return Bh({
              name: i
            }, n.parent, n.providers, i);
          }
        }
      }
      return e.THROW_IF_NOT_FOUND = ti, e.NULL = new _h(), e.ɵprov = R({
        token: e,
        providedIn: "any",
        factory: () => x(wh)
      }), e.__NG_ELEMENT_ID__ = -1, e;
    })();
    function P(e, t = k.Default) {
      const n = y();
      return null === n ? x(e, t) : yf(Ne(), n, F(e), t);
    }
    function Qh(e, t) {
      const n = e.contentQueries;
      if (null !== n) for (let r = 0; r < n.length; r += 2) {
        const o = n[r + 1];
        if (-1 !== o) {
          const s = e.data[o];
          za(n[r]), s.contentQueries(2, t[o], o);
        }
      }
    }
    function us(e, t, n, r, i, o, s, a, u, c, l) {
      const d = t.blueprint.slice();
      return d[Zt] = i, d[z] = 76 | r, (null !== l || e && 1024 & e[z]) && (d[z] |= 1024), zd(d), d[he] = d[rr] = e, d[me] = n, d[Ro] = s || e && e[Ro], d[W] = a || e && e[W], d[Fa] = u || e && e[Fa] || null, d[Ao] = c || e && e[Ao] || null, d[je] = o, d[ai] = function zC() {
        return VC++;
      }(), d[Nd] = l, d[$e] = 2 == t.type ? e[$e] : d, d;
    }
    function Er(e, t, n, r, i) {
      let o = e.data[t];
      if (null === o) o = function Gu(e, t, n, r, i) {
        const o = qd(),
          s = Ua(),
          u = e.data[t] = function Qb(e, t, n, r, i, o) {
            return {
              type: n,
              index: r,
              insertBeforeIndex: null,
              injectorIndex: t ? t.injectorIndex : -1,
              directiveStart: -1,
              directiveEnd: -1,
              directiveStylingLast: -1,
              componentOffset: -1,
              propertyBindings: null,
              flags: 0,
              providerIndexes: 0,
              value: i,
              attrs: o,
              mergedAttrs: null,
              localNames: null,
              initialInputs: void 0,
              inputs: null,
              outputs: null,
              tView: null,
              next: null,
              prev: null,
              projectionNext: null,
              child: null,
              parent: t,
              projection: null,
              styles: null,
              stylesWithoutHost: null,
              residualStyles: void 0,
              classes: null,
              classesWithoutHost: null,
              residualClasses: void 0,
              classBindings: 0,
              styleBindings: 0
            };
          }(0, s ? o : o && o.parent, n, t, r, i);
        return null === e.firstChild && (e.firstChild = u), null !== o && (s ? null == o.child && null !== u.parent && (o.child = u) : null === o.next && (o.next = u, u.prev = o)), u;
      }(e, t, n, r, i), function Zw() {
        return U.lFrame.inI18n;
      }() && (o.flags |= 32);else if (64 & o.type) {
        o.type = n, o.value = r, o.attrs = i;
        const s = function ci() {
          const e = U.lFrame,
            t = e.currentTNode;
          return e.isParent ? t : t.parent;
        }();
        o.injectorIndex = null === s ? -1 : s.injectorIndex;
      }
      return jt(o, !0), o;
    }
    function Si(e, t, n, r) {
      if (0 === n) return -1;
      const i = t.length;
      for (let o = 0; o < n; o++) t.push(r), e.blueprint.push(r), e.data.push(null);
      return i;
    }
    function Wu(e, t, n) {
      Ga(t);
      try {
        const r = e.viewQuery;
        null !== r && nc(1, r, n);
        const i = e.template;
        null !== i && Xh(e, t, i, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && Qh(e, t), e.staticViewQueries && nc(2, e.viewQuery, n);
        const o = e.components;
        null !== o && function Kb(e, t) {
          for (let n = 0; n < t.length; n++) y0(e, t[n]);
        }(t, o);
      } catch (r) {
        throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r;
      } finally {
        t[z] &= -5, Wa();
      }
    }
    function cs(e, t, n, r) {
      const i = t[z];
      if (128 != (128 & i)) {
        Ga(t);
        try {
          zd(t), function Yd(e) {
            return U.lFrame.bindingIndex = e;
          }(e.bindingStartIndex), null !== n && Xh(e, t, n, 2, r);
          const s = 3 == (3 & i);
          if (s) {
            const c = e.preOrderCheckHooks;
            null !== c && jo(t, c, null);
          } else {
            const c = e.preOrderHooks;
            null !== c && $o(t, c, 0, null), qa(t, 0);
          }
          if (function g0(e) {
            for (let t = pu(e); null !== t; t = gu(t)) {
              if (!t[Fd]) continue;
              const n = t[or];
              for (let r = 0; r < n.length; r++) {
                const i = n[r];
                512 & i[z] || $a(i[he], 1), i[z] |= 512;
              }
            }
          }(t), function p0(e) {
            for (let t = pu(e); null !== t; t = gu(t)) for (let n = Ve; n < t.length; n++) {
              const r = t[n],
                i = r[E];
              ko(r) && cs(i, r, i.template, r[me]);
            }
          }(t), null !== e.contentQueries && Qh(e, t), s) {
            const c = e.contentCheckHooks;
            null !== c && jo(t, c);
          } else {
            const c = e.contentHooks;
            null !== c && $o(t, c, 1), qa(t, 1);
          }
          !function Wb(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n) try {
              for (let r = 0; r < n.length; r++) {
                const i = n[r];
                if (i < 0) Nn(~i);else {
                  const o = i,
                    s = n[++r],
                    a = n[++r];
                  Qw(s, o), a(2, t[o]);
                }
              }
            } finally {
              Nn(-1);
            }
          }(e, t);
          const a = e.components;
          null !== a && function qb(e, t) {
            for (let n = 0; n < t.length; n++) m0(e, t[n]);
          }(t, a);
          const u = e.viewQuery;
          if (null !== u && nc(2, u, r), s) {
            const c = e.viewCheckHooks;
            null !== c && jo(t, c);
          } else {
            const c = e.viewHooks;
            null !== c && $o(t, c, 2), qa(t, 2);
          }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[z] &= -41, 512 & t[z] && (t[z] &= -513, $a(t[he], -1));
        } finally {
          Wa();
        }
      }
    }
    function Xh(e, t, n, r, i) {
      const o = Ge(),
        s = 2 & r;
      try {
        Nn(-1), s && t.length > ae && jh(e, t, ae, !1), mt(s ? 2 : 0, i), n(r, i);
      } finally {
        Nn(o), mt(s ? 3 : 1, i);
      }
    }
    function qu(e, t, n) {
      if (La(t)) {
        const i = t.directiveEnd;
        for (let o = t.directiveStart; o < i; o++) {
          const s = e.data[o];
          s.contentQueries && s.contentQueries(1, n[o], o);
        }
      }
    }
    function Ku(e, t, n) {
      Wd() && (function r0(e, t, n, r) {
        const i = n.directiveStart,
          o = n.directiveEnd;
        ui(n) && function d0(e, t, n) {
          const r = st(t, e),
            i = Jh(n),
            o = e[Ro],
            s = ls(e, us(e, i, null, n.onPush ? 32 : 16, r, t, o, o.createRenderer(r, n), null, null, null));
          e[t.index] = s;
        }(t, n, e.data[i + n.componentOffset]), e.firstCreatePass || Vo(n, t), Ue(r, t);
        const s = n.initialInputs;
        for (let a = i; a < o; a++) {
          const u = e.data[a],
            c = Fn(t, e, a, n);
          Ue(c, t), null !== s && f0(0, a - i, c, u, 0, s), St(u) && (at(n.index, t)[me] = Fn(t, e, a, n));
        }
      }(e, t, n, st(n, t)), 64 == (64 & n.flags) && op(e, t, n));
    }
    function Yu(e, t, n = st) {
      const r = t.localNames;
      if (null !== r) {
        let i = t.index + 1;
        for (let o = 0; o < r.length; o += 2) {
          const s = r[o + 1],
            a = -1 === s ? n(t, e) : e[s];
          e[i++] = a;
        }
      }
    }
    function Jh(e) {
      const t = e.tView;
      return null === t || t.incompleteFirstPass ? e.tView = Zu(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : t;
    }
    function Zu(e, t, n, r, i, o, s, a, u, c) {
      const l = ae + r,
        d = l + i,
        f = function Yb(e, t) {
          const n = [];
          for (let r = 0; r < t; r++) n.push(r < e ? null : H);
          return n;
        }(l, d),
        h = "function" == typeof c ? c() : c;
      return f[E] = {
        type: e,
        blueprint: f,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: f.slice().fill(null, l),
        bindingStartIndex: l,
        expandoStartIndex: d,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: "function" == typeof o ? o() : o,
        pipeRegistry: "function" == typeof s ? s() : s,
        firstChild: null,
        schemas: u,
        consts: h,
        incompleteFirstPass: !1
      };
    }
    function tp(e, t, n, r) {
      for (let i in e) if (e.hasOwnProperty(i)) {
        n = null === n ? {} : n;
        const o = e[i];
        null === r ? np(n, t, i, o) : r.hasOwnProperty(i) && np(n, t, r[i], o);
      }
      return n;
    }
    function np(e, t, n, r) {
      e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r];
    }
    function rp(e, t) {
      const n = at(t, e);
      16 & n[z] || (n[z] |= 32);
    }
    function Qu(e, t, n, r) {
      if (Wd()) {
        const i = null === r ? null : {
            "": -1
          },
          o = function s0(e, t) {
            const n = e.directiveRegistry;
            let r = null,
              i = null;
            if (n) for (let o = 0; o < n.length; o++) {
              const s = n[o];
              if (kh(t, s.selectors, !1)) if (r || (r = []), St(s)) {
                if (null !== s.findHostDirectiveDefs) {
                  const a = [];
                  i = i || new Map(), s.findHostDirectiveDefs(s, a, i), r.unshift(...a, s), Xu(e, t, a.length);
                } else r.unshift(s), Xu(e, t, 0);
              } else i = i || new Map(), s.findHostDirectiveDefs?.(s, r, i), r.push(s);
            }
            return null === r ? null : [r, i];
          }(e, n);
        let s, a;
        null === o ? s = a = null : [s, a] = o, null !== s && ip(e, t, n, s, i, a), i && function a0(e, t, n) {
          if (t) {
            const r = e.localNames = [];
            for (let i = 0; i < t.length; i += 2) {
              const o = n[t[i + 1]];
              if (null == o) throw new _(-301, !1);
              r.push(t[i], o);
            }
          }
        }(n, r, i);
      }
      n.mergedAttrs = di(n.mergedAttrs, n.attrs);
    }
    function ip(e, t, n, r, i, o) {
      for (let c = 0; c < r.length; c++) Ja(Vo(n, t), e, r[c].type);
      !function c0(e, t, n) {
        e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t;
      }(n, e.data.length, r.length);
      for (let c = 0; c < r.length; c++) {
        const l = r[c];
        l.providersResolver && l.providersResolver(l);
      }
      let s = !1,
        a = !1,
        u = Si(e, t, r.length, null);
      for (let c = 0; c < r.length; c++) {
        const l = r[c];
        n.mergedAttrs = di(n.mergedAttrs, l.hostAttrs), l0(e, n, t, u, l), u0(u, l, i), null !== l.contentQueries && (n.flags |= 4), (null !== l.hostBindings || null !== l.hostAttrs || 0 !== l.hostVars) && (n.flags |= 64);
        const d = l.type.prototype;
        !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(n.index), a = !0), u++;
      }
      !function Xb(e, t, n) {
        const i = t.directiveEnd,
          o = e.data,
          s = t.attrs,
          a = [];
        let u = null,
          c = null;
        for (let l = t.directiveStart; l < i; l++) {
          const d = o[l],
            f = n ? n.get(d) : null,
            p = f ? f.outputs : null;
          u = tp(d.inputs, l, u, f ? f.inputs : null), c = tp(d.outputs, l, c, p);
          const g = null === u || null === s || Fh(t) ? null : h0(u, l, s);
          a.push(g);
        }
        null !== u && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c;
      }(e, n, o);
    }
    function op(e, t, n) {
      const r = n.directiveStart,
        i = n.directiveEnd,
        o = n.index,
        s = function Xw() {
          return U.lFrame.currentDirectiveIndex;
        }();
      try {
        Nn(o);
        for (let a = r; a < i; a++) {
          const u = e.data[a],
            c = t[a];
          Ba(a), (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && o0(u, c);
        }
      } finally {
        Nn(-1), Ba(s);
      }
    }
    function o0(e, t) {
      null !== e.hostBindings && e.hostBindings(1, t);
    }
    function Xu(e, t, n) {
      t.componentOffset = n, (e.components || (e.components = [])).push(t.index);
    }
    function u0(e, t, n) {
      if (n) {
        if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        St(t) && (n[""] = e);
      }
    }
    function l0(e, t, n, r, i) {
      e.data[r] = i;
      const o = i.factory || (i.factory = Pn(i.type)),
        s = new li(o, St(i), P);
      e.blueprint[r] = s, n[r] = s, function t0(e, t, n, r, i) {
        const o = i.hostBindings;
        if (o) {
          let s = e.hostBindingOpCodes;
          null === s && (s = e.hostBindingOpCodes = []);
          const a = ~t.index;
          (function n0(e) {
            let t = e.length;
            for (; t > 0;) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(s) != a && s.push(a), s.push(n, r, o);
        }
      }(e, t, r, Si(e, n, i.hostVars, H), i);
    }
    function f0(e, t, n, r, i, o) {
      const s = o[t];
      if (null !== s) {
        const a = r.setInput;
        for (let u = 0; u < s.length;) {
          const c = s[u++],
            l = s[u++],
            d = s[u++];
          null !== a ? r.setInput(n, d, c, l) : n[l] = d;
        }
      }
    }
    function h0(e, t, n) {
      let r = null,
        i = 0;
      for (; i < n.length;) {
        const o = n[i];
        if (0 !== o) {
          if (5 !== o) {
            if ("number" == typeof o) break;
            if (e.hasOwnProperty(o)) {
              null === r && (r = []);
              const s = e[o];
              for (let a = 0; a < s.length; a += 2) if (s[a] === t) {
                r.push(o, s[a + 1], n[i + 1]);
                break;
              }
            }
            i += 2;
          } else i += 2;
        } else i += 4;
      }
      return r;
    }
    function sp(e, t, n, r) {
      return [e, !0, !1, t, null, 0, r, n, null, null];
    }
    function m0(e, t) {
      const n = at(t, e);
      if (ko(n)) {
        const r = n[E];
        48 & n[z] ? cs(r, n, r.template, n[me]) : n[Rn] > 0 && ec(n);
      }
    }
    function ec(e) {
      for (let r = pu(e); null !== r; r = gu(r)) for (let i = Ve; i < r.length; i++) {
        const o = r[i];
        if (ko(o)) if (512 & o[z]) {
          const s = o[E];
          cs(s, o, s.template, o[me]);
        } else o[Rn] > 0 && ec(o);
      }
      const n = e[E].components;
      if (null !== n) for (let r = 0; r < n.length; r++) {
        const i = at(n[r], e);
        ko(i) && i[Rn] > 0 && ec(i);
      }
    }
    function y0(e, t) {
      const n = at(t, e),
        r = n[E];
      (function v0(e, t) {
        for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
      })(r, n), Wu(r, n, n[me]);
    }
    function ls(e, t) {
      return e[oi] ? e[Od][Et] = t : e[oi] = t, e[Od] = t, t;
    }
    function tc(e) {
      for (; e;) {
        e[z] |= 32;
        const t = wi(e);
        if (Aw(e) && !t) return e;
        e = t;
      }
      return null;
    }
    function ds(e, t, n, r = !0) {
      const i = t[Ro];
      i.begin && i.begin();
      try {
        cs(e, t, e.template, n);
      } catch (s) {
        throw r && lp(t, s), s;
      } finally {
        i.end && i.end();
      }
    }
    function nc(e, t, n) {
      za(0), t(e, n);
    }
    function ap(e) {
      return e[nr] || (e[nr] = []);
    }
    function up(e) {
      return e.cleanup || (e.cleanup = []);
    }
    function lp(e, t) {
      const n = e[Ao],
        r = n ? n.get(Cr, null) : null;
      r && r.handleError(t);
    }
    function rc(e, t, n, r, i) {
      for (let o = 0; o < n.length;) {
        const s = n[o++],
          a = n[o++],
          u = t[s],
          c = e.data[s];
        null !== c.setInput ? c.setInput(u, i, r, a) : u[a] = i;
      }
    }
    function fs(e, t, n) {
      let r = n ? e.styles : null,
        i = n ? e.classes : null,
        o = 0;
      if (null !== t) for (let s = 0; s < t.length; s++) {
        const a = t[s];
        "number" == typeof a ? o = a : 1 == o ? i = Ia(i, a) : 2 == o && (r = Ia(r, a + ": " + t[++s] + ";"));
      }
      n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = i : e.classesWithoutHost = i;
    }
    function hs(e, t, n, r, i = !1) {
      for (; null !== n;) {
        const o = t[n.index];
        if (null !== o && r.push(Oe(o)), It(o)) for (let a = Ve; a < o.length; a++) {
          const u = o[a],
            c = u[E].firstChild;
          null !== c && hs(u[E], u, c, r);
        }
        const s = n.type;
        if (8 & s) hs(e, t, n.child, r);else if (32 & s) {
          const a = hu(n, t);
          let u;
          for (; u = a();) r.push(u);
        } else if (16 & s) {
          const a = rh(t, n);
          if (Array.isArray(a)) r.push(...a);else {
            const u = wi(t[$e]);
            hs(u[E], u, a, r, !0);
          }
        }
        n = i ? n.projectionNext : n.next;
      }
      return r;
    }
    class Mi {
      get rootNodes() {
        const t = this._lView,
          n = t[E];
        return hs(n, t, n.firstChild, []);
      }
      constructor(t, n) {
        this._lView = t, this._cdRefInjectingView = n, this._appRef = null, this._attachedToViewContainer = !1;
      }
      get context() {
        return this._lView[me];
      }
      set context(t) {
        this._lView[me] = t;
      }
      get destroyed() {
        return 128 == (128 & this._lView[z]);
      }
      destroy() {
        if (this._appRef) this._appRef.detachView(this);else if (this._attachedToViewContainer) {
          const t = this._lView[he];
          if (It(t)) {
            const n = t[Oo],
              r = n ? n.indexOf(this) : -1;
            r > -1 && (vu(t, r), Wo(n, r));
          }
          this._attachedToViewContainer = !1;
        }
        Kf(this._lView[E], this._lView);
      }
      onDestroy(t) {
        !function ep(e, t, n, r) {
          const i = ap(t);
          null === n ? i.push(r) : (i.push(n), e.firstCreatePass && up(e).push(r, i.length - 1));
        }(this._lView[E], this._lView, null, t);
      }
      markForCheck() {
        tc(this._cdRefInjectingView || this._lView);
      }
      detach() {
        this._lView[z] &= -65;
      }
      reattach() {
        this._lView[z] |= 64;
      }
      detectChanges() {
        ds(this._lView[E], this._lView, this.context);
      }
      checkNoChanges() {}
      attachToViewContainerRef() {
        if (this._appRef) throw new _(902, !1);
        this._attachedToViewContainer = !0;
      }
      detachFromAppRef() {
        this._appRef = null, function o_(e, t) {
          Ci(e, t, t[W], 2, null, null);
        }(this._lView[E], this._lView);
      }
      attachToAppRef(t) {
        if (this._attachedToViewContainer) throw new _(902, !1);
        this._appRef = t;
      }
    }
    class D0 extends Mi {
      constructor(t) {
        super(t), this._view = t;
      }
      detectChanges() {
        const t = this._view;
        ds(t[E], t, t[me], !1);
      }
      checkNoChanges() {}
      get context() {
        return null;
      }
    }
    class dp extends Ii {
      constructor(t) {
        super(), this.ngModule = t;
      }
      resolveComponentFactory(t) {
        const n = te(t);
        return new xi(n, this.ngModule);
      }
    }
    function fp(e) {
      const t = [];
      for (let n in e) e.hasOwnProperty(n) && t.push({
        propName: e[n],
        templateName: n
      });
      return t;
    }
    class C0 {
      constructor(t, n) {
        this.injector = t, this.parentInjector = n;
      }
      get(t, n, r) {
        r = Mo(r);
        const i = this.injector.get(t, ju, r);
        return i !== ju || n === ju ? i : this.parentInjector.get(t, n, r);
      }
    }
    class xi extends Th {
      get inputs() {
        return fp(this.componentDef.inputs);
      }
      get outputs() {
        return fp(this.componentDef.outputs);
      }
      constructor(t, n) {
        super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = function Sb(e) {
          return e.map(Ib).join(",");
        }(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n;
      }
      create(t, n, r, i) {
        let o = (i = i || this.ngModule) instanceof Ut ? i : i?.injector;
        o && null !== this.componentDef.getStandaloneInjector && (o = this.componentDef.getStandaloneInjector(o) || o);
        const s = o ? new C0(t, o) : t,
          a = s.get(Rh, null);
        if (null === a) throw new _(407, !1);
        const u = s.get(ob, null),
          c = a.createRenderer(null, this.componentDef),
          l = this.componentDef.selectors[0][0] || "div",
          d = r ? function Zb(e, t, n) {
            return e.selectRootElement(t, n === kt.ShadowDom);
          }(c, r, this.componentDef.encapsulation) : yu(c, l, function w0(e) {
            const t = e.toLowerCase();
            return "svg" === t ? Hd : "math" === t ? "math" : null;
          }(l)),
          f = this.componentDef.onPush ? 288 : 272,
          h = Zu(0, null, null, 1, 0, null, null, null, null, null),
          p = us(null, h, null, f, null, null, a, c, u, s, null);
        let g, v;
        Ga(p);
        try {
          const D = this.componentDef;
          let I,
            m = null;
          D.findHostDirectiveDefs ? (I = [], m = new Map(), D.findHostDirectiveDefs(D, I, m), I.push(D)) : I = [D];
          const N = function b0(e, t) {
              const n = e[E],
                r = ae;
              return e[r] = t, Er(n, r, 2, "#host", null);
            }(p, d),
            re = function E0(e, t, n, r, i, o, s, a) {
              const u = i[E];
              !function I0(e, t, n, r) {
                for (const i of e) t.mergedAttrs = di(t.mergedAttrs, i.hostAttrs);
                null !== t.mergedAttrs && (fs(t, t.mergedAttrs, !0), null !== n && sh(r, n, t));
              }(r, e, t, s);
              const c = o.createRenderer(t, n),
                l = us(i, Jh(n), null, n.onPush ? 32 : 16, i[e.index], e, o, c, a || null, null, null);
              return u.firstCreatePass && Xu(u, e, r.length - 1), ls(i, l), i[e.index] = l;
            }(N, d, D, I, p, a, c);
          v = Vd(h, ae), d && function M0(e, t, n, r) {
            if (r) Ya(e, n, ["ng-version", sb.full]);else {
              const {
                attrs: i,
                classes: o
              } = function Mb(e) {
                const t = [],
                  n = [];
                let r = 1,
                  i = 2;
                for (; r < e.length;) {
                  let o = e[r];
                  if ("string" == typeof o) 2 === i ? "" !== o && t.push(o, e[++r]) : 8 === i && n.push(o);else {
                    if (!Mt(i)) break;
                    i = o;
                  }
                  r++;
                }
                return {
                  attrs: t,
                  classes: n
                };
              }(t.selectors[0]);
              i && Ya(e, n, i), o && o.length > 0 && oh(e, n, o.join(" "));
            }
          }(c, D, d, r), void 0 !== n && function x0(e, t, n) {
            const r = e.projection = [];
            for (let i = 0; i < t.length; i++) {
              const o = n[i];
              r.push(null != o ? Array.from(o) : null);
            }
          }(v, this.ngContentSelectors, n), g = function S0(e, t, n, r, i, o) {
            const s = Ne(),
              a = i[E],
              u = st(s, i);
            ip(a, i, s, n, null, r);
            for (let l = 0; l < n.length; l++) Ue(Fn(i, a, s.directiveStart + l, s), i);
            op(a, i, s), u && Ue(u, i);
            const c = Fn(i, a, s.directiveStart + s.componentOffset, s);
            if (e[me] = i[me] = c, null !== o) for (const l of o) l(c, t);
            return qu(a, s, e), c;
          }(re, D, I, m, p, [T0]), Wu(h, p, null);
        } finally {
          Wa();
        }
        return new _0(this.componentType, g, wr(v, p), p, v);
      }
    }
    class _0 extends J_ {
      constructor(t, n, r, i, o) {
        super(), this.location = r, this._rootLView = i, this._tNode = o, this.instance = n, this.hostView = this.changeDetectorRef = new D0(i), this.componentType = t;
      }
      setInput(t, n) {
        const r = this._tNode.inputs;
        let i;
        if (null !== r && (i = r[t])) {
          const o = this._rootLView;
          rc(o[E], o, i, t, n), rp(o, this._tNode.index);
        }
      }
      get injector() {
        return new cr(this._tNode, this._rootLView);
      }
      destroy() {
        this.hostView.destroy();
      }
      onDestroy(t) {
        this.hostView.onDestroy(t);
      }
    }
    function T0() {
      const e = Ne();
      Lo(y()[E], e);
    }
    function ps(e) {
      return !!function oc(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e);
    }
    function He(e, t, n) {
      return !Object.is(e[t], n) && (e[t] = n, !0);
    }
    function Q(e, t, n, r, i, o, s, a) {
      const u = y(),
        c = Z(),
        l = e + ae,
        d = c.firstCreatePass ? function V0(e, t, n, r, i, o, s, a, u) {
          const c = t.consts,
            l = Er(t, e, 4, s || null, gn(c, a));
          Qu(t, n, l, gn(c, u)), Lo(t, l);
          const d = l.tView = Zu(2, l, r, i, o, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c);
          return null !== t.queries && (t.queries.template(t, l), d.queries = t.queries.embeddedTView(l)), l;
        }(l, c, u, t, n, r, i, o, s) : c.data[l];
      jt(d, !1);
      const f = u[W].createComment("");
      Qo(c, u, f, d), Ue(f, u), ls(u, u[l] = sp(f, u, f, d)), No(d) && Ku(c, u, d), null != s && Yu(u, d, a);
    }
    function B(e, t, n) {
      const r = y();
      return He(r, ar(), t) && function ct(e, t, n, r, i, o, s, a) {
        const u = st(t, n);
        let l,
          c = t.inputs;
        !a && null != c && (l = c[r]) ? (rc(e, n, l, r, i), ui(t) && rp(n, t.index)) : 3 & t.type && (r = function Jb(e) {
          return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e;
        }(r), i = null != s ? s(i, t.value || "", r) : i, o.setProperty(u, r, i));
      }(Z(), function ce() {
        const e = U.lFrame;
        return Vd(e.tView, e.selectedIndex);
      }(), r, e, t, r[W], n, !1), B;
    }
    function ac(e, t, n, r, i) {
      const s = i ? "class" : "style";
      rc(e, n, t.inputs[s], s, r);
    }
    function C(e, t, n, r) {
      const i = y(),
        o = Z(),
        s = ae + e,
        a = i[W],
        u = o.firstCreatePass ? function W0(e, t, n, r, i, o) {
          const s = t.consts,
            u = Er(t, e, 2, r, gn(s, i));
          return Qu(t, n, u, gn(s, o)), null !== u.attrs && fs(u, u.attrs, !1), null !== u.mergedAttrs && fs(u, u.mergedAttrs, !0), null !== t.queries && t.queries.elementStart(t, u), u;
        }(s, o, i, t, n, r) : o.data[s],
        c = i[s] = yu(a, t, function iC() {
          return U.lFrame.currentNamespace;
        }()),
        l = No(u);
      return jt(u, !0), sh(a, c, u), 32 != (32 & u.flags) && Qo(o, i, c, u), 0 === function Bw() {
        return U.lFrame.elementDepthCount;
      }() && Ue(c, i), function Vw() {
        U.lFrame.elementDepthCount++;
      }(), l && (Ku(o, i, u), qu(o, u, i)), null !== r && Yu(i, u), C;
    }
    function w() {
      let e = Ne();
      Ua() ? Ha() : (e = e.parent, jt(e, !1));
      const t = e;
      !function zw() {
        U.lFrame.elementDepthCount--;
      }();
      const n = Z();
      return n.firstCreatePass && (Lo(n, e), La(e) && n.queries.elementEnd(e)), null != t.classesWithoutHost && function uC(e) {
        return 0 != (8 & e.flags);
      }(t) && ac(n, t, y(), t.classesWithoutHost, !0), null != t.stylesWithoutHost && function cC(e) {
        return 0 != (16 & e.flags);
      }(t) && ac(n, t, y(), t.stylesWithoutHost, !1), w;
    }
    function We(e, t, n, r) {
      return C(e, t, n, r), w(), We;
    }
    function Nr(e, t, n) {
      const r = y(),
        i = Z(),
        o = e + ae,
        s = i.firstCreatePass ? function q0(e, t, n, r, i) {
          const o = t.consts,
            s = gn(o, r),
            a = Er(t, e, 8, "ng-container", s);
          return null !== s && fs(a, s, !0), Qu(t, n, a, gn(o, i)), null !== t.queries && t.queries.elementStart(t, a), a;
        }(o, i, r, t, n) : i.data[o];
      jt(s, !0);
      const a = r[o] = r[W].createComment("");
      return Qo(i, r, a, s), Ue(a, r), No(s) && (Ku(i, r, s), qu(i, s, r)), null != n && Yu(r, s), Nr;
    }
    function Fr() {
      let e = Ne();
      const t = Z();
      return Ua() ? Ha() : (e = e.parent, jt(e, !1)), t.firstCreatePass && (Lo(t, e), La(e) && t.queries.elementEnd(e)), Fr;
    }
    function ms(e) {
      return !!e && "function" == typeof e.then;
    }
    function xp(e) {
      return !!e && "function" == typeof e.subscribe;
    }
    const Tp = xp;
    function Un(e, t, n, r) {
      const i = y(),
        o = Z(),
        s = Ne();
      return function Rp(e, t, n, r, i, o, s) {
        const a = No(r),
          c = e.firstCreatePass && up(e),
          l = t[me],
          d = ap(t);
        let f = !0;
        if (3 & r.type || s) {
          const g = st(r, t),
            v = s ? s(g) : g,
            D = d.length,
            I = s ? N => s(Oe(N[r.index])) : r.index;
          let m = null;
          if (!s && a && (m = function Y0(e, t, n, r) {
            const i = e.cleanup;
            if (null != i) for (let o = 0; o < i.length - 1; o += 2) {
              const s = i[o];
              if (s === n && i[o + 1] === r) {
                const a = t[nr],
                  u = i[o + 2];
                return a.length > u ? a[u] : null;
              }
              "string" == typeof s && (o += 2);
            }
            return null;
          }(e, t, i, r.index)), null !== m) (m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = o, m.__ngLastListenerFn__ = o, f = !1;else {
            o = Op(r, t, l, o, !1);
            const N = n.listen(v, i, o);
            d.push(o, N), c && c.push(i, I, D, D + 1);
          }
        } else o = Op(r, t, l, o, !1);
        const h = r.outputs;
        let p;
        if (f && null !== h && (p = h[i])) {
          const g = p.length;
          if (g) for (let v = 0; v < g; v += 2) {
            const re = t[p[v]][p[v + 1]].subscribe(o),
              Ce = d.length;
            d.push(o, re), c && c.push(i, r.index, Ce, -(Ce + 1));
          }
        }
      }(o, i, i[W], s, e, t, r), Un;
    }
    function Pp(e, t, n, r) {
      try {
        return mt(6, t, n), !1 !== n(r);
      } catch (i) {
        return lp(e, i), !1;
      } finally {
        mt(7, t, n);
      }
    }
    function Op(e, t, n, r, i) {
      return function o(s) {
        if (s === Function) return r;
        tc(e.componentOffset > -1 ? at(e.index, t) : t);
        let u = Pp(t, n, r, s),
          c = o.__ngNextListenerFn__;
        for (; c;) u = Pp(t, n, c, s) && u, c = c.__ngNextListenerFn__;
        return i && !1 === u && (s.preventDefault(), s.returnValue = !1), u;
      };
    }
    function be(e = 1) {
      return function eC(e) {
        return (U.lFrame.contextLView = function tC(e, t) {
          for (; e > 0;) t = t[rr], e--;
          return t;
        }(e, U.lFrame.contextLView))[me];
      }(e);
    }
    function ys(e, t) {
      return e << 17 | t << 2;
    }
    function vn(e) {
      return e >> 17 & 32767;
    }
    function cc(e) {
      return 2 | e;
    }
    function Hn(e) {
      return (131068 & e) >> 2;
    }
    function lc(e, t) {
      return -131069 & e | t << 2;
    }
    function dc(e) {
      return 1 | e;
    }
    function Vp(e, t, n, r, i) {
      const o = e[n + 1],
        s = null === t;
      let a = r ? vn(o) : Hn(o),
        u = !1;
      for (; 0 !== a && (!1 === u || s);) {
        const l = e[a + 1];
        iE(e[a], t) && (u = !0, e[a + 1] = r ? dc(l) : cc(l)), a = r ? vn(l) : Hn(l);
      }
      u && (e[n + 1] = r ? cc(o) : dc(o));
    }
    function iE(e, t) {
      return null === e || null == t || (Array.isArray(e) ? e[1] : e) === t || !(!Array.isArray(e) || "string" != typeof t) && pr(e, t) >= 0;
    }
    function fc(e, t, n) {
      return xt(e, t, n, !1), fc;
    }
    function vs(e, t) {
      return xt(e, t, null, !0), vs;
    }
    function xt(e, t, n, r) {
      const i = y(),
        o = Z(),
        s = function Xt(e) {
          const t = U.lFrame,
            n = t.bindingIndex;
          return t.bindingIndex = t.bindingIndex + e, n;
        }(2);
      o.firstUpdatePass && function Qp(e, t, n, r) {
        const i = e.data;
        if (null === i[n + 1]) {
          const o = i[Ge()],
            s = function Zp(e, t) {
              return t >= e.expandoStartIndex;
            }(e, n);
          (function tg(e, t) {
            return 0 != (e.flags & (t ? 8 : 16));
          })(o, r) && null === t && !s && (t = !1), t = function hE(e, t, n, r) {
            const i = function Va(e) {
              const t = U.lFrame.currentDirectiveIndex;
              return -1 === t ? null : e[t];
            }(e);
            let o = r ? t.residualClasses : t.residualStyles;
            if (null === i) 0 === (r ? t.classBindings : t.styleBindings) && (n = Ai(n = hc(null, e, t, n, r), t.attrs, r), o = null);else {
              const s = t.directiveStylingLast;
              if (-1 === s || e[s] !== i) if (n = hc(i, e, t, n, r), null === o) {
                let u = function pE(e, t, n) {
                  const r = n ? t.classBindings : t.styleBindings;
                  if (0 !== Hn(r)) return e[vn(r)];
                }(e, t, r);
                void 0 !== u && Array.isArray(u) && (u = hc(null, e, t, u[1], r), u = Ai(u, t.attrs, r), function gE(e, t, n, r) {
                  e[vn(n ? t.classBindings : t.styleBindings)] = r;
                }(e, t, r, u));
              } else o = function mE(e, t, n) {
                let r;
                const i = t.directiveEnd;
                for (let o = 1 + t.directiveStylingLast; o < i; o++) r = Ai(r, e[o].hostAttrs, n);
                return Ai(r, t.attrs, n);
              }(e, t, r);
            }
            return void 0 !== o && (r ? t.residualClasses = o : t.residualStyles = o), n;
          }(i, o, t, r), function nE(e, t, n, r, i, o) {
            let s = o ? t.classBindings : t.styleBindings,
              a = vn(s),
              u = Hn(s);
            e[r] = n;
            let l,
              c = !1;
            if (Array.isArray(n) ? (l = n[1], (null === l || pr(n, l) > 0) && (c = !0)) : l = n, i) {
              if (0 !== u) {
                const f = vn(e[a + 1]);
                e[r + 1] = ys(f, a), 0 !== f && (e[f + 1] = lc(e[f + 1], r)), e[a + 1] = function eE(e, t) {
                  return 131071 & e | t << 17;
                }(e[a + 1], r);
              } else e[r + 1] = ys(a, 0), 0 !== a && (e[a + 1] = lc(e[a + 1], r)), a = r;
            } else e[r + 1] = ys(u, 0), 0 === a ? a = r : e[u + 1] = lc(e[u + 1], r), u = r;
            c && (e[r + 1] = cc(e[r + 1])), Vp(e, l, r, !0), Vp(e, l, r, !1), function rE(e, t, n, r, i) {
              const o = i ? e.residualClasses : e.residualStyles;
              null != o && "string" == typeof t && pr(o, t) >= 0 && (n[r + 1] = dc(n[r + 1]));
            }(t, l, e, r, o), s = ys(a, u), o ? t.classBindings = s : t.styleBindings = s;
          }(i, o, t, n, s, r);
        }
      }(o, e, s, r), t !== H && He(i, s, t) && function Jp(e, t, n, r, i, o, s, a) {
        if (!(3 & t.type)) return;
        const u = e.data,
          c = u[a + 1],
          l = function tE(e) {
            return 1 == (1 & e);
          }(c) ? eg(u, t, n, i, Hn(c), s) : void 0;
        Ds(l) || (Ds(o) || function J0(e) {
          return 2 == (2 & e);
        }(c) && (o = eg(u, null, n, i, a, s)), function g_(e, t, n, r, i) {
          if (t) i ? e.addClass(n, r) : e.removeClass(n, r);else {
            let o = -1 === r.indexOf("-") ? void 0 : et.DashCase;
            null == i ? e.removeStyle(n, r, o) : ("string" == typeof i && i.endsWith("!important") && (i = i.slice(0, -10), o |= et.Important), e.setStyle(n, r, i, o));
          }
        }(r, s, Fo(Ge(), n), i, o));
      }(o, o.data[Ge()], i, i[W], e, i[s + 1] = function DE(e, t) {
        return null == e || "" === e || ("string" == typeof t ? e += t : "object" == typeof e && (e = ie(mn(e)))), e;
      }(t, n), r, s);
    }
    function hc(e, t, n, r, i) {
      let o = null;
      const s = n.directiveEnd;
      let a = n.directiveStylingLast;
      for (-1 === a ? a = n.directiveStart : a++; a < s && (o = t[a], r = Ai(r, o.hostAttrs, i), o !== e);) a++;
      return null !== e && (n.directiveStylingLast = a), r;
    }
    function Ai(e, t, n) {
      const r = n ? 1 : 2;
      let i = -1;
      if (null !== t) for (let o = 0; o < t.length; o++) {
        const s = t[o];
        "number" == typeof s ? i = s : i === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), ut(e, s, !!n || t[++o]));
      }
      return void 0 === e ? null : e;
    }
    function eg(e, t, n, r, i, o) {
      const s = null === t;
      let a;
      for (; i > 0;) {
        const u = e[i],
          c = Array.isArray(u),
          l = c ? u[1] : u,
          d = null === l;
        let f = n[i + 1];
        f === H && (f = d ? X : void 0);
        let h = d ? ru(f, r) : l === r ? f : void 0;
        if (c && !Ds(h) && (h = ru(u, r)), Ds(h) && (a = h, s)) return a;
        const p = e[i + 1];
        i = s ? vn(p) : Hn(p);
      }
      if (null !== t) {
        let u = o ? t.residualClasses : t.residualStyles;
        null != u && (a = ru(u, r));
      }
      return a;
    }
    function Ds(e) {
      return void 0 !== e;
    }
    function M(e, t = "") {
      const n = y(),
        r = Z(),
        i = e + ae,
        o = r.firstCreatePass ? Er(r, i, 1, t, null) : r.data[i],
        s = n[i] = function mu(e, t) {
          return e.createText(t);
        }(n[W], t);
      Qo(r, n, s, o), jt(o, !1);
    }
    function le(e) {
      return lt("", e, ""), le;
    }
    function lt(e, t, n) {
      const r = y(),
        i = function Sr(e, t, n, r) {
          return He(e, ar(), n) ? t + $(n) + r : H;
        }(r, e, t, n);
      return i !== H && function nn(e, t, n) {
        const r = Fo(t, e);
        !function Wf(e, t, n) {
          e.setValue(t, n);
        }(e[W], r, n);
      }(r, Ge(), i), lt;
    }
    const jr = "en-US";
    let bg = jr;
    class $r {}
    class Yg {}
    class Zg extends $r {
      constructor(t, n) {
        super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new dp(this);
        const r = it(t);
        this._bootstrapComponents = en(r.bootstrap), this._r3Injector = Vh(t, n, [{
          provide: $r,
          useValue: this
        }, {
          provide: Ii,
          useValue: this.componentFactoryResolver
        }], ie(t), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t);
      }
      get injector() {
        return this._r3Injector;
      }
      destroy() {
        const t = this._r3Injector;
        !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null;
      }
      onDestroy(t) {
        this.destroyCbs.push(t);
      }
    }
    class wc extends Yg {
      constructor(t) {
        super(), this.moduleType = t;
      }
      create(t) {
        return new Zg(this.moduleType, t);
      }
    }
    class UI extends $r {
      constructor(t, n, r) {
        super(), this.componentFactoryResolver = new dp(this), this.instance = null;
        const i = new Mh([...t, {
          provide: $r,
          useValue: this
        }, {
          provide: Ii,
          useValue: this.componentFactoryResolver
        }], n || is(), r, new Set(["environment"]));
        this.injector = i, i.resolveInjectorInitializers();
      }
      destroy() {
        this.injector.destroy();
      }
      onDestroy(t) {
        this.injector.onDestroy(t);
      }
    }
    function Es(e, t, n = null) {
      return new UI(e, t, n).injector;
    }
    let HI = (() => {
      class e {
        constructor(n) {
          this._injector = n, this.cachedInjectors = new Map();
        }
        getOrCreateStandaloneInjector(n) {
          if (!n.standalone) return null;
          if (!this.cachedInjectors.has(n.id)) {
            const r = bh(0, n.type),
              i = r.length > 0 ? Es([r], this._injector, `Standalone[${n.type.name}]`) : null;
            this.cachedInjectors.set(n.id, i);
          }
          return this.cachedInjectors.get(n.id);
        }
        ngOnDestroy() {
          try {
            for (const n of this.cachedInjectors.values()) null !== n && n.destroy();
          } finally {
            this.cachedInjectors.clear();
          }
        }
      }
      return e.ɵprov = R({
        token: e,
        providedIn: "environment",
        factory: () => new e(x(Ut))
      }), e;
    })();
    function Qg(e) {
      e.getStandaloneInjector = t => t.get(HI).getOrCreateStandaloneInjector(e);
    }
    function im(e, t, n, r, i, o) {
      const s = t + n;
      return He(e, s, i) ? function Bt(e, t, n) {
        return e[t] = n;
      }(e, s + 1, o ? r.call(o, i) : r(i)) : function ki(e, t) {
        const n = e[t];
        return n === H ? void 0 : n;
      }(e, s + 1);
    }
    function Ke(e, t) {
      const n = Z();
      let r;
      const i = e + ae;
      n.firstCreatePass ? (r = function sS(e, t) {
        if (t) for (let n = t.length - 1; n >= 0; n--) {
          const r = t[n];
          if (e === r.name) return r;
        }
      }(t, n.pipeRegistry), n.data[i] = r, r.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(i, r.onDestroy)) : r = n.data[i];
      const o = r.factory || (r.factory = Pn(r.type)),
        s = gt(P);
      try {
        const a = Bo(!1),
          u = o();
        return Bo(a), function z0(e, t, n, r) {
          n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r;
        }(n, y(), i, u), u;
      } finally {
        gt(s);
      }
    }
    function Ye(e, t, n) {
      const r = e + ae,
        i = y(),
        o = function sr(e, t) {
          return e[t];
        }(i, r);
      return function Li(e, t) {
        return e[E].data[t].pure;
      }(i, r) ? im(i, function ze() {
        const e = U.lFrame;
        let t = e.bindingRootIndex;
        return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
      }(), t, o.transform, n, o) : o.transform(n);
    }
    function _c(e) {
      return t => {
        setTimeout(e, void 0, t);
      };
    }
    const Ze = class dS extends Nt {
      constructor(t = !1) {
        super(), this.__isAsync = t;
      }
      emit(t) {
        super.next(t);
      }
      subscribe(t, n, r) {
        let i = t,
          o = n || (() => null),
          s = r;
        if (t && "object" == typeof t) {
          const u = t;
          i = u.next?.bind(u), o = u.error?.bind(u), s = u.complete?.bind(u);
        }
        this.__isAsync && (o = _c(o), i && (i = _c(i)), s && (s = _c(s)));
        const a = super.subscribe({
          next: i,
          error: o,
          complete: s
        });
        return t instanceof fe && t.add(a), a;
      }
    };
    let rn = (() => {
      class e {}
      return e.__NG_ELEMENT_ID__ = gS, e;
    })();
    const hS = rn,
      pS = class extends hS {
        constructor(t, n, r) {
          super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r;
        }
        createEmbeddedView(t, n) {
          const r = this._declarationTContainer.tView,
            i = us(this._declarationLView, r, t, 16, null, r.declTNode, null, null, null, null, n || null);
          i[si] = this._declarationLView[this._declarationTContainer.index];
          const s = this._declarationLView[Lt];
          return null !== s && (i[Lt] = s.createEmbeddedView(r)), Wu(r, i, t), new Mi(i);
        }
      };
    function gS() {
      return function Is(e, t) {
        return 4 & e.type ? new pS(t, e, wr(e, t)) : null;
      }(Ne(), y());
    }
    let At = (() => {
      class e {}
      return e.__NG_ELEMENT_ID__ = mS, e;
    })();
    function mS() {
      return function dm(e, t) {
        let n;
        const r = t[e.index];
        if (It(r)) n = r;else {
          let i;
          if (8 & e.type) i = Oe(r);else {
            const o = t[W];
            i = o.createComment("");
            const s = st(e, t);
            Ln(o, Zo(o, s), i, function f_(e, t) {
              return e.nextSibling(t);
            }(o, s), !1);
          }
          t[e.index] = n = sp(r, t, i, e), ls(t, n);
        }
        return new cm(n, e, t);
      }(Ne(), y());
    }
    const yS = At,
      cm = class extends yS {
        constructor(t, n, r) {
          super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r;
        }
        get element() {
          return wr(this._hostTNode, this._hostLView);
        }
        get injector() {
          return new cr(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
          const t = Xa(this._hostTNode, this._hostLView);
          if (df(t)) {
            const n = Ho(t, this._hostLView),
              r = Uo(t);
            return new cr(n[E].data[r + 8], n);
          }
          return new cr(null, this._hostLView);
        }
        clear() {
          for (; this.length > 0;) this.remove(this.length - 1);
        }
        get(t) {
          const n = lm(this._lContainer);
          return null !== n && n[t] || null;
        }
        get length() {
          return this._lContainer.length - Ve;
        }
        createEmbeddedView(t, n, r) {
          let i, o;
          "number" == typeof r ? i = r : null != r && (i = r.index, o = r.injector);
          const s = t.createEmbeddedView(n || {}, o);
          return this.insert(s, i), s;
        }
        createComponent(t, n, r, i, o) {
          const s = t && !function hi(e) {
            return "function" == typeof e;
          }(t);
          let a;
          if (s) a = n;else {
            const d = n || {};
            a = d.index, r = d.injector, i = d.projectableNodes, o = d.environmentInjector || d.ngModuleRef;
          }
          const u = s ? t : new xi(te(t)),
            c = r || this.parentInjector;
          if (!o && null == u.ngModule) {
            const f = (s ? c : this.parentInjector).get(Ut, null);
            f && (o = f);
          }
          const l = u.create(c, i, void 0, o);
          return this.insert(l.hostView, a), l;
        }
        insert(t, n) {
          const r = t._lView,
            i = r[E];
          if (function Hw(e) {
            return It(e[he]);
          }(r)) {
            const l = this.indexOf(t);
            if (-1 !== l) this.detach(l);else {
              const d = r[he],
                f = new cm(d, d[je], d[he]);
              f.detach(f.indexOf(t));
            }
          }
          const o = this._adjustIndex(n),
            s = this._lContainer;
          !function a_(e, t, n, r) {
            const i = Ve + r,
              o = n.length;
            r > 0 && (n[i - 1][Et] = t), r < o - Ve ? (t[Et] = n[i], Ef(n, Ve + r, t)) : (n.push(t), t[Et] = null), t[he] = n;
            const s = t[si];
            null !== s && n !== s && function u_(e, t) {
              const n = e[or];
              t[$e] !== t[he][he][$e] && (e[Fd] = !0), null === n ? e[or] = [t] : n.push(t);
            }(s, t);
            const a = t[Lt];
            null !== a && a.insertView(e), t[z] |= 64;
          }(i, r, s, o);
          const a = Cu(o, s),
            u = r[W],
            c = Zo(u, s[Po]);
          return null !== c && function i_(e, t, n, r, i, o) {
            r[Zt] = i, r[je] = t, Ci(e, r, n, 1, i, o);
          }(i, s[je], u, r, c, a), t.attachToViewContainerRef(), Ef(Ec(s), o, t), t;
        }
        move(t, n) {
          return this.insert(t, n);
        }
        indexOf(t) {
          const n = lm(this._lContainer);
          return null !== n ? n.indexOf(t) : -1;
        }
        remove(t) {
          const n = this._adjustIndex(t, -1),
            r = vu(this._lContainer, n);
          r && (Wo(Ec(this._lContainer), n), Kf(r[E], r));
        }
        detach(t) {
          const n = this._adjustIndex(t, -1),
            r = vu(this._lContainer, n);
          return r && null != Wo(Ec(this._lContainer), n) ? new Mi(r) : null;
        }
        _adjustIndex(t, n = 0) {
          return t ?? this.length + n;
        }
      };
    function lm(e) {
      return e[Oo];
    }
    function Ec(e) {
      return e[Oo] || (e[Oo] = []);
    }
    function Ms(...e) {}
    const xs = new T("Application Initializer");
    let Ts = (() => {
      class e {
        constructor(n) {
          this.appInits = n, this.resolve = Ms, this.reject = Ms, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, i) => {
            this.resolve = r, this.reject = i;
          });
        }
        runInitializers() {
          if (this.initialized) return;
          const n = [],
            r = () => {
              this.done = !0, this.resolve();
            };
          if (this.appInits) for (let i = 0; i < this.appInits.length; i++) {
            const o = this.appInits[i]();
            if (ms(o)) n.push(o);else if (Tp(o)) {
              const s = new Promise((a, u) => {
                o.subscribe({
                  complete: a,
                  error: u
                });
              });
              n.push(s);
            }
          }
          Promise.all(n).then(() => {
            r();
          }).catch(i => {
            this.reject(i);
          }), 0 === n.length && r(), this.initialized = !0;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(xs, 8));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    const $i = new T("AppId", {
      providedIn: "root",
      factory: function Lm() {
        return `${Fc()}${Fc()}${Fc()}`;
      }
    });
    function Fc() {
      return String.fromCharCode(97 + Math.floor(25 * Math.random()));
    }
    const jm = new T("Platform Initializer"),
      kc = new T("Platform ID", {
        providedIn: "platform",
        factory: () => "unknown"
      });
    let GS = (() => {
      class e {
        log(n) {
          console.log(n);
        }
        warn(n) {
          console.warn(n);
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "platform"
      }), e;
    })();
    const on = new T("LocaleId", {
      providedIn: "root",
      factory: () => q(on, k.Optional | k.SkipSelf) || function WS() {
        return typeof $localize < "u" && $localize.locale || jr;
      }()
    });
    class KS {
      constructor(t, n) {
        this.ngModuleFactory = t, this.componentFactories = n;
      }
    }
    let $m = (() => {
      class e {
        compileModuleSync(n) {
          return new wc(n);
        }
        compileModuleAsync(n) {
          return Promise.resolve(this.compileModuleSync(n));
        }
        compileModuleAndAllComponentsSync(n) {
          const r = this.compileModuleSync(n),
            o = en(it(n).declarations).reduce((s, a) => {
              const u = te(a);
              return u && s.push(new xi(u)), s;
            }, []);
          return new KS(r, o);
        }
        compileModuleAndAllComponentsAsync(n) {
          return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
        }
        clearCache() {}
        clearCacheFor(n) {}
        getModuleId(n) {}
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    const QS = (() => Promise.resolve(0))();
    function Lc(e) {
      typeof Zone > "u" ? QS.then(() => {
        e && e.apply(null, null);
      }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
    }
    class ye {
      constructor({
        enableLongStackTrace: t = !1,
        shouldCoalesceEventChangeDetection: n = !1,
        shouldCoalesceRunChangeDetection: r = !1
      }) {
        if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new Ze(!1), this.onMicrotaskEmpty = new Ze(!1), this.onStable = new Ze(!1), this.onError = new Ze(!1), typeof Zone > "u") throw new _(908, !1);
        Zone.assertZonePatched();
        const i = this;
        i._nesting = 0, i._outer = i._inner = Zone.current, Zone.TaskTrackingZoneSpec && (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())), t && Zone.longStackTraceZoneSpec && (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)), i.shouldCoalesceEventChangeDetection = !r && n, i.shouldCoalesceRunChangeDetection = r, i.lastRequestAnimationFrameId = -1, i.nativeRequestAnimationFrame = function XS() {
          let e = se.requestAnimationFrame,
            t = se.cancelAnimationFrame;
          if (typeof Zone < "u" && e && t) {
            const n = e[Zone.__symbol__("OriginalDelegate")];
            n && (e = n);
            const r = t[Zone.__symbol__("OriginalDelegate")];
            r && (t = r);
          }
          return {
            nativeRequestAnimationFrame: e,
            nativeCancelAnimationFrame: t
          };
        }().nativeRequestAnimationFrame, function tM(e) {
          const t = () => {
            !function eM(e) {
              e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(se, () => {
                e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                  e.lastRequestAnimationFrameId = -1, $c(e), e.isCheckStableRunning = !0, jc(e), e.isCheckStableRunning = !1;
                }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke();
              }), $c(e));
            }(e);
          };
          e._inner = e._inner.fork({
            name: "angular",
            properties: {
              isAngularZone: !0
            },
            onInvokeTask: (n, r, i, o, s, a) => {
              try {
                return Bm(e), n.invokeTask(i, o, s, a);
              } finally {
                (e.shouldCoalesceEventChangeDetection && "eventTask" === o.type || e.shouldCoalesceRunChangeDetection) && t(), Vm(e);
              }
            },
            onInvoke: (n, r, i, o, s, a, u) => {
              try {
                return Bm(e), n.invoke(i, o, s, a, u);
              } finally {
                e.shouldCoalesceRunChangeDetection && t(), Vm(e);
              }
            },
            onHasTask: (n, r, i, o) => {
              n.hasTask(i, o), r === i && ("microTask" == o.change ? (e._hasPendingMicrotasks = o.microTask, $c(e), jc(e)) : "macroTask" == o.change && (e.hasPendingMacrotasks = o.macroTask));
            },
            onHandleError: (n, r, i, o) => (n.handleError(i, o), e.runOutsideAngular(() => e.onError.emit(o)), !1)
          });
        }(i);
      }
      static isInAngularZone() {
        return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
      }
      static assertInAngularZone() {
        if (!ye.isInAngularZone()) throw new _(909, !1);
      }
      static assertNotInAngularZone() {
        if (ye.isInAngularZone()) throw new _(909, !1);
      }
      run(t, n, r) {
        return this._inner.run(t, n, r);
      }
      runTask(t, n, r, i) {
        const o = this._inner,
          s = o.scheduleEventTask("NgZoneEvent: " + i, t, JS, Ms, Ms);
        try {
          return o.runTask(s, n, r);
        } finally {
          o.cancelTask(s);
        }
      }
      runGuarded(t, n, r) {
        return this._inner.runGuarded(t, n, r);
      }
      runOutsideAngular(t) {
        return this._outer.run(t);
      }
    }
    const JS = {};
    function jc(e) {
      if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
        e._nesting++, e.onMicrotaskEmpty.emit(null);
      } finally {
        if (e._nesting--, !e.hasPendingMicrotasks) try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
      }
    }
    function $c(e) {
      e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId);
    }
    function Bm(e) {
      e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null));
    }
    function Vm(e) {
      e._nesting--, jc(e);
    }
    class nM {
      constructor() {
        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new Ze(), this.onMicrotaskEmpty = new Ze(), this.onStable = new Ze(), this.onError = new Ze();
      }
      run(t, n, r) {
        return t.apply(n, r);
      }
      runGuarded(t, n, r) {
        return t.apply(n, r);
      }
      runOutsideAngular(t) {
        return t();
      }
      runTask(t, n, r, i) {
        return t.apply(n, r);
      }
    }
    const zm = new T(""),
      As = new T("");
    let Bc,
      Uc = (() => {
        class e {
          constructor(n, r, i) {
            this._ngZone = n, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Bc || (function rM(e) {
              Bc = e;
            }(i), i.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
              this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
            });
          }
          _watchAngularEvents() {
            this._ngZone.onUnstable.subscribe({
              next: () => {
                this._didWork = !0, this._isZoneStable = !1;
              }
            }), this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable.subscribe({
                next: () => {
                  ye.assertNotInAngularZone(), Lc(() => {
                    this._isZoneStable = !0, this._runCallbacksIfReady();
                  });
                }
              });
            });
          }
          increasePendingRequestCount() {
            return this._pendingCount += 1, this._didWork = !0, this._pendingCount;
          }
          decreasePendingRequestCount() {
            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
            return this._runCallbacksIfReady(), this._pendingCount;
          }
          isStable() {
            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
          }
          _runCallbacksIfReady() {
            if (this.isStable()) Lc(() => {
              for (; 0 !== this._callbacks.length;) {
                let n = this._callbacks.pop();
                clearTimeout(n.timeoutId), n.doneCb(this._didWork);
              }
              this._didWork = !1;
            });else {
              let n = this.getPendingTasks();
              this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0;
            }
          }
          getPendingTasks() {
            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data
            })) : [];
          }
          addCallback(n, r, i) {
            let o = -1;
            r && r > 0 && (o = setTimeout(() => {
              this._callbacks = this._callbacks.filter(s => s.timeoutId !== o), n(this._didWork, this.getPendingTasks());
            }, r)), this._callbacks.push({
              doneCb: n,
              timeoutId: o,
              updateCb: i
            });
          }
          whenStable(n, r, i) {
            if (i && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
            this.addCallback(n, r, i), this._runCallbacksIfReady();
          }
          getPendingRequestCount() {
            return this._pendingCount;
          }
          registerApplication(n) {
            this.registry.registerApplication(n, this);
          }
          unregisterApplication(n) {
            this.registry.unregisterApplication(n);
          }
          findProviders(n, r, i) {
            return [];
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(ye), x(Hc), x(As));
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac
        }), e;
      })(),
      Hc = (() => {
        class e {
          constructor() {
            this._applications = new Map();
          }
          registerApplication(n, r) {
            this._applications.set(n, r);
          }
          unregisterApplication(n) {
            this._applications.delete(n);
          }
          unregisterAllApplications() {
            this._applications.clear();
          }
          getTestability(n) {
            return this._applications.get(n) || null;
          }
          getAllTestabilities() {
            return Array.from(this._applications.values());
          }
          getAllRootElements() {
            return Array.from(this._applications.keys());
          }
          findTestabilityInTree(n, r = !0) {
            return Bc?.findTestabilityInTree(this, n, r) ?? null;
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac,
          providedIn: "platform"
        }), e;
      })();
    const sn = !1;
    let Dn = null;
    const Gm = new T("AllowMultipleToken"),
      Vc = new T("PlatformDestroyListeners"),
      Wm = new T("appBootstrapListener");
    class qm {
      constructor(t, n) {
        this.name = t, this.token = n;
      }
    }
    function Ym(e, t, n = []) {
      const r = `Platform: ${t}`,
        i = new T(r);
      return (o = []) => {
        let s = zc();
        if (!s || s.injector.get(Gm, !1)) {
          const a = [...n, ...o, {
            provide: i,
            useValue: !0
          }];
          e ? e(a) : function sM(e) {
            if (Dn && !Dn.get(Gm, !1)) throw new _(400, !1);
            Dn = e;
            const t = e.get(Qm);
            (function Km(e) {
              const t = e.get(jm, null);
              t && t.forEach(n => n());
            })(e);
          }(function Zm(e = [], t) {
            return tn.create({
              name: t,
              providers: [{
                provide: Nu,
                useValue: "platform"
              }, {
                provide: Vc,
                useValue: new Set([() => Dn = null])
              }, ...e]
            });
          }(a, r));
        }
        return function uM(e) {
          const t = zc();
          if (!t) throw new _(401, !1);
          return t;
        }();
      };
    }
    function zc() {
      return Dn?.get(Qm) ?? null;
    }
    let Qm = (() => {
      class e {
        constructor(n) {
          this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
        }
        bootstrapModuleFactory(n, r) {
          const i = function Jm(e, t) {
              let n;
              return n = "noop" === e ? new nM() : ("zone.js" === e ? void 0 : e) || new ye(t), n;
            }(r?.ngZone, function Xm(e) {
              return {
                enableLongStackTrace: !1,
                shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
              };
            }(r)),
            o = [{
              provide: ye,
              useValue: i
            }];
          return i.run(() => {
            const s = tn.create({
                providers: o,
                parent: this.injector,
                name: n.moduleType.name
              }),
              a = n.create(s),
              u = a.injector.get(Cr, null);
            if (!u) throw new _(402, !1);
            return i.runOutsideAngular(() => {
              const c = i.onError.subscribe({
                next: l => {
                  u.handleError(l);
                }
              });
              a.onDestroy(() => {
                Ps(this._modules, a), c.unsubscribe();
              });
            }), function ey(e, t, n) {
              try {
                const r = n();
                return ms(r) ? r.catch(i => {
                  throw t.runOutsideAngular(() => e.handleError(i)), i;
                }) : r;
              } catch (r) {
                throw t.runOutsideAngular(() => e.handleError(r)), r;
              }
            }(u, i, () => {
              const c = a.injector.get(Ts);
              return c.runInitializers(), c.donePromise.then(() => (function Eg(e) {
                pt(e, "Expected localeId to be defined"), "string" == typeof e && (bg = e.toLowerCase().replace(/_/g, "-"));
              }(a.injector.get(on, jr) || jr), this._moduleDoBootstrap(a), a));
            });
          });
        }
        bootstrapModule(n, r = []) {
          const i = ty({}, r);
          return function iM(e, t, n) {
            const r = new wc(n);
            return Promise.resolve(r);
          }(0, 0, n).then(o => this.bootstrapModuleFactory(o, i));
        }
        _moduleDoBootstrap(n) {
          const r = n.injector.get(Rs);
          if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach(i => r.bootstrap(i));else {
            if (!n.instance.ngDoBootstrap) throw new _(-403, !1);
            n.instance.ngDoBootstrap(r);
          }
          this._modules.push(n);
        }
        onDestroy(n) {
          this._destroyListeners.push(n);
        }
        get injector() {
          return this._injector;
        }
        destroy() {
          if (this._destroyed) throw new _(404, !1);
          this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
          const n = this._injector.get(Vc, null);
          n && (n.forEach(r => r()), n.clear()), this._destroyed = !0;
        }
        get destroyed() {
          return this._destroyed;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(tn));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "platform"
      }), e;
    })();
    function ty(e, t) {
      return Array.isArray(t) ? t.reduce(ty, e) : {
        ...e,
        ...t
      };
    }
    let Rs = (() => {
      class e {
        get destroyed() {
          return this._destroyed;
        }
        get injector() {
          return this._injector;
        }
        constructor(n, r, i) {
          this._zone = n, this._injector = r, this._exceptionHandler = i, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this._zone.run(() => {
                this.tick();
              });
            }
          });
          const o = new ge(a => {
              this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                a.next(this._stable), a.complete();
              });
            }),
            s = new ge(a => {
              let u;
              this._zone.runOutsideAngular(() => {
                u = this._zone.onStable.subscribe(() => {
                  ye.assertNotInAngularZone(), Lc(() => {
                    !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, a.next(!0));
                  });
                });
              });
              const c = this._zone.onUnstable.subscribe(() => {
                ye.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                  a.next(!1);
                }));
              });
              return () => {
                u.unsubscribe(), c.unsubscribe();
              };
            });
          this.isStable = Cd(o, s.pipe(function sw() {
            return e => Co()(function rw(e, t) {
              return function (r) {
                let i;
                if (i = "function" == typeof e ? e : function () {
                  return e;
                }, "function" == typeof t) return r.lift(new iw(i, t));
                const o = Object.create(r, ew);
                return o.source = r, o.subjectFactory = i, o;
              };
            }(ow)(e));
          }()));
        }
        bootstrap(n, r) {
          const i = n instanceof Th;
          if (!this._injector.get(Ts).done) {
            !i && function tr(e) {
              const t = te(e) || Le(e) || Je(e);
              return null !== t && t.standalone;
            }(n);
            throw new _(405, sn);
          }
          let s;
          s = i ? n : this._injector.get(Ii).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
          const a = function oM(e) {
              return e.isBoundToModule;
            }(s) ? void 0 : this._injector.get($r),
            c = s.create(tn.NULL, [], r || s.selector, a),
            l = c.location.nativeElement,
            d = c.injector.get(zm, null);
          return d?.registerApplication(l), c.onDestroy(() => {
            this.detachView(c.hostView), Ps(this.components, c), d?.unregisterApplication(l);
          }), this._loadComponent(c), c;
        }
        tick() {
          if (this._runningTick) throw new _(101, !1);
          try {
            this._runningTick = !0;
            for (let n of this._views) n.detectChanges();
          } catch (n) {
            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(n));
          } finally {
            this._runningTick = !1;
          }
        }
        attachView(n) {
          const r = n;
          this._views.push(r), r.attachToAppRef(this);
        }
        detachView(n) {
          const r = n;
          Ps(this._views, r), r.detachFromAppRef();
        }
        _loadComponent(n) {
          this.attachView(n.hostView), this.tick(), this.components.push(n);
          const r = this._injector.get(Wm, []);
          r.push(...this._bootstrapListeners), r.forEach(i => i(n));
        }
        ngOnDestroy() {
          if (!this._destroyed) try {
            this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy()), this._onMicrotaskEmptySubscription.unsubscribe();
          } finally {
            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = [];
          }
        }
        onDestroy(n) {
          return this._destroyListeners.push(n), () => Ps(this._destroyListeners, n);
        }
        destroy() {
          if (this._destroyed) throw new _(406, !1);
          const n = this._injector;
          n.destroy && !n.destroyed && n.destroy();
        }
        get viewCount() {
          return this._views.length;
        }
        warnIfDestroyed() {}
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(ye), x(Ut), x(Cr));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    function Ps(e, t) {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    }
    let Gc = (() => {
      class e {}
      return e.__NG_ELEMENT_ID__ = lM, e;
    })();
    function lM(e) {
      return function dM(e, t, n) {
        if (ui(e) && !n) {
          const r = at(e.index, t);
          return new Mi(r, r);
        }
        return 47 & e.type ? new Mi(t[$e], t) : null;
      }(Ne(), y(), 16 == (16 & e));
    }
    class sy {
      constructor() {}
      supports(t) {
        return ps(t);
      }
      create(t) {
        return new yM(t);
      }
    }
    const mM = (e, t) => t;
    class yM {
      constructor(t) {
        this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || mM;
      }
      forEachItem(t) {
        let n;
        for (n = this._itHead; null !== n; n = n._next) t(n);
      }
      forEachOperation(t) {
        let n = this._itHead,
          r = this._removalsHead,
          i = 0,
          o = null;
        for (; n || r;) {
          const s = !r || n && n.currentIndex < uy(r, i, o) ? n : r,
            a = uy(s, i, o),
            u = s.currentIndex;
          if (s === r) i--, r = r._nextRemoved;else if (n = n._next, null == s.previousIndex) i++;else {
            o || (o = []);
            const c = a - i,
              l = u - i;
            if (c != l) {
              for (let f = 0; f < c; f++) {
                const h = f < o.length ? o[f] : o[f] = 0,
                  p = h + f;
                l <= p && p < c && (o[f] = h + 1);
              }
              o[s.previousIndex] = l - c;
            }
          }
          a !== u && t(s, a, u);
        }
      }
      forEachPreviousItem(t) {
        let n;
        for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
      }
      forEachAddedItem(t) {
        let n;
        for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
      }
      forEachMovedItem(t) {
        let n;
        for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
      }
      forEachRemovedItem(t) {
        let n;
        for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
      }
      forEachIdentityChange(t) {
        let n;
        for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n);
      }
      diff(t) {
        if (null == t && (t = []), !ps(t)) throw new _(900, !1);
        return this.check(t) ? this : null;
      }
      onDestroy() {}
      check(t) {
        this._reset();
        let i,
          o,
          s,
          n = this._itHead,
          r = !1;
        if (Array.isArray(t)) {
          this.length = t.length;
          for (let a = 0; a < this.length; a++) o = t[a], s = this._trackByFn(a, o), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, o, s, a)), Object.is(n.item, o) || this._addIdentityChange(n, o)) : (n = this._mismatch(n, o, s, a), r = !0), n = n._next;
        } else i = 0, function U0(e, t) {
          if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);else {
            const n = e[Symbol.iterator]();
            let r;
            for (; !(r = n.next()).done;) t(r.value);
          }
        }(t, a => {
          s = this._trackByFn(i, a), null !== n && Object.is(n.trackById, s) ? (r && (n = this._verifyReinsertion(n, a, s, i)), Object.is(n.item, a) || this._addIdentityChange(n, a)) : (n = this._mismatch(n, a, s, i), r = !0), n = n._next, i++;
        }), this.length = i;
        return this._truncate(n), this.collection = t, this.isDirty;
      }
      get isDirty() {
        return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
      }
      _reset() {
        if (this.isDirty) {
          let t;
          for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
          for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
          this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null;
        }
      }
      _mismatch(t, n, r, i) {
        let o;
        return null === t ? o = this._itTail : (o = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, o, i)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, i)) ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, o, i)) : t = this._addAfter(new vM(n, r), o, i), t;
      }
      _verifyReinsertion(t, n, r, i) {
        let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
        return null !== o ? t = this._reinsertAfter(o, t._prev, i) : t.currentIndex != i && (t.currentIndex = i, this._addToMoves(t, i)), t;
      }
      _truncate(t) {
        for (; null !== t;) {
          const n = t._next;
          this._addToRemovals(this._unlink(t)), t = n;
        }
        null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
      }
      _reinsertAfter(t, n, r) {
        null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
        const i = t._prevRemoved,
          o = t._nextRemoved;
        return null === i ? this._removalsHead = o : i._nextRemoved = o, null === o ? this._removalsTail = i : o._prevRemoved = i, this._insertAfter(t, n, r), this._addToMoves(t, r), t;
      }
      _moveAfter(t, n, r) {
        return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
      }
      _addAfter(t, n, r) {
        return this._insertAfter(t, n, r), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t;
      }
      _insertAfter(t, n, r) {
        const i = null === n ? this._itHead : n._next;
        return t._next = i, t._prev = n, null === i ? this._itTail = t : i._prev = t, null === n ? this._itHead = t : n._next = t, null === this._linkedRecords && (this._linkedRecords = new ay()), this._linkedRecords.put(t), t.currentIndex = r, t;
      }
      _remove(t) {
        return this._addToRemovals(this._unlink(t));
      }
      _unlink(t) {
        null !== this._linkedRecords && this._linkedRecords.remove(t);
        const n = t._prev,
          r = t._next;
        return null === n ? this._itHead = r : n._next = r, null === r ? this._itTail = n : r._prev = n, t;
      }
      _addToMoves(t, n) {
        return t.previousIndex === n || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t;
      }
      _addToRemovals(t) {
        return null === this._unlinkedRecords && (this._unlinkedRecords = new ay()), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t;
      }
      _addIdentityChange(t, n) {
        return t.item = n, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t;
      }
    }
    class vM {
      constructor(t, n) {
        this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null;
      }
    }
    class DM {
      constructor() {
        this._head = null, this._tail = null;
      }
      add(t) {
        null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t);
      }
      get(t, n) {
        let r;
        for (r = this._head; null !== r; r = r._nextDup) if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
        return null;
      }
      remove(t) {
        const n = t._prevDup,
          r = t._nextDup;
        return null === n ? this._head = r : n._nextDup = r, null === r ? this._tail = n : r._prevDup = n, null === this._head;
      }
    }
    class ay {
      constructor() {
        this.map = new Map();
      }
      put(t) {
        const n = t.trackById;
        let r = this.map.get(n);
        r || (r = new DM(), this.map.set(n, r)), r.add(t);
      }
      get(t, n) {
        const i = this.map.get(t);
        return i ? i.get(t, n) : null;
      }
      remove(t) {
        const n = t.trackById;
        return this.map.get(n).remove(t) && this.map.delete(n), t;
      }
      get isEmpty() {
        return 0 === this.map.size;
      }
      clear() {
        this.map.clear();
      }
    }
    function uy(e, t, n) {
      const r = e.previousIndex;
      if (null === r) return r;
      let i = 0;
      return n && r < n.length && (i = n[r]), r + t + i;
    }
    function ly() {
      return new Fs([new sy()]);
    }
    let Fs = (() => {
      class e {
        constructor(n) {
          this.factories = n;
        }
        static create(n, r) {
          if (null != r) {
            const i = r.factories.slice();
            n = n.concat(i);
          }
          return new e(n);
        }
        static extend(n) {
          return {
            provide: e,
            useFactory: r => e.create(n, r || ly()),
            deps: [[e, new mi(), new gi()]]
          };
        }
        find(n) {
          const r = this.factories.find(i => i.supports(n));
          if (null != r) return r;
          throw new _(901, !1);
        }
      }
      return e.ɵprov = R({
        token: e,
        providedIn: "root",
        factory: ly
      }), e;
    })();
    const EM = Ym(null, "core", []);
    let IM = (() => {
        class e {
          constructor(n) {}
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(Rs));
        }, e.ɵmod = An({
          type: e
        }), e.ɵinj = pn({}), e;
      })(),
      Qc = null;
    function zn() {
      return Qc;
    }
    class xM {}
    const Xe = new T("DocumentToken");
    let Xc = (() => {
      class e {
        historyGo(n) {
          throw new Error("Not implemented");
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: function () {
          return function TM() {
            return x(fy);
          }();
        },
        providedIn: "platform"
      }), e;
    })();
    const AM = new T("Location Initialized");
    let fy = (() => {
      class e extends Xc {
        constructor(n) {
          super(), this._doc = n, this._location = window.location, this._history = window.history;
        }
        getBaseHrefFromDOM() {
          return zn().getBaseHref(this._doc);
        }
        onPopState(n) {
          const r = zn().getGlobalEventTarget(this._doc, "window");
          return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n);
        }
        onHashChange(n) {
          const r = zn().getGlobalEventTarget(this._doc, "window");
          return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n);
        }
        get href() {
          return this._location.href;
        }
        get protocol() {
          return this._location.protocol;
        }
        get hostname() {
          return this._location.hostname;
        }
        get port() {
          return this._location.port;
        }
        get pathname() {
          return this._location.pathname;
        }
        get search() {
          return this._location.search;
        }
        get hash() {
          return this._location.hash;
        }
        set pathname(n) {
          this._location.pathname = n;
        }
        pushState(n, r, i) {
          hy() ? this._history.pushState(n, r, i) : this._location.hash = i;
        }
        replaceState(n, r, i) {
          hy() ? this._history.replaceState(n, r, i) : this._location.hash = i;
        }
        forward() {
          this._history.forward();
        }
        back() {
          this._history.back();
        }
        historyGo(n = 0) {
          this._history.go(n);
        }
        getState() {
          return this._history.state;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Xe));
      }, e.ɵprov = R({
        token: e,
        factory: function () {
          return function RM() {
            return new fy(x(Xe));
          }();
        },
        providedIn: "platform"
      }), e;
    })();
    function hy() {
      return !!window.history.pushState;
    }
    function Jc(e, t) {
      if (0 == e.length) return t;
      if (0 == t.length) return e;
      let n = 0;
      return e.endsWith("/") && n++, t.startsWith("/") && n++, 2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t;
    }
    function py(e) {
      const t = e.match(/#|\?|$/),
        n = t && t.index || e.length;
      return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
    }
    function an(e) {
      return e && "?" !== e[0] ? "?" + e : e;
    }
    let Gn = (() => {
      class e {
        historyGo(n) {
          throw new Error("Not implemented");
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: function () {
          return q(my);
        },
        providedIn: "root"
      }), e;
    })();
    const gy = new T("appBaseHref");
    let my = (() => {
        class e extends Gn {
          constructor(n, r) {
            super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? q(Xe).location?.origin ?? "";
          }
          ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()();
          }
          onPopState(n) {
            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n));
          }
          getBaseHref() {
            return this._baseHref;
          }
          prepareExternalUrl(n) {
            return Jc(this._baseHref, n);
          }
          path(n = !1) {
            const r = this._platformLocation.pathname + an(this._platformLocation.search),
              i = this._platformLocation.hash;
            return i && n ? `${r}${i}` : r;
          }
          pushState(n, r, i, o) {
            const s = this.prepareExternalUrl(i + an(o));
            this._platformLocation.pushState(n, r, s);
          }
          replaceState(n, r, i, o) {
            const s = this.prepareExternalUrl(i + an(o));
            this._platformLocation.replaceState(n, r, s);
          }
          forward() {
            this._platformLocation.forward();
          }
          back() {
            this._platformLocation.back();
          }
          getState() {
            return this._platformLocation.getState();
          }
          historyGo(n = 0) {
            this._platformLocation.historyGo?.(n);
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(Xc), x(gy, 8));
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac,
          providedIn: "root"
        }), e;
      })(),
      PM = (() => {
        class e extends Gn {
          constructor(n, r) {
            super(), this._platformLocation = n, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r);
          }
          ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()();
          }
          onPopState(n) {
            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n));
          }
          getBaseHref() {
            return this._baseHref;
          }
          path(n = !1) {
            let r = this._platformLocation.hash;
            return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
          }
          prepareExternalUrl(n) {
            const r = Jc(this._baseHref, n);
            return r.length > 0 ? "#" + r : r;
          }
          pushState(n, r, i, o) {
            let s = this.prepareExternalUrl(i + an(o));
            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(n, r, s);
          }
          replaceState(n, r, i, o) {
            let s = this.prepareExternalUrl(i + an(o));
            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, s);
          }
          forward() {
            this._platformLocation.forward();
          }
          back() {
            this._platformLocation.back();
          }
          getState() {
            return this._platformLocation.getState();
          }
          historyGo(n = 0) {
            this._platformLocation.historyGo?.(n);
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(Xc), x(gy, 8));
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac
        }), e;
      })(),
      el = (() => {
        class e {
          constructor(n) {
            this._subject = new Ze(), this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n;
            const r = this._locationStrategy.getBaseHref();
            this._basePath = function FM(e) {
              if (new RegExp("^(https?:)?//").test(e)) {
                const [, n] = e.split(/\/\/[^\/]+/);
                return n;
              }
              return e;
            }(py(yy(r))), this._locationStrategy.onPopState(i => {
              this._subject.emit({
                url: this.path(!0),
                pop: !0,
                state: i.state,
                type: i.type
              });
            });
          }
          ngOnDestroy() {
            this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = [];
          }
          path(n = !1) {
            return this.normalize(this._locationStrategy.path(n));
          }
          getState() {
            return this._locationStrategy.getState();
          }
          isCurrentPathEqualTo(n, r = "") {
            return this.path() == this.normalize(n + an(r));
          }
          normalize(n) {
            return e.stripTrailingSlash(function NM(e, t) {
              if (!e || !t.startsWith(e)) return t;
              const n = t.substring(e.length);
              return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
            }(this._basePath, yy(n)));
          }
          prepareExternalUrl(n) {
            return n && "/" !== n[0] && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n);
          }
          go(n, r = "", i = null) {
            this._locationStrategy.pushState(i, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + an(r)), i);
          }
          replaceState(n, r = "", i = null) {
            this._locationStrategy.replaceState(i, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + an(r)), i);
          }
          forward() {
            this._locationStrategy.forward();
          }
          back() {
            this._locationStrategy.back();
          }
          historyGo(n = 0) {
            this._locationStrategy.historyGo?.(n);
          }
          onUrlChange(n) {
            return this._urlChangeListeners.push(n), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
              this._notifyUrlChangeListeners(r.url, r.state);
            })), () => {
              const r = this._urlChangeListeners.indexOf(n);
              this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null);
            };
          }
          _notifyUrlChangeListeners(n = "", r) {
            this._urlChangeListeners.forEach(i => i(n, r));
          }
          subscribe(n, r, i) {
            return this._subject.subscribe({
              next: n,
              error: r,
              complete: i
            });
          }
        }
        return e.normalizeQueryParams = an, e.joinWithSlash = Jc, e.stripTrailingSlash = py, e.ɵfac = function (n) {
          return new (n || e)(x(Gn));
        }, e.ɵprov = R({
          token: e,
          factory: function () {
            return function OM() {
              return new el(x(Gn));
            }();
          },
          providedIn: "root"
        }), e;
      })();
    function yy(e) {
      return e.replace(/\/index.html$/, "");
    }
    function Sy(e, t) {
      t = encodeURIComponent(t);
      for (const n of e.split(";")) {
        const r = n.indexOf("="),
          [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
        if (i.trim() === t) return decodeURIComponent(o);
      }
      return null;
    }
    class wx {
      constructor(t, n, r, i) {
        this.$implicit = t, this.ngForOf = n, this.index = r, this.count = i;
      }
      get first() {
        return 0 === this.index;
      }
      get last() {
        return this.index === this.count - 1;
      }
      get even() {
        return this.index % 2 == 0;
      }
      get odd() {
        return !this.even;
      }
    }
    let dl = (() => {
      class e {
        set ngForOf(n) {
          this._ngForOf = n, this._ngForOfDirty = !0;
        }
        set ngForTrackBy(n) {
          this._trackByFn = n;
        }
        get ngForTrackBy() {
          return this._trackByFn;
        }
        constructor(n, r, i) {
          this._viewContainer = n, this._template = r, this._differs = i, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null;
        }
        set ngForTemplate(n) {
          n && (this._template = n);
        }
        ngDoCheck() {
          if (this._ngForOfDirty) {
            this._ngForOfDirty = !1;
            const n = this._ngForOf;
            !this._differ && n && (this._differ = this._differs.find(n).create(this.ngForTrackBy));
          }
          if (this._differ) {
            const n = this._differ.diff(this._ngForOf);
            n && this._applyChanges(n);
          }
        }
        _applyChanges(n) {
          const r = this._viewContainer;
          n.forEachOperation((i, o, s) => {
            if (null == i.previousIndex) r.createEmbeddedView(this._template, new wx(i.item, this._ngForOf, -1, -1), null === s ? void 0 : s);else if (null == s) r.remove(null === o ? void 0 : o);else if (null !== o) {
              const a = r.get(o);
              r.move(a, s), Ay(a, i);
            }
          });
          for (let i = 0, o = r.length; i < o; i++) {
            const a = r.get(i).context;
            a.index = i, a.count = o, a.ngForOf = this._ngForOf;
          }
          n.forEachIdentityChange(i => {
            Ay(r.get(i.currentIndex), i);
          });
        }
        static ngTemplateContextGuard(n, r) {
          return !0;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(P(At), P(rn), P(Fs));
      }, e.ɵdir = Be({
        type: e,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate"
        },
        standalone: !0
      }), e;
    })();
    function Ay(e, t) {
      e.context.$implicit = t.item;
    }
    let Br = (() => {
      class e {
        constructor(n, r) {
          this._viewContainer = n, this._context = new _x(), this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r;
        }
        set ngIf(n) {
          this._context.$implicit = this._context.ngIf = n, this._updateView();
        }
        set ngIfThen(n) {
          Ry("ngIfThen", n), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView();
        }
        set ngIfElse(n) {
          Ry("ngIfElse", n), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView();
        }
        _updateView() {
          this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
        }
        static ngTemplateContextGuard(n, r) {
          return !0;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(P(At), P(rn));
      }, e.ɵdir = Be({
        type: e,
        selectors: [["", "ngIf", ""]],
        inputs: {
          ngIf: "ngIf",
          ngIfThen: "ngIfThen",
          ngIfElse: "ngIfElse"
        },
        standalone: !0
      }), e;
    })();
    class _x {
      constructor() {
        this.$implicit = null, this.ngIf = null;
      }
    }
    function Ry(e, t) {
      if (t && !t.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${ie(t)}'.`);
    }
    class Ix {
      createSubscription(t, n) {
        return t.subscribe({
          next: n,
          error: r => {
            throw r;
          }
        });
      }
      dispose(t) {
        t.unsubscribe();
      }
    }
    class Sx {
      createSubscription(t, n) {
        return t.then(n, r => {
          throw r;
        });
      }
      dispose(t) {}
    }
    const Mx = new Sx(),
      xx = new Ix();
    let pl = (() => {
        class e {
          constructor(n) {
            this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null, this._ref = n;
          }
          ngOnDestroy() {
            this._subscription && this._dispose(), this._ref = null;
          }
          transform(n) {
            return this._obj ? n !== this._obj ? (this._dispose(), this.transform(n)) : this._latestValue : (n && this._subscribe(n), this._latestValue);
          }
          _subscribe(n) {
            this._obj = n, this._strategy = this._selectStrategy(n), this._subscription = this._strategy.createSubscription(n, r => this._updateLatestValue(n, r));
          }
          _selectStrategy(n) {
            if (ms(n)) return Mx;
            if (xp(n)) return xx;
            throw function Ot(e, t) {
              return new _(2100, !1);
            }();
          }
          _dispose() {
            this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null;
          }
          _updateLatestValue(n, r) {
            n === this._obj && (this._latestValue = r, this._ref.markForCheck());
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(P(Gc, 16));
        }, e.ɵpipe = Pe({
          name: "async",
          type: e,
          pure: !1,
          standalone: !0
        }), e;
      })(),
      Wx = (() => {
        class e {}
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵmod = An({
          type: e
        }), e.ɵinj = pn({}), e;
      })();
    let Zx = (() => {
      class e {}
      return e.ɵprov = R({
        token: e,
        providedIn: "root",
        factory: () => new Qx(x(Xe), window)
      }), e;
    })();
    class Qx {
      constructor(t, n) {
        this.document = t, this.window = n, this.offset = () => [0, 0];
      }
      setOffset(t) {
        this.offset = Array.isArray(t) ? () => t : t;
      }
      getScrollPosition() {
        return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
      }
      scrollToPosition(t) {
        this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
      }
      scrollToAnchor(t) {
        if (!this.supportsScrolling()) return;
        const n = function Xx(e, t) {
          const n = e.getElementById(t) || e.getElementsByName(t)[0];
          if (n) return n;
          if ("function" == typeof e.createTreeWalker && e.body && (e.body.createShadowRoot || e.body.attachShadow)) {
            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
            let i = r.currentNode;
            for (; i;) {
              const o = i.shadowRoot;
              if (o) {
                const s = o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                if (s) return s;
              }
              i = r.nextNode();
            }
          }
          return null;
        }(this.document, t);
        n && (this.scrollToElement(n), n.focus());
      }
      setHistoryScrollRestoration(t) {
        if (this.supportScrollRestoration()) {
          const n = this.window.history;
          n && n.scrollRestoration && (n.scrollRestoration = t);
        }
      }
      scrollToElement(t) {
        const n = t.getBoundingClientRect(),
          r = n.left + this.window.pageXOffset,
          i = n.top + this.window.pageYOffset,
          o = this.offset();
        this.window.scrollTo(r - o[0], i - o[1]);
      }
      supportScrollRestoration() {
        try {
          if (!this.supportsScrolling()) return !1;
          const t = Fy(this.window.history) || Fy(Object.getPrototypeOf(this.window.history));
          return !(!t || !t.writable && !t.set);
        } catch {
          return !1;
        }
      }
      supportsScrolling() {
        try {
          return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window;
        } catch {
          return !1;
        }
      }
    }
    function Fy(e) {
      return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
    }
    class ky {}
    class IT extends xM {
      constructor() {
        super(...arguments), this.supportsDOMEvents = !0;
      }
    }
    class Dl extends IT {
      static makeCurrent() {
        !function MM(e) {
          Qc || (Qc = e);
        }(new Dl());
      }
      onAndCancel(t, n, r) {
        return t.addEventListener(n, r, !1), () => {
          t.removeEventListener(n, r, !1);
        };
      }
      dispatchEvent(t, n) {
        t.dispatchEvent(n);
      }
      remove(t) {
        t.parentNode && t.parentNode.removeChild(t);
      }
      createElement(t, n) {
        return (n = n || this.getDefaultDocument()).createElement(t);
      }
      createHtmlDocument() {
        return document.implementation.createHTMLDocument("fakeTitle");
      }
      getDefaultDocument() {
        return document;
      }
      isElementNode(t) {
        return t.nodeType === Node.ELEMENT_NODE;
      }
      isShadowRoot(t) {
        return t instanceof DocumentFragment;
      }
      getGlobalEventTarget(t, n) {
        return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null;
      }
      getBaseHref(t) {
        const n = function ST() {
          return zi = zi || document.querySelector("base"), zi ? zi.getAttribute("href") : null;
        }();
        return null == n ? null : function MT(e) {
          qs = qs || document.createElement("a"), qs.setAttribute("href", e);
          const t = qs.pathname;
          return "/" === t.charAt(0) ? t : `/${t}`;
        }(n);
      }
      resetBaseElement() {
        zi = null;
      }
      getUserAgent() {
        return window.navigator.userAgent;
      }
      getCookie(t) {
        return Sy(document.cookie, t);
      }
    }
    let qs,
      zi = null;
    const Hy = new T("TRANSITION_ID"),
      TT = [{
        provide: xs,
        useFactory: function xT(e, t, n) {
          return () => {
            n.get(Ts).donePromise.then(() => {
              const r = zn(),
                i = t.querySelectorAll(`style[ng-transition="${e}"]`);
              for (let o = 0; o < i.length; o++) r.remove(i[o]);
            });
          };
        },
        deps: [Hy, Xe, tn],
        multi: !0
      }];
    let RT = (() => {
      class e {
        build() {
          return new XMLHttpRequest();
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    const Ks = new T("EventManagerPlugins");
    let Ys = (() => {
      class e {
        constructor(n, r) {
          this._zone = r, this._eventNameToPlugin = new Map(), n.forEach(i => {
            i.manager = this;
          }), this._plugins = n.slice().reverse();
        }
        addEventListener(n, r, i) {
          return this._findPluginFor(r).addEventListener(n, r, i);
        }
        addGlobalEventListener(n, r, i) {
          return this._findPluginFor(r).addGlobalEventListener(n, r, i);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(n) {
          const r = this._eventNameToPlugin.get(n);
          if (r) return r;
          const i = this._plugins;
          for (let o = 0; o < i.length; o++) {
            const s = i[o];
            if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
          }
          throw new Error(`No event manager plugin found for event ${n}`);
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Ks), x(ye));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    class By {
      constructor(t) {
        this._doc = t;
      }
      addGlobalEventListener(t, n, r) {
        const i = zn().getGlobalEventTarget(this._doc, t);
        if (!i) throw new Error(`Unsupported event target ${i} for event ${n}`);
        return this.addEventListener(i, n, r);
      }
    }
    let Vy = (() => {
        class e {
          constructor() {
            this.usageCount = new Map();
          }
          addStyles(n) {
            for (const r of n) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n) 0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
          }
          onStyleRemoved(n) {}
          onStyleAdded(n) {}
          getAllStyles() {
            return this.usageCount.keys();
          }
          changeUsageCount(n, r) {
            const i = this.usageCount;
            let o = i.get(n) ?? 0;
            return o += r, o > 0 ? i.set(n, o) : i.delete(n), o;
          }
          ngOnDestroy() {
            for (const n of this.getAllStyles()) this.onStyleRemoved(n);
            this.usageCount.clear();
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac
        }), e;
      })(),
      Gi = (() => {
        class e extends Vy {
          constructor(n) {
            super(), this.doc = n, this.styleRef = new Map(), this.hostNodes = new Set(), this.resetHostNodes();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.forEach(o => o.remove()), r.delete(n);
          }
          ngOnDestroy() {
            super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          addStyleToHost(n, r) {
            const i = this.doc.createElement("style");
            i.textContent = r, n.appendChild(i);
            const o = this.styleRef.get(r);
            o ? o.push(i) : this.styleRef.set(r, [i]);
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(Xe));
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac
        }), e;
      })();
    const wl = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/",
        math: "http://www.w3.org/1998/MathML/"
      },
      Cl = /%COMP%/g,
      Wy = new T("RemoveStylesOnCompDestory", {
        providedIn: "root",
        factory: () => !1
      });
    function qy(e, t) {
      return t.flat(100).map(n => n.replace(Cl, e));
    }
    function Ky(e) {
      return t => {
        if ("__ngUnwrap__" === t) return e;
        !1 === e(t) && (t.preventDefault(), t.returnValue = !1);
      };
    }
    let _l = (() => {
      class e {
        constructor(n, r, i, o) {
          this.eventManager = n, this.sharedStylesHost = r, this.appId = i, this.removeStylesOnCompDestory = o, this.rendererByCompId = new Map(), this.defaultRenderer = new bl(n);
        }
        createRenderer(n, r) {
          if (!n || !r) return this.defaultRenderer;
          const i = this.getOrCreateRenderer(n, r);
          return i instanceof Qy ? i.applyToHost(n) : i instanceof El && i.applyStyles(), i;
        }
        getOrCreateRenderer(n, r) {
          const i = this.rendererByCompId;
          let o = i.get(r.id);
          if (!o) {
            const s = this.eventManager,
              a = this.sharedStylesHost,
              u = this.removeStylesOnCompDestory;
            switch (r.encapsulation) {
              case kt.Emulated:
                o = new Qy(s, a, r, this.appId, u);
                break;
              case kt.ShadowDom:
                return new jT(s, a, n, r);
              default:
                o = new El(s, a, r, u);
            }
            o.onDestroy = () => i.delete(r.id), i.set(r.id, o);
          }
          return o;
        }
        ngOnDestroy() {
          this.rendererByCompId.clear();
        }
        begin() {}
        end() {}
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Ys), x(Gi), x($i), x(Wy));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    class bl {
      constructor(t) {
        this.eventManager = t, this.data = Object.create(null), this.destroyNode = null;
      }
      destroy() {}
      createElement(t, n) {
        return n ? document.createElementNS(wl[n] || n, t) : document.createElement(t);
      }
      createComment(t) {
        return document.createComment(t);
      }
      createText(t) {
        return document.createTextNode(t);
      }
      appendChild(t, n) {
        (Zy(t) ? t.content : t).appendChild(n);
      }
      insertBefore(t, n, r) {
        t && (Zy(t) ? t.content : t).insertBefore(n, r);
      }
      removeChild(t, n) {
        t && t.removeChild(n);
      }
      selectRootElement(t, n) {
        let r = "string" == typeof t ? document.querySelector(t) : t;
        if (!r) throw new Error(`The selector "${t}" did not match any elements`);
        return n || (r.textContent = ""), r;
      }
      parentNode(t) {
        return t.parentNode;
      }
      nextSibling(t) {
        return t.nextSibling;
      }
      setAttribute(t, n, r, i) {
        if (i) {
          n = i + ":" + n;
          const o = wl[i];
          o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
        } else t.setAttribute(n, r);
      }
      removeAttribute(t, n, r) {
        if (r) {
          const i = wl[r];
          i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
        } else t.removeAttribute(n);
      }
      addClass(t, n) {
        t.classList.add(n);
      }
      removeClass(t, n) {
        t.classList.remove(n);
      }
      setStyle(t, n, r, i) {
        i & (et.DashCase | et.Important) ? t.style.setProperty(n, r, i & et.Important ? "important" : "") : t.style[n] = r;
      }
      removeStyle(t, n, r) {
        r & et.DashCase ? t.style.removeProperty(n) : t.style[n] = "";
      }
      setProperty(t, n, r) {
        t[n] = r;
      }
      setValue(t, n) {
        t.nodeValue = n;
      }
      listen(t, n, r) {
        return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, n, Ky(r)) : this.eventManager.addEventListener(t, n, Ky(r));
      }
    }
    function Zy(e) {
      return "TEMPLATE" === e.tagName && void 0 !== e.content;
    }
    class jT extends bl {
      constructor(t, n, r, i) {
        super(t), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
          mode: "open"
        }), this.sharedStylesHost.addHost(this.shadowRoot);
        const o = qy(i.id, i.styles);
        for (const s of o) {
          const a = document.createElement("style");
          a.textContent = s, this.shadowRoot.appendChild(a);
        }
      }
      nodeOrShadowRoot(t) {
        return t === this.hostEl ? this.shadowRoot : t;
      }
      appendChild(t, n) {
        return super.appendChild(this.nodeOrShadowRoot(t), n);
      }
      insertBefore(t, n, r) {
        return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
      }
      removeChild(t, n) {
        return super.removeChild(this.nodeOrShadowRoot(t), n);
      }
      parentNode(t) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
      }
      destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
      }
    }
    class El extends bl {
      constructor(t, n, r, i, o = r.id) {
        super(t), this.sharedStylesHost = n, this.removeStylesOnCompDestory = i, this.rendererUsageCount = 0, this.styles = qy(o, r.styles);
      }
      applyStyles() {
        this.sharedStylesHost.addStyles(this.styles), this.rendererUsageCount++;
      }
      destroy() {
        this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles), this.rendererUsageCount--, 0 === this.rendererUsageCount && this.onDestroy?.());
      }
    }
    class Qy extends El {
      constructor(t, n, r, i, o) {
        const s = i + "-" + r.id;
        super(t, n, r, o, s), this.contentAttr = function FT(e) {
          return "_ngcontent-%COMP%".replace(Cl, e);
        }(s), this.hostAttr = function kT(e) {
          return "_nghost-%COMP%".replace(Cl, e);
        }(s);
      }
      applyToHost(t) {
        this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
      }
      createElement(t, n) {
        const r = super.createElement(t, n);
        return super.setAttribute(r, this.contentAttr, ""), r;
      }
    }
    let $T = (() => {
      class e extends By {
        constructor(n) {
          super(n);
        }
        supports(n) {
          return !0;
        }
        addEventListener(n, r, i) {
          return n.addEventListener(r, i, !1), () => this.removeEventListener(n, r, i);
        }
        removeEventListener(n, r, i) {
          return n.removeEventListener(r, i);
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Xe));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    const Xy = ["alt", "control", "meta", "shift"],
      UT = {
        "\b": "Backspace",
        "\t": "Tab",
        "\x7f": "Delete",
        "\x1b": "Escape",
        Del: "Delete",
        Esc: "Escape",
        Left: "ArrowLeft",
        Right: "ArrowRight",
        Up: "ArrowUp",
        Down: "ArrowDown",
        Menu: "ContextMenu",
        Scroll: "ScrollLock",
        Win: "OS"
      },
      HT = {
        alt: e => e.altKey,
        control: e => e.ctrlKey,
        meta: e => e.metaKey,
        shift: e => e.shiftKey
      };
    let BT = (() => {
      class e extends By {
        constructor(n) {
          super(n);
        }
        supports(n) {
          return null != e.parseEventName(n);
        }
        addEventListener(n, r, i) {
          const o = e.parseEventName(r),
            s = e.eventCallback(o.fullKey, i, this.manager.getZone());
          return this.manager.getZone().runOutsideAngular(() => zn().onAndCancel(n, o.domEventName, s));
        }
        static parseEventName(n) {
          const r = n.toLowerCase().split("."),
            i = r.shift();
          if (0 === r.length || "keydown" !== i && "keyup" !== i) return null;
          const o = e._normalizeKey(r.pop());
          let s = "",
            a = r.indexOf("code");
          if (a > -1 && (r.splice(a, 1), s = "code."), Xy.forEach(c => {
            const l = r.indexOf(c);
            l > -1 && (r.splice(l, 1), s += c + ".");
          }), s += o, 0 != r.length || 0 === o.length) return null;
          const u = {};
          return u.domEventName = i, u.fullKey = s, u;
        }
        static matchEventFullKeyCode(n, r) {
          let i = UT[n.key] || n.key,
            o = "";
          return r.indexOf("code.") > -1 && (i = n.code, o = "code."), !(null == i || !i) && (i = i.toLowerCase(), " " === i ? i = "space" : "." === i && (i = "dot"), Xy.forEach(s => {
            s !== i && (0, HT[s])(n) && (o += s + ".");
          }), o += i, o === r);
        }
        static eventCallback(n, r, i) {
          return o => {
            e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
          };
        }
        static _normalizeKey(n) {
          return "esc" === n ? "escape" : n;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Xe));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    const ev = [{
        provide: kc,
        useValue: "browser"
      }, {
        provide: jm,
        useValue: function VT() {
          Dl.makeCurrent();
        },
        multi: !0
      }, {
        provide: Xe,
        useFactory: function GT() {
          return function w_(e) {
            Iu = e;
          }(document), document;
        },
        deps: []
      }],
      WT = Ym(EM, "browser", ev),
      tv = new T(""),
      nv = [{
        provide: As,
        useClass: class AT {
          addToWindow(t) {
            se.getAngularTestability = (r, i = !0) => {
              const o = t.findTestabilityInTree(r, i);
              if (null == o) throw new Error("Could not find testability for element.");
              return o;
            }, se.getAllAngularTestabilities = () => t.getAllTestabilities(), se.getAllAngularRootElements = () => t.getAllRootElements(), se.frameworkStabilizers || (se.frameworkStabilizers = []), se.frameworkStabilizers.push(r => {
              const i = se.getAllAngularTestabilities();
              let o = i.length,
                s = !1;
              const a = function (u) {
                s = s || u, o--, 0 == o && r(s);
              };
              i.forEach(function (u) {
                u.whenStable(a);
              });
            });
          }
          findTestabilityInTree(t, n, r) {
            return null == n ? null : t.getTestability(n) ?? (r ? zn().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null);
          }
        },
        deps: []
      }, {
        provide: zm,
        useClass: Uc,
        deps: [ye, Hc, As]
      }, {
        provide: Uc,
        useClass: Uc,
        deps: [ye, Hc, As]
      }],
      rv = [{
        provide: Nu,
        useValue: "root"
      }, {
        provide: Cr,
        useFactory: function zT() {
          return new Cr();
        },
        deps: []
      }, {
        provide: Ks,
        useClass: $T,
        multi: !0,
        deps: [Xe, ye, kc]
      }, {
        provide: Ks,
        useClass: BT,
        multi: !0,
        deps: [Xe]
      }, {
        provide: _l,
        useClass: _l,
        deps: [Ys, Gi, $i, Wy]
      }, {
        provide: Rh,
        useExisting: _l
      }, {
        provide: Vy,
        useExisting: Gi
      }, {
        provide: Gi,
        useClass: Gi,
        deps: [Xe]
      }, {
        provide: Ys,
        useClass: Ys,
        deps: [Ks, ye]
      }, {
        provide: ky,
        useClass: RT,
        deps: []
      }, []];
    let qT = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [{
                provide: $i,
                useValue: n.appId
              }, {
                provide: Hy,
                useExisting: $i
              }, TT]
            };
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(tv, 12));
        }, e.ɵmod = An({
          type: e
        }), e.ɵinj = pn({
          providers: [...rv, ...nv],
          imports: [Wx, IM]
        }), e;
      })(),
      iv = (() => {
        class e {
          constructor(n) {
            this._doc = n;
          }
          getTitle() {
            return this._doc.title;
          }
          setTitle(n) {
            this._doc.title = n || "";
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(Xe));
        }, e.ɵprov = R({
          token: e,
          factory: function (n) {
            let r = null;
            return r = n ? new n() : function YT() {
              return new iv(x(Xe));
            }(), r;
          },
          providedIn: "root"
        }), e;
      })();
    function A(...e) {
      let t = e[e.length - 1];
      return mo(t) ? (e.pop(), Ca(e, t)) : _a(e);
    }
    function Cn(e, t) {
      return ke(e, t, 1);
    }
    function cn(e, t) {
      return function (r) {
        return r.lift(new t1(e, t));
      };
    }
    typeof window < "u" && window;
    class t1 {
      constructor(t, n) {
        this.predicate = t, this.thisArg = n;
      }
      call(t, n) {
        return n.subscribe(new n1(t, this.predicate, this.thisArg));
      }
    }
    class n1 extends ue {
      constructor(t, n, r) {
        super(t), this.predicate = n, this.thisArg = r, this.count = 0;
      }
      _next(t) {
        let n;
        try {
          n = this.predicate.call(this.thisArg, t, this.count++);
        } catch (r) {
          return void this.destination.error(r);
        }
        n && this.destination.next(t);
      }
    }
    class Zs {}
    class Ml {}
    class ln {
      constructor(t) {
        this.normalizedNames = new Map(), this.lazyUpdate = null, t ? this.lazyInit = "string" == typeof t ? () => {
          this.headers = new Map(), t.split("\n").forEach(n => {
            const r = n.indexOf(":");
            if (r > 0) {
              const i = n.slice(0, r),
                o = i.toLowerCase(),
                s = n.slice(r + 1).trim();
              this.maybeSetNormalizedName(i, o), this.headers.has(o) ? this.headers.get(o).push(s) : this.headers.set(o, [s]);
            }
          });
        } : () => {
          this.headers = new Map(), Object.keys(t).forEach(n => {
            let r = t[n];
            const i = n.toLowerCase();
            "string" == typeof r && (r = [r]), r.length > 0 && (this.headers.set(i, r), this.maybeSetNormalizedName(n, i));
          });
        } : this.headers = new Map();
      }
      has(t) {
        return this.init(), this.headers.has(t.toLowerCase());
      }
      get(t) {
        this.init();
        const n = this.headers.get(t.toLowerCase());
        return n && n.length > 0 ? n[0] : null;
      }
      keys() {
        return this.init(), Array.from(this.normalizedNames.values());
      }
      getAll(t) {
        return this.init(), this.headers.get(t.toLowerCase()) || null;
      }
      append(t, n) {
        return this.clone({
          name: t,
          value: n,
          op: "a"
        });
      }
      set(t, n) {
        return this.clone({
          name: t,
          value: n,
          op: "s"
        });
      }
      delete(t, n) {
        return this.clone({
          name: t,
          value: n,
          op: "d"
        });
      }
      maybeSetNormalizedName(t, n) {
        this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
      }
      init() {
        this.lazyInit && (this.lazyInit instanceof ln ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null));
      }
      copyFrom(t) {
        t.init(), Array.from(t.headers.keys()).forEach(n => {
          this.headers.set(n, t.headers.get(n)), this.normalizedNames.set(n, t.normalizedNames.get(n));
        });
      }
      clone(t) {
        const n = new ln();
        return n.lazyInit = this.lazyInit && this.lazyInit instanceof ln ? this.lazyInit : this, n.lazyUpdate = (this.lazyUpdate || []).concat([t]), n;
      }
      applyUpdate(t) {
        const n = t.name.toLowerCase();
        switch (t.op) {
          case "a":
          case "s":
            let r = t.value;
            if ("string" == typeof r && (r = [r]), 0 === r.length) return;
            this.maybeSetNormalizedName(t.name, n);
            const i = ("a" === t.op ? this.headers.get(n) : void 0) || [];
            i.push(...r), this.headers.set(n, i);
            break;
          case "d":
            const o = t.value;
            if (o) {
              let s = this.headers.get(n);
              if (!s) return;
              s = s.filter(a => -1 === o.indexOf(a)), 0 === s.length ? (this.headers.delete(n), this.normalizedNames.delete(n)) : this.headers.set(n, s);
            } else this.headers.delete(n), this.normalizedNames.delete(n);
        }
      }
      forEach(t) {
        this.init(), Array.from(this.normalizedNames.keys()).forEach(n => t(this.normalizedNames.get(n), this.headers.get(n)));
      }
    }
    class r1 {
      encodeKey(t) {
        return av(t);
      }
      encodeValue(t) {
        return av(t);
      }
      decodeKey(t) {
        return decodeURIComponent(t);
      }
      decodeValue(t) {
        return decodeURIComponent(t);
      }
    }
    const o1 = /%(\d[a-f0-9])/gi,
      s1 = {
        40: "@",
        "3A": ":",
        24: "$",
        "2C": ",",
        "3B": ";",
        "3D": "=",
        "3F": "?",
        "2F": "/"
      };
    function av(e) {
      return encodeURIComponent(e).replace(o1, (t, n) => s1[n] ?? t);
    }
    function Qs(e) {
      return `${e}`;
    }
    class _n {
      constructor(t = {}) {
        if (this.updates = null, this.cloneFrom = null, this.encoder = t.encoder || new r1(), t.fromString) {
          if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
          this.map = function i1(e, t) {
            const n = new Map();
            return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(i => {
              const o = i.indexOf("="),
                [s, a] = -1 == o ? [t.decodeKey(i), ""] : [t.decodeKey(i.slice(0, o)), t.decodeValue(i.slice(o + 1))],
                u = n.get(s) || [];
              u.push(a), n.set(s, u);
            }), n;
          }(t.fromString, this.encoder);
        } else t.fromObject ? (this.map = new Map(), Object.keys(t.fromObject).forEach(n => {
          const r = t.fromObject[n],
            i = Array.isArray(r) ? r.map(Qs) : [Qs(r)];
          this.map.set(n, i);
        })) : this.map = null;
      }
      has(t) {
        return this.init(), this.map.has(t);
      }
      get(t) {
        this.init();
        const n = this.map.get(t);
        return n ? n[0] : null;
      }
      getAll(t) {
        return this.init(), this.map.get(t) || null;
      }
      keys() {
        return this.init(), Array.from(this.map.keys());
      }
      append(t, n) {
        return this.clone({
          param: t,
          value: n,
          op: "a"
        });
      }
      appendAll(t) {
        const n = [];
        return Object.keys(t).forEach(r => {
          const i = t[r];
          Array.isArray(i) ? i.forEach(o => {
            n.push({
              param: r,
              value: o,
              op: "a"
            });
          }) : n.push({
            param: r,
            value: i,
            op: "a"
          });
        }), this.clone(n);
      }
      set(t, n) {
        return this.clone({
          param: t,
          value: n,
          op: "s"
        });
      }
      delete(t, n) {
        return this.clone({
          param: t,
          value: n,
          op: "d"
        });
      }
      toString() {
        return this.init(), this.keys().map(t => {
          const n = this.encoder.encodeKey(t);
          return this.map.get(t).map(r => n + "=" + this.encoder.encodeValue(r)).join("&");
        }).filter(t => "" !== t).join("&");
      }
      clone(t) {
        const n = new _n({
          encoder: this.encoder
        });
        return n.cloneFrom = this.cloneFrom || this, n.updates = (this.updates || []).concat(t), n;
      }
      init() {
        null === this.map && (this.map = new Map()), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
          switch (t.op) {
            case "a":
            case "s":
              const n = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
              n.push(Qs(t.value)), this.map.set(t.param, n);
              break;
            case "d":
              if (void 0 === t.value) {
                this.map.delete(t.param);
                break;
              }
              {
                let r = this.map.get(t.param) || [];
                const i = r.indexOf(Qs(t.value));
                -1 !== i && r.splice(i, 1), r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param);
              }
          }
        }), this.cloneFrom = this.updates = null);
      }
    }
    class a1 {
      constructor() {
        this.map = new Map();
      }
      set(t, n) {
        return this.map.set(t, n), this;
      }
      get(t) {
        return this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t);
      }
      delete(t) {
        return this.map.delete(t), this;
      }
      has(t) {
        return this.map.has(t);
      }
      keys() {
        return this.map.keys();
      }
    }
    function uv(e) {
      return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
    }
    function cv(e) {
      return typeof Blob < "u" && e instanceof Blob;
    }
    function lv(e) {
      return typeof FormData < "u" && e instanceof FormData;
    }
    class Wi {
      constructor(t, n, r, i) {
        let o;
        if (this.url = n, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = t.toUpperCase(), function u1(e) {
          switch (e) {
            case "DELETE":
            case "GET":
            case "HEAD":
            case "OPTIONS":
            case "JSONP":
              return !1;
            default:
              return !0;
          }
        }(this.method) || i ? (this.body = void 0 !== r ? r : null, o = i) : o = r, o && (this.reportProgress = !!o.reportProgress, this.withCredentials = !!o.withCredentials, o.responseType && (this.responseType = o.responseType), o.headers && (this.headers = o.headers), o.context && (this.context = o.context), o.params && (this.params = o.params)), this.headers || (this.headers = new ln()), this.context || (this.context = new a1()), this.params) {
          const s = this.params.toString();
          if (0 === s.length) this.urlWithParams = n;else {
            const a = n.indexOf("?");
            this.urlWithParams = n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
          }
        } else this.params = new _n(), this.urlWithParams = n;
      }
      serializeBody() {
        return null === this.body ? null : uv(this.body) || cv(this.body) || lv(this.body) || function c1(e) {
          return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
        }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof _n ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString();
      }
      detectContentTypeHeader() {
        return null === this.body || lv(this.body) ? null : cv(this.body) ? this.body.type || null : uv(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof _n ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null;
      }
      clone(t = {}) {
        const n = t.method || this.method,
          r = t.url || this.url,
          i = t.responseType || this.responseType,
          o = void 0 !== t.body ? t.body : this.body,
          s = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
          a = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
        let u = t.headers || this.headers,
          c = t.params || this.params;
        const l = t.context ?? this.context;
        return void 0 !== t.setHeaders && (u = Object.keys(t.setHeaders).reduce((d, f) => d.set(f, t.setHeaders[f]), u)), t.setParams && (c = Object.keys(t.setParams).reduce((d, f) => d.set(f, t.setParams[f]), c)), new Wi(n, r, o, {
          params: c,
          headers: u,
          context: l,
          reportProgress: a,
          responseType: i,
          withCredentials: s
        });
      }
    }
    var Se = (() => ((Se = Se || {})[Se.Sent = 0] = "Sent", Se[Se.UploadProgress = 1] = "UploadProgress", Se[Se.ResponseHeader = 2] = "ResponseHeader", Se[Se.DownloadProgress = 3] = "DownloadProgress", Se[Se.Response = 4] = "Response", Se[Se.User = 5] = "User", Se))();
    class xl {
      constructor(t, n = 200, r = "OK") {
        this.headers = t.headers || new ln(), this.status = void 0 !== t.status ? t.status : n, this.statusText = t.statusText || r, this.url = t.url || null, this.ok = this.status >= 200 && this.status < 300;
      }
    }
    class Tl extends xl {
      constructor(t = {}) {
        super(t), this.type = Se.ResponseHeader;
      }
      clone(t = {}) {
        return new Tl({
          headers: t.headers || this.headers,
          status: void 0 !== t.status ? t.status : this.status,
          statusText: t.statusText || this.statusText,
          url: t.url || this.url || void 0
        });
      }
    }
    class Xs extends xl {
      constructor(t = {}) {
        super(t), this.type = Se.Response, this.body = void 0 !== t.body ? t.body : null;
      }
      clone(t = {}) {
        return new Xs({
          body: void 0 !== t.body ? t.body : this.body,
          headers: t.headers || this.headers,
          status: void 0 !== t.status ? t.status : this.status,
          statusText: t.statusText || this.statusText,
          url: t.url || this.url || void 0
        });
      }
    }
    class dv extends xl {
      constructor(t) {
        super(t, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${t.url || "(unknown url)"}` : `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null;
      }
    }
    function Al(e, t) {
      return {
        body: t,
        headers: e.headers,
        context: e.context,
        observe: e.observe,
        params: e.params,
        reportProgress: e.reportProgress,
        responseType: e.responseType,
        withCredentials: e.withCredentials
      };
    }
    let fv = (() => {
      class e {
        constructor(n) {
          this.handler = n;
        }
        request(n, r, i = {}) {
          let o;
          if (n instanceof Wi) o = n;else {
            let u, c;
            u = i.headers instanceof ln ? i.headers : new ln(i.headers), i.params && (c = i.params instanceof _n ? i.params : new _n({
              fromObject: i.params
            })), o = new Wi(n, r, void 0 !== i.body ? i.body : null, {
              headers: u,
              context: i.context,
              params: c,
              reportProgress: i.reportProgress,
              responseType: i.responseType || "json",
              withCredentials: i.withCredentials
            });
          }
          const s = A(o).pipe(Cn(u => this.handler.handle(u)));
          if (n instanceof Wi || "events" === i.observe) return s;
          const a = s.pipe(cn(u => u instanceof Xs));
          switch (i.observe || "body") {
            case "body":
              switch (o.responseType) {
                case "arraybuffer":
                  return a.pipe(j(u => {
                    if (null !== u.body && !(u.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                    return u.body;
                  }));
                case "blob":
                  return a.pipe(j(u => {
                    if (null !== u.body && !(u.body instanceof Blob)) throw new Error("Response is not a Blob.");
                    return u.body;
                  }));
                case "text":
                  return a.pipe(j(u => {
                    if (null !== u.body && "string" != typeof u.body) throw new Error("Response is not a string.");
                    return u.body;
                  }));
                default:
                  return a.pipe(j(u => u.body));
              }
            case "response":
              return a;
            default:
              throw new Error(`Unreachable: unhandled observe type ${i.observe}}`);
          }
        }
        delete(n, r = {}) {
          return this.request("DELETE", n, r);
        }
        get(n, r = {}) {
          return this.request("GET", n, r);
        }
        head(n, r = {}) {
          return this.request("HEAD", n, r);
        }
        jsonp(n, r) {
          return this.request("JSONP", n, {
            params: new _n().append(r, "JSONP_CALLBACK"),
            observe: "body",
            responseType: "json"
          });
        }
        options(n, r = {}) {
          return this.request("OPTIONS", n, r);
        }
        patch(n, r, i = {}) {
          return this.request("PATCH", n, Al(i, r));
        }
        post(n, r, i = {}) {
          return this.request("POST", n, Al(i, r));
        }
        put(n, r, i = {}) {
          return this.request("PUT", n, Al(i, r));
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Zs));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    function hv(e, t) {
      return t(e);
    }
    function l1(e, t) {
      return (n, r) => t.intercept(n, {
        handle: i => e(i, r)
      });
    }
    const pv = new T("HTTP_INTERCEPTORS"),
      qi = new T("HTTP_INTERCEPTOR_FNS");
    function f1() {
      let e = null;
      return (t, n) => (null === e && (e = (q(pv, {
        optional: !0
      }) ?? []).reduceRight(l1, hv)), e(t, n));
    }
    let gv = (() => {
      class e extends Zs {
        constructor(n, r) {
          super(), this.backend = n, this.injector = r, this.chain = null;
        }
        handle(n) {
          if (null === this.chain) {
            const r = Array.from(new Set(this.injector.get(qi)));
            this.chain = r.reduceRight((i, o) => function d1(e, t, n) {
              return (r, i) => n.runInContext(() => t(r, o => e(o, i)));
            }(i, o, this.injector), hv);
          }
          return this.chain(n, r => this.backend.handle(r));
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Ml), x(Ut));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    const m1 = /^\)\]\}',?\n/;
    let yv = (() => {
      class e {
        constructor(n) {
          this.xhrFactory = n;
        }
        handle(n) {
          if ("JSONP" === n.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
          return new ge(r => {
            const i = this.xhrFactory.build();
            if (i.open(n.method, n.urlWithParams), n.withCredentials && (i.withCredentials = !0), n.headers.forEach((h, p) => i.setRequestHeader(h, p.join(","))), n.headers.has("Accept") || i.setRequestHeader("Accept", "application/json, text/plain, */*"), !n.headers.has("Content-Type")) {
              const h = n.detectContentTypeHeader();
              null !== h && i.setRequestHeader("Content-Type", h);
            }
            if (n.responseType) {
              const h = n.responseType.toLowerCase();
              i.responseType = "json" !== h ? h : "text";
            }
            const o = n.serializeBody();
            let s = null;
            const a = () => {
                if (null !== s) return s;
                const h = i.statusText || "OK",
                  p = new ln(i.getAllResponseHeaders()),
                  g = function y1(e) {
                    return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null;
                  }(i) || n.url;
                return s = new Tl({
                  headers: p,
                  status: i.status,
                  statusText: h,
                  url: g
                }), s;
              },
              u = () => {
                let {
                    headers: h,
                    status: p,
                    statusText: g,
                    url: v
                  } = a(),
                  D = null;
                204 !== p && (D = typeof i.response > "u" ? i.responseText : i.response), 0 === p && (p = D ? 200 : 0);
                let I = p >= 200 && p < 300;
                if ("json" === n.responseType && "string" == typeof D) {
                  const m = D;
                  D = D.replace(m1, "");
                  try {
                    D = "" !== D ? JSON.parse(D) : null;
                  } catch (N) {
                    D = m, I && (I = !1, D = {
                      error: N,
                      text: D
                    });
                  }
                }
                I ? (r.next(new Xs({
                  body: D,
                  headers: h,
                  status: p,
                  statusText: g,
                  url: v || void 0
                })), r.complete()) : r.error(new dv({
                  error: D,
                  headers: h,
                  status: p,
                  statusText: g,
                  url: v || void 0
                }));
              },
              c = h => {
                const {
                    url: p
                  } = a(),
                  g = new dv({
                    error: h,
                    status: i.status || 0,
                    statusText: i.statusText || "Unknown Error",
                    url: p || void 0
                  });
                r.error(g);
              };
            let l = !1;
            const d = h => {
                l || (r.next(a()), l = !0);
                let p = {
                  type: Se.DownloadProgress,
                  loaded: h.loaded
                };
                h.lengthComputable && (p.total = h.total), "text" === n.responseType && i.responseText && (p.partialText = i.responseText), r.next(p);
              },
              f = h => {
                let p = {
                  type: Se.UploadProgress,
                  loaded: h.loaded
                };
                h.lengthComputable && (p.total = h.total), r.next(p);
              };
            return i.addEventListener("load", u), i.addEventListener("error", c), i.addEventListener("timeout", c), i.addEventListener("abort", c), n.reportProgress && (i.addEventListener("progress", d), null !== o && i.upload && i.upload.addEventListener("progress", f)), i.send(o), r.next({
              type: Se.Sent
            }), () => {
              i.removeEventListener("error", c), i.removeEventListener("abort", c), i.removeEventListener("load", u), i.removeEventListener("timeout", c), n.reportProgress && (i.removeEventListener("progress", d), null !== o && i.upload && i.upload.removeEventListener("progress", f)), i.readyState !== i.DONE && i.abort();
            };
          });
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(ky));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    const Rl = new T("XSRF_ENABLED"),
      vv = new T("XSRF_COOKIE_NAME", {
        providedIn: "root",
        factory: () => "XSRF-TOKEN"
      }),
      Dv = new T("XSRF_HEADER_NAME", {
        providedIn: "root",
        factory: () => "X-XSRF-TOKEN"
      });
    class wv {}
    let w1 = (() => {
      class e {
        constructor(n, r, i) {
          this.doc = n, this.platform = r, this.cookieName = i, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0;
        }
        getToken() {
          if ("server" === this.platform) return null;
          const n = this.doc.cookie || "";
          return n !== this.lastCookieString && (this.parseCount++, this.lastToken = Sy(n, this.cookieName), this.lastCookieString = n), this.lastToken;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(Xe), x(kc), x(vv));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    function C1(e, t) {
      const n = e.url.toLowerCase();
      if (!q(Rl) || "GET" === e.method || "HEAD" === e.method || n.startsWith("http://") || n.startsWith("https://")) return t(e);
      const r = q(wv).getToken(),
        i = q(Dv);
      return null != r && !e.headers.has(i) && (e = e.clone({
        headers: e.headers.set(i, r)
      })), t(e);
    }
    var we = (() => ((we = we || {})[we.Interceptors = 0] = "Interceptors", we[we.LegacyInterceptors = 1] = "LegacyInterceptors", we[we.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", we[we.NoXsrfProtection = 3] = "NoXsrfProtection", we[we.JsonpSupport = 4] = "JsonpSupport", we[we.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", we))();
    function Vr(e, t) {
      return {
        ɵkind: e,
        ɵproviders: t
      };
    }
    function _1(...e) {
      const t = [fv, yv, gv, {
        provide: Zs,
        useExisting: gv
      }, {
        provide: Ml,
        useExisting: yv
      }, {
        provide: qi,
        useValue: C1,
        multi: !0
      }, {
        provide: Rl,
        useValue: !0
      }, {
        provide: wv,
        useClass: w1
      }];
      for (const n of e) t.push(...n.ɵproviders);
      return function V_(e) {
        return {
          ɵproviders: e
        };
      }(t);
    }
    const Cv = new T("LEGACY_INTERCEPTOR_FN");
    let E1 = (() => {
      class e {}
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵmod = An({
        type: e
      }), e.ɵinj = pn({
        providers: [_1(Vr(we.LegacyInterceptors, [{
          provide: Cv,
          useFactory: f1
        }, {
          provide: qi,
          useExisting: Cv,
          multi: !0
        }]))]
      }), e;
    })();
    class Ct extends Nt {
      constructor(t) {
        super(), this._value = t;
      }
      get value() {
        return this.getValue();
      }
      _subscribe(t) {
        const n = super._subscribe(t);
        return n && !n.closed && t.next(this._value), n;
      }
      getValue() {
        if (this.hasError) throw this.thrownError;
        if (this.closed) throw new Xn();
        return this._value;
      }
      next(t) {
        super.next(this._value = t);
      }
    }
    const Js = (() => {
        function e() {
          return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this;
        }
        return e.prototype = Object.create(Error.prototype), e;
      })(),
      _v = {};
    function bv(...e) {
      let t = null,
        n = null;
      return mo(e[e.length - 1]) && (n = e.pop()), "function" == typeof e[e.length - 1] && (t = e.pop()), 1 === e.length && cd(e[0]) && (e = e[0]), _a(e, n).lift(new I1(t));
    }
    class I1 {
      constructor(t) {
        this.resultSelector = t;
      }
      call(t, n) {
        return n.subscribe(new S1(t, this.resultSelector));
      }
    }
    class S1 extends wo {
      constructor(t, n) {
        super(t), this.resultSelector = n, this.active = 0, this.values = [], this.observables = [];
      }
      _next(t) {
        this.values.push(_v), this.observables.push(t);
      }
      _complete() {
        const t = this.observables,
          n = t.length;
        if (0 === n) this.destination.complete();else {
          this.active = n, this.toRespond = n;
          for (let r = 0; r < n; r++) {
            const i = t[r];
            this.add(Do(this, i, i, r));
          }
        }
      }
      notifyComplete(t) {
        0 == (this.active -= 1) && this.destination.complete();
      }
      notifyNext(t, n, r, i, o) {
        const s = this.values,
          u = this.toRespond ? s[r] === _v ? --this.toRespond : this.toRespond : 0;
        s[r] = n, 0 === u && (this.resultSelector ? this._tryResultSelector(s) : this.destination.next(s.slice()));
      }
      _tryResultSelector(t) {
        let n;
        try {
          n = this.resultSelector.apply(this, t);
        } catch (r) {
          return void this.destination.error(r);
        }
        this.destination.next(n);
      }
    }
    function Pl(...e) {
      return function M1() {
        return Jn(1);
      }()(A(...e));
    }
    const Wn = new ge(e => e.complete());
    function Ol(e) {
      return e ? function x1(e) {
        return new ge(t => e.schedule(() => t.complete()));
      }(e) : Wn;
    }
    function Ev(e) {
      return new ge(t => {
        let n;
        try {
          n = e();
        } catch (i) {
          return void t.error(i);
        }
        return (n ? Re(n) : Ol()).subscribe(t);
      });
    }
    function Ki(e, t) {
      return new ge(t ? n => t.schedule(T1, 0, {
        error: e,
        subscriber: n
      }) : n => n.error(e));
    }
    function T1({
      error: e,
      subscriber: t
    }) {
      t.error(e);
    }
    function _t(e, t) {
      return "function" == typeof t ? n => n.pipe(_t((r, i) => Re(e(r, i)).pipe(j((o, s) => t(r, o, i, s))))) : n => n.lift(new A1(e));
    }
    class A1 {
      constructor(t) {
        this.project = t;
      }
      call(t, n) {
        return n.subscribe(new R1(t, this.project));
      }
    }
    class R1 extends wo {
      constructor(t, n) {
        super(t), this.project = n, this.index = 0;
      }
      _next(t) {
        let n;
        const r = this.index++;
        try {
          n = this.project(t, r);
        } catch (i) {
          return void this.destination.error(i);
        }
        this._innerSub(n, t, r);
      }
      _innerSub(t, n, r) {
        const i = this.innerSubscription;
        i && i.unsubscribe();
        const o = new yo(this, n, r),
          s = this.destination;
        s.add(o), this.innerSubscription = Do(this, t, void 0, void 0, o), this.innerSubscription !== o && s.add(this.innerSubscription);
      }
      _complete() {
        const {
          innerSubscription: t
        } = this;
        (!t || t.closed) && super._complete(), this.unsubscribe();
      }
      _unsubscribe() {
        this.innerSubscription = null;
      }
      notifyComplete(t) {
        this.destination.remove(t), this.innerSubscription = null, this.isStopped && super._complete();
      }
      notifyNext(t, n, r, i, o) {
        this.destination.next(n);
      }
    }
    const Iv = (() => {
      function e() {
        return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this;
      }
      return e.prototype = Object.create(Error.prototype), e;
    })();
    function Yi(e) {
      return t => 0 === e ? Ol() : t.lift(new P1(e));
    }
    class P1 {
      constructor(t) {
        if (this.total = t, this.total < 0) throw new Iv();
      }
      call(t, n) {
        return n.subscribe(new O1(t, this.total));
      }
    }
    class O1 extends ue {
      constructor(t, n) {
        super(t), this.total = n, this.count = 0;
      }
      _next(t) {
        const n = this.total,
          r = ++this.count;
        r <= n && (this.destination.next(t), r === n && (this.destination.complete(), this.unsubscribe()));
      }
    }
    function ea(e = null) {
      return t => t.lift(new F1(e));
    }
    class F1 {
      constructor(t) {
        this.defaultValue = t;
      }
      call(t, n) {
        return n.subscribe(new k1(t, this.defaultValue));
      }
    }
    class k1 extends ue {
      constructor(t, n) {
        super(t), this.defaultValue = n, this.isEmpty = !0;
      }
      _next(t) {
        this.isEmpty = !1, this.destination.next(t);
      }
      _complete() {
        this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
      }
    }
    function Sv(e = $1) {
      return t => t.lift(new L1(e));
    }
    class L1 {
      constructor(t) {
        this.errorFactory = t;
      }
      call(t, n) {
        return n.subscribe(new j1(t, this.errorFactory));
      }
    }
    class j1 extends ue {
      constructor(t, n) {
        super(t), this.errorFactory = n, this.hasValue = !1;
      }
      _next(t) {
        this.hasValue = !0, this.destination.next(t);
      }
      _complete() {
        if (this.hasValue) return this.destination.complete();
        {
          let t;
          try {
            t = this.errorFactory();
          } catch (n) {
            t = n;
          }
          this.destination.error(t);
        }
      }
    }
    function $1() {
      return new Js();
    }
    function bn(e, t) {
      const n = arguments.length >= 2;
      return r => r.pipe(e ? cn((i, o) => e(i, o, r)) : go, Yi(1), n ? ea(t) : Sv(() => new Js()));
    }
    function En() {}
    function Ae(e, t, n) {
      return function (i) {
        return i.lift(new U1(e, t, n));
      };
    }
    class U1 {
      constructor(t, n, r) {
        this.nextOrObserver = t, this.error = n, this.complete = r;
      }
      call(t, n) {
        return n.subscribe(new H1(t, this.nextOrObserver, this.error, this.complete));
      }
    }
    class H1 extends ue {
      constructor(t, n, r, i) {
        super(t), this._tapNext = En, this._tapError = En, this._tapComplete = En, this._tapError = r || En, this._tapComplete = i || En, xn(n) ? (this._context = this, this._tapNext = n) : n && (this._context = n, this._tapNext = n.next || En, this._tapError = n.error || En, this._tapComplete = n.complete || En);
      }
      _next(t) {
        try {
          this._tapNext.call(this._context, t);
        } catch (n) {
          return void this.destination.error(n);
        }
        this.destination.next(t);
      }
      _error(t) {
        try {
          this._tapError.call(this._context, t);
        } catch (n) {
          return void this.destination.error(n);
        }
        this.destination.error(t);
      }
      _complete() {
        try {
          this._tapComplete.call(this._context);
        } catch (t) {
          return void this.destination.error(t);
        }
        return this.destination.complete();
      }
    }
    function qn(e) {
      return function (n) {
        const r = new B1(e),
          i = n.lift(r);
        return r.caught = i;
      };
    }
    class B1 {
      constructor(t) {
        this.selector = t;
      }
      call(t, n) {
        return n.subscribe(new V1(t, this.selector, this.caught));
      }
    }
    class V1 extends wo {
      constructor(t, n, r) {
        super(t), this.selector = n, this.caught = r;
      }
      error(t) {
        if (!this.isStopped) {
          let n;
          try {
            n = this.selector(t, this.caught);
          } catch (o) {
            return void super.error(o);
          }
          this._unsubscribeAndRecycle();
          const r = new yo(this, void 0, void 0);
          this.add(r);
          const i = Do(this, n, void 0, void 0, r);
          i !== r && this.add(i);
        }
      }
    }
    function Mv(e, t) {
      let n = !1;
      return arguments.length >= 2 && (n = !0), function (i) {
        return i.lift(new z1(e, t, n));
      };
    }
    class z1 {
      constructor(t, n, r = !1) {
        this.accumulator = t, this.seed = n, this.hasSeed = r;
      }
      call(t, n) {
        return n.subscribe(new G1(t, this.accumulator, this.seed, this.hasSeed));
      }
    }
    class G1 extends ue {
      constructor(t, n, r, i) {
        super(t), this.accumulator = n, this._seed = r, this.hasSeed = i, this.index = 0;
      }
      get seed() {
        return this._seed;
      }
      set seed(t) {
        this.hasSeed = !0, this._seed = t;
      }
      _next(t) {
        if (this.hasSeed) return this._tryNext(t);
        this.seed = t, this.destination.next(t);
      }
      _tryNext(t) {
        const n = this.index++;
        let r;
        try {
          r = this.accumulator(this.seed, t, n);
        } catch (i) {
          this.destination.error(i);
        }
        this.seed = r, this.destination.next(r);
      }
    }
    function Nl(e) {
      return function (n) {
        return 0 === e ? Ol() : n.lift(new W1(e));
      };
    }
    class W1 {
      constructor(t) {
        if (this.total = t, this.total < 0) throw new Iv();
      }
      call(t, n) {
        return n.subscribe(new q1(t, this.total));
      }
    }
    class q1 extends ue {
      constructor(t, n) {
        super(t), this.total = n, this.ring = new Array(), this.count = 0;
      }
      _next(t) {
        const n = this.ring,
          r = this.total,
          i = this.count++;
        n.length < r ? n.push(t) : n[i % r] = t;
      }
      _complete() {
        const t = this.destination;
        let n = this.count;
        if (n > 0) {
          const r = this.count >= this.total ? this.total : this.count,
            i = this.ring;
          for (let o = 0; o < r; o++) {
            const s = n++ % r;
            t.next(i[s]);
          }
        }
        t.complete();
      }
    }
    function xv(e, t) {
      const n = arguments.length >= 2;
      return r => r.pipe(e ? cn((i, o) => e(i, o, r)) : go, Nl(1), n ? ea(t) : Sv(() => new Js()));
    }
    class Y1 {
      constructor(t, n) {
        this.predicate = t, this.inclusive = n;
      }
      call(t, n) {
        return n.subscribe(new Z1(t, this.predicate, this.inclusive));
      }
    }
    class Z1 extends ue {
      constructor(t, n, r) {
        super(t), this.predicate = n, this.inclusive = r, this.index = 0;
      }
      _next(t) {
        const n = this.destination;
        let r;
        try {
          r = this.predicate(t, this.index++);
        } catch (i) {
          return void n.error(i);
        }
        this.nextOrComplete(t, r);
      }
      nextOrComplete(t, n) {
        const r = this.destination;
        Boolean(n) ? r.next(t) : (this.inclusive && r.next(t), r.complete());
      }
    }
    class X1 {
      constructor(t) {
        this.value = t;
      }
      call(t, n) {
        return n.subscribe(new J1(t, this.value));
      }
    }
    class J1 extends ue {
      constructor(t, n) {
        super(t), this.value = n;
      }
      _next(t) {
        this.destination.next(this.value);
      }
    }
    function Fl(e) {
      return t => t.lift(new eA(e));
    }
    class eA {
      constructor(t) {
        this.callback = t;
      }
      call(t, n) {
        return n.subscribe(new tA(t, this.callback));
      }
    }
    class tA extends ue {
      constructor(t, n) {
        super(t), this.add(new fe(n));
      }
    }
    const V = "primary",
      Zi = Symbol("RouteTitle");
    class nA {
      constructor(t) {
        this.params = t || {};
      }
      has(t) {
        return Object.prototype.hasOwnProperty.call(this.params, t);
      }
      get(t) {
        if (this.has(t)) {
          const n = this.params[t];
          return Array.isArray(n) ? n[0] : n;
        }
        return null;
      }
      getAll(t) {
        if (this.has(t)) {
          const n = this.params[t];
          return Array.isArray(n) ? n : [n];
        }
        return [];
      }
      get keys() {
        return Object.keys(this.params);
      }
    }
    function zr(e) {
      return new nA(e);
    }
    function rA(e, t, n) {
      const r = n.path.split("/");
      if (r.length > e.length || "full" === n.pathMatch && (t.hasChildren() || r.length < e.length)) return null;
      const i = {};
      for (let o = 0; o < r.length; o++) {
        const s = r[o],
          a = e[o];
        if (s.startsWith(":")) i[s.substring(1)] = a;else if (s !== a.path) return null;
      }
      return {
        consumed: e.slice(0, r.length),
        posParams: i
      };
    }
    function Gt(e, t) {
      const n = e ? Object.keys(e) : void 0,
        r = t ? Object.keys(t) : void 0;
      if (!n || !r || n.length != r.length) return !1;
      let i;
      for (let o = 0; o < n.length; o++) if (i = n[o], !Tv(e[i], t[i])) return !1;
      return !0;
    }
    function Tv(e, t) {
      if (Array.isArray(e) && Array.isArray(t)) {
        if (e.length !== t.length) return !1;
        const n = [...e].sort(),
          r = [...t].sort();
        return n.every((i, o) => r[o] === i);
      }
      return e === t;
    }
    function Av(e) {
      return Array.prototype.concat.apply([], e);
    }
    function Rv(e) {
      return e.length > 0 ? e[e.length - 1] : null;
    }
    function Fe(e, t) {
      for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
    }
    function In(e) {
      return Tp(e) ? e : ms(e) ? Re(Promise.resolve(e)) : A(e);
    }
    const ta = !1,
      oA = {
        exact: function Nv(e, t, n) {
          if (!Kn(e.segments, t.segments) || !na(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren) return !1;
          for (const r in t.children) if (!e.children[r] || !Nv(e.children[r], t.children[r], n)) return !1;
          return !0;
        },
        subset: Fv
      },
      Pv = {
        exact: function sA(e, t) {
          return Gt(e, t);
        },
        subset: function aA(e, t) {
          return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => Tv(e[n], t[n]));
        },
        ignored: () => !0
      };
    function Ov(e, t, n) {
      return oA[n.paths](e.root, t.root, n.matrixParams) && Pv[n.queryParams](e.queryParams, t.queryParams) && !("exact" === n.fragment && e.fragment !== t.fragment);
    }
    function Fv(e, t, n) {
      return kv(e, t, t.segments, n);
    }
    function kv(e, t, n, r) {
      if (e.segments.length > n.length) {
        const i = e.segments.slice(0, n.length);
        return !(!Kn(i, n) || t.hasChildren() || !na(i, n, r));
      }
      if (e.segments.length === n.length) {
        if (!Kn(e.segments, n) || !na(e.segments, n, r)) return !1;
        for (const i in t.children) if (!e.children[i] || !Fv(e.children[i], t.children[i], r)) return !1;
        return !0;
      }
      {
        const i = n.slice(0, e.segments.length),
          o = n.slice(e.segments.length);
        return !!(Kn(e.segments, i) && na(e.segments, i, r) && e.children[V]) && kv(e.children[V], t, o, r);
      }
    }
    function na(e, t, n) {
      return t.every((r, i) => Pv[n](e[i].parameters, r.parameters));
    }
    class Sn {
      constructor(t = new K([], {}), n = {}, r = null) {
        this.root = t, this.queryParams = n, this.fragment = r;
      }
      get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = zr(this.queryParams)), this._queryParamMap;
      }
      toString() {
        return lA.serialize(this);
      }
    }
    class K {
      constructor(t, n) {
        this.segments = t, this.children = n, this.parent = null, Fe(n, (r, i) => r.parent = this);
      }
      hasChildren() {
        return this.numberOfChildren > 0;
      }
      get numberOfChildren() {
        return Object.keys(this.children).length;
      }
      toString() {
        return ra(this);
      }
    }
    class Qi {
      constructor(t, n) {
        this.path = t, this.parameters = n;
      }
      get parameterMap() {
        return this._parameterMap || (this._parameterMap = zr(this.parameters)), this._parameterMap;
      }
      toString() {
        return $v(this);
      }
    }
    function Kn(e, t) {
      return e.length === t.length && e.every((n, r) => n.path === t[r].path);
    }
    let Xi = (() => {
      class e {}
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: function () {
          return new kl();
        },
        providedIn: "root"
      }), e;
    })();
    class kl {
      parse(t) {
        const n = new DA(t);
        return new Sn(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment());
      }
      serialize(t) {
        const n = `/${Ji(t.root, !0)}`,
          r = function hA(e) {
            const t = Object.keys(e).map(n => {
              const r = e[n];
              return Array.isArray(r) ? r.map(i => `${ia(n)}=${ia(i)}`).join("&") : `${ia(n)}=${ia(r)}`;
            }).filter(n => !!n);
            return t.length ? `?${t.join("&")}` : "";
          }(t.queryParams),
          i = "string" == typeof t.fragment ? `#${function dA(e) {
            return encodeURI(e);
          }(t.fragment)}` : "";
        return `${n}${r}${i}`;
      }
    }
    const lA = new kl();
    function ra(e) {
      return e.segments.map(t => $v(t)).join("/");
    }
    function Ji(e, t) {
      if (!e.hasChildren()) return ra(e);
      if (t) {
        const n = e.children[V] ? Ji(e.children[V], !1) : "",
          r = [];
        return Fe(e.children, (i, o) => {
          o !== V && r.push(`${o}:${Ji(i, !1)}`);
        }), r.length > 0 ? `${n}(${r.join("//")})` : n;
      }
      {
        const n = function cA(e, t) {
          let n = [];
          return Fe(e.children, (r, i) => {
            i === V && (n = n.concat(t(r, i)));
          }), Fe(e.children, (r, i) => {
            i !== V && (n = n.concat(t(r, i)));
          }), n;
        }(e, (r, i) => i === V ? [Ji(e.children[V], !1)] : [`${i}:${Ji(r, !1)}`]);
        return 1 === Object.keys(e.children).length && null != e.children[V] ? `${ra(e)}/${n[0]}` : `${ra(e)}/(${n.join("//")})`;
      }
    }
    function Lv(e) {
      return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
    }
    function ia(e) {
      return Lv(e).replace(/%3B/gi, ";");
    }
    function Ll(e) {
      return Lv(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
    }
    function oa(e) {
      return decodeURIComponent(e);
    }
    function jv(e) {
      return oa(e.replace(/\+/g, "%20"));
    }
    function $v(e) {
      return `${Ll(e.path)}${function fA(e) {
        return Object.keys(e).map(t => `;${Ll(t)}=${Ll(e[t])}`).join("");
      }(e.parameters)}`;
    }
    const pA = /^[^\/()?;=#]+/;
    function sa(e) {
      const t = e.match(pA);
      return t ? t[0] : "";
    }
    const gA = /^[^=?&#]+/,
      yA = /^[^&#]+/;
    class DA {
      constructor(t) {
        this.url = t, this.remaining = t;
      }
      parseRootSegment() {
        return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new K([], {}) : new K([], this.parseChildren());
      }
      parseQueryParams() {
        const t = {};
        if (this.consumeOptional("?")) do {
          this.parseQueryParam(t);
        } while (this.consumeOptional("&"));
        return t;
      }
      parseFragment() {
        return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
      }
      parseChildren() {
        if ("" === this.remaining) return {};
        this.consumeOptional("/");
        const t = [];
        for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
        let n = {};
        this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
        let r = {};
        return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[V] = new K(t, n)), r;
      }
      parseSegment() {
        const t = sa(this.remaining);
        if ("" === t && this.peekStartsWith(";")) throw new _(4009, ta);
        return this.capture(t), new Qi(oa(t), this.parseMatrixParams());
      }
      parseMatrixParams() {
        const t = {};
        for (; this.consumeOptional(";");) this.parseParam(t);
        return t;
      }
      parseParam(t) {
        const n = sa(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
          const i = sa(this.remaining);
          i && (r = i, this.capture(r));
        }
        t[oa(n)] = oa(r);
      }
      parseQueryParam(t) {
        const n = function mA(e) {
          const t = e.match(gA);
          return t ? t[0] : "";
        }(this.remaining);
        if (!n) return;
        this.capture(n);
        let r = "";
        if (this.consumeOptional("=")) {
          const s = function vA(e) {
            const t = e.match(yA);
            return t ? t[0] : "";
          }(this.remaining);
          s && (r = s, this.capture(r));
        }
        const i = jv(n),
          o = jv(r);
        if (t.hasOwnProperty(i)) {
          let s = t[i];
          Array.isArray(s) || (s = [s], t[i] = s), s.push(o);
        } else t[i] = o;
      }
      parseParens(t) {
        const n = {};
        for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
          const r = sa(this.remaining),
            i = this.remaining[r.length];
          if ("/" !== i && ")" !== i && ";" !== i) throw new _(4010, ta);
          let o;
          r.indexOf(":") > -1 ? (o = r.slice(0, r.indexOf(":")), this.capture(o), this.capture(":")) : t && (o = V);
          const s = this.parseChildren();
          n[o] = 1 === Object.keys(s).length ? s[V] : new K([], s), this.consumeOptional("//");
        }
        return n;
      }
      peekStartsWith(t) {
        return this.remaining.startsWith(t);
      }
      consumeOptional(t) {
        return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0);
      }
      capture(t) {
        if (!this.consumeOptional(t)) throw new _(4011, ta);
      }
    }
    function jl(e) {
      return e.segments.length > 0 ? new K([], {
        [V]: e
      }) : e;
    }
    function aa(e) {
      const t = {};
      for (const r of Object.keys(e.children)) {
        const o = aa(e.children[r]);
        (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
      }
      return function wA(e) {
        if (1 === e.numberOfChildren && e.children[V]) {
          const t = e.children[V];
          return new K(e.segments.concat(t.segments), t.children);
        }
        return e;
      }(new K(e.segments, t));
    }
    function Yn(e) {
      return e instanceof Sn;
    }
    const $l = !1;
    function CA(e, t, n, r, i) {
      if (0 === n.length) return Gr(t.root, t.root, t.root, r, i);
      const o = function zv(e) {
        if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new Vv(!0, 0, e);
        let t = 0,
          n = !1;
        const r = e.reduce((i, o, s) => {
          if ("object" == typeof o && null != o) {
            if (o.outlets) {
              const a = {};
              return Fe(o.outlets, (u, c) => {
                a[c] = "string" == typeof u ? u.split("/") : u;
              }), [...i, {
                outlets: a
              }];
            }
            if (o.segmentPath) return [...i, o.segmentPath];
          }
          return "string" != typeof o ? [...i, o] : 0 === s ? (o.split("/").forEach((a, u) => {
            0 == u && "." === a || (0 == u && "" === a ? n = !0 : ".." === a ? t++ : "" != a && i.push(a));
          }), i) : [...i, o];
        }, []);
        return new Vv(n, t, r);
      }(n);
      return o.toRoot() ? Gr(t.root, t.root, new K([], {}), r, i) : function s(u) {
        const c = function bA(e, t, n, r) {
            if (e.isAbsolute) return new Wr(t.root, !0, 0);
            if (-1 === r) return new Wr(n, n === t.root, 0);
            return function Gv(e, t, n) {
              let r = e,
                i = t,
                o = n;
              for (; o > i;) {
                if (o -= i, r = r.parent, !r) throw new _(4005, $l && "Invalid number of '../'");
                i = r.segments.length;
              }
              return new Wr(r, !1, i - o);
            }(n, r + (eo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
          }(o, t, e.snapshot?._urlSegment, u),
          l = c.processChildren ? qr(c.segmentGroup, c.index, o.commands) : Ul(c.segmentGroup, c.index, o.commands);
        return Gr(t.root, c.segmentGroup, l, r, i);
      }(e.snapshot?._lastPathIndex);
    }
    function eo(e) {
      return "object" == typeof e && null != e && !e.outlets && !e.segmentPath;
    }
    function to(e) {
      return "object" == typeof e && null != e && e.outlets;
    }
    function Gr(e, t, n, r, i) {
      let s,
        o = {};
      r && Fe(r, (u, c) => {
        o[c] = Array.isArray(u) ? u.map(l => `${l}`) : `${u}`;
      }), s = e === t ? n : Bv(e, t, n);
      const a = jl(aa(s));
      return new Sn(a, o, i);
    }
    function Bv(e, t, n) {
      const r = {};
      return Fe(e.children, (i, o) => {
        r[o] = i === t ? n : Bv(i, t, n);
      }), new K(e.segments, r);
    }
    class Vv {
      constructor(t, n, r) {
        if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && eo(r[0])) throw new _(4003, $l && "Root segment cannot have matrix parameters");
        const i = r.find(to);
        if (i && i !== Rv(r)) throw new _(4004, $l && "{outlets:{}} has to be the last command");
      }
      toRoot() {
        return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0];
      }
    }
    class Wr {
      constructor(t, n, r) {
        this.segmentGroup = t, this.processChildren = n, this.index = r;
      }
    }
    function Ul(e, t, n) {
      if (e || (e = new K([], {})), 0 === e.segments.length && e.hasChildren()) return qr(e, t, n);
      const r = function IA(e, t, n) {
          let r = 0,
            i = t;
          const o = {
            match: !1,
            pathIndex: 0,
            commandIndex: 0
          };
          for (; i < e.segments.length;) {
            if (r >= n.length) return o;
            const s = e.segments[i],
              a = n[r];
            if (to(a)) break;
            const u = `${a}`,
              c = r < n.length - 1 ? n[r + 1] : null;
            if (i > 0 && void 0 === u) break;
            if (u && c && "object" == typeof c && void 0 === c.outlets) {
              if (!qv(u, c, s)) return o;
              r += 2;
            } else {
              if (!qv(u, {}, s)) return o;
              r++;
            }
            i++;
          }
          return {
            match: !0,
            pathIndex: i,
            commandIndex: r
          };
        }(e, t, n),
        i = n.slice(r.commandIndex);
      if (r.match && r.pathIndex < e.segments.length) {
        const o = new K(e.segments.slice(0, r.pathIndex), {});
        return o.children[V] = new K(e.segments.slice(r.pathIndex), e.children), qr(o, 0, i);
      }
      return r.match && 0 === i.length ? new K(e.segments, {}) : r.match && !e.hasChildren() ? Hl(e, t, n) : r.match ? qr(e, 0, i) : Hl(e, t, n);
    }
    function qr(e, t, n) {
      if (0 === n.length) return new K(e.segments, {});
      {
        const r = function EA(e) {
            return to(e[0]) ? e[0].outlets : {
              [V]: e
            };
          }(n),
          i = {};
        return !r[V] && e.children[V] && 1 === e.numberOfChildren && 0 === e.children[V].segments.length ? qr(e.children[V], t, n) : (Fe(r, (o, s) => {
          "string" == typeof o && (o = [o]), null !== o && (i[s] = Ul(e.children[s], t, o));
        }), Fe(e.children, (o, s) => {
          void 0 === r[s] && (i[s] = o);
        }), new K(e.segments, i));
      }
    }
    function Hl(e, t, n) {
      const r = e.segments.slice(0, t);
      let i = 0;
      for (; i < n.length;) {
        const o = n[i];
        if (to(o)) {
          const u = SA(o.outlets);
          return new K(r, u);
        }
        if (0 === i && eo(n[0])) {
          r.push(new Qi(e.segments[t].path, Wv(n[0]))), i++;
          continue;
        }
        const s = to(o) ? o.outlets[V] : `${o}`,
          a = i < n.length - 1 ? n[i + 1] : null;
        s && a && eo(a) ? (r.push(new Qi(s, Wv(a))), i += 2) : (r.push(new Qi(s, {})), i++);
      }
      return new K(r, {});
    }
    function SA(e) {
      const t = {};
      return Fe(e, (n, r) => {
        "string" == typeof n && (n = [n]), null !== n && (t[r] = Hl(new K([], {}), 0, n));
      }), t;
    }
    function Wv(e) {
      const t = {};
      return Fe(e, (n, r) => t[r] = `${n}`), t;
    }
    function qv(e, t, n) {
      return e == n.path && Gt(t, n.parameters);
    }
    const no = "imperative";
    class Wt {
      constructor(t, n) {
        this.id = t, this.url = n;
      }
    }
    class Bl extends Wt {
      constructor(t, n, r = "imperative", i = null) {
        super(t, n), this.type = 0, this.navigationTrigger = r, this.restoredState = i;
      }
      toString() {
        return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
      }
    }
    class Zn extends Wt {
      constructor(t, n, r) {
        super(t, n), this.urlAfterRedirects = r, this.type = 1;
      }
      toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
      }
    }
    class ua extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.reason = r, this.code = i, this.type = 2;
      }
      toString() {
        return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
      }
    }
    class ca extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.reason = r, this.code = i, this.type = 16;
      }
    }
    class Vl extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.error = r, this.target = i, this.type = 3;
      }
      toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
      }
    }
    class MA extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.urlAfterRedirects = r, this.state = i, this.type = 4;
      }
      toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    }
    class xA extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.urlAfterRedirects = r, this.state = i, this.type = 7;
      }
      toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    }
    class TA extends Wt {
      constructor(t, n, r, i, o) {
        super(t, n), this.urlAfterRedirects = r, this.state = i, this.shouldActivate = o, this.type = 8;
      }
      toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
      }
    }
    class AA extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.urlAfterRedirects = r, this.state = i, this.type = 5;
      }
      toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    }
    class RA extends Wt {
      constructor(t, n, r, i) {
        super(t, n), this.urlAfterRedirects = r, this.state = i, this.type = 6;
      }
      toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
      }
    }
    class PA {
      constructor(t) {
        this.route = t, this.type = 9;
      }
      toString() {
        return `RouteConfigLoadStart(path: ${this.route.path})`;
      }
    }
    class OA {
      constructor(t) {
        this.route = t, this.type = 10;
      }
      toString() {
        return `RouteConfigLoadEnd(path: ${this.route.path})`;
      }
    }
    class NA {
      constructor(t) {
        this.snapshot = t, this.type = 11;
      }
      toString() {
        return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
      }
    }
    class FA {
      constructor(t) {
        this.snapshot = t, this.type = 12;
      }
      toString() {
        return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
      }
    }
    class kA {
      constructor(t) {
        this.snapshot = t, this.type = 13;
      }
      toString() {
        return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
      }
    }
    class LA {
      constructor(t) {
        this.snapshot = t, this.type = 14;
      }
      toString() {
        return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
      }
    }
    class Kv {
      constructor(t, n, r) {
        this.routerEvent = t, this.position = n, this.anchor = r, this.type = 15;
      }
      toString() {
        return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`;
      }
    }
    let UA = (() => {
        class e {
          createUrlTree(n, r, i, o, s, a) {
            return CA(n || r.root, i, o, s, a);
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac
        }), e;
      })(),
      BA = (() => {
        class e {}
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: function (t) {
            return UA.ɵfac(t);
          },
          providedIn: "root"
        }), e;
      })();
    class Yv {
      constructor(t) {
        this._root = t;
      }
      get root() {
        return this._root.value;
      }
      parent(t) {
        const n = this.pathFromRoot(t);
        return n.length > 1 ? n[n.length - 2] : null;
      }
      children(t) {
        const n = zl(t, this._root);
        return n ? n.children.map(r => r.value) : [];
      }
      firstChild(t) {
        const n = zl(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
      }
      siblings(t) {
        const n = Gl(t, this._root);
        return n.length < 2 ? [] : n[n.length - 2].children.map(i => i.value).filter(i => i !== t);
      }
      pathFromRoot(t) {
        return Gl(t, this._root).map(n => n.value);
      }
    }
    function zl(e, t) {
      if (e === t.value) return t;
      for (const n of t.children) {
        const r = zl(e, n);
        if (r) return r;
      }
      return null;
    }
    function Gl(e, t) {
      if (e === t.value) return [t];
      for (const n of t.children) {
        const r = Gl(e, n);
        if (r.length) return r.unshift(t), r;
      }
      return [];
    }
    class dn {
      constructor(t, n) {
        this.value = t, this.children = n;
      }
      toString() {
        return `TreeNode(${this.value})`;
      }
    }
    function Kr(e) {
      const t = {};
      return e && e.children.forEach(n => t[n.value.outlet] = n), t;
    }
    class Zv extends Yv {
      constructor(t, n) {
        super(t), this.snapshot = n, Wl(this, t);
      }
      toString() {
        return this.snapshot.toString();
      }
    }
    function Qv(e, t) {
      const n = function VA(e, t) {
          const s = new la([], {}, {}, "", {}, V, t, null, e.root, -1, {});
          return new Jv("", new dn(s, []));
        }(e, t),
        r = new Ct([new Qi("", {})]),
        i = new Ct({}),
        o = new Ct({}),
        s = new Ct({}),
        a = new Ct(""),
        u = new Qn(r, i, s, a, o, V, t, n.root);
      return u.snapshot = n.root, new Zv(new dn(u, []), n);
    }
    class Qn {
      constructor(t, n, r, i, o, s, a, u) {
        this.url = t, this.params = n, this.queryParams = r, this.fragment = i, this.data = o, this.outlet = s, this.component = a, this.title = this.data?.pipe(j(c => c[Zi])) ?? A(void 0), this._futureSnapshot = u;
      }
      get routeConfig() {
        return this._futureSnapshot.routeConfig;
      }
      get root() {
        return this._routerState.root;
      }
      get parent() {
        return this._routerState.parent(this);
      }
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      get children() {
        return this._routerState.children(this);
      }
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      get paramMap() {
        return this._paramMap || (this._paramMap = this.params.pipe(j(t => zr(t)))), this._paramMap;
      }
      get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(j(t => zr(t)))), this._queryParamMap;
      }
      toString() {
        return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
      }
    }
    function Xv(e, t = "emptyOnly") {
      const n = e.pathFromRoot;
      let r = 0;
      if ("always" !== t) for (r = n.length - 1; r >= 1;) {
        const i = n[r],
          o = n[r - 1];
        if (i.routeConfig && "" === i.routeConfig.path) r--;else {
          if (o.component) break;
          r--;
        }
      }
      return function zA(e) {
        return e.reduce((t, n) => ({
          params: {
            ...t.params,
            ...n.params
          },
          data: {
            ...t.data,
            ...n.data
          },
          resolve: {
            ...n.data,
            ...t.resolve,
            ...n.routeConfig?.data,
            ...n._resolvedData
          }
        }), {
          params: {},
          data: {},
          resolve: {}
        });
      }(n.slice(r));
    }
    class la {
      get title() {
        return this.data?.[Zi];
      }
      constructor(t, n, r, i, o, s, a, u, c, l, d) {
        this.url = t, this.params = n, this.queryParams = r, this.fragment = i, this.data = o, this.outlet = s, this.component = a, this.routeConfig = u, this._urlSegment = c, this._lastPathIndex = l, this._resolve = d;
      }
      get root() {
        return this._routerState.root;
      }
      get parent() {
        return this._routerState.parent(this);
      }
      get firstChild() {
        return this._routerState.firstChild(this);
      }
      get children() {
        return this._routerState.children(this);
      }
      get pathFromRoot() {
        return this._routerState.pathFromRoot(this);
      }
      get paramMap() {
        return this._paramMap || (this._paramMap = zr(this.params)), this._paramMap;
      }
      get queryParamMap() {
        return this._queryParamMap || (this._queryParamMap = zr(this.queryParams)), this._queryParamMap;
      }
      toString() {
        return `Route(url:'${this.url.map(r => r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`;
      }
    }
    class Jv extends Yv {
      constructor(t, n) {
        super(n), this.url = t, Wl(this, n);
      }
      toString() {
        return eD(this._root);
      }
    }
    function Wl(e, t) {
      t.value._routerState = e, t.children.forEach(n => Wl(e, n));
    }
    function eD(e) {
      const t = e.children.length > 0 ? ` { ${e.children.map(eD).join(", ")} } ` : "";
      return `${e.value}${t}`;
    }
    function ql(e) {
      if (e.snapshot) {
        const t = e.snapshot,
          n = e._futureSnapshot;
        e.snapshot = n, Gt(t.queryParams, n.queryParams) || e.queryParams.next(n.queryParams), t.fragment !== n.fragment && e.fragment.next(n.fragment), Gt(t.params, n.params) || e.params.next(n.params), function iA(e, t) {
          if (e.length !== t.length) return !1;
          for (let n = 0; n < e.length; ++n) if (!Gt(e[n], t[n])) return !1;
          return !0;
        }(t.url, n.url) || e.url.next(n.url), Gt(t.data, n.data) || e.data.next(n.data);
      } else e.snapshot = e._futureSnapshot, e.data.next(e._futureSnapshot.data);
    }
    function Kl(e, t) {
      const n = Gt(e.params, t.params) && function uA(e, t) {
        return Kn(e, t) && e.every((n, r) => Gt(n.parameters, t[r].parameters));
      }(e.url, t.url);
      return n && !(!e.parent != !t.parent) && (!e.parent || Kl(e.parent, t.parent));
    }
    function ro(e, t, n) {
      if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
        const r = n.value;
        r._futureSnapshot = t.value;
        const i = function WA(e, t, n) {
          return t.children.map(r => {
            for (const i of n.children) if (e.shouldReuseRoute(r.value, i.value.snapshot)) return ro(e, r, i);
            return ro(e, r);
          });
        }(e, t, n);
        return new dn(r, i);
      }
      {
        if (e.shouldAttach(t.value)) {
          const o = e.retrieve(t.value);
          if (null !== o) {
            const s = o.route;
            return s.value._futureSnapshot = t.value, s.children = t.children.map(a => ro(e, a)), s;
          }
        }
        const r = function qA(e) {
            return new Qn(new Ct(e.url), new Ct(e.params), new Ct(e.queryParams), new Ct(e.fragment), new Ct(e.data), e.outlet, e.component, e);
          }(t.value),
          i = t.children.map(o => ro(e, o));
        return new dn(r, i);
      }
    }
    const Yl = "ngNavigationCancelingError";
    function tD(e, t) {
      const {
          redirectTo: n,
          navigationBehaviorOptions: r
        } = Yn(t) ? {
          redirectTo: t,
          navigationBehaviorOptions: void 0
        } : t,
        i = nD(!1, 0, t);
      return i.url = n, i.navigationBehaviorOptions = r, i;
    }
    function nD(e, t, n) {
      const r = new Error("NavigationCancelingError: " + (e || ""));
      return r[Yl] = !0, r.cancellationCode = t, n && (r.url = n), r;
    }
    function rD(e) {
      return iD(e) && Yn(e.url);
    }
    function iD(e) {
      return e && e[Yl];
    }
    class KA {
      constructor() {
        this.outlet = null, this.route = null, this.resolver = null, this.injector = null, this.children = new io(), this.attachRef = null;
      }
    }
    let io = (() => {
      class e {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(n, r) {
          const i = this.getOrCreateContext(n);
          i.outlet = r, this.contexts.set(n, i);
        }
        onChildOutletDestroyed(n) {
          const r = this.getContext(n);
          r && (r.outlet = null, r.attachRef = null);
        }
        onOutletDeactivated() {
          const n = this.contexts;
          return this.contexts = new Map(), n;
        }
        onOutletReAttached(n) {
          this.contexts = n;
        }
        getOrCreateContext(n) {
          let r = this.getContext(n);
          return r || (r = new KA(), this.contexts.set(n, r)), r;
        }
        getContext(n) {
          return this.contexts.get(n) || null;
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    const da = !1;
    let oD = (() => {
      class e {
        constructor() {
          this.activated = null, this._activatedRoute = null, this.name = V, this.activateEvents = new Ze(), this.deactivateEvents = new Ze(), this.attachEvents = new Ze(), this.detachEvents = new Ze(), this.parentContexts = q(io), this.location = q(At), this.changeDetector = q(Gc), this.environmentInjector = q(Ut);
        }
        ngOnChanges(n) {
          if (n.name) {
            const {
              firstChange: r,
              previousValue: i
            } = n.name;
            if (r) return;
            this.isTrackedInParentContexts(i) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)), this.initializeOutletWithName();
          }
        }
        ngOnDestroy() {
          this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name);
        }
        isTrackedInParentContexts(n) {
          return this.parentContexts.getContext(n)?.outlet === this;
        }
        ngOnInit() {
          this.initializeOutletWithName();
        }
        initializeOutletWithName() {
          if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
          const n = this.parentContexts.getContext(this.name);
          n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector));
        }
        get isActivated() {
          return !!this.activated;
        }
        get component() {
          if (!this.activated) throw new _(4012, da);
          return this.activated.instance;
        }
        get activatedRoute() {
          if (!this.activated) throw new _(4012, da);
          return this._activatedRoute;
        }
        get activatedRouteData() {
          return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
        }
        detach() {
          if (!this.activated) throw new _(4012, da);
          this.location.detach();
          const n = this.activated;
          return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n;
        }
        attach(n, r) {
          this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.attachEvents.emit(n.instance);
        }
        deactivate() {
          if (this.activated) {
            const n = this.component;
            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n);
          }
        }
        activateWith(n, r) {
          if (this.isActivated) throw new _(4013, da);
          this._activatedRoute = n;
          const i = this.location,
            s = n.snapshot.component,
            a = this.parentContexts.getOrCreateContext(this.name).children,
            u = new YA(n, a, i.injector);
          if (r && function ZA(e) {
            return !!e.resolveComponentFactory;
          }(r)) {
            const c = r.resolveComponentFactory(s);
            this.activated = i.createComponent(c, i.length, u);
          } else this.activated = i.createComponent(s, {
            index: i.length,
            injector: u,
            environmentInjector: r ?? this.environmentInjector
          });
          this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance);
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵdir = Be({
        type: e,
        selectors: [["router-outlet"]],
        inputs: {
          name: "name"
        },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach"
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [On]
      }), e;
    })();
    class YA {
      constructor(t, n, r) {
        this.route = t, this.childContexts = n, this.parent = r;
      }
      get(t, n) {
        return t === Qn ? this.route : t === io ? this.childContexts : this.parent.get(t, n);
      }
    }
    let Zl = (() => {
      class e {}
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵcmp = Tn({
        type: e,
        selectors: [["ng-component"]],
        standalone: !0,
        features: [Qg],
        decls: 1,
        vars: 0,
        template: function (n, r) {
          1 & n && We(0, "router-outlet");
        },
        dependencies: [oD],
        encapsulation: 2
      }), e;
    })();
    function sD(e, t) {
      return e.providers && !e._injector && (e._injector = Es(e.providers, t, `Route: ${e.path}`)), e._injector ?? t;
    }
    function Xl(e) {
      const t = e.children && e.children.map(Xl),
        n = t ? {
          ...e,
          children: t
        } : {
          ...e
        };
      return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== V && (n.component = Zl), n;
    }
    function bt(e) {
      return e.outlet || V;
    }
    function aD(e, t) {
      const n = e.filter(r => bt(r) === t);
      return n.push(...e.filter(r => bt(r) !== t)), n;
    }
    function oo(e) {
      if (!e) return null;
      if (e.routeConfig?._injector) return e.routeConfig._injector;
      for (let t = e.parent; t; t = t.parent) {
        const n = t.routeConfig;
        if (n?._loadedInjector) return n._loadedInjector;
        if (n?._injector) return n._injector;
      }
      return null;
    }
    class tR {
      constructor(t, n, r, i) {
        this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = i;
      }
      activate(t) {
        const n = this.futureState._root,
          r = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(n, r, t), ql(this.futureState.root), this.activateChildRoutes(n, r, t);
      }
      deactivateChildRoutes(t, n, r) {
        const i = Kr(n);
        t.children.forEach(o => {
          const s = o.value.outlet;
          this.deactivateRoutes(o, i[s], r), delete i[s];
        }), Fe(i, (o, s) => {
          this.deactivateRouteAndItsChildren(o, r);
        });
      }
      deactivateRoutes(t, n, r) {
        const i = t.value,
          o = n ? n.value : null;
        if (i === o) {
          if (i.component) {
            const s = r.getContext(i.outlet);
            s && this.deactivateChildRoutes(t, n, s.children);
          } else this.deactivateChildRoutes(t, n, r);
        } else o && this.deactivateRouteAndItsChildren(n, r);
      }
      deactivateRouteAndItsChildren(t, n) {
        t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n);
      }
      detachAndStoreRouteSubtree(t, n) {
        const r = n.getContext(t.value.outlet),
          i = r && t.value.component ? r.children : n,
          o = Kr(t);
        for (const s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], i);
        if (r && r.outlet) {
          const s = r.outlet.detach(),
            a = r.children.onOutletDeactivated();
          this.routeReuseStrategy.store(t.value.snapshot, {
            componentRef: s,
            route: t,
            contexts: a
          });
        }
      }
      deactivateRouteAndOutlet(t, n) {
        const r = n.getContext(t.value.outlet),
          i = r && t.value.component ? r.children : n,
          o = Kr(t);
        for (const s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], i);
        r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.resolver = null, r.route = null);
      }
      activateChildRoutes(t, n, r) {
        const i = Kr(n);
        t.children.forEach(o => {
          this.activateRoutes(o, i[o.value.outlet], r), this.forwardEvent(new LA(o.value.snapshot));
        }), t.children.length && this.forwardEvent(new FA(t.value.snapshot));
      }
      activateRoutes(t, n, r) {
        const i = t.value,
          o = n ? n.value : null;
        if (ql(i), i === o) {
          if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            this.activateChildRoutes(t, n, s.children);
          } else this.activateChildRoutes(t, n, r);
        } else if (i.component) {
          const s = r.getOrCreateContext(i.outlet);
          if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
            const a = this.routeReuseStrategy.retrieve(i.snapshot);
            this.routeReuseStrategy.store(i.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), ql(a.route.value), this.activateChildRoutes(t, null, s.children);
          } else {
            const a = oo(i.snapshot),
              u = a?.get(Ii) ?? null;
            s.attachRef = null, s.route = i, s.resolver = u, s.injector = a, s.outlet && s.outlet.activateWith(i, s.injector), this.activateChildRoutes(t, null, s.children);
          }
        } else this.activateChildRoutes(t, null, r);
      }
    }
    class uD {
      constructor(t) {
        this.path = t, this.route = this.path[this.path.length - 1];
      }
    }
    class fa {
      constructor(t, n) {
        this.component = t, this.route = n;
      }
    }
    function nR(e, t, n) {
      const r = e._root;
      return so(r, t ? t._root : null, n, [r.value]);
    }
    function Yr(e, t) {
      const n = Symbol(),
        r = t.get(e, n);
      return r === n ? "function" != typeof e || function hw(e) {
        return null !== Eo(e);
      }(e) ? t.get(e) : e : r;
    }
    function so(e, t, n, r, i = {
      canDeactivateChecks: [],
      canActivateChecks: []
    }) {
      const o = Kr(t);
      return e.children.forEach(s => {
        (function iR(e, t, n, r, i = {
          canDeactivateChecks: [],
          canActivateChecks: []
        }) {
          const o = e.value,
            s = t ? t.value : null,
            a = n ? n.getContext(e.value.outlet) : null;
          if (s && o.routeConfig === s.routeConfig) {
            const u = function oR(e, t, n) {
              if ("function" == typeof n) return n(e, t);
              switch (n) {
                case "pathParamsChange":
                  return !Kn(e.url, t.url);
                case "pathParamsOrQueryParamsChange":
                  return !Kn(e.url, t.url) || !Gt(e.queryParams, t.queryParams);
                case "always":
                  return !0;
                case "paramsOrQueryParamsChange":
                  return !Kl(e, t) || !Gt(e.queryParams, t.queryParams);
                default:
                  return !Kl(e, t);
              }
            }(s, o, o.routeConfig.runGuardsAndResolvers);
            u ? i.canActivateChecks.push(new uD(r)) : (o.data = s.data, o._resolvedData = s._resolvedData), so(e, t, o.component ? a ? a.children : null : n, r, i), u && a && a.outlet && a.outlet.isActivated && i.canDeactivateChecks.push(new fa(a.outlet.component, s));
          } else s && ao(t, a, i), i.canActivateChecks.push(new uD(r)), so(e, null, o.component ? a ? a.children : null : n, r, i);
        })(s, o[s.value.outlet], n, r.concat([s.value]), i), delete o[s.value.outlet];
      }), Fe(o, (s, a) => ao(s, n.getContext(a), i)), i;
    }
    function ao(e, t, n) {
      const r = Kr(e),
        i = e.value;
      Fe(r, (o, s) => {
        ao(o, i.component ? t ? t.children.getContext(s) : null : t, n);
      }), n.canDeactivateChecks.push(new fa(i.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, i));
    }
    function uo(e) {
      return "function" == typeof e;
    }
    function Jl(e) {
      return e instanceof Js || "EmptyError" === e?.name;
    }
    const ha = Symbol("INITIAL_VALUE");
    function Zr() {
      return _t(e => bv(e.map(t => t.pipe(Yi(1), function N1(...e) {
        const t = e[e.length - 1];
        return mo(t) ? (e.pop(), n => Pl(e, n, t)) : n => Pl(e, n);
      }(ha)))).pipe(j(t => {
        for (const n of t) if (!0 !== n) {
          if (n === ha) return ha;
          if (!1 === n || n instanceof Sn) return n;
        }
        return !0;
      }), cn(t => t !== ha), Yi(1)));
    }
    function cD(e) {
      return function kD(...e) {
        return hd(e);
      }(Ae(t => {
        if (Yn(t)) throw tD(0, t);
      }), j(t => !0 === t));
    }
    const ed = {
      matched: !1,
      consumedSegments: [],
      remainingSegments: [],
      parameters: {},
      positionalParamSegments: {}
    };
    function lD(e, t, n, r, i) {
      const o = td(e, t, n);
      return o.matched ? function _R(e, t, n, r) {
        const i = t.canMatch;
        return i && 0 !== i.length ? A(i.map(s => {
          const a = Yr(s, e);
          return In(function dR(e) {
            return e && uo(e.canMatch);
          }(a) ? a.canMatch(t, n) : e.runInContext(() => a(t, n)));
        })).pipe(Zr(), cD()) : A(!0);
      }(r = sD(t, r), t, n).pipe(j(s => !0 === s ? o : {
        ...ed
      })) : A(o);
    }
    function td(e, t, n) {
      if ("" === t.path) return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? {
        ...ed
      } : {
        matched: !0,
        consumedSegments: [],
        remainingSegments: n,
        parameters: {},
        positionalParamSegments: {}
      };
      const i = (t.matcher || rA)(n, e, t);
      if (!i) return {
        ...ed
      };
      const o = {};
      Fe(i.posParams, (a, u) => {
        o[u] = a.path;
      });
      const s = i.consumed.length > 0 ? {
        ...o,
        ...i.consumed[i.consumed.length - 1].parameters
      } : o;
      return {
        matched: !0,
        consumedSegments: i.consumed,
        remainingSegments: n.slice(i.consumed.length),
        parameters: s,
        positionalParamSegments: i.posParams ?? {}
      };
    }
    function pa(e, t, n, r) {
      if (n.length > 0 && function IR(e, t, n) {
        return n.some(r => ga(e, t, r) && bt(r) !== V);
      }(e, n, r)) {
        const o = new K(t, function ER(e, t, n, r) {
          const i = {};
          i[V] = r, r._sourceSegment = e, r._segmentIndexShift = t.length;
          for (const o of n) if ("" === o.path && bt(o) !== V) {
            const s = new K([], {});
            s._sourceSegment = e, s._segmentIndexShift = t.length, i[bt(o)] = s;
          }
          return i;
        }(e, t, r, new K(n, e.children)));
        return o._sourceSegment = e, o._segmentIndexShift = t.length, {
          segmentGroup: o,
          slicedSegments: []
        };
      }
      if (0 === n.length && function SR(e, t, n) {
        return n.some(r => ga(e, t, r));
      }(e, n, r)) {
        const o = new K(e.segments, function bR(e, t, n, r, i) {
          const o = {};
          for (const s of r) if (ga(e, n, s) && !i[bt(s)]) {
            const a = new K([], {});
            a._sourceSegment = e, a._segmentIndexShift = t.length, o[bt(s)] = a;
          }
          return {
            ...i,
            ...o
          };
        }(e, t, n, r, e.children));
        return o._sourceSegment = e, o._segmentIndexShift = t.length, {
          segmentGroup: o,
          slicedSegments: n
        };
      }
      const i = new K(e.segments, e.children);
      return i._sourceSegment = e, i._segmentIndexShift = t.length, {
        segmentGroup: i,
        slicedSegments: n
      };
    }
    function ga(e, t, n) {
      return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path;
    }
    function dD(e, t, n, r) {
      return !!(bt(e) === r || r !== V && ga(t, n, e)) && ("**" === e.path || td(t, e, n).matched);
    }
    function fD(e, t, n) {
      return 0 === t.length && !e.children[n];
    }
    const ma = !1;
    class ya {
      constructor(t) {
        this.segmentGroup = t || null;
      }
    }
    class hD {
      constructor(t) {
        this.urlTree = t;
      }
    }
    function co(e) {
      return Ki(new ya(e));
    }
    function pD(e) {
      return Ki(new hD(e));
    }
    function MR(e) {
      return Ki(new _(4e3, ma && `Only absolute redirects can have named outlets. redirectTo: '${e}'`));
    }
    class AR {
      constructor(t, n, r, i, o) {
        this.injector = t, this.configLoader = n, this.urlSerializer = r, this.urlTree = i, this.config = o, this.allowRedirects = !0;
      }
      apply() {
        const t = pa(this.urlTree.root, [], [], this.config).segmentGroup,
          n = new K(t.segments, t.children);
        return this.expandSegmentGroup(this.injector, this.config, n, V).pipe(j(o => this.createUrlTree(aa(o), this.urlTree.queryParams, this.urlTree.fragment))).pipe(qn(o => {
          if (o instanceof hD) return this.allowRedirects = !1, this.match(o.urlTree);
          throw o instanceof ya ? this.noMatchError(o) : o;
        }));
      }
      match(t) {
        return this.expandSegmentGroup(this.injector, this.config, t.root, V).pipe(j(i => this.createUrlTree(aa(i), t.queryParams, t.fragment))).pipe(qn(i => {
          throw i instanceof ya ? this.noMatchError(i) : i;
        }));
      }
      noMatchError(t) {
        return new _(4002, ma && `Cannot match any routes. URL Segment: '${t.segmentGroup}'`);
      }
      createUrlTree(t, n, r) {
        const i = jl(t);
        return new Sn(i, n, r);
      }
      expandSegmentGroup(t, n, r, i) {
        return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(t, n, r).pipe(j(o => new K([], o))) : this.expandSegment(t, r, n, r.segments, i, !0);
      }
      expandChildren(t, n, r) {
        const i = [];
        for (const o of Object.keys(r.children)) "primary" === o ? i.unshift(o) : i.push(o);
        return Re(i).pipe(Cn(o => {
          const s = r.children[o],
            a = aD(n, o);
          return this.expandSegmentGroup(t, a, s, o).pipe(j(u => ({
            segment: u,
            outlet: o
          })));
        }), Mv((o, s) => (o[s.outlet] = s.segment, o), {}), xv());
      }
      expandSegment(t, n, r, i, o, s) {
        return Re(r).pipe(Cn(a => this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(qn(c => {
          if (c instanceof ya) return A(null);
          throw c;
        }))), bn(a => !!a), qn((a, u) => {
          if (Jl(a)) return fD(n, i, o) ? A(new K([], {})) : co(n);
          throw a;
        }));
      }
      expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
        return dD(i, n, o, s) ? void 0 === i.redirectTo ? this.matchSegmentAgainstRoute(t, n, i, o, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) : co(n) : co(n);
      }
      expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
        return "**" === i.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s);
      }
      expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
        const o = this.applyRedirectCommands([], r.redirectTo, {});
        return r.redirectTo.startsWith("/") ? pD(o) : this.lineralizeSegments(r, o).pipe(ke(s => {
          const a = new K(s, {});
          return this.expandSegment(t, a, n, s, i, !1);
        }));
      }
      expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
        const {
          matched: a,
          consumedSegments: u,
          remainingSegments: c,
          positionalParamSegments: l
        } = td(n, i, o);
        if (!a) return co(n);
        const d = this.applyRedirectCommands(u, i.redirectTo, l);
        return i.redirectTo.startsWith("/") ? pD(d) : this.lineralizeSegments(i, d).pipe(ke(f => this.expandSegment(t, n, r, f.concat(c), s, !1)));
      }
      matchSegmentAgainstRoute(t, n, r, i, o) {
        return "**" === r.path ? (t = sD(r, t), r.loadChildren ? (r._loadedRoutes ? A({
          routes: r._loadedRoutes,
          injector: r._loadedInjector
        }) : this.configLoader.loadChildren(t, r)).pipe(j(a => (r._loadedRoutes = a.routes, r._loadedInjector = a.injector, new K(i, {})))) : A(new K(i, {}))) : lD(n, r, i, t).pipe(_t(({
          matched: s,
          consumedSegments: a,
          remainingSegments: u
        }) => s ? this.getChildConfig(t = r._injector ?? t, r, i).pipe(ke(l => {
          const d = l.injector ?? t,
            f = l.routes,
            {
              segmentGroup: h,
              slicedSegments: p
            } = pa(n, a, u, f),
            g = new K(h.segments, h.children);
          if (0 === p.length && g.hasChildren()) return this.expandChildren(d, f, g).pipe(j(m => new K(a, m)));
          if (0 === f.length && 0 === p.length) return A(new K(a, {}));
          const v = bt(r) === o;
          return this.expandSegment(d, g, f, p, v ? V : o, !0).pipe(j(I => new K(a.concat(I.segments), I.children)));
        })) : co(n)));
      }
      getChildConfig(t, n, r) {
        return n.children ? A({
          routes: n.children,
          injector: t
        }) : n.loadChildren ? void 0 !== n._loadedRoutes ? A({
          routes: n._loadedRoutes,
          injector: n._loadedInjector
        }) : function CR(e, t, n, r) {
          const i = t.canLoad;
          return void 0 === i || 0 === i.length ? A(!0) : A(i.map(s => {
            const a = Yr(s, e);
            return In(function aR(e) {
              return e && uo(e.canLoad);
            }(a) ? a.canLoad(t, n) : e.runInContext(() => a(t, n)));
          })).pipe(Zr(), cD());
        }(t, n, r).pipe(ke(i => i ? this.configLoader.loadChildren(t, n).pipe(Ae(o => {
          n._loadedRoutes = o.routes, n._loadedInjector = o.injector;
        })) : function xR(e) {
          return Ki(nD(ma && `Cannot load children because the guard of the route "path: '${e.path}'" returned false`, 3));
        }(n))) : A({
          routes: [],
          injector: t
        });
      }
      lineralizeSegments(t, n) {
        let r = [],
          i = n.root;
        for (;;) {
          if (r = r.concat(i.segments), 0 === i.numberOfChildren) return A(r);
          if (i.numberOfChildren > 1 || !i.children[V]) return MR(t.redirectTo);
          i = i.children[V];
        }
      }
      applyRedirectCommands(t, n, r) {
        return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r);
      }
      applyRedirectCreateUrlTree(t, n, r, i) {
        const o = this.createSegmentGroup(t, n.root, r, i);
        return new Sn(o, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment);
      }
      createQueryParams(t, n) {
        const r = {};
        return Fe(t, (i, o) => {
          if ("string" == typeof i && i.startsWith(":")) {
            const a = i.substring(1);
            r[o] = n[a];
          } else r[o] = i;
        }), r;
      }
      createSegmentGroup(t, n, r, i) {
        const o = this.createSegments(t, n.segments, r, i);
        let s = {};
        return Fe(n.children, (a, u) => {
          s[u] = this.createSegmentGroup(t, a, r, i);
        }), new K(o, s);
      }
      createSegments(t, n, r, i) {
        return n.map(o => o.path.startsWith(":") ? this.findPosParam(t, o, i) : this.findOrReturn(o, r));
      }
      findPosParam(t, n, r) {
        const i = r[n.path.substring(1)];
        if (!i) throw new _(4001, ma && `Cannot redirect to '${t}'. Cannot find '${n.path}'.`);
        return i;
      }
      findOrReturn(t, n) {
        let r = 0;
        for (const i of n) {
          if (i.path === t.path) return n.splice(r), i;
          r++;
        }
        return t;
      }
    }
    class PR {}
    class FR {
      constructor(t, n, r, i, o, s, a) {
        this.injector = t, this.rootComponentType = n, this.config = r, this.urlTree = i, this.url = o, this.paramsInheritanceStrategy = s, this.urlSerializer = a;
      }
      recognize() {
        const t = pa(this.urlTree.root, [], [], this.config.filter(n => void 0 === n.redirectTo)).segmentGroup;
        return this.processSegmentGroup(this.injector, this.config, t, V).pipe(j(n => {
          if (null === n) return null;
          const r = new la([], Object.freeze({}), Object.freeze({
              ...this.urlTree.queryParams
            }), this.urlTree.fragment, {}, V, this.rootComponentType, null, this.urlTree.root, -1, {}),
            i = new dn(r, n),
            o = new Jv(this.url, i);
          return this.inheritParamsAndData(o._root), o;
        }));
      }
      inheritParamsAndData(t) {
        const n = t.value,
          r = Xv(n, this.paramsInheritanceStrategy);
        n.params = Object.freeze(r.params), n.data = Object.freeze(r.data), t.children.forEach(i => this.inheritParamsAndData(i));
      }
      processSegmentGroup(t, n, r, i) {
        return 0 === r.segments.length && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, i);
      }
      processChildren(t, n, r) {
        return Re(Object.keys(r.children)).pipe(Cn(i => {
          const o = r.children[i],
            s = aD(n, i);
          return this.processSegmentGroup(t, s, o, i);
        }), Mv((i, o) => i && o ? (i.push(...o), i) : null), function K1(e, t = !1) {
          return n => n.lift(new Y1(e, t));
        }(i => null !== i), ea(null), xv(), j(i => {
          if (null === i) return null;
          const o = mD(i);
          return function kR(e) {
            e.sort((t, n) => t.value.outlet === V ? -1 : n.value.outlet === V ? 1 : t.value.outlet.localeCompare(n.value.outlet));
          }(o), o;
        }));
      }
      processSegment(t, n, r, i, o) {
        return Re(n).pipe(Cn(s => this.processSegmentAgainstRoute(s._injector ?? t, s, r, i, o)), bn(s => !!s), qn(s => {
          if (Jl(s)) return fD(r, i, o) ? A([]) : A(null);
          throw s;
        }));
      }
      processSegmentAgainstRoute(t, n, r, i, o) {
        if (n.redirectTo || !dD(n, r, i, o)) return A(null);
        let s;
        if ("**" === n.path) {
          const a = i.length > 0 ? Rv(i).parameters : {},
            u = vD(r) + i.length;
          s = A({
            snapshot: new la(i, a, Object.freeze({
              ...this.urlTree.queryParams
            }), this.urlTree.fragment, DD(n), bt(n), n.component ?? n._loadedComponent ?? null, n, yD(r), u, wD(n)),
            consumedSegments: [],
            remainingSegments: []
          });
        } else s = lD(r, n, i, t).pipe(j(({
          matched: a,
          consumedSegments: u,
          remainingSegments: c,
          parameters: l
        }) => {
          if (!a) return null;
          const d = vD(r) + u.length;
          return {
            snapshot: new la(u, l, Object.freeze({
              ...this.urlTree.queryParams
            }), this.urlTree.fragment, DD(n), bt(n), n.component ?? n._loadedComponent ?? null, n, yD(r), d, wD(n)),
            consumedSegments: u,
            remainingSegments: c
          };
        }));
        return s.pipe(_t(a => {
          if (null === a) return A(null);
          const {
            snapshot: u,
            consumedSegments: c,
            remainingSegments: l
          } = a;
          t = n._injector ?? t;
          const d = n._loadedInjector ?? t,
            f = function LR(e) {
              return e.children ? e.children : e.loadChildren ? e._loadedRoutes : [];
            }(n),
            {
              segmentGroup: h,
              slicedSegments: p
            } = pa(r, c, l, f.filter(v => void 0 === v.redirectTo));
          if (0 === p.length && h.hasChildren()) return this.processChildren(d, f, h).pipe(j(v => null === v ? null : [new dn(u, v)]));
          if (0 === f.length && 0 === p.length) return A([new dn(u, [])]);
          const g = bt(n) === o;
          return this.processSegment(d, f, h, p, g ? V : o).pipe(j(v => null === v ? null : [new dn(u, v)]));
        }));
      }
    }
    function jR(e) {
      const t = e.value.routeConfig;
      return t && "" === t.path && void 0 === t.redirectTo;
    }
    function mD(e) {
      const t = [],
        n = new Set();
      for (const r of e) {
        if (!jR(r)) {
          t.push(r);
          continue;
        }
        const i = t.find(o => r.value.routeConfig === o.value.routeConfig);
        void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
      }
      for (const r of n) {
        const i = mD(r.children);
        t.push(new dn(r.value, i));
      }
      return t.filter(r => !n.has(r));
    }
    function yD(e) {
      let t = e;
      for (; t._sourceSegment;) t = t._sourceSegment;
      return t;
    }
    function vD(e) {
      let t = e,
        n = t._segmentIndexShift ?? 0;
      for (; t._sourceSegment;) t = t._sourceSegment, n += t._segmentIndexShift ?? 0;
      return n - 1;
    }
    function DD(e) {
      return e.data || {};
    }
    function wD(e) {
      return e.resolve || {};
    }
    function CD(e) {
      return "string" == typeof e.title || null === e.title;
    }
    function nd(e) {
      return _t(t => {
        const n = e(t);
        return n ? Re(n).pipe(j(() => t)) : A(t);
      });
    }
    const Qr = new T("ROUTES");
    let rd = (() => {
      class e {
        constructor() {
          this.componentLoaders = new WeakMap(), this.childrenLoaders = new WeakMap(), this.compiler = q($m);
        }
        loadComponent(n) {
          if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
          if (n._loadedComponent) return A(n._loadedComponent);
          this.onLoadStartListener && this.onLoadStartListener(n);
          const r = In(n.loadComponent()).pipe(j(bD), Ae(o => {
              this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = o;
            }), Fl(() => {
              this.componentLoaders.delete(n);
            })),
            i = new ba(r, () => new Nt()).pipe(Co());
          return this.componentLoaders.set(n, i), i;
        }
        loadChildren(n, r) {
          if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
          if (r._loadedRoutes) return A({
            routes: r._loadedRoutes,
            injector: r._loadedInjector
          });
          this.onLoadStartListener && this.onLoadStartListener(r);
          const o = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(j(a => {
              this.onLoadEndListener && this.onLoadEndListener(r);
              let u,
                c,
                l = !1;
              Array.isArray(a) ? c = a : (u = a.create(n).injector, c = Av(u.get(Qr, [], k.Self | k.Optional)));
              return {
                routes: c.map(Xl),
                injector: u
              };
            }), Fl(() => {
              this.childrenLoaders.delete(r);
            })),
            s = new ba(o, () => new Nt()).pipe(Co());
          return this.childrenLoaders.set(r, s), s;
        }
        loadModuleFactoryOrRoutes(n) {
          return In(n()).pipe(j(bD), ke(r => r instanceof Yg || Array.isArray(r) ? A(r) : Re(this.compiler.compileModuleAsync(r))));
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    function bD(e) {
      return function WR(e) {
        return e && "object" == typeof e && "default" in e;
      }(e) ? e.default : e;
    }
    let Da = (() => {
      class e {
        get hasRequestedNavigation() {
          return 0 !== this.navigationId;
        }
        constructor() {
          this.currentNavigation = null, this.lastSuccessfulNavigation = null, this.events = new Nt(), this.configLoader = q(rd), this.environmentInjector = q(Ut), this.urlSerializer = q(Xi), this.rootContexts = q(io), this.navigationId = 0, this.afterPreactivation = () => A(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = i => this.events.next(new OA(i)), this.configLoader.onLoadStartListener = i => this.events.next(new PA(i));
        }
        complete() {
          this.transitions?.complete();
        }
        handleNavigationRequest(n) {
          const r = ++this.navigationId;
          this.transitions?.next({
            ...this.transitions.value,
            ...n,
            id: r
          });
        }
        setupNavigations(n) {
          return this.transitions = new Ct({
            id: 0,
            targetPageId: 0,
            currentUrlTree: n.currentUrlTree,
            currentRawUrl: n.currentUrlTree,
            extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
            urlAfterRedirects: n.urlHandlingStrategy.extract(n.currentUrlTree),
            rawUrl: n.currentUrlTree,
            extras: {},
            resolve: null,
            reject: null,
            promise: Promise.resolve(!0),
            source: no,
            restoredState: null,
            currentSnapshot: n.routerState.snapshot,
            targetSnapshot: null,
            currentRouterState: n.routerState,
            targetRouterState: null,
            guards: {
              canActivateChecks: [],
              canDeactivateChecks: []
            },
            guardsResult: null
          }), this.transitions.pipe(cn(r => 0 !== r.id), j(r => ({
            ...r,
            extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl)
          })), _t(r => {
            let i = !1,
              o = !1;
            return A(r).pipe(Ae(s => {
              this.currentNavigation = {
                id: s.id,
                initialUrl: s.rawUrl,
                extractedUrl: s.extractedUrl,
                trigger: s.source,
                extras: s.extras,
                previousNavigation: this.lastSuccessfulNavigation ? {
                  ...this.lastSuccessfulNavigation,
                  previousNavigation: null
                } : null
              };
            }), _t(s => {
              const a = n.browserUrlTree.toString(),
                u = !n.navigated || s.extractedUrl.toString() !== a || a !== n.currentUrlTree.toString();
              if (!u && "reload" !== (s.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                const l = "";
                return this.events.next(new ca(s.id, n.serializeUrl(r.rawUrl), l, 0)), n.rawUrlTree = s.rawUrl, s.resolve(null), Wn;
              }
              if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)) return ED(s.source) && (n.browserUrlTree = s.extractedUrl), A(s).pipe(_t(l => {
                const d = this.transitions?.getValue();
                return this.events.next(new Bl(l.id, this.urlSerializer.serialize(l.extractedUrl), l.source, l.restoredState)), d !== this.transitions?.getValue() ? Wn : Promise.resolve(l);
              }), function RR(e, t, n, r) {
                return _t(i => function TR(e, t, n, r, i) {
                  return new AR(e, t, n, r, i).apply();
                }(e, t, n, i.extractedUrl, r).pipe(j(o => ({
                  ...i,
                  urlAfterRedirects: o
                }))));
              }(this.environmentInjector, this.configLoader, this.urlSerializer, n.config), Ae(l => {
                this.currentNavigation = {
                  ...this.currentNavigation,
                  finalUrl: l.urlAfterRedirects
                }, r.urlAfterRedirects = l.urlAfterRedirects;
              }), function UR(e, t, n, r, i) {
                return ke(o => function NR(e, t, n, r, i, o, s = "emptyOnly") {
                  return new FR(e, t, n, r, i, s, o).recognize().pipe(_t(a => null === a ? function OR(e) {
                    return new ge(t => t.error(e));
                  }(new PR()) : A(a)));
                }(e, t, n, o.urlAfterRedirects, r.serialize(o.urlAfterRedirects), r, i).pipe(j(s => ({
                  ...o,
                  targetSnapshot: s
                }))));
              }(this.environmentInjector, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), Ae(l => {
                if (r.targetSnapshot = l.targetSnapshot, "eager" === n.urlUpdateStrategy) {
                  if (!l.extras.skipLocationChange) {
                    const f = n.urlHandlingStrategy.merge(l.urlAfterRedirects, l.rawUrl);
                    n.setBrowserUrl(f, l);
                  }
                  n.browserUrlTree = l.urlAfterRedirects;
                }
                const d = new MA(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot);
                this.events.next(d);
              }));
              if (u && n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)) {
                const {
                    id: l,
                    extractedUrl: d,
                    source: f,
                    restoredState: h,
                    extras: p
                  } = s,
                  g = new Bl(l, this.urlSerializer.serialize(d), f, h);
                this.events.next(g);
                const v = Qv(d, this.rootComponentType).snapshot;
                return A(r = {
                  ...s,
                  targetSnapshot: v,
                  urlAfterRedirects: d,
                  extras: {
                    ...p,
                    skipLocationChange: !1,
                    replaceUrl: !1
                  }
                });
              }
              {
                const l = "";
                return this.events.next(new ca(s.id, n.serializeUrl(r.extractedUrl), l, 1)), n.rawUrlTree = s.rawUrl, s.resolve(null), Wn;
              }
            }), Ae(s => {
              const a = new xA(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot);
              this.events.next(a);
            }), j(s => r = {
              ...s,
              guards: nR(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
            }), function hR(e, t) {
              return ke(n => {
                const {
                  targetSnapshot: r,
                  currentSnapshot: i,
                  guards: {
                    canActivateChecks: o,
                    canDeactivateChecks: s
                  }
                } = n;
                return 0 === s.length && 0 === o.length ? A({
                  ...n,
                  guardsResult: !0
                }) : function pR(e, t, n, r) {
                  return Re(e).pipe(ke(i => function wR(e, t, n, r, i) {
                    const o = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                    return o && 0 !== o.length ? A(o.map(a => {
                      const u = oo(t) ?? i,
                        c = Yr(a, u);
                      return In(function lR(e) {
                        return e && uo(e.canDeactivate);
                      }(c) ? c.canDeactivate(e, t, n, r) : u.runInContext(() => c(e, t, n, r))).pipe(bn());
                    })).pipe(Zr()) : A(!0);
                  }(i.component, i.route, n, t, r)), bn(i => !0 !== i, !0));
                }(s, r, i, e).pipe(ke(a => a && function sR(e) {
                  return "boolean" == typeof e;
                }(a) ? function gR(e, t, n, r) {
                  return Re(t).pipe(Cn(i => Pl(function yR(e, t) {
                    return null !== e && t && t(new NA(e)), A(!0);
                  }(i.route.parent, r), function mR(e, t) {
                    return null !== e && t && t(new kA(e)), A(!0);
                  }(i.route, r), function DR(e, t, n) {
                    const r = t[t.length - 1],
                      o = t.slice(0, t.length - 1).reverse().map(s => function rR(e) {
                        const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                        return t && 0 !== t.length ? {
                          node: e,
                          guards: t
                        } : null;
                      }(s)).filter(s => null !== s).map(s => Ev(() => A(s.guards.map(u => {
                        const c = oo(s.node) ?? n,
                          l = Yr(u, c);
                        return In(function cR(e) {
                          return e && uo(e.canActivateChild);
                        }(l) ? l.canActivateChild(r, e) : c.runInContext(() => l(r, e))).pipe(bn());
                      })).pipe(Zr())));
                    return A(o).pipe(Zr());
                  }(e, i.path, n), function vR(e, t, n) {
                    const r = t.routeConfig ? t.routeConfig.canActivate : null;
                    if (!r || 0 === r.length) return A(!0);
                    const i = r.map(o => Ev(() => {
                      const s = oo(t) ?? n,
                        a = Yr(o, s);
                      return In(function uR(e) {
                        return e && uo(e.canActivate);
                      }(a) ? a.canActivate(t, e) : s.runInContext(() => a(t, e))).pipe(bn());
                    }));
                    return A(i).pipe(Zr());
                  }(e, i.route, n))), bn(i => !0 !== i, !0));
                }(r, o, e, t) : A(a)), j(a => ({
                  ...n,
                  guardsResult: a
                })));
              });
            }(this.environmentInjector, s => this.events.next(s)), Ae(s => {
              if (r.guardsResult = s.guardsResult, Yn(s.guardsResult)) throw tD(0, s.guardsResult);
              const a = new TA(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot, !!s.guardsResult);
              this.events.next(a);
            }), cn(s => !!s.guardsResult || (n.restoreHistory(s), this.cancelNavigationTransition(s, "", 3), !1)), nd(s => {
              if (s.guards.canActivateChecks.length) return A(s).pipe(Ae(a => {
                const u = new AA(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                this.events.next(u);
              }), _t(a => {
                let u = !1;
                return A(a).pipe(function HR(e, t) {
                  return ke(n => {
                    const {
                      targetSnapshot: r,
                      guards: {
                        canActivateChecks: i
                      }
                    } = n;
                    if (!i.length) return A(n);
                    let o = 0;
                    return Re(i).pipe(Cn(s => function BR(e, t, n, r) {
                      const i = e.routeConfig,
                        o = e._resolve;
                      return void 0 !== i?.title && !CD(i) && (o[Zi] = i.title), function VR(e, t, n, r) {
                        const i = function zR(e) {
                          return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
                        }(e);
                        if (0 === i.length) return A({});
                        const o = {};
                        return Re(i).pipe(ke(s => function GR(e, t, n, r) {
                          const i = oo(t) ?? r,
                            o = Yr(e, i);
                          return In(o.resolve ? o.resolve(t, n) : i.runInContext(() => o(t, n)));
                        }(e[s], t, n, r).pipe(bn(), Ae(a => {
                          o[s] = a;
                        }))), Nl(1), function Q1(e) {
                          return t => t.lift(new X1(e));
                        }(o), qn(s => Jl(s) ? Wn : Ki(s)));
                      }(o, e, t, r).pipe(j(s => (e._resolvedData = s, e.data = Xv(e, n).resolve, i && CD(i) && (e.data[Zi] = i.title), null)));
                    }(s.route, r, e, t)), Ae(() => o++), Nl(1), ke(s => o === i.length ? A(n) : Wn));
                  });
                }(n.paramsInheritanceStrategy, this.environmentInjector), Ae({
                  next: () => u = !0,
                  complete: () => {
                    u || (n.restoreHistory(a), this.cancelNavigationTransition(a, "", 2));
                  }
                }));
              }), Ae(a => {
                const u = new RA(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                this.events.next(u);
              }));
            }), nd(s => {
              const a = u => {
                const c = [];
                u.routeConfig?.loadComponent && !u.routeConfig._loadedComponent && c.push(this.configLoader.loadComponent(u.routeConfig).pipe(Ae(l => {
                  u.component = l;
                }), j(() => {})));
                for (const l of u.children) c.push(...a(l));
                return c;
              };
              return bv(a(s.targetSnapshot.root)).pipe(ea(), Yi(1));
            }), nd(() => this.afterPreactivation()), j(s => {
              const a = function GA(e, t, n) {
                const r = ro(e, t._root, n ? n._root : void 0);
                return new Zv(r, t);
              }(n.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
              return r = {
                ...s,
                targetRouterState: a
              };
            }), Ae(s => {
              n.currentUrlTree = s.urlAfterRedirects, n.rawUrlTree = n.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl), n.routerState = s.targetRouterState, "deferred" === n.urlUpdateStrategy && (s.extras.skipLocationChange || n.setBrowserUrl(n.rawUrlTree, s), n.browserUrlTree = s.urlAfterRedirects);
            }), ((e, t, n) => j(r => (new tR(t, r.targetRouterState, r.currentRouterState, n).activate(e), r)))(this.rootContexts, n.routeReuseStrategy, s => this.events.next(s)), Ae({
              next: s => {
                i = !0, this.lastSuccessfulNavigation = this.currentNavigation, n.navigated = !0, this.events.next(new Zn(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(n.currentUrlTree))), n.titleStrategy?.updateTitle(s.targetRouterState.snapshot), s.resolve(!0);
              },
              complete: () => {
                i = !0;
              }
            }), Fl(() => {
              i || o || this.cancelNavigationTransition(r, "", 1), this.currentNavigation?.id === r.id && (this.currentNavigation = null);
            }), qn(s => {
              if (o = !0, iD(s)) {
                rD(s) || (n.navigated = !0, n.restoreHistory(r, !0));
                const a = new ua(r.id, this.urlSerializer.serialize(r.extractedUrl), s.message, s.cancellationCode);
                if (this.events.next(a), rD(s)) {
                  const u = n.urlHandlingStrategy.merge(s.url, n.rawUrlTree),
                    c = {
                      skipLocationChange: r.extras.skipLocationChange,
                      replaceUrl: "eager" === n.urlUpdateStrategy || ED(r.source)
                    };
                  n.scheduleNavigation(u, no, null, c, {
                    resolve: r.resolve,
                    reject: r.reject,
                    promise: r.promise
                  });
                } else r.resolve(!1);
              } else {
                n.restoreHistory(r, !0);
                const a = new Vl(r.id, this.urlSerializer.serialize(r.extractedUrl), s, r.targetSnapshot ?? void 0);
                this.events.next(a);
                try {
                  r.resolve(n.errorHandler(s));
                } catch (u) {
                  r.reject(u);
                }
              }
              return Wn;
            }));
          }));
        }
        cancelNavigationTransition(n, r, i) {
          const o = new ua(n.id, this.urlSerializer.serialize(n.extractedUrl), r, i);
          this.events.next(o), n.resolve(!1);
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    function ED(e) {
      return e !== no;
    }
    let ID = (() => {
        class e {
          buildTitle(n) {
            let r,
              i = n.root;
            for (; void 0 !== i;) r = this.getResolvedTitleForRoute(i) ?? r, i = i.children.find(o => o.outlet === V);
            return r;
          }
          getResolvedTitleForRoute(n) {
            return n.data[Zi];
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: function () {
            return q(qR);
          },
          providedIn: "root"
        }), e;
      })(),
      qR = (() => {
        class e extends ID {
          constructor(n) {
            super(), this.title = n;
          }
          updateTitle(n) {
            const r = this.buildTitle(n);
            void 0 !== r && this.title.setTitle(r);
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)(x(iv));
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac,
          providedIn: "root"
        }), e;
      })(),
      KR = (() => {
        class e {}
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: function () {
            return q(ZR);
          },
          providedIn: "root"
        }), e;
      })();
    class YR {
      shouldDetach(t) {
        return !1;
      }
      store(t, n) {}
      shouldAttach(t) {
        return !1;
      }
      retrieve(t) {
        return null;
      }
      shouldReuseRoute(t, n) {
        return t.routeConfig === n.routeConfig;
      }
    }
    let ZR = (() => {
      class e extends YR {}
      return e.ɵfac = function () {
        let t;
        return function (r) {
          return (t || (t = function Cf(e) {
            return qt(() => {
              const t = e.prototype.constructor,
                n = t[Yt] || eu(t),
                r = Object.prototype;
              let i = Object.getPrototypeOf(e.prototype).constructor;
              for (; i && i !== r;) {
                const o = i[Yt] || eu(i);
                if (o && o !== n) return o;
                i = Object.getPrototypeOf(i);
              }
              return o => new o();
            });
          }(e)))(r || e);
        };
      }(), e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    const wa = new T("", {
      providedIn: "root",
      factory: () => ({})
    });
    let XR = (() => {
        class e {}
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: function () {
            return q(JR);
          },
          providedIn: "root"
        }), e;
      })(),
      JR = (() => {
        class e {
          shouldProcessUrl(n) {
            return !0;
          }
          extract(n) {
            return n;
          }
          merge(n, r) {
            return n;
          }
        }
        return e.ɵfac = function (n) {
          return new (n || e)();
        }, e.ɵprov = R({
          token: e,
          factory: e.ɵfac,
          providedIn: "root"
        }), e;
      })();
    function eP(e) {
      throw e;
    }
    function tP(e, t, n) {
      return t.parse("/");
    }
    const nP = {
        paths: "exact",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "exact"
      },
      rP = {
        paths: "subset",
        fragment: "ignored",
        matrixParams: "ignored",
        queryParams: "subset"
      };
    let dt = (() => {
      class e {
        get navigationId() {
          return this.navigationTransitions.navigationId;
        }
        get browserPageId() {
          return this.location.getState()?.ɵrouterPageId;
        }
        get events() {
          return this.navigationTransitions.events;
        }
        constructor() {
          this.disposed = !1, this.currentPageId = 0, this.console = q(GS), this.isNgZoneEnabled = !1, this.options = q(wa, {
            optional: !0
          }) || {}, this.errorHandler = this.options.errorHandler || eP, this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || tP, this.navigated = !1, this.lastSuccessfulId = -1, this.urlHandlingStrategy = q(XR), this.routeReuseStrategy = q(KR), this.urlCreationStrategy = q(BA), this.titleStrategy = q(ID), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.config = Av(q(Qr, {
            optional: !0
          }) ?? []), this.navigationTransitions = q(Da), this.urlSerializer = q(Xi), this.location = q(el), this.isNgZoneEnabled = q(ye) instanceof ye && ye.isInAngularZone(), this.resetConfig(this.config), this.currentUrlTree = new Sn(), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = Qv(this.currentUrlTree, null), this.navigationTransitions.setupNavigations(this).subscribe(n => {
            this.lastSuccessfulId = n.id, this.currentPageId = n.targetPageId;
          }, n => {
            this.console.warn(`Unhandled Navigation Error: ${n}`);
          });
        }
        resetRootComponentType(n) {
          this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n;
        }
        initialNavigation() {
          if (this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation) {
            const n = this.location.getState();
            this.navigateToSyncWithBrowser(this.location.path(!0), no, n);
          }
        }
        setUpLocationChangeListener() {
          this.locationSubscription || (this.locationSubscription = this.location.subscribe(n => {
            const r = "popstate" === n.type ? "popstate" : "hashchange";
            "popstate" === r && setTimeout(() => {
              this.navigateToSyncWithBrowser(n.url, r, n.state);
            }, 0);
          }));
        }
        navigateToSyncWithBrowser(n, r, i) {
          const o = {
              replaceUrl: !0
            },
            s = i?.navigationId ? i : null;
          if (i) {
            const u = {
              ...i
            };
            delete u.navigationId, delete u.ɵrouterPageId, 0 !== Object.keys(u).length && (o.state = u);
          }
          const a = this.parseUrl(n);
          this.scheduleNavigation(a, r, s, o);
        }
        get url() {
          return this.serializeUrl(this.currentUrlTree);
        }
        getCurrentNavigation() {
          return this.navigationTransitions.currentNavigation;
        }
        resetConfig(n) {
          this.config = n.map(Xl), this.navigated = !1, this.lastSuccessfulId = -1;
        }
        ngOnDestroy() {
          this.dispose();
        }
        dispose() {
          this.navigationTransitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0;
        }
        createUrlTree(n, r = {}) {
          const {
              relativeTo: i,
              queryParams: o,
              fragment: s,
              queryParamsHandling: a,
              preserveFragment: u
            } = r,
            c = u ? this.currentUrlTree.fragment : s;
          let l = null;
          switch (a) {
            case "merge":
              l = {
                ...this.currentUrlTree.queryParams,
                ...o
              };
              break;
            case "preserve":
              l = this.currentUrlTree.queryParams;
              break;
            default:
              l = o || null;
          }
          return null !== l && (l = this.removeEmptyProps(l)), this.urlCreationStrategy.createUrlTree(i, this.routerState, this.currentUrlTree, n, l, c ?? null);
        }
        navigateByUrl(n, r = {
          skipLocationChange: !1
        }) {
          const i = Yn(n) ? n : this.parseUrl(n),
            o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
          return this.scheduleNavigation(o, no, null, r);
        }
        navigate(n, r = {
          skipLocationChange: !1
        }) {
          return function iP(e) {
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              if (null == n) throw new _(4008, false);
            }
          }(n), this.navigateByUrl(this.createUrlTree(n, r), r);
        }
        serializeUrl(n) {
          return this.urlSerializer.serialize(n);
        }
        parseUrl(n) {
          let r;
          try {
            r = this.urlSerializer.parse(n);
          } catch (i) {
            r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
          }
          return r;
        }
        isActive(n, r) {
          let i;
          if (i = !0 === r ? {
            ...nP
          } : !1 === r ? {
            ...rP
          } : r, Yn(n)) return Ov(this.currentUrlTree, n, i);
          const o = this.parseUrl(n);
          return Ov(this.currentUrlTree, o, i);
        }
        removeEmptyProps(n) {
          return Object.keys(n).reduce((r, i) => {
            const o = n[i];
            return null != o && (r[i] = o), r;
          }, {});
        }
        scheduleNavigation(n, r, i, o, s) {
          if (this.disposed) return Promise.resolve(!1);
          let a, u, c, l;
          return s ? (a = s.resolve, u = s.reject, c = s.promise) : c = new Promise((d, f) => {
            a = d, u = f;
          }), l = "computed" === this.canceledNavigationResolution ? i && i.ɵrouterPageId ? i.ɵrouterPageId : o.replaceUrl || o.skipLocationChange ? this.browserPageId ?? 0 : (this.browserPageId ?? 0) + 1 : 0, this.navigationTransitions.handleNavigationRequest({
            targetPageId: l,
            source: r,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: o,
            resolve: a,
            reject: u,
            promise: c,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState
          }), c.catch(d => Promise.reject(d));
        }
        setBrowserUrl(n, r) {
          const i = this.urlSerializer.serialize(n),
            o = {
              ...r.extras.state,
              ...this.generateNgRouterState(r.id, r.targetPageId)
            };
          this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl ? this.location.replaceState(i, "", o) : this.location.go(i, "", o);
        }
        restoreHistory(n, r = !1) {
          if ("computed" === this.canceledNavigationResolution) {
            const i = this.currentPageId - n.targetPageId;
            "popstate" !== n.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.getCurrentNavigation()?.finalUrl || 0 === i ? this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === i && (this.resetState(n), this.browserUrlTree = n.currentUrlTree, this.resetUrlToCurrentUrlTree()) : this.location.historyGo(i);
          } else "replace" === this.canceledNavigationResolution && (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
        }
        resetState(n) {
          this.routerState = n.currentRouterState, this.currentUrlTree = n.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl);
        }
        resetUrlToCurrentUrlTree() {
          this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
        }
        generateNgRouterState(n, r) {
          return "computed" === this.canceledNavigationResolution ? {
            navigationId: n,
            ɵrouterPageId: r
          } : {
            navigationId: n
          };
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    class SD {}
    let aP = (() => {
      class e {
        constructor(n, r, i, o, s) {
          this.router = n, this.injector = i, this.preloadingStrategy = o, this.loader = s;
        }
        setUpPreloading() {
          this.subscription = this.router.events.pipe(cn(n => n instanceof Zn), Cn(() => this.preload())).subscribe(() => {});
        }
        preload() {
          return this.processRoutes(this.injector, this.router.config);
        }
        ngOnDestroy() {
          this.subscription && this.subscription.unsubscribe();
        }
        processRoutes(n, r) {
          const i = [];
          for (const o of r) {
            o.providers && !o._injector && (o._injector = Es(o.providers, n, `Route: ${o.path}`));
            const s = o._injector ?? n,
              a = o._loadedInjector ?? s;
            (o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad || o.loadComponent && !o._loadedComponent) && i.push(this.preloadConfig(s, o)), (o.children || o._loadedRoutes) && i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
          }
          return Re(i).pipe(Jn());
        }
        preloadConfig(n, r) {
          return this.preloadingStrategy.preload(r, () => {
            let i;
            i = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : A(null);
            const o = i.pipe(ke(s => null === s ? A(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ?? n, s.routes))));
            return r.loadComponent && !r._loadedComponent ? Re([o, this.loader.loadComponent(r)]).pipe(Jn()) : o;
          });
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(dt), x($m), x(Ut), x(SD), x(rd));
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac,
        providedIn: "root"
      }), e;
    })();
    const sd = new T("");
    let MD = (() => {
      class e {
        constructor(n, r, i, o, s = {}) {
          this.urlSerializer = n, this.transitions = r, this.viewportScroller = i, this.zone = o, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled", s.anchorScrolling = s.anchorScrolling || "disabled";
        }
        init() {
          "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents();
        }
        createScrollEvents() {
          return this.transitions.events.subscribe(n => {
            n instanceof Bl ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = n.navigationTrigger, this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof Zn && (this.lastId = n.id, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment));
          });
        }
        consumeScrollEvents() {
          return this.transitions.events.subscribe(n => {
            n instanceof Kv && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]));
          });
        }
        scheduleScrollEvent(n, r) {
          this.zone.runOutsideAngular(() => {
            setTimeout(() => {
              this.zone.run(() => {
                this.transitions.events.next(new Kv(n, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r));
              });
            }, 0);
          });
        }
        ngOnDestroy() {
          this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe();
        }
      }
      return e.ɵfac = function (n) {
        !function Zh() {
          throw new Error("invalid");
        }();
      }, e.ɵprov = R({
        token: e,
        factory: e.ɵfac
      }), e;
    })();
    var ft = (() => ((ft = ft || {})[ft.COMPLETE = 0] = "COMPLETE", ft[ft.FAILED = 1] = "FAILED", ft[ft.REDIRECTING = 2] = "REDIRECTING", ft))();
    const Xr = !1;
    function Mn(e, t) {
      return {
        ɵkind: e,
        ɵproviders: t
      };
    }
    const ad = new T("", {
      providedIn: "root",
      factory: () => !1
    });
    function TD() {
      const e = q(tn);
      return t => {
        const n = e.get(Rs);
        if (t !== n.components[0]) return;
        const r = e.get(dt),
          i = e.get(AD);
        1 === e.get(ud) && r.initialNavigation(), e.get(RD, null, k.Optional)?.setUpPreloading(), e.get(sd, null, k.Optional)?.init(), r.resetRootComponentType(n.componentTypes[0]), i.closed || (i.next(), i.unsubscribe());
      };
    }
    const AD = new T(Xr ? "bootstrap done indicator" : "", {
        factory: () => new Nt()
      }),
      ud = new T(Xr ? "initial navigation" : "", {
        providedIn: "root",
        factory: () => 1
      });
    function fP() {
      let e = [];
      return e = Xr ? [{
        provide: ns,
        multi: !0,
        useFactory: () => {
          const t = q(dt);
          return () => t.events.subscribe(n => {
            console.group?.(`Router Event: ${n.constructor.name}`), console.log(function jA(e) {
              if (!("type" in e)) return `Unknown Router Event: ${e.constructor.name}`;
              switch (e.type) {
                case 14:
                  return `ActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                case 13:
                  return `ActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                case 12:
                  return `ChildActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                case 11:
                  return `ChildActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                case 8:
                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                case 7:
                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                case 2:
                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                case 16:
                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                case 1:
                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                case 3:
                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                case 0:
                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                case 6:
                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                case 5:
                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                case 10:
                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                case 9:
                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                case 4:
                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                case 15:
                  return `Scroll(anchor: '${e.anchor}', position: '${e.position ? `${e.position[0]}, ${e.position[1]}` : null}')`;
              }
            }(n)), console.log(n), console.groupEnd?.();
          });
        }
      }] : [], Mn(1, e);
    }
    const RD = new T(Xr ? "router preloader" : "");
    function hP(e) {
      return Mn(0, [{
        provide: RD,
        useExisting: aP
      }, {
        provide: SD,
        useExisting: e
      }]);
    }
    const lo = !1,
      PD = new T(lo ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"),
      pP = [el, {
        provide: Xi,
        useClass: kl
      }, dt, io, {
        provide: Qn,
        useFactory: function xD(e) {
          return e.routerState.root;
        },
        deps: [dt]
      }, rd, lo ? {
        provide: ad,
        useValue: !0
      } : []];
    function gP() {
      return new qm("Router", dt);
    }
    let mP = (() => {
      class e {
        constructor(n) {}
        static forRoot(n, r) {
          return {
            ngModule: e,
            providers: [pP, lo && r?.enableTracing ? fP().ɵproviders : [], {
              provide: Qr,
              multi: !0,
              useValue: n
            }, {
              provide: PD,
              useFactory: wP,
              deps: [[dt, new gi(), new mi()]]
            }, {
              provide: wa,
              useValue: r || {}
            }, r?.useHash ? {
              provide: Gn,
              useClass: PM
            } : {
              provide: Gn,
              useClass: my
            }, {
              provide: sd,
              useFactory: () => {
                const e = q(Zx),
                  t = q(ye),
                  n = q(wa),
                  r = q(Da),
                  i = q(Xi);
                return n.scrollOffset && e.setOffset(n.scrollOffset), new MD(i, r, e, t, n);
              }
            }, r?.preloadingStrategy ? hP(r.preloadingStrategy).ɵproviders : [], {
              provide: qm,
              multi: !0,
              useFactory: gP
            }, r?.initialNavigation ? CP(r) : [], [{
              provide: OD,
              useFactory: TD
            }, {
              provide: Wm,
              multi: !0,
              useExisting: OD
            }]]
          };
        }
        static forChild(n) {
          return {
            ngModule: e,
            providers: [{
              provide: Qr,
              multi: !0,
              useValue: n
            }]
          };
        }
      }
      return e.ɵfac = function (n) {
        return new (n || e)(x(PD, 8));
      }, e.ɵmod = An({
        type: e
      }), e.ɵinj = pn({
        imports: [Zl]
      }), e;
    })();
    function wP(e) {
      if (lo && e) throw new _(4007, "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.");
      return "guarded";
    }
    function CP(e) {
      return ["disabled" === e.initialNavigation ? Mn(3, [{
        provide: xs,
        multi: !0,
        useFactory: () => {
          const t = q(dt);
          return () => {
            t.setUpLocationChangeListener();
          };
        }
      }, {
        provide: ud,
        useValue: 2
      }]).ɵproviders : [], "enabledBlocking" === e.initialNavigation ? Mn(2, [{
        provide: ud,
        useValue: 0
      }, {
        provide: xs,
        multi: !0,
        deps: [tn],
        useFactory: t => {
          const n = t.get(AM, Promise.resolve());
          return () => n.then(() => new Promise(r => {
            const i = t.get(dt),
              o = t.get(AD);
            (function uP(e, t) {
              e.events.pipe(cn(n => n instanceof Zn || n instanceof ua || n instanceof Vl || n instanceof ca), j(n => n instanceof Zn || n instanceof ca ? ft.COMPLETE : n instanceof ua && (0 === n.code || 1 === n.code) ? ft.REDIRECTING : ft.FAILED), cn(n => n !== ft.REDIRECTING), Yi(1)).subscribe(() => {
                t();
              });
            })(i, () => {
              r(!0);
            }), t.get(Da).afterPreactivation = () => (r(!0), o.closed ? A(void 0) : o), i.initialNavigation();
          }));
        }
      }]).ɵproviders : []];
    }
    const OD = new T(lo ? "Router Initializer" : "");
    let bP = (() => {
        const t = class {
          constructor(r) {
            this.http = r, this.verwijderdeWedstrijden = [], this.programmaUrl = "https://data.sportlink.com/programma?uit=NEE", this.uitslagenUrl = "https://data.sportlink.com/uitslagen?uit=NEE";
          }
          getProgramma(r) {
            return this.http.get(this.programmaUrl + "&aantaldagen=" + r).pipe(Ae(i => i.forEach(o => {
              o.kast = o.kleedkamerthuisteam.indexOf("A") > 0 || o.kleedkamerthuisteam.indexOf("B") > 0 || o.kleedkameruitteam.indexOf("A") > 0 || o.kleedkameruitteam.indexOf("B") > 0, o.isGestart = new Date(o.wedstrijddatum) <= new Date();
            })), Ae(i => i.forEach(o => {
              o.afgelast = o.status?.startsWith("Afgelast");
            })), j(i => i.sort(this.sortWedstrijd)));
          }
          getUitslagen(r) {
            return this.http.get(this.uitslagenUrl + "&aantaldagen=" + r);
          }
          sortWedstrijd(r, i) {
            const o = new Date(),
              s = new Date(r.wedstrijddatum),
              a = new Date(i.wedstrijddatum),
              u = s <= o;
            if (u !== a <= o) return u ? 1 : -1;
            if (s < a) return -1;
            if (s > a) return 1;
            const l = r.veld && "" !== r.veld.trim(),
              d = i.veld && "" !== i.veld.trim();
            if (l && !d) return -1;
            if (!l && d) return 1;
            if (l && d) {
              if (r.veld < i.veld) return -1;
              if (r.veld > i.veld) return 1;
            }
            return r.thuisteam < i.thuisteam ? -1 : r.thuisteam > i.thuisteam ? 1 : 0;
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)(x(fv));
        }, t.ɵprov = R({
          token: t,
          factory: t.ɵfac,
          providedIn: "root"
        }), e;
      })(),
      EP = (() => {
        const t = class {
          transform(r, i) {
            return "string" == typeof r ? r.replace("Kleedkamer ", "") : r;
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)();
        }, t.ɵpipe = Pe({
          name: "kleedkamer",
          type: t,
          pure: !0
        }), e;
      })(),
      IP = (() => {
        const t = class {
          transform(r, i) {
            if ("string" == typeof r) {
              const o = r.match(/veld\s*([\w\d ]+)/i);
              return o ? o[1].trim() : r;
            }
            return r;
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)();
        }, t.ɵpipe = Pe({
          name: "veld",
          type: t,
          pure: !0
        }), e;
      })(),
      SP = (() => {
        const t = class {
          transform(r) {
            if (!r) return "";
            const i = r.toLowerCase();
            return i.includes("kunst") ? "Kunstgras" : i.includes("gras") ? "Natuurgras" : "";
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)();
        }, t.ɵpipe = Pe({
          name: "veldType",
          type: t,
          pure: !0
        }), e;
      })();
    function MP(e, t) {
      if (1 & e && (C(0, "div", 15), M(1), w()), 2 & e) {
        const n = be();
        S(1), le(n.wedstrijd.datum);
      }
    }
    function xP(e, t) {
      1 & e && (C(0, "span", 16), M(1, "\u{1f511}"), w());
    }
    function TP(e, t) {
      if (1 & e && (C(0, "img", 17), Un("error", function (r) {
        return r.target.style.display = "none";
      }), w()), 2 & e) {
        const n = be();
        B("src", n.wedstrijd.thuisteamlogo, vr)("alt", n.wedstrijd.thuisteam + " logo");
      }
    }
    function AP(e, t) {
      if (1 & e && (C(0, "img", 17), Un("error", function (r) {
        return r.target.style.display = "none";
      }), w()), 2 & e) {
        const n = be();
        B("src", n.wedstrijd.uitteamlogo, vr)("alt", n.wedstrijd.uitteam + " logo");
      }
    }
    function RP(e, t) {
      1 & e && (C(0, "span", 16), M(1, "\u{1f511}"), w());
    }
    let PP = (() => {
      const t = class {
        constructor() {
          this.sleutelMatch = !1, this.numberOfDays = 0;
        }
        hasKast(r) {
          return !!r && /[a-zA-Z]/.test(r);
        }
      };
      let e = t;
      return t.ɵfac = function (i) {
        return new (i || t)();
      }, t.ɵcmp = Tn({
        type: t,
        selectors: [["app-wedstrijd-row"]],
        inputs: {
          wedstrijd: "wedstrijd",
          sleutelMatch: "sleutelMatch",
          numberOfDays: "numberOfDays",
          index: "index"
        },
        decls: 32,
        vars: 29,
        consts: [[1, "grid-row"], [1, "grid-item", "time"], ["class", "date", 4, "ngIf"], [1, "time-only"], [1, "grid-item", "kleedkamer"], [1, "kleedkamer-value"], ["class", "kast-icoon", 4, "ngIf"], [1, "grid-item", "team", "home-team"], [1, "team-name"], ["class", "team-logo", 3, "src", "alt", "error", 4, "ngIf"], [1, "grid-item", "team", "away-team"], [1, "grid-item", "veld"], [1, "veld-type"], [1, "veld-nummer"], [1, "grid-item", "scheids"], [1, "date"], [1, "kast-icoon"], [1, "team-logo", 3, "src", "alt", "error"]],
        template: function (i, o) {
          1 & i && (C(0, "div", 0)(1, "div", 1), Q(2, MP, 2, 1, "div", 2), C(3, "div", 3), M(4), w()(), C(5, "div", 4)(6, "span", 5), M(7), Ke(8, "kleedkamer"), w(), Q(9, xP, 2, 0, "span", 6), w(), C(10, "div", 7)(11, "span", 8), M(12), w(), Q(13, TP, 1, 2, "img", 9), w(), C(14, "div", 10), Q(15, AP, 1, 2, "img", 9), C(16, "span", 8), M(17), w()(), C(18, "div", 4)(19, "span", 5), M(20), Ke(21, "kleedkamer"), w(), Q(22, RP, 2, 0, "span", 6), w(), C(23, "div", 11)(24, "div", 12), M(25), Ke(26, "veldType"), w(), C(27, "div", 13), M(28), Ke(29, "veld"), w()(), C(30, "div", 14), M(31), w()()), 2 & i && (vs("afgelast", o.wedstrijd.afgelast)("gestart", o.wedstrijd.isGestart)("odd-row", o.index % 2 == 0)("even-row", o.index % 2 == 1), S(2), B("ngIf", o.numberOfDays > 0), S(2), le(o.wedstrijd.aanvangstijd), S(3), le(Ye(8, 21, o.wedstrijd.kleedkamerthuisteam)), S(2), B("ngIf", o.hasKast(o.wedstrijd.kleedkamerthuisteam)), S(3), le(o.wedstrijd.thuisteam), S(1), B("ngIf", o.wedstrijd.thuisteamlogo), S(2), B("ngIf", o.wedstrijd.uitteamlogo), S(2), le(o.wedstrijd.uitteam), S(3), le(Ye(21, 23, o.wedstrijd.kleedkameruitteam)), S(2), B("ngIf", o.hasKast(o.wedstrijd.kleedkameruitteam)), S(3), le(Ye(26, 25, o.wedstrijd.veld)), S(3), lt(" ", o.wedstrijd.afgelast ? "AFGELAST" : Ye(29, 27, o.wedstrijd.veld), " "), S(3), le(o.wedstrijd.scheidsrechter));
        },
        dependencies: [Br, EP, IP, SP],
        styles: [".veld-type[_ngcontent-%COMP%]{font-size:10px;letter-spacing:1px;font-weight:500;text-transform:uppercase;line-height:1.05}.grid-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:75px 110px 2fr 2fr 110px 80px 1fr;transition:background-color .2s ease;min-height:46px;border-bottom:1.5px solid #e0e0e0}.grid-row[_ngcontent-%COMP%]:last-child{border-bottom:none}.grid-row.afgelast[_ngcontent-%COMP%]{background:rgb(255,240,240)}.grid-row.gestart[_ngcontent-%COMP%]{color:#388e3c;font-style:italic}.grid-row.odd-row[_ngcontent-%COMP%]{background:#fff}.grid-row.even-row[_ngcontent-%COMP%]{background:#f3f3f3}.grid-item.veld[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#228b22;color:#e0ffe0;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:4px;text-align:center;border-radius:0;box-sizing:border-box;font-size:20px;line-height:1.05}.grid-item.scheids[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;color:#222;font-weight:500;background:none;box-sizing:border-box;font-size:18px;line-height:1.1}.grid-item.time[_ngcontent-%COMP%]{font-weight:700;color:#000;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;text-align:center;height:100%;font-size:20px;line-height:1.05}.grid-item.time[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-weight:500;color:#000}.grid-item.time[_ngcontent-%COMP%]   .time-only[_ngcontent-%COMP%]{font-weight:700;color:#000;letter-spacing:1px}.grid-item.kleedkamer[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center;background:#222;color:#fff;font-weight:700;padding:8px 0;text-align:center;border-radius:0;gap:6px}.grid-item.kleedkamer[_ngcontent-%COMP%]   .kleedkamer-value[_ngcontent-%COMP%]{font-weight:700;color:#fff;letter-spacing:1px;line-height:1.1;font-size:20px}.grid-item.kleedkamer[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], .grid-item.kleedkamer[_ngcontent-%COMP%]   .kast-icoon[_ngcontent-%COMP%]{color:#fff;font-size:20px}.grid-item.team[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:8px;padding:0 6px;min-width:0}.grid-item.team.home-team[_ngcontent-%COMP%]{flex-direction:row;justify-content:flex-end}.grid-item.team.home-team[_ngcontent-%COMP%]   .team-logo[_ngcontent-%COMP%]{margin-left:8px;margin-right:0;order:2}.grid-item.team.home-team[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]{text-align:right;order:1;margin-left:8px;margin-right:0}.grid-item.team.away-team[_ngcontent-%COMP%]{flex-direction:row;justify-content:flex-start}.grid-item.team.away-team[_ngcontent-%COMP%]   .team-logo[_ngcontent-%COMP%]{margin-right:8px;margin-left:0;order:1}.grid-item.team.away-team[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]{text-align:left;order:2;margin-left:0;margin-right:0}.grid-item.team[_ngcontent-%COMP%]   .team-logo[_ngcontent-%COMP%]{width:24px;height:24px;object-fit:contain;border-radius:0;display:inline-block;vertical-align:middle}.grid-item.team[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]{font-weight:700;color:#000;font-size:24px;line-height:1.1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;vertical-align:middle;max-width:100%}"]
      }), e;
    })();
    function OP(e, t) {
      if (1 & e && (Nr(0), M(1), Fr()), 2 & e) {
        const n = be();
        S(1), lt("", n.wedstrijd.datum, " ");
      }
    }
    function NP(e, t) {
      if (1 & e && (C(0, "img", 14), Un("error", function (r) {
        return r.target.style.display = "none";
      }), w()), 2 & e) {
        const n = be();
        B("src", n.wedstrijd.thuisteamlogo, vr)("alt", n.wedstrijd.thuisteam + " logo");
      }
    }
    function FP(e, t) {
      1 & e && (Nr(0), M(1, "\u{1f511}"), Fr());
    }
    function kP(e, t) {
      if (1 & e && (C(0, "img", 14), Un("error", function (r) {
        return r.target.style.display = "none";
      }), w()), 2 & e) {
        const n = be();
        B("src", n.wedstrijd.uitteamlogo, vr)("alt", n.wedstrijd.uitteam + " logo");
      }
    }
    function LP(e, t) {
      1 & e && (Nr(0), M(1, "\u{1f511}"), Fr());
    }
    function jP(e, t) {
      if (1 & e && (C(0, "div", 19)(1, "span", 20), function rf() {
        U.lFrame.currentNamespace = Hd;
      }(), C(2, "svg", 21), We(3, "rect", 22)(4, "circle", 23)(5, "rect", 24)(6, "rect", 25), w()(), function sf() {
        !function rC() {
          U.lFrame.currentNamespace = null;
        }();
      }(), C(7, "span"), M(8), w()()), 2 & e) {
        const n = be(2);
        S(8), le(n.wedstrijd.scheidsrechter);
      }
    }
    function $P(e, t) {
      if (1 & e && (C(0, "div", 26)(1, "span"), M(2), w()()), 2 & e) {
        const n = be(2);
        S(2), le(n.wedstrijd.kleedkamerscheidsrechter);
      }
    }
    function UP(e, t) {
      if (1 & e && (C(0, "div", 15)(1, "div", 16), Q(2, jP, 9, 1, "div", 17), Q(3, $P, 3, 1, "div", 18), w()()), 2 & e) {
        const n = be();
        S(2), B("ngIf", n.wedstrijd.scheidsrechter), S(1), B("ngIf", n.wedstrijd.kleedkamerscheidsrechter);
      }
    }
    let HP = (() => {
      const t = class {
        constructor() {
          this.sleutelMatch = !1, this.numberOfDays = 0;
        }
        hasKast(r) {
          return !!r && /[a-zA-Z]/.test(r);
        }
      };
      let e = t;
      return t.ɵfac = function (i) {
        return new (i || t)();
      }, t.ɵcmp = Tn({
        type: t,
        selectors: [["app-wedstrijd-card"]],
        inputs: {
          wedstrijd: "wedstrijd",
          sleutelMatch: "sleutelMatch",
          numberOfDays: "numberOfDays"
        },
        decls: 29,
        vars: 16,
        consts: [[1, "match-card"], [1, "match-header"], [1, "match-time"], [4, "ngIf"], [1, "match-field"], [1, "teams-simple-layout"], [1, "team-row", "home-team-row"], [1, "team-info"], ["class", "team-logo", 3, "src", "alt", "error", 4, "ngIf"], [1, "team-name"], [1, "team-label"], [1, "kleedkamer-badge"], [1, "team-row", "away-team-row"], ["class", "match-details", 4, "ngIf"], [1, "team-logo", 3, "src", "alt", "error"], [1, "match-details"], [1, "referee-info"], ["class", "referee", 4, "ngIf"], ["class", "referee-room", 4, "ngIf"], [1, "referee"], [1, "referee-icon", 2, "display", "inline-flex", "align-items", "center", "vertical-align", "middle"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 2, "margin-right", "2px"], ["x", "2", "y", "10", "width", "12", "height", "4", "rx", "2", "fill", "#b50102"], ["cx", "17", "cy", "12", "r", "3", "fill", "#b50102", "stroke", "#fff", "stroke-width", "1.5"], ["x", "4", "y", "7", "width", "3", "height", "2", "rx", "1", "fill", "#b50102"], ["x", "4", "y", "15", "width", "3", "height", "2", "rx", "1", "fill", "#b50102"], [1, "referee-room"]],
        template: function (i, o) {
          1 & i && (C(0, "div", 0)(1, "div", 1)(2, "div", 2), Q(3, OP, 2, 1, "ng-container", 3), M(4), w(), C(5, "div", 4), M(6), w()(), C(7, "div", 5)(8, "div", 6)(9, "div", 7), Q(10, NP, 1, 2, "img", 8), C(11, "span", 9), M(12), w(), C(13, "span", 10), M(14, "Thuis"), w()(), C(15, "div", 11), M(16), Q(17, FP, 2, 0, "ng-container", 3), w()(), C(18, "div", 12)(19, "div", 7), Q(20, kP, 1, 2, "img", 8), C(21, "span", 9), M(22), w(), C(23, "span", 10), M(24, "Uit"), w()(), C(25, "div", 11), M(26), Q(27, LP, 2, 0, "ng-container", 3), w()()(), Q(28, UP, 4, 2, "div", 13), w()), 2 & i && (vs("afgelast", o.wedstrijd.afgelast)("gestart", o.wedstrijd.isGestart), S(3), B("ngIf", o.numberOfDays > 0), S(1), lt("", o.wedstrijd.aanvangstijd, " "), S(2), le(o.wedstrijd.veld), S(4), B("ngIf", o.wedstrijd.thuisteamlogo), S(2), le(o.wedstrijd.thuisteam), S(4), lt(" ", o.wedstrijd.kleedkamerthuisteam, " "), S(1), B("ngIf", o.hasKast(o.wedstrijd.kleedkamerthuisteam)), S(3), B("ngIf", o.wedstrijd.uitteamlogo), S(2), le(o.wedstrijd.uitteam), S(4), lt(" ", o.wedstrijd.kleedkameruitteam, " "), S(1), B("ngIf", o.hasKast(o.wedstrijd.kleedkameruitteam)), S(1), B("ngIf", !o.wedstrijd.afgelast && (o.wedstrijd.scheidsrechter || o.wedstrijd.kleedkamerscheidsrechter)));
        },
        dependencies: [Br],
        styles: [".match-card[_ngcontent-%COMP%]{background:#fff;border-radius:12px;box-shadow:0 2px 8px #00000012;margin-bottom:16px;padding:14px 16px 10px;display:flex;flex-direction:column;gap:10px;border:1.5px solid #ececec;position:relative;transition:box-shadow .2s}.match-card.afgelast[_ngcontent-%COMP%]{background:#fff0f0}.match-card.gestart[_ngcontent-%COMP%]{background:#f0fff0}.match-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.match-header[_ngcontent-%COMP%]   .match-time[_ngcontent-%COMP%]{font-size:1.3em;font-weight:700;color:#b50102;letter-spacing:1px}.match-header[_ngcontent-%COMP%]   .match-field[_ngcontent-%COMP%]{background:#228b22;color:#fff;font-size:1.1em;font-weight:700;border-radius:6px;padding:2px 12px;min-width:40px;text-align:center}.teams-simple-layout[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.team-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 0 0 2px}.team-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.team-info[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]{font-weight:600;font-size:1.08em;color:#222;margin-right:2px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.team-info[_ngcontent-%COMP%]   .team-label[_ngcontent-%COMP%]{font-size:.85em;color:#888;margin-left:2px;font-weight:400}@media (max-width: 449px){.team-info[_ngcontent-%COMP%]   .team-label[_ngcontent-%COMP%]{display:none}}.kleedkamer-badge[_ngcontent-%COMP%]{background:#222;color:#fff;font-size:1.1em;font-weight:700;border-radius:7px;padding:3px 12px;min-width:32px;text-align:center;letter-spacing:1px}.match-details[_ngcontent-%COMP%]{margin-top:6px;padding-top:6px;border-top:1px solid #eee;display:flex;flex-direction:row;gap:12px}.match-details[_ngcontent-%COMP%]   .referee-info[_ngcontent-%COMP%]{display:flex;flex-direction:row;gap:10px;align-items:center}.match-details[_ngcontent-%COMP%]   .referee-info[_ngcontent-%COMP%]   .referee[_ngcontent-%COMP%]{color:#b50102;font-weight:600;font-size:1em;display:flex;align-items:center;gap:4px}.match-details[_ngcontent-%COMP%]   .referee-info[_ngcontent-%COMP%]   .referee-icon[_ngcontent-%COMP%]{font-size:1.1em;margin-right:2px}.match-details[_ngcontent-%COMP%]   .referee-info[_ngcontent-%COMP%]   .referee-room[_ngcontent-%COMP%]{background:#228b22;color:#fff;border-radius:6px;padding:2px 10px;font-size:.98em;font-weight:600}.team-logo[_ngcontent-%COMP%]{width:28px;height:28px;object-fit:contain;border-radius:4px;display:inline-block;vertical-align:middle;background:#fff;box-shadow:0 1px 4px #00000014;margin-right:8px}"]
      }), e;
    })();
    function BP(e, t) {
      1 & e && (C(0, "div", 8), M(1, " Nog Te Spelen "), w());
    }
    function VP(e, t) {
      if (1 & e && We(0, "app-wedstrijd-card", 9), 2 & e) {
        const n = t.$implicit,
          r = be(2);
        B("wedstrijd", n)("sleutelMatch", r.sleutelMatch)("numberOfDays", r.numberOfDays);
      }
    }
    function zP(e, t) {
      1 & e && (C(0, "div", 8), M(1, " Nu Bezig "), w());
    }
    function GP(e, t) {
      if (1 & e && We(0, "app-wedstrijd-card", 9), 2 & e) {
        const n = t.$implicit,
          r = be(2);
        B("wedstrijd", n)("sleutelMatch", r.sleutelMatch)("numberOfDays", r.numberOfDays);
      }
    }
    function WP(e, t) {
      if (1 & e && We(0, "app-wedstrijd-row", 19), 2 & e) {
        const n = t.$implicit,
          r = t.index,
          i = be(3);
        B("wedstrijd", n)("sleutelMatch", i.sleutelMatch)("numberOfDays", i.numberOfDays)("index", r);
      }
    }
    function qP(e, t) {
      if (1 & e && (C(0, "div", 10)(1, "div", 8), M(2, "Nog Te Spelen"), w(), C(3, "div", 11)(4, "div", 12), M(5, "Tijd"), w(), C(6, "div", 13), M(7), w(), C(8, "div", 14), M(9, "Thuis"), w(), C(10, "div", 15), M(11, "Uit"), w(), C(12, "div", 13), M(13), w(), C(14, "div", 16), M(15, "VELD"), w(), C(16, "div", 17), M(17, "Scheidsrechter"), w()(), Q(18, WP, 1, 4, "app-wedstrijd-row", 18), Ke(19, "async"), w()), 2 & e) {
        const n = be(2);
        S(7), lt(" ", n.sleutelMatch ? "Kl+K" : "Kl", " "), S(6), lt(" ", n.sleutelMatch ? "Kl+K" : "Kl", " "), S(5), B("ngForOf", Ye(19, 4, n.toekomstigeWedstrijden$))("ngForTrackBy", n.trackByWedstrijdId);
      }
    }
    function KP(e, t) {
      if (1 & e && We(0, "app-wedstrijd-row", 19), 2 & e) {
        const n = t.$implicit,
          r = t.index,
          i = be(3);
        B("wedstrijd", n)("sleutelMatch", i.sleutelMatch)("numberOfDays", i.numberOfDays)("index", r);
      }
    }
    function YP(e, t) {
      if (1 & e && (C(0, "div", 10)(1, "div", 8), M(2, "Nu Bezig"), w(), C(3, "div", 11)(4, "div", 12), M(5, "Tijd"), w(), C(6, "div", 13), M(7), w(), C(8, "div", 14), M(9, "Thuis"), w(), C(10, "div", 15), M(11, "Uit"), w(), C(12, "div", 13), M(13), w(), C(14, "div", 16), M(15, "VELD"), w(), C(16, "div", 17), M(17, "Scheidsrechter"), w()(), Q(18, KP, 1, 4, "app-wedstrijd-row", 18), Ke(19, "async"), w()), 2 & e) {
        const n = be(2);
        S(7), lt(" ", n.sleutelMatch ? "Kl+K" : "Kl", " "), S(6), lt(" ", n.sleutelMatch ? "Kl+K" : "Kl", " "), S(5), B("ngForOf", Ye(19, 4, n.bezigeWedstrijden$))("ngForTrackBy", n.trackByWedstrijdId);
      }
    }
    function ZP(e, t) {
      1 & e && (C(0, "div", 20), M(1, " \u{1f511}= Spullen tijdens de wedstrijd opbergen in de kast. Sleutel is tegen een borg verkrijgbaar bij het wedstrijdsecretariaat. "), w());
    }
    function QP(e, t) {
      if (1 & e && (C(0, "div", 1)(1, "div", 2), Q(2, BP, 2, 0, "div", 3), Ke(3, "async"), Q(4, VP, 1, 3, "app-wedstrijd-card", 4), Ke(5, "async"), Q(6, zP, 2, 0, "div", 3), Ke(7, "async"), Q(8, GP, 1, 3, "app-wedstrijd-card", 4), Ke(9, "async"), w(), C(10, "div", 5), Q(11, qP, 20, 6, "div", 6), Ke(12, "async"), Q(13, YP, 20, 6, "div", 6), Ke(14, "async"), w(), Q(15, ZP, 2, 0, "div", 7), w()), 2 & e) {
        const n = be();
        let r, i, o, s;
        S(2), B("ngIf", (null == (r = Ye(3, 9, n.toekomstigeWedstrijden$)) ? null : r.length) > 0), S(2), B("ngForOf", Ye(5, 11, n.toekomstigeWedstrijden$))("ngForTrackBy", n.trackByWedstrijdId), S(2), B("ngIf", (null == (i = Ye(7, 13, n.bezigeWedstrijden$)) ? null : i.length) > 0), S(2), B("ngForOf", Ye(9, 15, n.bezigeWedstrijden$))("ngForTrackBy", n.trackByWedstrijdId), S(3), B("ngIf", (null == (o = Ye(12, 17, n.toekomstigeWedstrijden$)) ? null : o.length) > 0), S(2), B("ngIf", (null == (s = Ye(14, 19, n.bezigeWedstrijden$)) ? null : s.length) > 0), S(2), B("ngIf", n.sleutelMatch);
      }
    }
    let XP = (() => {
      const t = class {
        constructor() {
          this.numberOfDays = 0, this.sleutelMatch = !1, this.isLoading = !1;
        }
        ngOnInit() {
          this.programma$ && (this.hasKleedkamerScheidsrechter$ = this.programma$.pipe(j(r => r.some(i => !!i.kleedkamerscheidsrechter))), this.bezigeWedstrijden$ = this.programma$.pipe(j(r => r.filter(i => i.isGestart).sort((i, o) => {
            const s = new Date(o.wedstrijddatum).getTime() - new Date(i.wedstrijddatum).getTime();
            return 0 !== s ? s : i.veld.localeCompare(o.veld);
          }))), this.toekomstigeWedstrijden$ = this.programma$.pipe(j(r => r.filter(i => !i.isGestart).sort((i, o) => {
            const s = new Date(i.wedstrijddatum).getTime() - new Date(o.wedstrijddatum).getTime();
            return 0 !== s ? s : i.veld.localeCompare(o.veld);
          }))));
        }
        trackByWedstrijdId(r, i) {
          return i.wedstrijdcode;
        }
      };
      let e = t;
      return t.ɵfac = function (i) {
        return new (i || t)();
      }, t.ɵcmp = Tn({
        type: t,
        selectors: [["app-programma"]],
        inputs: {
          programma$: "programma$",
          numberOfDays: "numberOfDays",
          sleutelMatch: "sleutelMatch",
          isLoading: "isLoading"
        },
        decls: 1,
        vars: 1,
        consts: [["class", "programma-container", 4, "ngIf"], [1, "programma-container"], [1, "mobile-cards"], ["class", "section-title", 4, "ngIf"], [3, "wedstrijd", "sleutelMatch", "numberOfDays", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "desktop-grid"], ["class", "section-container", 4, "ngIf"], ["class", "sleutel-footer", 4, "ngIf"], [1, "section-title"], [3, "wedstrijd", "sleutelMatch", "numberOfDays"], [1, "section-container"], [1, "grid-header"], [1, "header-item", "time"], [1, "header-item", "kleedkamer"], [1, "header-item", "team", "thuis"], [1, "header-item", "team"], [1, "header-item", "veld"], [1, "header-item", "scheids"], [3, "wedstrijd", "sleutelMatch", "numberOfDays", "index", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "wedstrijd", "sleutelMatch", "numberOfDays", "index"], [1, "sleutel-footer"]],
        template: function (i, o) {
          1 & i && Q(0, QP, 16, 21, "div", 0), 2 & i && B("ngIf", !o.isLoading);
        },
        dependencies: [dl, Br, PP, HP, pl],
        styles: [".loading-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;text-align:center}.loading-bar[_ngcontent-%COMP%]{width:300px;height:4px;background:#e0e0e0;border-radius:2px;overflow:hidden;margin-bottom:16px}@media (max-width: 1199px){.loading-bar[_ngcontent-%COMP%]{width:250px}}.loading-progress[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,#b50102 0%,#d32f2f 50%,#b50102 100%);border-radius:2px;animation:_ngcontent-%COMP%_loading-animation 2s ease-in-out infinite}.loading-text[_ngcontent-%COMP%]{color:#b50102;font-weight:600;font-size:1rem;text-transform:uppercase;letter-spacing:1px}@keyframes _ngcontent-%COMP%_loading-animation{0%{width:0%;margin-left:0%}50%{width:75%;margin-left:12.5%}to{width:0%;margin-left:100%}}.section-container[_ngcontent-%COMP%]{margin-bottom:6px}.section-container[_ngcontent-%COMP%]:last-child{margin-bottom:0}.section-title[_ngcontent-%COMP%]{font-size:.9rem;font-weight:700;background:#fff;color:#b50102;text-transform:uppercase;padding:2px 10px;margin:0;border-radius:3px 3px 0 0;text-align:left;display:inline-block;border:2px solid #b50102;border-bottom:none}@media (max-width: 1199px){.section-title[_ngcontent-%COMP%]{font-size:.8rem;padding:2px 10px;margin:4px 16px 2px;border-radius:3px;border-bottom:2px solid #b50102}}.grid-message[_ngcontent-%COMP%]{background:#b50102;color:#fff;font-weight:600;border-radius:0 0 3px 3px;padding:6px 12px;margin:0 0 6px;text-transform:uppercase;box-shadow:0 1px 3px #0000001a;text-align:center;font-size:.85rem}@media (max-width: 1199px){.grid-message[_ngcontent-%COMP%]{margin:3px 16px 6px;padding:6px 12px;font-size:.75rem;border-radius:3px}}.sleutel-footer[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;right:0;background:#b50102;color:#fff;font-weight:600;padding:12px 40px;text-transform:uppercase;box-shadow:0 -2px 8px #0003;text-align:center;font-size:.9rem;z-index:100}@media (max-width: 1199px){.sleutel-footer[_ngcontent-%COMP%]{display:none}}.mobile-cards[_ngcontent-%COMP%]{display:block;padding:10px;gap:8px}@media (min-width: 1200px){.mobile-cards[_ngcontent-%COMP%]{display:none!important}.desktop-grid[_ngcontent-%COMP%]{display:block!important}}@media (max-width: 1199px){.desktop-grid[_ngcontent-%COMP%]{display:none!important}.mobile-cards[_ngcontent-%COMP%]{display:block!important}}.desktop-grid[_ngcontent-%COMP%]{display:none}@media (min-width: 1200px){.desktop-grid[_ngcontent-%COMP%]{display:block;width:100%;max-width:100vw;margin:0 auto;padding:0 40px 80px;overflow-x:auto;box-sizing:border-box}}.grid-header[_ngcontent-%COMP%]{display:grid;grid-template-columns:75px 110px 2fr 2fr 110px 80px 1fr;font-weight:700;background:#b50102;color:#fff;border-radius:0 8px 0 0;align-items:center;box-sizing:border-box;width:100%;text-transform:uppercase;margin-top:0}@media (max-width: 1199px){.grid-header[_ngcontent-%COMP%]{border-radius:8px 8px 0 0}}.header-item[_ngcontent-%COMP%]{padding:6px 4px;text-align:center;text-transform:uppercase}.header-item.team[_ngcontent-%COMP%]{text-align:left;padding-left:8px}.header-item.team.thuis[_ngcontent-%COMP%]{text-align:right;padding-left:0;padding-right:8px}.header-item.veld[_ngcontent-%COMP%], .header-item.scheids[_ngcontent-%COMP%], .header-item.scheids-kl[_ngcontent-%COMP%]{text-align:center}"]
      }), e;
    })();
    function JP(e, t) {
      if (1 & e && (C(0, "div", 10)(1, "div", 11)(2, "div", 12), M(3), w(), C(4, "div", 13), M(5), w()(), C(6, "div", 14)(7, "div", 15)(8, "div", 16), M(9, "THUIS"), w(), C(10, "div", 17)(11, "div", 18)(12, "span", 19), M(13), w()()()(), C(14, "div", 20)(15, "div", 16), M(16, "UIT"), w(), C(17, "div", 17)(18, "div", 18)(19, "span", 19), M(20), w()()()()()()), 2 & e) {
        const n = t.$implicit;
        S(3), le(n.aanvangstijd), S(2), le(n.uitslag), S(8), le(n.thuisteam), S(7), le(n.uitteam);
      }
    }
    function eO(e, t) {
      if (1 & e && (C(0, "tr")(1, "td", 6), M(2), w(), C(3, "td", 7)(4, "span", 19), M(5), w()(), C(6, "td", 8), M(7), w(), C(8, "td", 7)(9, "span", 19), M(10), w()()()), 2 & e) {
        const n = t.$implicit;
        S(2), le(n.aanvangstijd), S(3), le(n.thuisteam), S(2), le(n.uitslag), S(3), le(n.uitteam);
      }
    }
    function tO(e, t) {
      if (1 & e && (C(0, "div", 1)(1, "div", 2), Q(2, JP, 21, 4, "div", 3), Ke(3, "async"), w(), C(4, "div", 4)(5, "table", 5)(6, "thead")(7, "tr")(8, "th", 6), M(9, "Aanvang"), w(), C(10, "th", 7), M(11, "Jong Brabant"), w(), C(12, "th", 8), M(13, "Uitslag"), w(), C(14, "th", 7), M(15, "Gasten"), w()()(), C(16, "tbody"), Q(17, eO, 11, 4, "tr", 9), Ke(18, "async"), w()()()()), 2 & e) {
        const n = be();
        S(2), B("ngForOf", Ye(3, 4, n.uitslagen$))("ngForTrackBy", n.trackByUitslagId), S(15), B("ngForOf", Ye(18, 6, n.uitslagen$))("ngForTrackBy", n.trackByUitslagId);
      }
    }
    let nO = (() => {
      const t = class {
        constructor() {
          this.isLoading = !1;
        }
        ngOnInit() {}
        trackByUitslagId(r, i) {
          return i.wedstrijdcode;
        }
      };
      let e = t;
      return t.ɵfac = function (i) {
        return new (i || t)();
      }, t.ɵcmp = Tn({
        type: t,
        selectors: [["app-uitslagen"]],
        inputs: {
          uitslagen$: "uitslagen$",
          isLoading: "isLoading"
        },
        decls: 1,
        vars: 1,
        consts: [["class", "results-container", 4, "ngIf"], [1, "results-container"], [1, "mobile-cards"], ["class", "result-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "desktop-table"], [1, "compact-results-table"], [1, "time-col"], [1, "team-col"], [1, "score-col"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "result-card"], [1, "result-header"], [1, "match-time"], [1, "result-score"], [1, "teams-split-layout"], [1, "team-half", "home-half"], [1, "team-header"], [1, "team-content"], [1, "team-info"], [1, "team-name"], [1, "team-half", "away-half"]],
        template: function (i, o) {
          1 & i && Q(0, tO, 19, 8, "div", 0), 2 & i && B("ngIf", !o.isLoading);
        },
        dependencies: [dl, Br, pl],
        styles: [".mobile-cards[_ngcontent-%COMP%]{display:block;padding:10px;gap:8px}@media (min-width: 1200px){.mobile-cards[_ngcontent-%COMP%]{display:none}}.result-card[_ngcontent-%COMP%]{background:rgba(255,255,255,.95);border-radius:8px;margin-bottom:8px;box-shadow:0 2px 8px #00000026;overflow:hidden;border-left:4px solid #22c55e}.result-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:8px 12px 6px;border-bottom:1px solid #f0f0f0;font-size:12px}.match-time[_ngcontent-%COMP%]{font-weight:600;color:#22c55e;font-size:13px}.result-score[_ngcontent-%COMP%]{background:#22c55e;color:#fff;padding:4px 8px;border-radius:4px;font-weight:700;font-size:12px;text-align:center;min-width:50px}.teams-split-layout[_ngcontent-%COMP%]{display:flex;min-height:50px}.team-half[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;padding:8px;position:relative}.team-half.home-half[_ngcontent-%COMP%]{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,240,240,.9) 100%);border-right:2px solid #e0e0e0}.team-half.away-half[_ngcontent-%COMP%]{background:linear-gradient(135deg,rgba(245,245,245,.9) 0%,rgba(225,225,225,.95) 100%)}.team-header[_ngcontent-%COMP%]{font-size:9px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}.team-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;justify-content:center;gap:4px}.team-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;font-weight:600;font-size:13px;min-width:0;max-width:100%}.team-name[_ngcontent-%COMP%]{color:#3b3b3b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}.desktop-table[_ngcontent-%COMP%]{display:none}@media (min-width: 1200px){.desktop-table[_ngcontent-%COMP%]{display:block;overflow-x:auto;margin:0 20px}}.compact-results-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;background:rgba(255,255,255,.95);border-radius:8px;box-shadow:0 4px 12px #00000026;font-size:14px}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]{font-size:16px}}.compact-results-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#22c55e;color:#fff;padding:8px 6px;text-align:left;font-weight:600;font-size:13px}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:10px 8px;font-size:14px}}.compact-results-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{border-top-left-radius:8px}.compact-results-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child{border-top-right-radius:8px}.compact-results-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:6px;border-bottom:1px solid #f0f0f0;vertical-align:middle}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px}}.compact-results-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}.compact-results-table[_ngcontent-%COMP%]   .time-col[_ngcontent-%COMP%]{width:80px;font-weight:600;color:#22c55e;white-space:nowrap}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]   .time-col[_ngcontent-%COMP%]{width:100px}}.compact-results-table[_ngcontent-%COMP%]   .team-col[_ngcontent-%COMP%]{min-width:150px;max-width:250px}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]   .team-col[_ngcontent-%COMP%]{min-width:180px;max-width:280px}}.compact-results-table[_ngcontent-%COMP%]   .team-col[_ngcontent-%COMP%]   .team-name[_ngcontent-%COMP%]{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.compact-results-table[_ngcontent-%COMP%]   .score-col[_ngcontent-%COMP%]{width:80px;text-align:center;font-weight:700;font-size:14px;background:#22c55e;color:#fff}@media (min-width: 1400px){.compact-results-table[_ngcontent-%COMP%]   .score-col[_ngcontent-%COMP%]{width:100px;font-size:16px}}"]
      }), e;
    })();
    function rO(e, t) {
      1 & e && (C(0, "div", 11), M(1, " Kan programma niet ophalen. Controleer je internetverbinding.\n"), w());
    }
    function iO(e, t) {
      1 & e && (C(0, "div", 11), M(1, " Kan uitslagen niet ophalen. Controleer je internetverbinding.\n"), w());
    }
    function oO(e, t) {
      if (1 & e && (C(0, "div", 12), We(1, "app-programma", 13), w()), 2 & e) {
        const n = be();
        S(1), B("programma$", n.programma$)("numberOfDays", n.numberOfDays)("sleutelMatch", n.sleutelMatch)("isLoading", n.isLoadingProgramma);
      }
    }
    function sO(e, t) {
      1 & e && (C(0, "div", 14), We(1, "div", 15), C(2, "div", 16), M(3, "Wedstrijden laden..."), w()());
    }
    function aO(e, t) {
      1 & e && (C(0, "div", 17), M(1, " Vandaag zijn er geen wedstrijden bij Jong Brabant\n"), w());
    }
    function uO(e, t) {
      if (1 & e && (C(0, "div", 18), We(1, "app-uitslagen", 19), w()), 2 & e) {
        const n = be();
        S(1), B("uitslagen$", n.uitslagen$)("isLoading", n.isLoadingUitslagen);
      }
    }
    let cO = (() => {
        const t = class {
          constructor(r, i) {
            this.programmaService = r, this.route = i, this.now = new Date(), this.progress = 0, this.refreshInterval = 6e4, this.programma$ = new Ct([]), this.numberOfDays = 0, this.programmaError = !1, this.uitslagenError = !1, this.isLoadingProgramma = !1, this.isLoadingUitslagen = !1, this.refresh$ = new Nt(), this.isInitialLoad = !0;
          }
          ngOnInit() {
            this.hasProgramma = !1, this.hasUitslagen = !1, this.startProgressBar(), Cd(this.route.queryParams.pipe(j(r => r.days ? parseInt(r.days, 10) : 0)), this.refresh$.pipe(j(() => this.numberOfDays))).pipe(_t(r => (this.numberOfDays = r, this.isInitialLoad && (this.isLoadingProgramma = !0), this.programmaService.getProgramma(r)))).subscribe({
              next: r => {
                this.isLoadingProgramma = !1, this.isInitialLoad = !1, this.programmaError = !1, r && r.length > 0 ? (this.hasProgramma = !0, this.updateProgrammaData(r), this.sleutelMatch = r.some(i => i.kast)) : (this.hasProgramma = !1, this.loadUitslagenData());
              },
              error: r => {
                this.isLoadingProgramma = !1, this.programmaError = !0, console.error("Error loading programma:", r);
              }
            });
          }
          loadUitslagenData() {
            this.isLoadingUitslagen = !0, this.programmaService.getUitslagen(7).subscribe({
              next: r => {
                if (this.isLoadingUitslagen = !1, this.uitslagenError = !1, r && r.length > 0) {
                  const o = new Date().toISOString().slice(0, 10),
                    s = r.filter(a => !!a.wedstrijddatum && ("string" == typeof a.wedstrijddatum ? a.wedstrijddatum.slice(0, 10) : new Date(a.wedstrijddatum).toISOString().slice(0, 10)) === o);
                  this.hasUitslagen = s.length > 0, this.uitslagen$ = this.uitslagen$ ? this.uitslagen$.pipe(j(() => s)) : A(s);
                } else this.hasUitslagen = !1;
              },
              error: r => {
                this.isLoadingUitslagen = !1, this.uitslagenError = !0, this.hasUitslagen = !1, console.error("Error loading uitslagen:", r);
              }
            });
          }
          laadData(r) {
            console.log("laadData called with days:", r), this.isLoadingProgramma = !0, this.programmaService.getProgramma(r).subscribe({
              next: i => {
                this.isLoadingProgramma = !1, this.programmaError = !1, i && i.length > 0 ? (this.hasProgramma = !0, this.programma$.next(i), this.sleutelMatch = i.some(o => o.kast)) : (this.hasProgramma = !1, this.isLoadingUitslagen = !0, this.programmaService.getUitslagen(7).subscribe({
                  next: o => {
                    if (this.isLoadingUitslagen = !1, this.uitslagenError = !1, o && o.length > 0) {
                      const a = new Date().toISOString().slice(0, 10),
                        u = o.filter(c => !!c.wedstrijddatum && ("string" == typeof c.wedstrijddatum ? c.wedstrijddatum.slice(0, 10) : new Date(c.wedstrijddatum).toISOString().slice(0, 10)) === a);
                      this.hasUitslagen = u.length > 0, this.uitslagen$ = this.uitslagen$ ? this.uitslagen$.pipe(j(() => u)) : A(u);
                    } else this.hasUitslagen = !1;
                  },
                  error: () => {
                    this.isLoadingUitslagen = !1, this.uitslagenError = !0;
                  }
                }));
              },
              error: () => {
                this.isLoadingProgramma = !1, this.programmaError = !0;
              }
            });
          }
          startProgressBar() {
            console.log("startProgressBar called"), this.progressInterval && clearInterval(this.progressInterval), this.progress = 0;
            const r = 100 / (this.refreshInterval / 100);
            this.progressInterval = setInterval(() => {
              this.progress += r, this.progress >= 100 && (this.progress = 0, this.refresh$.next());
            }, 100);
          }
          updateProgrammaData(r) {
            const i = this.programma$.value;
            if (!i || 0 === i.length) return void this.programma$.next(r);
            const o = new Map(i.map(a => [a.wedstrijdcode, a])),
              s = [];
            for (const a of r) {
              const u = o.get(a.wedstrijdcode);
              if (u) {
                const c = {
                  ...u
                };
                a.status !== u.status && (c.status = a.status), a.isGestart !== u.isGestart && (c.isGestart = a.isGestart), a.afgelast !== u.afgelast && (c.afgelast = a.afgelast), a.scheidsrechter !== u.scheidsrechter && (c.scheidsrechter = a.scheidsrechter), a.veld !== u.veld && (c.veld = a.veld), a.aanvangstijd !== u.aanvangstijd && (c.aanvangstijd = a.aanvangstijd), a.kleedkamerthuisteam !== u.kleedkamerthuisteam && (c.kleedkamerthuisteam = a.kleedkamerthuisteam), a.kleedkameruitteam !== u.kleedkameruitteam && (c.kleedkameruitteam = a.kleedkameruitteam), a.kleedkamerscheidsrechter !== u.kleedkamerscheidsrechter && (c.kleedkamerscheidsrechter = a.kleedkamerscheidsrechter), s.push(c);
              } else s.push(a);
            }
            this.programma$.next(s);
          }
          trackByWedstrijdCode(r, i) {
            return i.wedstrijdcode;
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)(P(bP), P(Qn));
        }, t.ɵcmp = Tn({
          type: t,
          selectors: [["app-root"]],
          decls: 14,
          vars: 9,
          consts: [[1, "refresh-progress-bar"], [1, "refresh-progress-fill"], ["class", "error-message", 4, "ngIf"], [1, "titel-container"], ["src", "assets/logo.png", "alt", "image"], [1, "titel"], ["class", "matches-container", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "info-message", 4, "ngIf"], ["class", "results-container", 4, "ngIf"], [1, "white-background"], [1, "error-message"], [1, "matches-container"], [3, "programma$", "numberOfDays", "sleutelMatch", "isLoading"], [1, "loading-container"], [1, "loading-spinner"], [1, "loading-text"], [1, "info-message"], [1, "results-container"], [3, "uitslagen$", "isLoading"]],
          template: function (i, o) {
            1 & i && (C(0, "div", 0), We(1, "div", 1), w(), Q(2, rO, 2, 0, "div", 2), Q(3, iO, 2, 0, "div", 2), C(4, "div", 3), We(5, "img", 4), C(6, "div", 5), M(7), w(), We(8, "img", 4), w(), Q(9, oO, 2, 4, "div", 6), Q(10, sO, 4, 0, "div", 7), Q(11, aO, 2, 0, "div", 8), Q(12, uO, 2, 2, "div", 9), We(13, "div", 10)), 2 & i && (S(1), fc("width", o.progress + "%"), S(1), B("ngIf", o.programmaError), S(1), B("ngIf", o.uitslagenError), S(4), lt(" ", o.hasProgramma || !o.hasUitslagen ? "Kleedkamerindeling" : "Uitslagen", " "), S(2), B("ngIf", o.hasProgramma), S(1), B("ngIf", (o.isLoadingProgramma || o.isLoadingUitslagen) && !o.hasUitslagen && !o.hasProgramma), S(1), B("ngIf", !(o.hasUitslagen || o.hasProgramma || o.programmaError || o.uitslagenError || o.isLoadingProgramma || o.isLoadingUitslagen)), S(1), B("ngIf", o.hasUitslagen && !o.hasProgramma));
          },
          dependencies: [Br, XP, nO],
          styles: [".refresh-progress-bar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:3px;background:rgba(255,255,255,.3);z-index:1000}.refresh-progress-fill[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,#b50102 0%,#d32f2f 50%,#b50102 100%);transition:width .1s ease-out;box-shadow:0 0 5px #b5010280}.white-background[_ngcontent-%COMP%]{position:fixed;left:0;top:0;width:100%;height:100%;z-index:-1;background-image:url(home_grass.171cec7ac0b8cbd1.jpg);background-repeat:repeat}.loading-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:16px;color:#fff;text-align:center}.loading-spinner[_ngcontent-%COMP%]{width:40px;height:40px;border:3px solid rgba(255,255,255,.3);border-top:3px solid #b50102;border-radius:50%;animation:_ngcontent-%COMP%_spin 1s linear infinite}.loading-text[_ngcontent-%COMP%]{font-size:18px;font-weight:300;text-transform:uppercase;letter-spacing:1px}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.error-message[_ngcontent-%COMP%]{background:#d32f2f;color:#fff;margin:10px 20px;padding:15px;text-align:center;font-weight:600;border-radius:8px;box-shadow:2px 0 5px #0009}.info-message[_ngcontent-%COMP%]{background:#b50102;margin:0 20px;padding:15px;color:#fff;text-align:center;font-size:14px;font-weight:300;line-height:1.4;text-transform:uppercase;box-shadow:2px 0 5px #0009;border-radius:8px}.titel-container[_ngcontent-%COMP%]{margin:20px 40px;display:flex;justify-content:space-between;align-items:center}@media (max-width: 1199px){.titel-container[_ngcontent-%COMP%]{margin:10px 16px;justify-content:flex-start;gap:12px}.titel-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:last-child{display:none}.titel-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:first-child{width:40px;height:40px;flex-shrink:0;object-fit:contain}}.titel[_ngcontent-%COMP%]{background:#b50102;width:100%;font-weight:700;margin:20px;line-height:150px;text-transform:uppercase;text-align:center;font-size:24px;color:#fff;box-shadow:2px 0 5px #0009;border-radius:8px;max-width:1400px}@media (max-width: 1199px){.titel[_ngcontent-%COMP%]{margin:0;padding:8px 16px;line-height:1.2;font-size:18px;border-radius:6px;flex:1;display:flex;align-items:center;justify-content:center}}@media (min-width: 1200px){.titel[_ngcontent-%COMP%]{font-size:72px;line-height:150px;letter-spacing:2px}}"]
        }), e;
      })(),
      lO = (() => {
        const t = class {
          intercept(r, i) {
            const o = r.clone({
              params: r.params.append("clientId", "uGmAb4311c")
            });
            return i.handle(o);
          }
        };
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)();
        }, t.ɵprov = R({
          token: t,
          factory: t.ɵfac
        }), e;
      })(),
      dO = (() => {
        const t = class {};
        let e = t;
        return t.ɵfac = function (i) {
          return new (i || t)();
        }, t.ɵmod = An({
          type: t,
          bootstrap: [cO]
        }), t.ɵinj = pn({
          providers: [{
            provide: pv,
            useClass: lO,
            multi: !0
          }],
          imports: [qT, E1, mP.forRoot([])]
        }), e;
      })();
    WT().bootstrapModule(dO).catch(e => console.error(e));
  }
}, xn => {
  xn(xn.s = 370);
}]);