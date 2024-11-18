"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
var _userService = require("../services/userService");
var _lodash = _interopRequireWildcard(require("lodash"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  Op = _require.Op,
  literal = _require.literal;
//Models Database
var _require2 = require("../models"),
  Student = _require2.Student,
  Lecturer = _require2.Lecturer,
  Role = _require2.Role,
  Topic = _require2.Topic,
  TermLecturer = _require2.TermLecturer,
  StudentGroup = _require2.StudentGroup,
  Term = _require2.Term,
  Note = _require2.Note,
  Evaluation = _require2.Evaluation,
  Group = _require2.Group,
  GroupLecturer = _require2.GroupLecturer;

//Tạo tài khoản giảng viên
var createLecturerAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var existLecturer, lecturer, defaultPassword, hashPass, existTermLecturer;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (data.fullName) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", {
            status: 1,
            message: "Tên đầy đủ không hợp lệ!"
          });
        case 3:
          if (data.username) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", {
            status: 1,
            message: "Mã giảng viên không hợp lệ!"
          });
        case 5:
          if (data.termId) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", {
            status: 1,
            message: "Mã học kì không hợp lệ!"
          });
        case 7:
          _context.next = 9;
          return Lecturer.findOne({
            where: {
              username: data.username
            }
          });
        case 9:
          existLecturer = _context.sent;
          if (!existLecturer) {
            _context.next = 14;
            break;
          }
          lecturer = existLecturer;
          _context.next = 19;
          break;
        case 14:
          defaultPassword = "123";
          hashPass = (0, _userService.hashPassword)(defaultPassword);
          _context.next = 18;
          return Lecturer.create(_objectSpread(_objectSpread({}, data), {}, {
            password: hashPass,
            roleId: (data === null || data === void 0 ? void 0 : data.roleId) || 2
          }));
        case 18:
          lecturer = _context.sent;
        case 19:
          _context.next = 21;
          return TermLecturer.findOne({
            where: {
              lecturerId: lecturer.id,
              termId: data.termId
            }
          });
        case 21:
          existTermLecturer = _context.sent;
          if (!existTermLecturer) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", {
            status: -1,
            message: "Giảng viên đã có trong học kì này!"
          });
        case 26:
          _context.next = 28;
          return TermLecturer.create({
            lecturerId: lecturer.id,
            termId: data.termId
          });
        case 28:
          return _context.abrupt("return", {
            status: 0,
            message: "Thêm tài khoản giảng viên thành công"
          });
        case 29:
          _context.next = 35;
          break;
        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          console.log("Lỗi: ", _context.t0.message);
          return _context.abrupt("return", {
            status: -1,
            message: "".concat(_context.t0.message, "!")
          });
        case 35:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 31]]);
  }));
  return function createLecturerAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();
// Tạo nhiều tài khoản giảng viên
var createBulkAccountLecturer = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var _data$, currentAccounts, usernamesInDb, newLecturers, termId, dataPersist, termLecturers, _iterator, _step, lecturer, existTermLecturer;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!data || (0, _lodash.isEmpty)(data))) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", {
            status: 1,
            message: "Dữ liệu trống!",
            data: null
          });
        case 2:
          _context2.prev = 2;
          _context2.next = 5;
          return Lecturer.findAll({
            attributes: ["id", "fullName", "username"],
            raw: true
          });
        case 5:
          currentAccounts = _context2.sent;
          // Tạo danh sách giảng viên mới và kiểm tra tồn tại
          usernamesInDb = currentAccounts.map(function (account) {
            return account.username;
          });
          newLecturers = data.filter(function (_ref3) {
            var username = _ref3.username;
            return !usernamesInDb.includes(username);
          }); // Lấy termId từ phần tử đầu tiên của data
          termId = (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.termId;
          if (termId) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", {
            status: 1,
            message: "Không tìm thấy thông tin học kỳ!",
            data: null
          });
        case 11:
          // Tạo danh sách các giảng viên mới
          dataPersist = newLecturers.map(function (value) {
            return {
              fullName: value.fullName,
              username: value.username,
              password: (0, _userService.hashPassword)(value.password),
              roleId: 2
            };
          }); // Thêm giảng viên mới vào cơ sở dữ liệu
          _context2.next = 14;
          return Lecturer.bulkCreate(dataPersist);
        case 14:
          termLecturers = []; // Kiểm tra từng giảng viên (bao gồm cả giảng viên đã tồn tại)
          _iterator = _createForOfIteratorHelper(currentAccounts);
          _context2.prev = 16;
          _iterator.s();
        case 18:
          if ((_step = _iterator.n()).done) {
            _context2.next = 26;
            break;
          }
          lecturer = _step.value;
          _context2.next = 22;
          return TermLecturer.findOne({
            where: {
              lecturerId: lecturer.id,
              termId: termId
            }
          });
        case 22:
          existTermLecturer = _context2.sent;
          // Nếu giảng viên chưa tồn tại trong TermLecturer, thêm vào danh sách
          if (!existTermLecturer) {
            termLecturers.push({
              lecturerId: lecturer.id,
              termId: termId
            });
          }
        case 24:
          _context2.next = 18;
          break;
        case 26:
          _context2.next = 31;
          break;
        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](16);
          _iterator.e(_context2.t0);
        case 31:
          _context2.prev = 31;
          _iterator.f();
          return _context2.finish(31);
        case 34:
          if (!(termLecturers.length > 0)) {
            _context2.next = 40;
            break;
          }
          _context2.next = 37;
          return TermLecturer.bulkCreate(termLecturers);
        case 37:
          return _context2.abrupt("return", {
            status: 0,
            message: "Th\xEAm t\xE0i kho\u1EA3n v\xE0o h\u1ECDc k\u1EF3 ".concat(termId, " th\xE0nh c\xF4ng!")
          });
        case 40:
          return _context2.abrupt("return", {
            status: 0,
            message: "Kh\xF4ng c\xF3 t\xE0i kho\u1EA3n n\xE0o m\u1EDBi trong h\u1ECDc k\u1EF3 ".concat(termId, ".")
          });
        case 41:
          _context2.next = 47;
          break;
        case 43:
          _context2.prev = 43;
          _context2.t1 = _context2["catch"](2);
          console.log(_context2.t1);
          return _context2.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context2.t1.message, "!"),
            data: null
          });
        case 47:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 43], [16, 28, 31, 34]]);
  }));
  return function createBulkAccountLecturer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Lấy danh sách giảng viên
