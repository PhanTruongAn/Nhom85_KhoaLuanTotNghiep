"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
var _userService = require("../services/userService");
var _lodash = _interopRequireWildcard(require("lodash"));
var _models = require("../models");
var _express = require("express");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var _require2 = require("../models"),
  Student = _require2.Student,
  Group = _require2.Group,
  Role = _require2.Role,
  Topic = _require2.Topic,
  Lecturer = _require2.Lecturer,
  TermStudent = _require2.TermStudent,
  Term = _require2.Term,
  Note = _require2.Note,
  Major = _require2.Major,
  Evaluation = _require2.Evaluation,
  StudentGroup = _require2.StudentGroup;

// Tạo tài khoản sinh viên
var createStudentAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var existStudent, student, defaultPassword, hashPass, existTermStudent;
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
            message: "Mã sinh viên không hợp lệ!"
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
          return Student.findOne({
            where: {
              username: data.username
            }
          });
        case 9:
          existStudent = _context.sent;
          if (!existStudent) {
            _context.next = 14;
            break;
          }
          student = existStudent;
          _context.next = 19;
          break;
        case 14:
          // Nếu sinh viên chưa tồn tại, tạo sinh viên mới
          defaultPassword = "123";
          hashPass = (0, _userService.hashPassword)(defaultPassword);
          _context.next = 18;
          return Student.create(_objectSpread(_objectSpread({}, data), {}, {
            password: hashPass,
            roleId: 1
          }));
        case 18:
          student = _context.sent;
        case 19:
          _context.next = 21;
          return TermStudent.findOne({
            where: {
              studentId: student.id,
              termId: data.termId
            }
          });
        case 21:
          existTermStudent = _context.sent;
          if (!existTermStudent) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", {
            status: -1,
            message: "Sinh viên này đã tồn tại trong học kỳ này!"
          });
        case 26:
          _context.next = 28;
          return TermStudent.create({
            studentId: student.id,
            termId: data.termId
          });
        case 28:
          return _context.abrupt("return", {
            status: 0,
            message: "Tạo tài khoản sinh viên thành công!"
          });
        case 29:
          _context.next = 34;
          break;
        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            status: -1,
            message: "".concat(_context.t0.message, "!")
          });
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 31]]);
  }));
  return function createStudentAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Tạo nhiều tài khoản sinh viên