var getLecturerList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(term) {
    var list;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (term) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", {
            status: -1,
            message: "Thiếu dữ liệu học kì!"
          });
        case 2:
          _context3.prev = 2;
          _context3.next = 5;
          return Lecturer.findAll({
            attributes: ["id", "username", "fullName", "gender", "email", "phone"],
            include: {
              model: Term,
              as: "terms",
              attributes: [],
              through: {
                attributes: []
              },
              where: {
                id: term
              }
            },
            where: {
              groupLecturerId: null
            }
          });
        case 5:
          list = _context3.sent;
          if (!(list && list.length > 0)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: list
          });
        case 8:
          return _context3.abrupt("return", {
            status: 1,
            message: "Tất cả giảng viên đều có nhóm!",
            data: list
          });
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          console.log("Lỗi: ", _context3.t0.message);
          return _context3.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng",
            data: null
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return function getLecturerList(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
// Lấy danh sách phân trang của giảng viên
var getPaginationLecturer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(page, limit, term) {
    var offset, _yield$Lecturer$findA, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          offset = (page - 1) * limit;
          _context4.next = 4;
          return Lecturer.findAndCountAll({
            attributes: ["id", "username", "fullName", "gender", "email", "phone"],
            include: [{
              model: Role,
              attributes: ["id", "name", "description"]
            }, {
              model: Term,
              as: "terms",
              through: {
                attributes: []
              },
              attributes: ["id", "name"],
              where: {
                id: term
              }
            }],
            offset: offset,
            limit: limit
          });
        case 4:
          _yield$Lecturer$findA = _context4.sent;
          count = _yield$Lecturer$findA.count;
          rows = _yield$Lecturer$findA.rows;
          totalPages = Math.ceil(count / limit);
          return _context4.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              lecturers: rows
            }
          });
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function getPaginationLecturer(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteLecturer = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var res, res2;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(!data && !data.id && !data.termId)) {
            _context5.next = 2;
            break;
          }
          return _context5.abrupt("return", {
            status: -1,
            message: "Id giảng viên hoặc Id học kì không hợp lệ!"
          });
        case 2:
          _context5.next = 4;
          return Lecturer.destroy({
            where: {
              id: data.id
            }
          });
        case 4:
          res = _context5.sent;
          _context5.next = 7;
          return TermLecturer.destroy({
            where: {
              lecturerId: data.id,
              termId: data.termId
            }
          });
        case 7:
          res2 = _context5.sent;
          if (!(res && res2)) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", {
            status: 0,
            message: "Xóa thành công!"
          });
        case 12:
          return _context5.abrupt("return", {
            status: 0,
            message: "Xóa thất bại!"
          });
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteLecturer(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var updateLecturer = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    var updateData, res, updatedLecturer;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          updateData = {
            username: data.username,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            gender: data.gender
          };
          if (data.degree) {
            updateData.degree = data.degree;
          }
          _context6.next = 4;
          return Lecturer.update(updateData, {
            where: {
              id: data.id
            }
          });
        case 4:
          res = _context6.sent;
          if (!(res[0] > 0)) {
            _context6.next = 12;
            break;
          }
          _context6.next = 8;
          return Lecturer.findOne({
            where: {
              id: data.id
            },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "RoleId"]
            }
          });
        case 8:
          updatedLecturer = _context6.sent;
          return _context6.abrupt("return", {
            status: 0,
            message: "Cập nhật thành công!",
            data: updatedLecturer
          });
        case 12:
          return _context6.abrupt("return", {
            status: -1,
            message: "Cập nhật thất bại!",
            data: null
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateLecturer(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteManyLecturer = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var result, result2;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (!(!data && !data.lecturerId && !data.termId)) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", {
            status: -1,
            message: "Id giảng viên hoặc Id học kì không hợp lệ!"
          });
        case 3:
          result = Lecturer.destroy({
            where: {
              id: data.lecturerId
            }
          });
          _context7.next = 6;
          return TermLecturer.destroy({
            where: {
              lecturerId: data.lecturerId,
              termId: data.termId
            }
          });
        case 6:
          result2 = _context7.sent;
          if (!(result && result2)) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", {
            status: 0,
            message: "Xóa thành công!"
          });
        case 11:
          return _context7.abrupt("return", {
            status: -1,
            message: "Xóa thật bại!"
          });
        case 12:
          _context7.next = 17;
          break;
        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!",
            data: {
              error: _context7.t0
            }
          });
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function deleteManyLecturer(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var findLecturersByUserNameOrFullName = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(term, search) {
    var results;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Lecturer.findAll({
            include: {
              model: Term,
              through: {
                attributes: []
              },
              as: "terms",
              where: {
                id: term
              }
            },
            where: _defineProperty({}, Op.or, [{
              username: _defineProperty({}, Op.like, "%".concat(search, "%"))
            }, {
              fullName: _defineProperty({}, Op.like, "%".concat(search, "%"))
            }]),
            attributes: ["id", "username", "fullName", "gender", "email", "phone"]
          });
        case 2:
          results = _context8.sent;
          if ((0, _lodash.isEmpty)(results)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: {
              lecturers: results
            }
          });
        case 7:
          return _context8.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu!",
            data: {
              lecturers: null
            }
          });
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function findLecturersByUserNameOrFullName(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();
var findLecturersByName = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(page, limit, input) {
    var offset, _yield$Lecturer$findA2, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          offset = (page - 1) * limit;
          _context9.next = 4;
          return Lecturer.findAndCountAll({
            where: {
              fullName: _defineProperty({}, Op.like, "".concat(input, "%"))
            },
            attributes: ["id", "username", "fullName", "gender", "email", "phone"],
            include: {
              model: Role,
              attributes: ["id", "name", "description"]
            },
            offset: offset,
            limit: limit
          });
        case 4:
          _yield$Lecturer$findA2 = _context9.sent;
          count = _yield$Lecturer$findA2.count;
          rows = _yield$Lecturer$findA2.rows;
          totalPages = Math.ceil(count / limit);
          if (!(rows.length > 0)) {
            _context9.next = 12;
            break;
          }
          return _context9.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              lecturers: rows
            }
          });
        case 12:
          return _context9.abrupt("return", {
            status: 0,
            message: "Không tìm thấy thông tin khớp dữ liệu nhập vào!",
            data: null
          });
        case 13:
          _context9.next = 19;
          break;
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            status: -1,
            message: "Tìm kiếm thất bại!",
            data: null
          });
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 15]]);
  }));
  return function findLecturersByName(_x12, _x13, _x14) {
    return _ref10.apply(this, arguments);
  };
}();