var createBulkAccount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var _data$;
    var termId, currentAccounts, usernamesInDb, newAccounts, dataPersist, termStudents, _iterator, _step, account, existTermStudent;
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
          // Lấy termId từ phần tử đầu tiên của data
          termId = (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.termId;
          if (termId) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", {
            status: 1,
            message: "Không tìm thấy thông tin học kỳ!"
          });
        case 5:
          _context2.prev = 5;
          _context2.next = 8;
          return Student.findAll({
            attributes: ["id", "fullName", "username"],
            raw: true
          });
        case 8:
          currentAccounts = _context2.sent;
          // Tạo danh sách tài khoản mới và kiểm tra tồn tại
          usernamesInDb = currentAccounts.map(function (account) {
            return account.username;
          });
          newAccounts = data.filter(function (_ref3) {
            var username = _ref3.username;
            return !usernamesInDb.includes(username);
          }); // Tạo danh sách các tài khoản sinh viên mới
          dataPersist = newAccounts.map(function (value) {
            return {
              fullName: value.fullName,
              username: value.username,
              password: (0, _userService.hashPassword)(value.password),
              roleId: 1
            };
          }); // Thêm tài khoản sinh viên mới vào cơ sở dữ liệu
          _context2.next = 14;
          return Student.bulkCreate(dataPersist);
        case 14:
          termStudents = []; // Kiểm tra từng tài khoản sinh viên (bao gồm cả tài khoản đã tồn tại)
          _iterator = _createForOfIteratorHelper(currentAccounts);
          _context2.prev = 16;
          _iterator.s();
        case 18:
          if ((_step = _iterator.n()).done) {
            _context2.next = 26;
            break;
          }
          account = _step.value;
          _context2.next = 22;
          return TermStudent.findOne({
            where: {
              studentId: account.id,
              termId: termId
            }
          });
        case 22:
          existTermStudent = _context2.sent;
          // Nếu tài khoản chưa tồn tại trong TermStudent, thêm vào danh sách
          if (!existTermStudent) {
            termStudents.push({
              studentId: account.id,
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
          if (!(termStudents.length > 0)) {
            _context2.next = 40;
            break;
          }
          _context2.next = 37;
          return TermStudent.bulkCreate(termStudents);
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
          _context2.t1 = _context2["catch"](5);
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
    }, _callee2, null, [[5, 43], [16, 28, 31, 34]]);
  }));
  return function createBulkAccount(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

// Lấy danh sách sinh viên
var getStudentList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(term) {
    var list;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Student.findAll({
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
              where: {
                id: term
              }
            }]
          });
        case 2:
          list = _context3.sent;
          if (!(list && list.length > 0)) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: list
          });
        case 5:
          return _context3.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: list
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getStudentList(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
// Lấy danh sách phân trang của sinh viên
var getPaginationStudent = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(page, limit, term) {
    var offset, _yield$Student$findAn, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          offset = (page - 1) * limit;
          _context4.next = 4;
          return Student.findAndCountAll({
            attributes: ["id", "username", "fullName", "gender", "email", "phone"],
            include: [{
              model: Group,
              through: {
                attributes: []
              },
              as: "groups",
              attributes: ["id", "groupName"]
            }, {
              model: Term,
              through: {
                attributes: []
              },
              as: "terms",
              attributes: ["id", "name"],
              where: {
                id: term
              }
            }],
            offset: offset,
            limit: limit
          });
        case 4:
          _yield$Student$findAn = _context4.sent;
          count = _yield$Student$findAn.count;
          rows = _yield$Student$findAn.rows;
          totalPages = Math.ceil(count / limit);
          return _context4.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              students: rows
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
  return function getPaginationStudent(_x4, _x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteStudent = /*#__PURE__*/function () {
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
            message: "Id sinh viên hoặc Id học kì không hợp lệ!"
          });
        case 2:
          _context5.next = 4;
          return Student.destroy({
            where: {
              id: data.id
            }
          });
        case 4:
          res = _context5.sent;
          _context5.next = 7;
          return TermStudent.destroy({
            where: {
              studentId: data.id,
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
  return function deleteStudent(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var updateStudent = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    var updateData, res;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          updateData = {
            username: data.username,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            className: (data === null || data === void 0 ? void 0 : data.className) || null,
            typeTraining: (data === null || data === void 0 ? void 0 : data.typeTraining) || null,
            majorId: (data === null || data === void 0 ? void 0 : data.majorId) || null
          };
          _context6.next = 3;
          return Student.update(updateData, {
            where: {
              id: data.id
            }
          });
        case 3:
          res = _context6.sent;
          if (!(res[0] > 0)) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", {
            status: 0,
            message: "Cập nhật thành công!"
          });
        case 8:
          return _context6.abrupt("return", {
            status: -1,
            message: "Cập nhật thất bại!",
            data: null
          });
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateStudent(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteManyStudent = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var result, result2;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(!data && !data.studentId && !data.termId)) {
            _context7.next = 2;
            break;
          }
          return _context7.abrupt("return", {
            status: -1,
            message: "Id sinh viên hoặc Id học kì không hợp lệ!"
          });
        case 2:
          _context7.prev = 2;
          result = Student.destroy({
            where: {
              id: data.studentId
            }
          });
          _context7.next = 6;
          return TermStudent.destroy({
            where: {
              studentId: data.studentId,
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
          _context7.t0 = _context7["catch"](2);
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
    }, _callee7, null, [[2, 14]]);
  }));
  return function deleteManyStudent(_x9) {
    return _ref8.apply(this, arguments);
  };
}();
var findStudentsByUserNameOrFullName = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(term, search) {
    var results;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Student.findAll({
            include: [{
              model: Term,
              through: {
                attributes: []
              },
              as: "terms",
              where: {
                id: term
              }
            }, {
              model: Group,
              through: {
                attributes: []
              },
              as: "groups",
              attributes: ["id", "groupName"]
            }],
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
              students: results
            }
          });
        case 7:
          return _context8.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu!",
            data: {
              students: null
            }
          });
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function findStudentsByUserNameOrFullName(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();
var findStudentsByName = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(page, limit, input) {
    var offset, _yield$Student$findAn2, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          offset = (page - 1) * limit;
          _context9.next = 4;
          return Student.findAndCountAll({
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
          _yield$Student$findAn2 = _context9.sent;
          count = _yield$Student$findAn2.count;
          rows = _yield$Student$findAn2.rows;
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
              students: rows
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
  return function findStudentsByName(_x12, _x13, _x14) {
    return _ref10.apply(this, arguments);
  };
}();
var getStudentGetAllGroup = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(page, limit, termId) {
    var offset, _yield$Group$findAndC, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          offset = (page - 1) * limit;
          _context10.next = 4;
          return Group.findAndCountAll({
            attributes: ["id", "groupName", "numOfMembers", "status"],
            offset: offset,
            limit: limit,
            where: {
              termId: termId
            }
          });
        case 4:
          _yield$Group$findAndC = _context10.sent;
          count = _yield$Group$findAndC.count;
          rows = _yield$Group$findAndC.rows;
          totalPages = Math.ceil(count / limit);
          return _context10.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              groups: rows
            }
          });
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function getStudentGetAllGroup(_x15, _x16, _x17) {
    return _ref11.apply(this, arguments);
  };
}();
var joinGroup = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data) {
    var checkStudentGroup, res, numOfMembers, id, students, isFirstStudent, update, groupJoin;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (data) {
            _context11.next = 2;
            break;
          }
          return _context11.abrupt("return", {
            status: -1,
            message: "Dữ liệu không hợp lệ!"
          });
        case 2:
          _context11.next = 4;
          return StudentGroup.findOne({
            where: {
              studentId: data.studentId
            },
            include: {
              model: Group,
              as: "groups",
              where: {
                termId: data.termId
              } // Kiểm tra nếu nhóm thuộc học kỳ đúng
            }
          });
        case 4:
          checkStudentGroup = _context11.sent;
          if (!checkStudentGroup) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", {
            status: 1,
            message: "Bạn đã tham gia nhóm rồi!"
          });
        case 7:
          _context11.next = 9;
          return Group.findOne({
            where: {
              id: data.groupId,
              termId: data.termId
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
        case 9:
          res = _context11.sent;
          if (res) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", {
            status: 1,
            message: "Nhóm không tồn tại trong học kỳ này!",
            data: null
          });
        case 12:
          numOfMembers = res.numOfMembers, id = res.id;
          students = res.students.length; // Kiểm tra nếu nhóm đã đầy
          if (!(students >= numOfMembers)) {
            _context11.next = 16;
            break;
          }
          return _context11.abrupt("return", {
            status: 1,
            message: "Nhóm đã đầy!"
          });
        case 16:
          // Kiểm tra xem sinh viên có phải là người đầu tiên tham gia nhóm không
          isFirstStudent = students === 0; // Cập nhật sinh viên là trưởng nhóm nếu là sinh viên đầu tiên
          _context11.next = 19;
          return Student.update({
            isLeader: isFirstStudent ? true : false
          }, {
            where: {
              id: data.studentId
            }
          });
        case 19:
          update = _context11.sent;
          _context11.next = 22;
          return StudentGroup.create({
            studentId: data.studentId,
            groupId: data.groupId
          });
        case 22:
          groupJoin = _context11.sent;
          if (!(update[0] > 0 && groupJoin)) {
            _context11.next = 30;
            break;
          }
          if (!(students + 1 === numOfMembers)) {
            _context11.next = 27;
            break;
          }
          _context11.next = 27;
          return Group.update({
            status: "FULL"
          }, {
            where: {
              id: id
            }
          });
        case 27:
          return _context11.abrupt("return", {
            status: 0,
            message: "Tham gia nhóm thành công!",
            data: res
          });
        case 30:
          return _context11.abrupt("return", {
            status: 1,
            message: "Tham gia nhóm thất bại! Không tìm thấy sinh viên.",
            data: null
          });
        case 31:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function joinGroup(_x18) {
    return _ref12.apply(this, arguments);
  };
}();
var getInfoMyGroup = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(studentId, termId) {
    var studentGroups, group;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (studentId) {
            _context12.next = 2;
            break;
          }
          return _context12.abrupt("return", {
            status: -1,
            message: "ID sinh viên không hợp lệ!.",
            data: null
          });
        case 2:
          if (termId) {
            _context12.next = 4;
            break;
          }
          return _context12.abrupt("return", {
            status: -1,
            message: "Học kì không hợp lệ.",
            data: null
          });
        case 4:
          _context12.next = 6;
          return StudentGroup.findAll({
            where: {
              studentId: studentId
            },
            include: [{
              model: Group,
              as: "groups",
              attributes: ["id", "groupName", "status", "topicId", "termId"],
              include: [{
                model: Topic,
                as: "topic",
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              }, {
                model: Student,
                as: "students",
                attributes: ["id", "fullName", "email", "phone", "isLeader", "gender", "username"],
                through: {
                  attributes: []
                }
              }]
            }]
          });
        case 6:
          studentGroups = _context12.sent;
          group = studentGroups.find(function (studentGroup) {
            return studentGroup.groups.termId === Number(termId);
          });
          if (!group) {
            _context12.next = 12;
            break;
          }
          return _context12.abrupt("return", {
            status: 0,
            message: "Lấy thông tin nhóm thành công!",
            data: group.groups
          });
        case 12:
          return _context12.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm trong học kỳ này!",
            data: null
          });
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function getInfoMyGroup(_x19, _x20) {
    return _ref13.apply(this, arguments);
  };
}();
var studentLeaveGroup = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    var res, id, numOfMembers, students, singleMember, student, isLeader, update;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (data) {
            _context13.next = 2;
            break;
          }
          return _context13.abrupt("return", {
            status: -1,
            message: "Dữ liệu không hợp lệ!"
          });
        case 2:
          _context13.next = 4;
          return Group.findOne({
            where: {
              id: data.groupId,
              termId: data.termId
            },
            include: {
              model: Student,
              as: "students"
            }
          });
        case 4:
          res = _context13.sent;
          if (res) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", {
            status: 1,
            message: "Nhóm không tồn tại!",
            data: null
          });
        case 7:
          id = res.id, numOfMembers = res.numOfMembers;
          students = res.students.length;
          if (!(students === 1)) {
            _context13.next = 20;
            break;
          }
          _context13.next = 12;
          return StudentGroup.destroy({
            where: {
              studentId: data.studentId,
              groupId: data.groupId
            }
          });
        case 12:
          singleMember = _context13.sent;
          if (!(singleMember > 0)) {
            _context13.next = 19;
            break;
          }
          _context13.next = 16;
          return Student.update({
            isLeader: false
          }, {
            where: {
              id: data.studentId
            }
          });
        case 16:
          return _context13.abrupt("return", {
            status: 0,
            message: "Rời nhóm thành công!"
          });
        case 19:
          return _context13.abrupt("return", {
            status: -1,
            message: "Rời nhóm thất bại! Không tìm thấy nhóm.",
            data: null
          });
        case 20:
          _context13.next = 22;
          return Student.findOne({
            where: {
              id: data.studentId
            }
          });
        case 22:
          student = _context13.sent;
          isLeader = student.isLeader; // Kiểm tra nếu sinh viên là trưởng nhóm
          if (!isLeader) {
            _context13.next = 26;
            break;
          }
          return _context13.abrupt("return", {
            status: 1,
            message: "Bạn hãy chọn 1 thành viên khác làm nhóm trưởng"
          });
        case 26:
          _context13.next = 28;
          return StudentGroup.destroy({
            where: {
              studentId: data.studentId,
              groupId: data.groupId
            }
          });
        case 28:
          update = _context13.sent;
          if (!(update > 0)) {
            _context13.next = 36;
            break;
          }
          if (!(students - 1 < numOfMembers)) {
            _context13.next = 33;
            break;
          }
          _context13.next = 33;
          return Group.update({
            status: "NOT_FULL"
          }, {
            where: {
              id: id
            }
          });
        case 33:
          return _context13.abrupt("return", {
            status: 0,
            message: "Rời nhóm thành công!"
          });
        case 36:
          return _context13.abrupt("return", {
            status: -1,
            message: "Rời nhóm thất bại! Không tìm thấy sinh viên.",
            data: null
          });
        case 37:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function studentLeaveGroup(_x21) {
    return _ref14.apply(this, arguments);
  };
}();
var removeMemberFromGroup = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data) {
    var groupId, studentId, termId, studentGroup, id, numOfMembers, students, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          groupId = data.groupId, studentId = data.studentId, termId = data.termId;
          if (!(!groupId && !studentId && !termId)) {
            _context14.next = 3;
            break;
          }
          return _context14.abrupt("return", {
            status: -1,
            message: "Thông tin học kì, nhóm hoặc sinh viên cần xóa không hợp lệ!"
          });
        case 3:
          _context14.next = 5;
          return Group.findOne({
            where: {
              id: groupId,
              termId: termId
            },
            include: {
              model: Student,
              as: "students"
            }
          });
        case 5:
          studentGroup = _context14.sent;
          if (studentGroup) {
            _context14.next = 8;
            break;
          }
          return _context14.abrupt("return", {
            status: 1,
            message: "Nhóm không tồn tại!"
          });
        case 8:
          id = studentGroup.id, numOfMembers = studentGroup.numOfMembers;
          students = studentGroup.students.length;
          _context14.next = 12;
          return StudentGroup.destroy({
            where: {
              studentId: studentId,
              groupId: id
            }
          });
        case 12:
          result = _context14.sent;
          _context14.next = 15;
          return Student.update({
            isLeader: false
          }, {
            where: {
              id: studentId
            }
          });
        case 15:
          if (!(students - 1 < numOfMembers)) {
            _context14.next = 18;
            break;
          }
          _context14.next = 18;
          return Group.update({
            status: "NOT_FULL"
          }, {
            where: {
              id: id
            }
          });
        case 18:
          if (!result) {
            _context14.next = 22;
            break;
          }
          return _context14.abrupt("return", {
            status: 0,
            message: "Đã xóa thành viên khỏi nhóm!"
          });
        case 22:
          return _context14.abrupt("return", {
            status: -1,
            message: "Xóa thành viên khỏi nhóm thất bại!"
          });
        case 23:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function removeMemberFromGroup(_x22) {
    return _ref15.apply(this, arguments);
  };
}();
var transferTeamLeader = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data) {
    var leaderId, memberId, leader, member;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (data) {
            _context15.next = 2;
            break;
          }
          return _context15.abrupt("return", {
            status: -1,
            message: "Dữ liệu không hợp lệ!"
          });
        case 2:
          leaderId = data.leaderId, memberId = data.memberId;
          _context15.next = 5;
          return Student.update({
            isLeader: false
          }, {
            where: {
              id: leaderId
            }
          });
        case 5:
          leader = _context15.sent;
          _context15.next = 8;
          return Student.update({
            isLeader: true
          }, {
            where: {
              id: memberId
            }
          });
        case 8:
          member = _context15.sent;
          if (!(leader && member[0] > 0)) {
            _context15.next = 13;
            break;
          }
          return _context15.abrupt("return", {
            status: 0,
            message: "Chuyển quyền nhóm trưởng thành công!"
          });
        case 13:
          return _context15.abrupt("return", {
            status: -1,
            message: "Chuyển quyền nhóm trưởng thất bại!"
          });
        case 14:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function transferTeamLeader(_x23) {
    return _ref16.apply(this, arguments);
  };
}();
var getInfoMyTopic = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(topic) {
    var result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          if (topic) {
            _context16.next = 2;
            break;
          }
          return _context16.abrupt("return", {
            status: -1,
            message: "Dữ liệu không hợp lệ!",
            data: null
          });
        case 2:
          _context16.next = 4;
          return Topic.findOne({
            where: {
              id: topic
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "LecturerId", "lecturerId"]
            },
            include: {
              model: Lecturer,
              as: "lecturer",
              attributes: ["id", "fullName", "email", "phone"]
            }
          });
        case 4:
          result = _context16.sent;
          if (!result) {
            _context16.next = 9;
            break;
          }
          return _context16.abrupt("return", {
            status: 0,
            message: "Lấy thông tin đề tài thành công!",
            data: result
          });
        case 9:
          return _context16.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin đề tài!",
            data: null
          });
        case 10:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function getInfoMyTopic(_x24) {
    return _ref17.apply(this, arguments);
  };
}();
var studentGetAllTopics = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(page, limit, term) {
    var offset, _yield$Topic$findAndC, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          offset = (page - 1) * limit;
          _context17.next = 4;
          return Topic.findAndCountAll({
            attributes: ["id", "title", "quantityGroup", "status", [literal("(SELECT COUNT(*) FROM `Groups` WHERE `Groups`.`topicId` = `Topic`.`id`)"), "groupCount"]],
            where: {
              termId: term
            },
            offset: offset,
            limit: limit,
            include: {
              model: Lecturer,
              as: "lecturer",
              attributes: ["fullName", "gender"]
            }
          });
        case 4:
          _yield$Topic$findAndC = _context17.sent;
          count = _yield$Topic$findAndC.count;
          rows = _yield$Topic$findAndC.rows;
          totalPages = Math.ceil(count / limit);
          return _context17.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              topics: rows
            }
          });
        case 11:
          _context17.prev = 11;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          return _context17.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 15:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 11]]);
  }));
  return function studentGetAllTopics(_x25, _x26, _x27) {
    return _ref18.apply(this, arguments);
  };
}();
var viewDetailsTopic = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(topicId) {
    var result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (topicId) {
            _context18.next = 2;
            break;
          }
          return _context18.abrupt("return", {
            status: -1,
            message: "Dữ liệu không hợp lệ!"
          });
        case 2:
          _context18.next = 4;
          return Topic.findOne({
            where: {
              id: topicId
            },
            include: {
              model: Lecturer,
              as: "lecturer",
              attributes: ["fullName", "email"]
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "lecturerId", "LecturerId"]
            }
          });
        case 4:
          result = _context18.sent;
          if (!result) {
            _context18.next = 9;
            break;
          }
          return _context18.abrupt("return", {
            status: 0,
            message: "Lấy thông tin chi tiết đề tài thành công!",
            data: result
          });
        case 9:
          return _context18.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin đề tài!",
            data: null
          });
        case 10:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function viewDetailsTopic(_x28) {
    return _ref19.apply(this, arguments);
  };
}();
var joinTopic = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(data) {
    var group, topicId, checkTopic, quantityGroup, groupCount, _update;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          if (data.groupId) {
            _context19.next = 2;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Bạn chưa tham gia nhóm!"
          });
        case 2:
          if (data.topicId) {
            _context19.next = 4;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin đề tài!"
          });
        case 4:
          _context19.next = 6;
          return Group.findOne({
            where: {
              id: data.groupId
            }
          });
        case 6:
          group = _context19.sent;
          if (group) {
            _context19.next = 9;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm!"
          });
        case 9:
          topicId = group.topicId; // Kiểm tra nếu nhóm đã có đề tài
          if (!topicId) {
            _context19.next = 12;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Nhóm bạn đã có đề tài rồi. Hãy hủy trước khi đăng ký đề tài mới"
          });
        case 12:
          _context19.next = 14;
          return Topic.findOne({
            where: {
              id: data.topicId
            },
            attributes: ["id", "quantityGroup", [literal("(SELECT COUNT(*) FROM `Groups` WHERE `Groups`.`topicId` = `Topic`.`id`)"), "groupCount"]],
            raw: true // Trả về đối tượng đơn giản
          });
        case 14:
          checkTopic = _context19.sent;
          if (checkTopic) {
            _context19.next = 17;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin đề tài!"
          });
        case 17:
          quantityGroup = checkTopic.quantityGroup, groupCount = checkTopic.groupCount; // Kiểm tra số lượng nhóm đã đăng ký
          if (!(groupCount >= quantityGroup)) {
            _context19.next = 22;
            break;
          }
          return _context19.abrupt("return", {
            status: -1,
            message: "Đề tài này đã đủ nhóm đăng ký!"
          });
        case 22:
          _context19.next = 24;
          return Group.update({
            topicId: data.topicId
          }, {
            where: {
              id: data.groupId
            }
          });
        case 24:
          _update = _context19.sent;
          if (!(_update[0] > 0)) {
            _context19.next = 29;
            break;
          }
          return _context19.abrupt("return", {
            status: 0,
            message: "Đăng ký đề tài thành công!"
          });
        case 29:
          return _context19.abrupt("return", {
            status: -1,
            message: "Đăng ký đề tài thất bại!"
          });
        case 30:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function joinTopic(_x29) {
    return _ref20.apply(this, arguments);
  };
}();
var leaveTopic = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(data) {
    var studentId, groupId, isStudentLeader, updateGroup;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          studentId = data.studentId, groupId = data.groupId;
          if (studentId) {
            _context20.next = 3;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "Thông tin sinh viên không hợp lê!"
          });
        case 3:
          if (groupId) {
            _context20.next = 5;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "Thông tin nhóm không hợp lệ!"
          });
        case 5:
          _context20.next = 7;
          return Student.findOne({
            where: {
              id: studentId
            },
            raw: true
          });
        case 7:
          isStudentLeader = _context20.sent;
          if (isStudentLeader) {
            _context20.next = 10;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin sinh viên!"
          });
        case 10:
          if (isStudentLeader.isLeader) {
            _context20.next = 14;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "Chỉ có nhóm trưởng mới có thể hủy đăng ký đề tài!"
          });
        case 14:
          _context20.next = 16;
          return Group.update({
            topicId: null
          }, {
            where: {
              id: groupId
            }
          });
        case 16:
          updateGroup = _context20.sent;
          if (!(updateGroup[0] > 0)) {
            _context20.next = 21;
            break;
          }
          return _context20.abrupt("return", {
            status: 0,
            message: "Hủy đăng ký đề tài thành công!"
          });
        case 21:
          return _context20.abrupt("return", {
            status: -1,
            message: "Hủy đăng ký đề tài thất bại!"
          });
        case 22:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function leaveTopic(_x30) {
    return _ref21.apply(this, arguments);
  };
}();
var searchTopicWithNameOrLecturer = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(search) {
    var results;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          if (search) {
            _context21.next = 2;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Dữ liệu tìm kiếm không hợp lệ!"
          });
        case 2:
          _context21.next = 4;
          return Topic.findAll({
            where: _defineProperty({}, Op.or, [{
              title: _defineProperty({}, Op.like, "%".concat(search, "%"))
            }, {
              "$lecturer.fullName$": _defineProperty({}, Op.like, "%".concat(search, "%"))
            }]),
            attributes: ["id", "title", "quantityGroup", "status", [literal("(SELECT COUNT(*) FROM `Groups` WHERE `Groups`.`topicId` = `Topic`.`id`)"), "groupCount"]],
            include: [{
              model: Lecturer,
              as: "lecturer",
              attributes: ["fullName", "gender"]
            }]
          });
        case 4:
          results = _context21.sent;
          if ((0, _lodash.isEmpty)(results)) {
            _context21.next = 9;
            break;
          }
          return _context21.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: {
              topics: results
            }
          });
        case 9:
          return _context21.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu!",
            data: {
              topics: null
            }
          });
        case 10:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function searchTopicWithNameOrLecturer(_x31) {
    return _ref22.apply(this, arguments);
  };
}();
var getTerm = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(studentId) {
    var terms, currentDate, currentTerm;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          if (studentId) {
            _context22.next = 3;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Không tìm thấy id sinh viên"
          });
        case 3:
          _context22.next = 5;
          return Term.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: {
              model: Student,
              as: "students",
              attributes: [],
              through: {
                attributes: []
              },
              where: {
                id: studentId
              }
            }
          });
        case 5:
          terms = _context22.sent;
          currentDate = new Date();
          currentTerm = terms.find(function (term) {
            var startDate = new Date(term.startDate);
            var endDate = new Date(term.endDate);
            return currentDate >= startDate && currentDate <= endDate;
          });
          if (!currentTerm) {
            _context22.next = 12;
            break;
          }
          return _context22.abrupt("return", {
            status: 0,
            message: "Lấy thông tin học kì thành công!",
            data: currentTerm
          });
        case 12:
          return _context22.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin học kì hiện tại!",
            data: null
          });
        case 13:
          _context22.next = 19;
          break;
        case 15:
          _context22.prev = 15;
          _context22.t0 = _context22["catch"](0);
          console.log(_context22.t0);
          return _context22.abrupt("return", {
            status: -1,
            message: "L\u1ED7i ".concat(_context22.t0.message, "!")
          });
        case 19:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 15]]);
  }));
  return function getTerm(_x32) {
    return _ref23.apply(this, arguments);
  };
}();
var getNotes = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(termId, roleId) {
    var notes;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          if (!(!termId || !roleId)) {
            _context23.next = 2;
            break;
          }
          return _context23.abrupt("return", {
            status: -1,
            message: "Thiếu dữ liệu học kỳ hoặc vai trò!"
          });
        case 2:
          _context23.prev = 2;
          _context23.next = 5;
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
          notes = _context23.sent;
          if (!(notes && notes.length > 0)) {
            _context23.next = 10;
            break;
          }
          return _context23.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thông báo thành công!",
            data: notes
          });
        case 10:
          return _context23.abrupt("return", {
            status: 1,
            message: "Không tìm thấy thông báo nào!"
          });
        case 11:
          _context23.next = 17;
          break;
        case 13:
          _context23.prev = 13;
          _context23.t0 = _context23["catch"](2);
          console.error("Lỗi khi lấy danh sách thông báo:", _context23.t0);
          return _context23.abrupt("return", {
            status: -1,
            message: "Lỗi hệ thống!",
            data: {
              error: _context23.t0.message || "Có lỗi xảy ra"
            }
          });
        case 17:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[2, 13]]);
  }));
  return function getNotes(_x33, _x34) {
    return _ref24.apply(this, arguments);
  };
}();
var getMajors = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
    var majors;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return Major.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }, {
            raw: true
          });
        case 2:
          majors = _context24.sent;
          if (!(majors && !(0, _lodash.isEmpty)(majors))) {
            _context24.next = 7;
            break;
          }
          return _context24.abrupt("return", {
            status: 0,
            message: "Lấy danh chuyên ngành thành công!",
            data: majors
          });
        case 7:
          return _context24.abrupt("return", {
            status: -1,
            message: "Lấy danh chuyên ngành thất bại!"
          });
        case 8:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function getMajors() {
    return _ref25.apply(this, arguments);
  };
}();
var getEvaluation = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(groupId, termId) {
    var result;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          if (groupId) {
            _context25.next = 2;
            break;
          }
          return _context25.abrupt("return", {
            status: -1,
            message: "Thông tin nhóm không tồn tại!"
          });
        case 2:
          if (termId) {
            _context25.next = 4;
            break;
          }
          return _context25.abrupt("return", {
            status: -1,
            message: "Thông tin học kì không tồn tại!"
          });
        case 4:
          _context25.prev = 4;
          _context25.next = 7;
          return Evaluation.findOne({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            where: {
              groupId: groupId,
              termId: termId
            }
          });
        case 7:
          result = _context25.sent;
          if (!result) {
            _context25.next = 12;
            break;
          }
          return _context25.abrupt("return", {
            status: 0,
            message: "Lấy thông tin điểm số thành công!",
            data: result
          });
        case 12:
          return _context25.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin điểm số!"
          });
        case 13:
          _context25.next = 19;
          break;
        case 15:
          _context25.prev = 15;
          _context25.t0 = _context25["catch"](4);
          console.log("Lỗi: ", _context25.t0.message);
          return _context25.abrupt("return", {
            status: -1,
            message: "L\u1ED7i ch\u1EE9c n\u0103ng!"
          });
        case 19:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[4, 15]]);
  }));
  return function getEvaluation(_x35, _x36) {
    return _ref26.apply(this, arguments);
  };
}();
module.exports = {
  createStudentAccount: createStudentAccount,
  createBulkAccount: createBulkAccount,
  getPaginationStudent: getPaginationStudent,
  getStudentList: getStudentList,
  deleteStudent: deleteStudent,
  updateStudent: updateStudent,
  deleteManyStudent: deleteManyStudent,
  findStudentsByName: findStudentsByName,
  findStudentsByUserNameOrFullName: findStudentsByUserNameOrFullName,
  getStudentGetAllGroup: getStudentGetAllGroup,
  joinGroup: joinGroup,
  getInfoMyGroup: getInfoMyGroup,
  studentLeaveGroup: studentLeaveGroup,
  removeMemberFromGroup: removeMemberFromGroup,
  transferTeamLeader: transferTeamLeader,
  getInfoMyTopic: getInfoMyTopic,
  studentGetAllTopics: studentGetAllTopics,
  viewDetailsTopic: viewDetailsTopic,
  joinTopic: joinTopic,
  leaveTopic: leaveTopic,
  searchTopicWithNameOrLecturer: searchTopicWithNameOrLecturer,
  getTerm: getTerm,
  getNotes: getNotes,
  getMajors: getMajors,
  getEvaluation: getEvaluation
};