// Thêm danh sách đề tài
var createTopics = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
    var _data, dataPersist, results;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (!(data && !Array.isArray(data))) {
            _context10.next = 5;
            break;
          }
          return _context10.abrupt("return", {
            status: 1,
            message: "Danh sách đề tài không hợp lệ!",
            data: null
          });
        case 5:
          _data = _lodash["default"].cloneDeep(data);
          dataPersist = [];
          Object.entries(_data).map(function (_ref12, index) {
            var _ref13 = _slicedToArray(_ref12, 2),
              key = _ref13[0],
              value = _ref13[1];
            dataPersist.push({
              termId: value.termId,
              lecturerId: value.lecturerId,
              title: value.title,
              description: value.description,
              goals: value.goals,
              requirement: value.requirement,
              standardOutput: value.standardOutput,
              status: "PENDING",
              quantityGroup: value.quantityGroup
            });
          });

          // console.log("Check persist: ", dataPersist);
          _context10.next = 10;
          return Topic.bulkCreate(dataPersist);
        case 10:
          results = _context10.sent;
          if (!results) {
            _context10.next = 13;
            break;
          }
          return _context10.abrupt("return", {
            status: 0,
            message: "Th\xEAm m\u1EDBi th\xE0nh c\xF4ng ".concat(dataPersist.length, " \u0111\u1EC1 t\xE0i!")
          });
        case 13:
          _context10.next = 19;
          break;
        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            status: 1,
            message: "Lỗi chức năng!",
            data: null
          });
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 15]]);
  }));
  return function createTopics(_x15) {
    return _ref11.apply(this, arguments);
  };
}();
// const getMyTopics = async ()=>{

// }

var getTerm = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(lecturerId) {
    var terms, currentDate, currentTerm;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          if (lecturerId) {
            _context11.next = 3;
            break;
          }
          return _context11.abrupt("return", {
            status: -1,
            message: "Không tìm thấy id sinh viên"
          });
        case 3:
          _context11.next = 5;
          return Term.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: {
              model: Lecturer,
              as: "lecturers",
              attributes: [],
              through: {
                attributes: []
              },
              where: {
                id: lecturerId
              }
            }
          });
        case 5:
          terms = _context11.sent;
          currentDate = new Date();
          currentTerm = terms.find(function (term) {
            var startDate = new Date(term.startDate);
            var endDate = new Date(term.endDate);
            return currentDate >= startDate && currentDate <= endDate;
          });
          if (!currentTerm) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", {
            status: 0,
            message: "Lấy thông tin học kì thành công!",
            data: currentTerm
          });
        case 12:
          return _context11.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin học kì hiện tại!",
            data: null
          });
        case 13:
          _context11.next = 19;
          break;
        case 15:
          _context11.prev = 15;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            status: -1,
            message: "L\u1ED7i ".concat(_context11.t0.message, "!")
          });
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 15]]);
  }));
  return function getTerm(_x16) {
    return _ref14.apply(this, arguments);
  };
}();
var getPersonalTopics = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(term, id) {
    var topics;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (term) {
            _context12.next = 2;
            break;
          }
          return _context12.abrupt("return", {
            status: -1,
            message: "Không có thông tin của học kì!"
          });
        case 2:
          if (id) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", {
            status: -1,
            message: "Không có thông tin của giảng viên!"
          });
        case 4:
          _context12.prev = 4;
          _context12.next = 7;
          return Topic.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "LecturerId"],
              include: [[literal("(SELECT COUNT(*) FROM `Groups` WHERE `Groups`.`topicId` = `Topic`.`id`)"), "groupCount"]]
            },
            where: {
              termId: term,
              lecturerId: id
            }
          });
        case 7:
          topics = _context12.sent;
          if (!(topics && topics.length > 0)) {
            _context12.next = 12;
            break;
          }
          return _context12.abrupt("return", {
            status: 0,
            message: "Lấy danh sách đề tài cá nhân thành công!",
            data: topics
          });
        case 12:
          return _context12.abrupt("return", {
            status: -1,
            message: "Danh sách đề tài cá nhân trống!"
          });
        case 13:
          _context12.next = 19;
          break;
        case 15:
          _context12.prev = 15;
          _context12.t0 = _context12["catch"](4);
          console.error("Lỗi khi lấy danh sách topics:", _context12.t0);
          return _context12.abrupt("return", {
            status: -1,
            message: "Đã xảy ra lỗi khi lấy thông tin!",
            error: _context12.t0.message
          });
        case 19:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[4, 15]]);
  }));
  return function getPersonalTopics(_x17, _x18) {
    return _ref15.apply(this, arguments);
  };
}();
var deleteTopic = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    var isTopicAssign, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (data.id) {
            _context13.next = 2;
            break;
          }
          return _context13.abrupt("return", {
            status: -1,
            message: "Mã đề tài không hợp lệ!"
          });
        case 2:
          _context13.prev = 2;
          _context13.next = 5;
          return Group.findOne({
            where: {
              topicId: data.id
            },
            raw: true
          });
        case 5:
          isTopicAssign = _context13.sent;
          if (!isTopicAssign) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", {
            status: -1,
            message: "Đề tài này đã có nhóm đăng ký!"
          });
        case 8:
          _context13.next = 10;
          return Topic.destroy({
            where: {
              id: data.id
            }
          });
        case 10:
          result = _context13.sent;
          if (!(result > 0)) {
            _context13.next = 15;
            break;
          }
          return _context13.abrupt("return", {
            status: 0,
            message: "Xóa thành công!"
          });
        case 15:
          return _context13.abrupt("return", {
            status: -1,
            message: "Xóa thất bại do không tìm thấy bản ghi nào!"
          });
        case 16:
          _context13.next = 22;
          break;
        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](2);
          console.log("Lỗi: ", _context13.t0.message);
          return _context13.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context13.t0.message)
          });
        case 22:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[2, 18]]);
  }));
  return function deleteTopic(_x19) {
    return _ref16.apply(this, arguments);
  };
}();
var updateTopic = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data) {
    var update;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (data) {
            _context14.next = 2;
            break;
          }
          return _context14.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin cập nhật!"
          });
        case 2:
          _context14.prev = 2;
          _context14.next = 5;
          return Topic.update(data, {
            where: {
              id: data.id
            }
          });
        case 5:
          update = _context14.sent;
          if (!(update[0] > 0)) {
            _context14.next = 10;
            break;
          }
          return _context14.abrupt("return", {
            status: 0,
            message: "Cập nhật đề tài thành công!"
          });
        case 10:
          return _context14.abrupt("return", {
            status: -1,
            message: "Cập nhật đề tài thất bại!"
          });
        case 11:
          _context14.next = 17;
          break;
        case 13:
          _context14.prev = 13;
          _context14.t0 = _context14["catch"](2);
          console.log("Lỗi: ", _context14.t0.message);
          return _context14.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context14.t0.message)
          });
        case 17:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[2, 13]]);
  }));
  return function updateTopic(_x20) {
    return _ref17.apply(this, arguments);
  };
}();
var getNotes = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(termId, roleId) {
    var notes;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (!(!termId || !roleId)) {
            _context15.next = 2;
            break;
          }
          return _context15.abrupt("return", {
            status: -1,
            message: "Thiếu dữ liệu học kỳ hoặc vai trò!"
          });
        case 2:
          _context15.prev = 2;
          _context15.next = 5;
          return Note.findAll({
            where: {
              termId: termId
            },
            include: {
              attributes: [],
              model: Role,
              as: "roles",
              through: {
                attributes: []
              },
              where: {
                id: roleId
              }
            }
          });
        case 5:
          notes = _context15.sent;
          if (!(notes && notes.length > 0)) {
            _context15.next = 10;
            break;
          }
          return _context15.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thông báo thành công!",
            data: notes
          });
        case 10:
          return _context15.abrupt("return", {
            status: 1,
            message: "Không tìm thấy thông báo nào!"
          });
        case 11:
          _context15.next = 17;
          break;
        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](2);
          console.error("Lỗi khi lấy danh sách thông báo:", _context15.t0);
          return _context15.abrupt("return", {
            status: -1,
            message: "Lỗi hệ thống!",
            data: {
              error: _context15.t0.message
            }
          });
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[2, 13]]);
  }));
  return function getNotes(_x21, _x22) {
    return _ref18.apply(this, arguments);
  };
}();
var pointGroup = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(data) {
    var discussionPoint, progressPoint, reportingPoint, groupId, termId, discussionScore, progressScore, reportingScore, isNumber, existingEvaluation, evaluationData, result, existProgressScore, averagePoint;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          discussionPoint = data.discussionPoint, progressPoint = data.progressPoint, reportingPoint = data.reportingPoint, groupId = data.groupId, termId = data.termId; // Chuyển đổi các giá trị điểm thành số
          discussionScore = Number(discussionPoint);
          progressScore = Number(progressPoint);
          reportingScore = Number(reportingPoint); // Hàm kiểm tra xem giá trị có phải là số không
          isNumber = function isNumber(value) {
            return typeof value === "number" && !isNaN(value);
          };
          if (groupId) {
            _context16.next = 7;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Mã nhóm trống hoặc không hợp lệ!"
          });
        case 7:
          if (termId) {
            _context16.next = 9;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Mã học kì trống hoặc không hợp lệ!"
          });
        case 9:
          _context16.next = 11;
          return Evaluation.findOne({
            where: {
              groupId: groupId,
              termId: termId
            }
          });
        case 11:
          existingEvaluation = _context16.sent;
          if (existingEvaluation) {
            _context16.next = 30;
            break;
          }
          if (isNumber(progressScore)) {
            _context16.next = 15;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Điểm quá trình trống!"
          });
        case 15:
          _context16.prev = 15;
          evaluationData = {
            progressPoint: progressScore,
            groupId: groupId,
            termId: termId
          };
          _context16.next = 19;
          return Evaluation.create(evaluationData);
        case 19:
          result = _context16.sent;
          if (!result) {
            _context16.next = 22;
            break;
          }
          return _context16.abrupt("return", {
            status: 0,
            message: "Chấm điểm quá trình thành công.",
            data: result
          });
        case 22:
          _context16.next = 28;
          break;
        case 24:
          _context16.prev = 24;
          _context16.t0 = _context16["catch"](15);
          console.log("Lỗi: ", _context16.t0.message);
          return _context16.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng chấm điểm quá trình!"
          });
        case 28:
          _context16.next = 49;
          break;
        case 30:
          if (isNumber(discussionScore)) {
            _context16.next = 32;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Điểm phản biện trống hoặc không hợp lệ!"
          });
        case 32:
          if (isNumber(reportingScore)) {
            _context16.next = 34;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Điểm báo cáo trống hoặc không hợp lệ!"
          });
        case 34:
          // Tính điểm trung bình
          existProgressScore = existingEvaluation.progressPoint;
          averagePoint = ((discussionScore + existProgressScore + reportingScore) / 3).toFixed(1);
          _context16.prev = 36;
          // Cập nhật các điểm còn lại trong bản ghi
          existingEvaluation.discussionPoint = discussionScore;
          existingEvaluation.reportingPoint = reportingScore;
          existingEvaluation.averagePoint = averagePoint;
          _context16.next = 42;
          return existingEvaluation.save();
        case 42:
          return _context16.abrupt("return", {
            status: 0,
            message: "Chấm điểm phản biện thành công.",
            data: existingEvaluation
          });
        case 45:
          _context16.prev = 45;
          _context16.t1 = _context16["catch"](36);
          console.log("Lỗi: ", _context16.t1.message);
          return _context16.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng chấm điểm phản biện!"
          });
        case 49:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[15, 24], [36, 45]]);
  }));
  return function pointGroup(_x23) {
    return _ref19.apply(this, arguments);
  };
}();
var getGroupTopic = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(lecturerId, termId) {
    var groups;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          if (lecturerId) {
            _context17.next = 2;
            break;
          }
          return _context17.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin giảng viên!"
          });
        case 2:
          if (termId) {
            _context17.next = 4;
            break;
          }
          return _context17.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin học kì!"
          });
        case 4:
          _context17.prev = 4;
          _context17.next = 7;
          return Group.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "TopicId", "topicId"]
            },
            include: [{
              model: Topic,
              as: "topic",
              where: {
                lecturerId: lecturerId,
                termId: termId
              },
              attributes: {
                exclude: ["createdAt", "updatedAt", "LecturerId"]
              }
            }, {
              model: Student,
              as: "students",
              attributes: ["id", "username", "fullName", "gender", "email", "phone", "isLeader"]
            }]
          });
        case 7:
          groups = _context17.sent;
          if (!(groups.length === 0)) {
            _context17.next = 10;
            break;
          }
          return _context17.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm nào cho giảng viên và học kỳ này!",
            data: []
          });
        case 10:
          return _context17.abrupt("return", {
            status: 0,
            message: "Lấy danh sách nhóm thành công!",
            data: groups
          });
        case 13:
          _context17.prev = 13;
          _context17.t0 = _context17["catch"](4);
          console.log("Lỗi:", _context17.t0.message);
          return _context17.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 17:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[4, 13]]);
  }));
  return function getGroupTopic(_x24, _x25) {
    return _ref20.apply(this, arguments);
  };
}();
var getLecturerGroup = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(lecturerId) {
    var lecturer, groupLecturerId, group;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (lecturerId) {
            _context18.next = 2;
            break;
          }
          return _context18.abrupt("return", {
            status: -1,
            message: "ID giảng viên không hợp lệ!"
          });
        case 2:
          _context18.prev = 2;
          _context18.next = 5;
          return Lecturer.findOne({
            attributes: ["id", "username", "groupLecturerId"],
            where: {
              id: lecturerId
            }
          });
        case 5:
          lecturer = _context18.sent;
          if (lecturer) {
            _context18.next = 10;
            break;
          }
          return _context18.abrupt("return", {
            status: -1,
            message: "Giảng viên không tồn tại!"
          });
        case 10:
          groupLecturerId = lecturer.groupLecturerId;
          _context18.next = 13;
          return GroupLecturer.findOne({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            where: {
              id: groupLecturerId
            },
            include: {
              model: Lecturer,
              as: "lecturers",
              attributes: ["id", "fullName", "username", "gender", "phone", "email"]
            }
          });
        case 13:
          group = _context18.sent;
          if (group) {
            _context18.next = 16;
            break;
          }
          return _context18.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm giảng viên!",
            data: null
          });
        case 16:
          return _context18.abrupt("return", {
            status: 0,
            message: "Lấy thông tin nhóm giảng viên thành công!",
            group: group
          });
        case 17:
          _context18.next = 23;
          break;
        case 19:
          _context18.prev = 19;
          _context18.t0 = _context18["catch"](2);
          console.log("Lỗi: ", _context18.t0.message);
          return _context18.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 23:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[2, 19]]);
  }));
  return function getLecturerGroup(_x26) {
    return _ref21.apply(this, arguments);
  };
}();
var getReviewStudentGroups = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(groupLecturerId, termId) {
    var groups;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          if (!(!groupLecturerId && !termId)) {
            _context19.next = 2;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Nhóm giảng viên hoặc học kì không hợp lệ!"
          });
        case 2:
          _context19.prev = 2;
          _context19.next = 5;
          return Group.findAll({
            where: {
              groupLecturerId: groupLecturerId,
              termId: termId
            },
            attributes: ["id", "groupName"],
            include: [{
              model: Topic,
              as: "topic",
              attributes: {
                exclude: ["createdAt", "updatedAt", "LecturerId"]
              }
            }, {
              model: Student,
              as: "students",
              attributes: ["id", "username", "fullName", "gender", "email", "phone"]
            }]
          });
        case 5:
          groups = _context19.sent;
          if (!(groups && groups.length > 0)) {
            _context19.next = 10;
            break;
          }
          return _context19.abrupt("return", {
            status: 0,
            message: "Lấy danh sách nhóm sinh viên thành công!",
            data: groups
          });
        case 10:
          return _context19.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm sinh viên nào được phân công!",
            data: []
          });
        case 11:
          _context19.next = 17;
          break;
        case 13:
          _context19.prev = 13;
          _context19.t0 = _context19["catch"](2);
          console.log("Lỗi: ", _context19.t0.message);
          return _context19.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 17:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[2, 13]]);
  }));
  return function getReviewStudentGroups(_x27, _x28) {
    return _ref22.apply(this, arguments);
  };
}();
var getGroupEvaluation = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(groupId, termId) {
    var result;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          if (!(!groupId && !termId)) {
            _context20.next = 2;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "ID nhóm sinh viên hoặc học kì trống hoặc không hợp lệ!"
          });
        case 2:
          _context20.prev = 2;
          _context20.next = 5;
          return Evaluation.findOne({
            where: {
              groupId: groupId,
              termId: termId
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          });
        case 5:
          result = _context20.sent;
          if (!result) {
            _context20.next = 10;
            break;
          }
          return _context20.abrupt("return", {
            status: 0,
            message: "Lấy thông tin điểm số của nhóm thành công!",
            data: result
          });
        case 10:
          return _context20.abrupt("return", {
            status: 1,
            message: "Nhóm chưa có điểm số!",
            data: {}
          });
        case 11:
          _context20.next = 17;
          break;
        case 13:
          _context20.prev = 13;
          _context20.t0 = _context20["catch"](2);
          console.log("Lỗi: ", _context20.t0.message);
          return _context20.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!",
            data: {}
          });
        case 17:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[2, 13]]);
  }));
  return function getGroupEvaluation(_x29, _x30) {
    return _ref23.apply(this, arguments);
  };
}();
var chooseLeaderForGroup = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(data) {
    var termId, groupId, studentId, group, updatedStudent;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          termId = data.termId, groupId = data.groupId, studentId = data.studentId;
          if (termId) {
            _context21.next = 3;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Học kì trống hoặc không hợp lệ!"
          });
        case 3:
          if (groupId) {
            _context21.next = 5;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Nhóm sinh viên trống hoặc không hợp lệ!"
          });
        case 5:
          if (studentId) {
            _context21.next = 7;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "ID sinh viên trống hoặc không hợp lệ!"
          });
        case 7:
          _context21.prev = 7;
          _context21.next = 10;
          return Group.findOne({
            where: {
              id: groupId,
              termId: termId
            },
            include: {
              model: Student,
              as: "students",
              attributes: ["id", "username", "fullName", "isLeader"]
            }
          });
        case 10:
          group = _context21.sent;
          if (group) {
            _context21.next = 13;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Nhóm không tồn tại!"
          });
        case 13:
          _context21.next = 15;
          return Student.update({
            isLeader: false
          }, {
            where: {
              id: group.students.map(function (student) {
                return student.id;
              }),
              isLeader: true
            }
          });
        case 15:
          _context21.next = 17;
          return Student.update({
            isLeader: true
          }, {
            where: {
              id: studentId
            }
          });
        case 17:
          updatedStudent = _context21.sent;
          if (updatedStudent) {
            _context21.next = 20;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Sinh viên không tồn tại!"
          });
        case 20:
          return _context21.abrupt("return", {
            status: 0,
            message: "Đã chọn trưởng nhóm thành công!"
          });
        case 23:
          _context21.prev = 23;
          _context21.t0 = _context21["catch"](7);
          console.log("Lỗi: ", _context21.t0.message);
          return _context21.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 27:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[7, 23]]);
  }));
  return function chooseLeaderForGroup(_x31) {
    return _ref24.apply(this, arguments);
  };
}();
var addStudentToGroup = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(data) {
    var studentUserName, termId, groupId, student, checkStudentGroup, res, numOfMembers, id, students, isFirstStudent, update, groupJoin;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          studentUserName = data.studentUserName, termId = data.termId, groupId = data.groupId;
          if (studentUserName) {
            _context22.next = 3;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Mã sinh viên không hợp lệ!"
          });
        case 3:
          if (termId) {
            _context22.next = 5;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Học kì không hợp lệ!"
          });
        case 5:
          if (groupId) {
            _context22.next = 7;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "ID nhóm không hợp lệ!"
          });
        case 7:
          _context22.prev = 7;
          _context22.next = 10;
          return Student.findOne({
            where: {
              username: studentUserName
            }
          });
        case 10:
          student = _context22.sent;
          if (student) {
            _context22.next = 13;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Không tìm thấy sinh viên!"
          });
        case 13:
          _context22.next = 15;
          return StudentGroup.findOne({
            where: {
              studentId: student.id
            },
            include: {
              model: Group,
              as: "groups",
              where: {
                termId: termId
              } // Kiểm tra nếu nhóm thuộc học kỳ đúng
            }
          });
        case 15:
          checkStudentGroup = _context22.sent;
          if (!checkStudentGroup) {
            _context22.next = 18;
            break;
          }
          return _context22.abrupt("return", {
            status: 1,
            message: "Sinh viên này đã có nhóm!"
          });
        case 18:
          _context22.next = 20;
          return Group.findOne({
            where: {
              id: groupId,
              termId: termId
            },
            // Kiểm tra nhóm và học kỳ
            attributes: {
              exclude: ["createdAt", "updatedAt", "TopicId"]
            },
            include: {
              model: Student,
              as: "students",
              attributes: ["id", "fullName"]
            }
          });
        case 20:
          res = _context22.sent;
          if (res) {
            _context22.next = 23;
            break;
          }
          return _context22.abrupt("return", {
            status: 1,
            message: "Nhóm không tồn tại trong học kỳ này!"
          });
        case 23:
          numOfMembers = res.numOfMembers, id = res.id;
          students = res.students.length; // Kiểm tra nếu nhóm đã đầy
          if (!(students >= numOfMembers)) {
            _context22.next = 27;
            break;
          }
          return _context22.abrupt("return", {
            status: 1,
            message: "Nhóm đã đủ sinh viên!"
          });
        case 27:
          // Kiểm tra xem sinh viên có phải là người đầu tiên thêm vào nhóm không
          isFirstStudent = students === 0; // Cập nhật sinh viên là trưởng nhóm nếu là sinh viên đầu tiên
          _context22.next = 30;
          return Student.update({
            isLeader: isFirstStudent ? true : false
          }, {
            where: {
              id: student.id
            }
          });
        case 30:
          update = _context22.sent;
          _context22.next = 33;
          return StudentGroup.create({
            studentId: student.id,
            groupId: groupId
          });
        case 33:
          groupJoin = _context22.sent;
          if (!(update[0] > 0 && groupJoin)) {
            _context22.next = 41;
            break;
          }
          if (!(students + 1 === numOfMembers)) {
            _context22.next = 38;
            break;
          }
          _context22.next = 38;
          return Group.update({
            status: "FULL"
          }, {
            where: {
              id: id
            }
          });
        case 38:
          return _context22.abrupt("return", {
            status: 0,
            message: "Thêm sinh viên thành công!",
            data: res
          });
        case 41:
          return _context22.abrupt("return", {
            status: 1,
            message: "Thêm vào nhóm thất bại!",
            data: null
          });
        case 42:
          _context22.next = 48;
          break;
        case 44:
          _context22.prev = 44;
          _context22.t0 = _context22["catch"](7);
          console.log("Lỗi: ", _context22.t0.message);
          return _context22.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 48:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[7, 44]]);
  }));
  return function addStudentToGroup(_x32) {
    return _ref25.apply(this, arguments);
  };
}();
module.exports = {
  createLecturerAccount: createLecturerAccount,
  createBulkAccountLecturer: createBulkAccountLecturer,
  getLecturerList: getLecturerList,
  getPaginationLecturer: getPaginationLecturer,
  deleteLecturer: deleteLecturer,
  updateLecturer: updateLecturer,
  deleteManyLecturer: deleteManyLecturer,
  findLecturersByUserNameOrFullName: findLecturersByUserNameOrFullName,
  findLecturersByName: findLecturersByName,
  createTopics: createTopics,
  getPersonalTopics: getPersonalTopics,
  getTerm: getTerm,
  deleteTopic: deleteTopic,
  updateTopic: updateTopic,
  getNotes: getNotes,
  pointGroup: pointGroup,
  getGroupTopic: getGroupTopic,
  getLecturerGroup: getLecturerGroup,
  getReviewStudentGroups: getReviewStudentGroups,
  getGroupEvaluation: getGroupEvaluation,
  chooseLeaderForGroup: chooseLeaderForGroup,
  addStudentToGroup: addStudentToGroup
};