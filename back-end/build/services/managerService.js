"use strict";

var _index = _interopRequireDefault(require("../models/index"));
var _lodash = _interopRequireWildcard(require("lodash"));
var _permissionValidate = _interopRequireDefault(require("../validates/permissionValidate"));
var _termValidate = require("../validates/termValidate");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  Op = _require.Op,
  literal = _require.literal,
  fn = _require.fn;
var _require2 = require("../models"),
  Student = _require2.Student,
  Permission = _require2.Permission,
  Group = _require2.Group,
  RolePermission = _require2.RolePermission,
  Topic = _require2.Topic,
  Term = _require2.Term,
  Major = _require2.Major,
  Note = _require2.Note,
  Role = _require2.Role,
  NoteRole = _require2.NoteRole,
  Lecturer = _require2.Lecturer,
  GroupLecturer = _require2.GroupLecturer,
  TermStudent = _require2.TermStudent,
  TermLecturer = _require2.TermLecturer,
  Evaluation = _require2.Evaluation;
var paginationPermission = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(page, limit) {
    var offset, _yield$Permission$fin, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          offset = (page - 1) * limit;
          _context.next = 4;
          return Permission.findAndCountAll({
            attributes: ["id", "apiPath", "description", "method"],
            offset: offset,
            limit: limit
          });
        case 4:
          _yield$Permission$fin = _context.sent;
          count = _yield$Permission$fin.count;
          rows = _yield$Permission$fin.rows;
          totalPages = Math.ceil(count / limit);
          return _context.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              permissions: rows
            }
          });
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function paginationPermission(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllPermission = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var list;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Permission.findAll({
            attributes: ["id", "apiPath", "description", "method"]
          });
        case 2:
          list = _context2.sent;
          if (!(list && list.length > 0)) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: list
          });
        case 5:
          return _context2.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: list
          });
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllPermission() {
    return _ref2.apply(this, arguments);
  };
}();
var createPermission = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var isValidInput, res;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _permissionValidate["default"].checkInput(data);
        case 2:
          isValidInput = _context3.sent;
          if (!(isValidInput.status === 1)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", isValidInput);
        case 7:
          _context3.next = 9;
          return Permission.create(data);
        case 9:
          res = _context3.sent;
          if (!res) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", {
            status: 0,
            message: "Tạo mới quyền hạn thành công!"
          });
        case 14:
          return _context3.abrupt("return", {
            status: -1,
            message: "Tạo mới quyền hạn thành công!"
          });
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createPermission(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePermission = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!data) {
            _context4.next = 11;
            break;
          }
          _context4.next = 3;
          return Permission.update({
            apiPath: data.apiPath,
            description: data.description,
            method: data.method
          }, {
            where: {
              id: data.id
            }
          });
        case 3:
          res = _context4.sent;
          if (!(res[0] > 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", {
            status: 0,
            message: "Cập nhật quyền hạn thành công!"
          });
        case 8:
          return _context4.abrupt("return", {
            status: -1,
            message: "Cập nhật quyền hạn thất bại!"
          });
        case 9:
          _context4.next = 12;
          break;
        case 11:
          return _context4.abrupt("return", {
            status: -1,
            message: "Dữ liệu cập nhật không đúng!"
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function updatePermission(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var deletePermission = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!data.id) {
            _context5.next = 17;
            break;
          }
          _context5.prev = 1;
          _context5.next = 4;
          return Permission.destroy({
            where: {
              id: data.id
            }
          });
        case 4:
          res = _context5.sent;
          if (!res) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", {
            status: 0,
            message: "Xóa quyền hạn thành công!"
          });
        case 9:
          return _context5.abrupt("return", {
            status: 0,
            message: "Không tìm thấy quyền hạn cần xóa!"
          });
        case 10:
          _context5.next = 15;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", {
            status: 1,
            message: "Lỗi khi xóa quyền hạn: " + _context5.t0.message
          });
        case 15:
          _context5.next = 18;
          break;
        case 17:
          return _context5.abrupt("return", {
            status: -1,
            message: "Id quyền hạn không hợp lệ!"
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return function deletePermission(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var findByDescription = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(input) {
    var res;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (input) {
            _context6.next = 2;
            break;
          }
          return _context6.abrupt("return", {
            status: -1,
            message: "Hãy nhập thông tin cần tìm!"
          });
        case 2:
          _context6.next = 4;
          return Permission.findAll({
            where: {
              description: _defineProperty({}, Op.like, "%".concat(input.toLowerCase(), "%"))
            },
            attributes: ["id", "apiPath", "description", "method"]
          });
        case 4:
          res = _context6.sent;
          if ((0, _lodash.isEmpty)(res)) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: res
          });
        case 9:
          return _context6.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu nào trùng khớp!",
            data: []
          });
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function findByDescription(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var getRolePermissions = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var listIdPermission, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (data.id) {
            _context7.next = 2;
            break;
          }
          return _context7.abrupt("return", {
            status: 1,
            message: "Chưa chọn chức vụ!",
            data: null
          });
        case 2:
          listIdPermission = [];
          _context7.next = 5;
          return RolePermission.findAll({
            where: {
              roleId: data.id
            },
            attributes: ["permissionId"]
          });
        case 5:
          result = _context7.sent;
          if (!result) {
            _context7.next = 15;
            break;
          }
          listIdPermission.push.apply(listIdPermission, _toConsumableArray(result.map(function (obj) {
            return obj.permissionId;
          })));
          if (!(listIdPermission.length > 0)) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", {
            status: 0,
            message: "Lấy danh sách quyền hạn thành công!",
            data: listIdPermission
          });
        case 12:
          return _context7.abrupt("return", {
            status: 0,
            message: "Vai trò chưa được gán quyền hạn nào!",
            data: listIdPermission
          });
        case 13:
          _context7.next = 16;
          break;
        case 15:
          return _context7.abrupt("return", {
            status: 1,
            message: "Không tìm thấy quyền hạn nào!",
            data: []
          });
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getRolePermissions(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
var assignPermissionsToRole = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return RolePermission.destroy({
            where: {
              roleId: data.roleId
            }
          });
        case 2:
          _context8.next = 4;
          return RolePermission.bulkCreate(data.permissions);
        case 4:
          res = _context8.sent;
          if (!res) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", {
            status: 0,
            message: "Gán quyền thành công!"
            // data: listIdPermission,
          });
        case 9:
          return _context8.abrupt("return", {
            status: -1,
            message: "Gán quyền thất bại!"
            //  data: listIdPermission,
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function assignPermissionsToRole(_x8) {
    return _ref8.apply(this, arguments);
  };
}();
var createGroupsStudent = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data) {
    var _data, lastGroup, countGroup, groupNameAsNumber, maxGroupsToCreate, groupsToCreate, i, groupName, numOfMembers, status, termId, res;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!(!data.estimateGroupStudent || data.estimateGroupStudent <= 0)) {
            _context9.next = 2;
            break;
          }
          return _context9.abrupt("return", {
            status: -1,
            message: "Số lượng nhóm cần tạo không hợp lệ!"
          });
        case 2:
          _data = []; // Lấy nhóm có groupName lớn nhất trong học kỳ (termId)
          _context9.next = 5;
          return Group.findOne({
            where: {
              termId: data.termId
            },
            // Lọc theo termId để lấy nhóm của học kỳ hiện tại
            order: [["groupName", "DESC"]] // Lấy nhóm có groupName lớn nhất
          });
        case 5:
          lastGroup = _context9.sent;
          countGroup = 0;
          if (!lastGroup) {
            _context9.next = 14;
            break;
          }
          groupNameAsNumber = parseInt(lastGroup.groupName, 10); // Chuyển đổi groupName thành số nguyên
          if (isNaN(groupNameAsNumber)) {
            _context9.next = 13;
            break;
          }
          countGroup = groupNameAsNumber; // Sử dụng số nhóm cuối cùng để tiếp tục tạo nhóm mới
          _context9.next = 14;
          break;
        case 13:
          return _context9.abrupt("return", {
            status: -1,
            message: "Lỗi: groupName không hợp lệ!"
          });
        case 14:
          // Nếu không có nhóm nào, bắt đầu từ nhóm 1
          countGroup = countGroup || 0;

          // Giới hạn số nhóm tạo ra (ví dụ không quá 100 nhóm một lần)
          maxGroupsToCreate = 100;
          groupsToCreate = Math.min(data.estimateGroupStudent, maxGroupsToCreate); // Tạo nhóm mới bắt đầu từ nhóm tiếp theo sau nhóm cuối cùng
          for (i = countGroup + 1; i <= countGroup + groupsToCreate; i++) {
            groupName = i < 10 ? "00".concat(i) : i < 100 ? "0".concat(i) : "".concat(i); // Định dạng tên nhóm
            numOfMembers = data.numOfMembers;
            status = "NOT_FULL";
            termId = data.termId; // Thêm termId vào dữ liệu
            _data.push({
              groupName: groupName,
              numOfMembers: numOfMembers,
              status: status,
              termId: termId
            });
          }
          _context9.next = 20;
          return Group.bulkCreate(_data);
        case 20:
          res = _context9.sent;
          if (!res) {
            _context9.next = 25;
            break;
          }
          return _context9.abrupt("return", {
            status: 0,
            message: "Tạo danh sách nhóm thành công!",
            data: _data
          });
        case 25:
          return _context9.abrupt("return", {
            status: 0,
            message: "Tạo danh sách nhóm thất bại!"
          });
        case 26:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function createGroupsStudent(_x9) {
    return _ref9.apply(this, arguments);
  };
}();
var paginationGroupsStudent = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(page, limit, term) {
    var offset, _yield$Group$findAndC, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (page) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", {
            status: 1,
            message: "Số trang không hợp lệ!"
          });
        case 3:
          if (limit) {
            _context10.next = 5;
            break;
          }
          return _context10.abrupt("return", {
            status: 1,
            message: "Số phần tử của trang không hợp lệ!"
          });
        case 5:
          if (term) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", {
            status: 1,
            message: "Học kì không hợp lệ!"
          });
        case 7:
          offset = (page - 1) * limit;
          _context10.next = 10;
          return Group.findAndCountAll({
            distinct: true,
            attributes: ["id", "groupName", "numOfMembers"],
            offset: offset,
            limit: limit,
            include: [{
              model: Student,
              as: "students",
              through: {
                attributes: []
              },
              attributes: ["id", "fullName", "email", "phone", "isLeader", "gender", "username"]
            }, {
              model: Topic,
              as: "topic",
              attributes: ["id", "title"]
            }, {
              model: Term,
              as: "term",
              attributes: [],
              where: {
                id: term
              }
            }]
          });
        case 10:
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
              groupStudent: rows
            }
          });
        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 21:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 17]]);
  }));
  return function paginationGroupsStudent(_x10, _x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}();
var findGroupByNameOrTopicTitle = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(searchValue) {
    var groups;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (searchValue) {
            _context11.next = 2;
            break;
          }
          return _context11.abrupt("return", {
            status: -1,
            message: "Dữ liệu tìm kiếm không hợp lệ!"
          });
        case 2:
          _context11.prev = 2;
          _context11.next = 5;
          return Group.findAll({
            attributes: ["id", "groupName", "numOfMembers"],
            include: [{
              model: Student,
              as: "students",
              attributes: ["id", "fullName", "email", "phone", "isLeader", "gender", "username"]
            }, {
              model: Topic,
              as: "topic",
              attributes: ["id", "title"]
            }],
            where: _defineProperty({}, Op.or, [{
              groupName: _defineProperty({}, Op.like, "%".concat(searchValue, "%"))
            },
            // Case-insensitive search for groupName
            {
              "$topic.title$": _defineProperty({}, Op.like, "%".concat(searchValue, "%"))
            } // Case-insensitive search for topic title
            ])
          });
        case 5:
          groups = _context11.sent;
          if (!(groups && groups.length > 0)) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: groups
          });
        case 10:
          return _context11.abrupt("return", {
            status: 1,
            message: "Không tìm thấy dữ liệu phù hợp!",
            data: []
          });
        case 11:
          _context11.next = 17;
          break;
        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](2);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[2, 13]]);
  }));
  return function findGroupByNameOrTopicTitle(_x13) {
    return _ref11.apply(this, arguments);
  };
}();

//Lấy số lượng tổng sinh viên có trong database
var countStudent = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(termId) {
    var termExists, _countStudent, countGroup;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (termId) {
            _context12.next = 2;
            break;
          }
          return _context12.abrupt("return", {
            status: -1,
            message: "Học kì không hợp lệ!"
          });
        case 2:
          _context12.prev = 2;
          _context12.next = 5;
          return Term.findOne({
            where: {
              id: termId
            }
          });
        case 5:
          termExists = _context12.sent;
          if (termExists) {
            _context12.next = 8;
            break;
          }
          return _context12.abrupt("return", {
            status: 1,
            message: "Học kì không tồn tại!"
          });
        case 8:
          _context12.next = 10;
          return TermStudent.count({
            where: {
              termId: termId
            }
          });
        case 10:
          _countStudent = _context12.sent;
          _context12.next = 13;
          return Group.count({
            where: {
              termId: termId
            }
          });
        case 13:
          countGroup = _context12.sent;
          return _context12.abrupt("return", {
            status: 0,
            message: "Lấy tổng số lượng sinh viên và tổng số nhóm thành công!",
            data: {
              totalStudent: _countStudent,
              totalGroup: countGroup
            }
          });
        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](2);
          console.error("Có lỗi xảy ra:", _context12.t0);
          return _context12.abrupt("return", {
            status: 1,
            message: "Lấy tổng số lượng sinh viên và tổng số nhóm thất bại!",
            data: null
          });
        case 21:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[2, 17]]);
  }));
  return function countStudent(_x14) {
    return _ref12.apply(this, arguments);
  };
}();
var deleteGroupStudent = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    var res;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (!(!data && !data.id)) {
            _context13.next = 2;
            break;
          }
          return _context13.abrupt("return", {
            status: 1,
            message: "Dữ liệu không hợp lệ!"
          });
        case 2:
          _context13.next = 4;
          return Group.destroy({
            where: {
              id: data.id
            }
          });
        case 4:
          res = _context13.sent;
          if (!res) {
            _context13.next = 9;
            break;
          }
          return _context13.abrupt("return", {
            status: 0,
            message: "Xoá nhóm thành công!"
          });
        case 9:
          return _context13.abrupt("return", {
            status: 0,
            message: "Xoá nhóm thất bại!"
          });
        case 10:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function deleteGroupStudent(_x15) {
    return _ref13.apply(this, arguments);
  };
}();
var createNewTerm = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data) {
    var name, startDate, endDate, endChooseGroupDate, endChooseTopicDate, endDiscussionDate, endPublicResultDate, endPublicTopicDate, endReportDate, startChooseGroupDate, startChooseTopicDate, startDiscussionDate, startPublicResultDate, startPublicTopicDate, startReportDate, fieldsToCheck, fieldNames, validName, isValid, errorMessage, _loop, _i, _fieldsToCheck, isExistTerm, result, rawData;
    return _regeneratorRuntime().wrap(function _callee14$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (data) {
            _context15.next = 2;
            break;
          }
          return _context15.abrupt("return", {
            status: -1,
            message: "Dữ liệu học kì mới không có!"
          });
        case 2:
          name = data.name, startDate = data.startDate, endDate = data.endDate, endChooseGroupDate = data.endChooseGroupDate, endChooseTopicDate = data.endChooseTopicDate, endDiscussionDate = data.endDiscussionDate, endPublicResultDate = data.endPublicResultDate, endPublicTopicDate = data.endPublicTopicDate, endReportDate = data.endReportDate, startChooseGroupDate = data.startChooseGroupDate, startChooseTopicDate = data.startChooseTopicDate, startDiscussionDate = data.startDiscussionDate, startPublicResultDate = data.startPublicResultDate, startPublicTopicDate = data.startPublicTopicDate, startReportDate = data.startReportDate;
          fieldsToCheck = [startDate, endDate, endChooseGroupDate, endChooseTopicDate, endDiscussionDate, endPublicResultDate, endPublicTopicDate, endReportDate, startChooseGroupDate, startChooseTopicDate, startDiscussionDate, startPublicResultDate, startPublicTopicDate, startReportDate];
          fieldNames = {
            startDate: "Ngày bắt đầu",
            endDate: "Ngày kết thúc",
            startChooseGroupDate: "Ngày bắt đầu chọn nhóm",
            endChooseGroupDate: "Ngày kết thúc chọn nhóm",
            startChooseTopicDate: "Ngày bắt đầu chọn đề tài",
            endChooseTopicDate: "Ngày kết thúc chọn đề tài",
            startDiscussionDate: "Ngày bắt đầu thảo luận",
            endDiscussionDate: "Ngày kết thúc thảo luận",
            startReportDate: "Ngày bắt đầu báo cáo",
            endReportDate: "Ngày kết thúc báo cáo",
            startPublicResultDate: "Ngày bắt đầu công bố kết quả",
            endPublicResultDate: "Ngày kết thúc công bố kết quả"
          };
          if (!(name === "")) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", {
            status: -1,
            message: "Tên học kì mới không được trống"
          });
        case 7:
          validName = (0, _termValidate.isValidSemester)(name);
          if (!(validName.status !== 0)) {
            _context15.next = 10;
            break;
          }
          return _context15.abrupt("return", validName);
        case 10:
          isValid = true;
          errorMessage = "";
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var field, fieldName;
            return _regeneratorRuntime().wrap(function _loop$(_context14) {
              while (1) switch (_context14.prev = _context14.next) {
                case 0:
                  field = _fieldsToCheck[_i];
                  if (!(field !== undefined && field !== null && !(0, _termValidate.isFieldDate)(field))) {
                    _context14.next = 6;
                    break;
                  }
                  isValid = false;
                  fieldName = Object.keys(fieldNames).find(function (key) {
                    return fieldNames[key] === field;
                  });
                  errorMessage = "".concat(fieldNames[fieldName], " kh\xF4ng ph\u1EA3i d\u1EA1ng Date!");
                  return _context14.abrupt("return", 1);
                case 6:
                case "end":
                  return _context14.stop();
              }
            }, _loop);
          });
          _i = 0, _fieldsToCheck = fieldsToCheck;
        case 14:
          if (!(_i < _fieldsToCheck.length)) {
            _context15.next = 21;
            break;
          }
          return _context15.delegateYield(_loop(), "t0", 16);
        case 16:
          if (!_context15.t0) {
            _context15.next = 18;
            break;
          }
          return _context15.abrupt("break", 21);
        case 18:
          _i++;
          _context15.next = 14;
          break;
        case 21:
          if (isValid) {
            _context15.next = 23;
            break;
          }
          return _context15.abrupt("return", {
            status: 1,
            message: errorMessage
          });
        case 23:
          _context15.next = 25;
          return Term.findOne({
            where: {
              name: name
            },
            raw: true
          });
        case 25:
          isExistTerm = _context15.sent;
          if (!(isExistTerm && _typeof(isExistTerm) === "object")) {
            _context15.next = 28;
            break;
          }
          return _context15.abrupt("return", {
            status: -1,
            message: "H\u1ECDc k\xEC ".concat(isExistTerm.name, " \u0111\xE3 t\u1ED3n t\u1EA1i trong h\u1EC7 th\u1ED1ng!")
          });
        case 28:
          _context15.next = 30;
          return Term.create({
            name: name,
            startDate: startDate,
            endDate: endDate,
            endChooseGroupDate: endChooseGroupDate,
            endChooseTopicDate: endChooseTopicDate,
            endDiscussionDate: endDiscussionDate,
            endPublicResultDate: endPublicResultDate,
            endPublicTopicDate: endPublicTopicDate,
            endReportDate: endReportDate,
            startChooseGroupDate: startChooseGroupDate,
            startChooseTopicDate: startChooseTopicDate,
            startDiscussionDate: startDiscussionDate,
            startPublicResultDate: startPublicResultDate,
            startPublicTopicDate: startPublicTopicDate,
            startReportDate: startReportDate
          });
        case 30:
          result = _context15.sent;
          if (!(result && _typeof(result) === "object")) {
            _context15.next = 36;
            break;
          }
          rawData = result.get({
            plain: true
          });
          return _context15.abrupt("return", {
            status: 0,
            message: "Tạo học kì mới thành công!",
            data: rawData
          });
        case 36:
          return _context15.abrupt("return", {
            status: 0,
            message: "Tạo học kì mới thất bại!",
            data: null
          });
        case 37:
        case "end":
          return _context15.stop();
      }
    }, _callee14);
  }));
  return function createNewTerm(_x16) {
    return _ref14.apply(this, arguments);
  };
}();
var getTerms = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var terms;
    return _regeneratorRuntime().wrap(function _callee15$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return Term.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            raw: true
          });
        case 2:
          terms = _context16.sent;
          if (!(terms && terms.length > 0)) {
            _context16.next = 5;
            break;
          }
          return _context16.abrupt("return", {
            status: 0,
            message: "Lấy danh sách học kì thành công!",
            data: terms
          });
        case 5:
          return _context16.abrupt("return", {
            status: 1,
            message: "Danh sách học kì trống!",
            data: []
          });
        case 6:
        case "end":
          return _context16.stop();
      }
    }, _callee15);
  }));
  return function getTerms() {
    return _ref15.apply(this, arguments);
  };
}();
var updateTerm = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(newData) {
    var id, update;
    return _regeneratorRuntime().wrap(function _callee16$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          id = newData.id;
          if (id) {
            _context17.next = 3;
            break;
          }
          return _context17.abrupt("return", {
            status: -1,
            message: "Id không hợp lệ (undefinded hoặc null)!"
          });
        case 3:
          _context17.next = 5;
          return Term.update(newData, {
            where: {
              id: id
            }
          });
        case 5:
          update = _context17.sent;
          if (!(update[0] > 0)) {
            _context17.next = 10;
            break;
          }
          return _context17.abrupt("return", {
            status: 0,
            message: "Cập nhật học kì thành công!"
          });
        case 10:
          return _context17.abrupt("return", {
            status: -1,
            message: "Cập nhật học kì thất bại!"
          });
        case 11:
        case "end":
          return _context17.stop();
      }
    }, _callee16);
  }));
  return function updateTerm(_x17) {
    return _ref16.apply(this, arguments);
  };
}();
var createMajor = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(data) {
    var majorName, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          majorName = data.majorName;
          if (majorName) {
            _context18.next = 4;
            break;
          }
          return _context18.abrupt("return", {
            status: -1,
            message: "Tên chuyên ngành không hợp lệ hoặc trống!"
          });
        case 4:
          _context18.next = 6;
          return Major.create({
            majorName: majorName
          });
        case 6:
          result = _context18.sent;
          if (!result) {
            _context18.next = 11;
            break;
          }
          return _context18.abrupt("return", {
            status: 0,
            message: "Tạo mới chuyên nghành thành công!"
          });
        case 11:
          return _context18.abrupt("return", {
            status: -1,
            message: "Tạo mới chuyên nghành thất bại!"
          });
        case 12:
          _context18.next = 18;
          break;
        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](0);
          console.log("Lỗi: ", _context18.t0);
          return _context18.abrupt("return", {
            status: -1,
            message: "L\u1ED7i ".concat(_context18.t0.message, "!")
          });
        case 18:
        case "end":
          return _context18.stop();
      }
    }, _callee17, null, [[0, 14]]);
  }));
  return function createMajor(_x18) {
    return _ref17.apply(this, arguments);
  };
}();
var getMajors = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
    var majors;
    return _regeneratorRuntime().wrap(function _callee18$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return Major.findAll();
        case 2:
          majors = _context19.sent;
          if (!(majors && !(0, _lodash.isEmpty)(majors))) {
            _context19.next = 7;
            break;
          }
          return _context19.abrupt("return", {
            status: 0,
            message: "Lấy danh sách chuyên ngành thành công!",
            data: majors
          });
        case 7:
          return _context19.abrupt("return", {
            status: -1,
            message: "Không tìm thấy danh sách chuyên ngành!",
            data: []
          });
        case 8:
        case "end":
          return _context19.stop();
      }
    }, _callee18);
  }));
  return function getMajors() {
    return _ref18.apply(this, arguments);
  };
}();
var deleteMajor = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(data) {
    var id, isDelete;
    return _regeneratorRuntime().wrap(function _callee19$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          id = data.id;
          if (id) {
            _context20.next = 4;
            break;
          }
          return _context20.abrupt("return", {
            status: -1,
            message: "Không tìm thấy id cần xóa"
          });
        case 4:
          _context20.next = 6;
          return Major.destroy({
            where: {
              id: id
            }
          });
        case 6:
          isDelete = _context20.sent;
          if (!isDelete) {
            _context20.next = 11;
            break;
          }
          return _context20.abrupt("return", {
            status: 0,
            message: "Đã xóa chuyên ngành!"
          });
        case 11:
          return _context20.abrupt("return", {
            status: -1,
            message: "Xóa thất bại!"
          });
        case 12:
          _context20.next = 18;
          break;
        case 14:
          _context20.prev = 14;
          _context20.t0 = _context20["catch"](0);
          console.log("Lỗi: ", _context20.t0.message);
          return _context20.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context20.t0.message)
          });
        case 18:
        case "end":
          return _context20.stop();
      }
    }, _callee19, null, [[0, 14]]);
  }));
  return function deleteMajor(_x19) {
    return _ref19.apply(this, arguments);
  };
}();
var updateMajor = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(data) {
    var update;
    return _regeneratorRuntime().wrap(function _callee20$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          if (data) {
            _context21.next = 3;
            break;
          }
          return _context21.abrupt("return", {
            status: -1,
            message: "Dữ liệu cập nhật không hợp lệ!"
          });
        case 3:
          _context21.next = 5;
          return Major.update(data, {
            where: {
              id: data.id
            }
          });
        case 5:
          update = _context21.sent;
          if (!(update[0] > 0)) {
            _context21.next = 10;
            break;
          }
          return _context21.abrupt("return", {
            status: 0,
            message: "Cập nhật chuyên ngành thành công!"
          });
        case 10:
          return _context21.abrupt("return", {
            status: -1,
            message: "Cập nhật chuyên ngành thất bại!"
          });
        case 11:
          _context21.next = 17;
          break;
        case 13:
          _context21.prev = 13;
          _context21.t0 = _context21["catch"](0);
          console.log("Lỗi: ", _context21.t0.message);
          return _context21.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context21.t0.message)
          });
        case 17:
        case "end":
          return _context21.stop();
      }
    }, _callee20, null, [[0, 13]]);
  }));
  return function updateMajor(_x20) {
    return _ref20.apply(this, arguments);
  };
}();
var createNote = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(data) {
    var termId, title, content, recipient, newNote, roleIds;
    return _regeneratorRuntime().wrap(function _callee21$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          termId = data.termId, title = data.title, content = data.content, recipient = data.recipient;
          if (termId) {
            _context22.next = 4;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Không có dữ liệu học kì!"
          });
        case 4:
          if (!(!title || !content)) {
            _context22.next = 6;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Tiêu đề hoặc nội dung thông báo không hợp lệ!"
          });
        case 6:
          if (recipient) {
            _context22.next = 8;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Không tìm thấy đối tượng cần gửi thông báo!"
          });
        case 8:
          _context22.next = 10;
          return Note.create({
            title: title,
            content: content,
            termId: termId
          });
        case 10:
          newNote = _context22.sent;
          if (newNote) {
            _context22.next = 13;
            break;
          }
          return _context22.abrupt("return", {
            status: -1,
            message: "Tạo thông báo thất bại!"
          });
        case 13:
          // Lưu các vai trò liên quan vào Note
          roleIds = [];
          if (!(recipient === "all")) {
            _context22.next = 18;
            break;
          }
          roleIds = [1, 2]; // Cả student (roleId = 1) và lecturer (roleId = 2)
          _context22.next = 27;
          break;
        case 18:
          if (!(recipient === "student")) {
            _context22.next = 22;
            break;
          }
          roleIds = [1]; // Chỉ student
          _context22.next = 27;
          break;
        case 22:
          if (!(recipient === "lecturer")) {
            _context22.next = 26;
            break;
          }
          roleIds = [2]; // Chỉ lecturer
          _context22.next = 27;
          break;
        case 26:
          return _context22.abrupt("return", {
            status: -1,
            message: "Đối tượng nhận thông báo không hợp lệ!"
          });
        case 27:
          _context22.next = 29;
          return newNote.addRoles(roleIds);
        case 29:
          return _context22.abrupt("return", {
            status: 0,
            message: "Tạo và gửi thông báo thành công!"
          });
        case 32:
          _context22.prev = 32;
          _context22.t0 = _context22["catch"](0);
          console.log("Lỗi: ", _context22.t0.message);
          return _context22.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context22.t0.message)
          });
        case 36:
        case "end":
          return _context22.stop();
      }
    }, _callee21, null, [[0, 32]]);
  }));
  return function createNote(_x21) {
    return _ref21.apply(this, arguments);
  };
}();
var getNotes = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(term) {
    var notes;
    return _regeneratorRuntime().wrap(function _callee22$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          if (term) {
            _context23.next = 2;
            break;
          }
          return _context23.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu học kì!"
          });
        case 2:
          _context23.next = 4;
          return Note.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            where: {
              termId: term
            },
            include: [{
              model: Role,
              as: "roles",
              attributes: [],
              // Bao gồm các vai trò liên quan
              through: {
                attributes: []
              } // Loại bỏ các thuộc tính trung gian
            }]
          });
        case 4:
          notes = _context23.sent;
          if (!(notes && notes.length > 0)) {
            _context23.next = 9;
            break;
          }
          return _context23.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thông báo thành công!",
            data: notes
          });
        case 9:
          return _context23.abrupt("return", {
            status: 1,
            message: "Không tìm thấy danh sách thông báo!"
          });
        case 10:
        case "end":
          return _context23.stop();
      }
    }, _callee22);
  }));
  return function getNotes(_x22) {
    return _ref22.apply(this, arguments);
  };
}();
var deleteNote = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(id) {
    var isDelete;
    return _regeneratorRuntime().wrap(function _callee23$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          if (id) {
            _context24.next = 2;
            break;
          }
          return _context24.abrupt("return", {
            status: -1,
            message: "Không tìm thấy id cần xóa!"
          });
        case 2:
          _context24.next = 4;
          return NoteRole.destroy({
            where: {
              noteId: id
            }
          });
        case 4:
          _context24.next = 6;
          return Note.destroy({
            where: {
              id: id
            }
          });
        case 6:
          isDelete = _context24.sent;
          if (!isDelete) {
            _context24.next = 11;
            break;
          }
          return _context24.abrupt("return", {
            status: 0,
            message: "Xóa thành công!"
          });
        case 11:
          return _context24.abrupt("return", {
            status: -1,
            message: "Xóa thất bại!"
          });
        case 12:
        case "end":
          return _context24.stop();
      }
    }, _callee23);
  }));
  return function deleteNote(_x23) {
    return _ref23.apply(this, arguments);
  };
}();
var updateNote = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(data) {
    var note;
    return _regeneratorRuntime().wrap(function _callee24$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          if (!(!data || !data.id)) {
            _context25.next = 3;
            break;
          }
          return _context25.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin cập nhật!"
          });
        case 3:
          _context25.next = 5;
          return Note.findByPk(data.id);
        case 5:
          note = _context25.sent;
          if (note) {
            _context25.next = 8;
            break;
          }
          return _context25.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông báo để cập nhật!"
          });
        case 8:
          _context25.next = 10;
          return note.update({
            title: data.title,
            content: data.content,
            termId: data.termId
          });
        case 10:
          return _context25.abrupt("return", {
            status: 0,
            message: "Cập nhật thành công!"
          });
        case 13:
          _context25.prev = 13;
          _context25.t0 = _context25["catch"](0);
          console.log("Lỗi: ", _context25.t0.message);
          return _context25.abrupt("return", {
            status: -1,
            message: "L\u1ED7i: ".concat(_context25.t0.message)
          });
        case 17:
        case "end":
          return _context25.stop();
      }
    }, _callee24, null, [[0, 13]]);
  }));
  return function updateNote(_x24) {
    return _ref24.apply(this, arguments);
  };
}();
var getAllLecturerTopics = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(page, limit, term) {
    var offset, _yield$Topic$findAndC, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee25$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          offset = (page - 1) * limit;
          _context26.next = 4;
          return Topic.findAndCountAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "lecturerId", "LecturerId"]
            },
            include: {
              model: Lecturer,
              as: "lecturer",
              attributes: ["id", "fullName", "email", "phone"]
            },
            where: {
              termId: term
            },
            offset: offset,
            limit: limit
          });
        case 4:
          _yield$Topic$findAndC = _context26.sent;
          count = _yield$Topic$findAndC.count;
          rows = _yield$Topic$findAndC.rows;
          totalPages = Math.ceil(count / limit);
          return _context26.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              topics: rows
            }
          });
        case 11:
          _context26.prev = 11;
          _context26.t0 = _context26["catch"](0);
          console.log(_context26.t0);
          return _context26.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 15:
        case "end":
          return _context26.stop();
      }
    }, _callee25, null, [[0, 11]]);
  }));
  return function getAllLecturerTopics(_x25, _x26, _x27) {
    return _ref25.apply(this, arguments);
  };
}();
var findTopicByTitleOrLecturerName = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(term, search) {
    var results;
    return _regeneratorRuntime().wrap(function _callee26$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return Topic.findAll({
            include: [{
              model: Term,
              as: "term",
              where: {
                id: term
              }
            }, {
              model: Lecturer,
              as: "lecturer"
            }],
            where: _defineProperty({}, Op.or, [{
              title: _defineProperty({}, Op.like, "%".concat(search, "%"))
            }, {
              "$lecturer.fullName$": _defineProperty({}, Op.like, "%".concat(search, "%"))
            }]),
            attributes: {
              exclude: ["createdAt", "updatedAt", "lecturerId", "LecturerId"]
            }
          });
        case 3:
          results = _context27.sent;
          if ((0, _lodash.isEmpty)(results)) {
            _context27.next = 8;
            break;
          }
          return _context27.abrupt("return", {
            status: 0,
            message: "Tìm kiếm thành công!",
            data: {
              topics: results
            }
          });
        case 8:
          return _context27.abrupt("return", {
            status: -1,
            message: "Không tìm thấy dữ liệu!",
            data: {
              topics: null
            }
          });
        case 9:
          _context27.next = 15;
          break;
        case 11:
          _context27.prev = 11;
          _context27.t0 = _context27["catch"](0);
          console.log("Lỗi: ", _context27.t0.message);
          return _context27.abrupt("return", {
            status: -1,
            message: "Đã xảy ra lỗi khi tìm kiếm dữ liệu.",
            data: {
              topics: null
            }
          });
        case 15:
        case "end":
          return _context27.stop();
      }
    }, _callee26, null, [[0, 11]]);
  }));
  return function findTopicByTitleOrLecturerName(_x28, _x29) {
    return _ref26.apply(this, arguments);
  };
}();
var assignTopicToGroup = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(data) {
    var groupName, topicId, group, topic, numOfGroup, update;
    return _regeneratorRuntime().wrap(function _callee27$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          groupName = data.groupName, topicId = data.topicId;
          if (!(!groupName || !topicId)) {
            _context28.next = 3;
            break;
          }
          return _context28.abrupt("return", {
            status: -1,
            message: "Không tìm thấy tên nhóm hoặc đề tài!"
          });
        case 3:
          _context28.prev = 3;
          _context28.next = 6;
          return Group.findOne({
            where: {
              groupName: groupName
            },
            raw: true
          });
        case 6:
          group = _context28.sent;
          _context28.next = 9;
          return Topic.findOne({
            where: {
              id: topicId
            },
            raw: true
          });
        case 9:
          topic = _context28.sent;
          if (group) {
            _context28.next = 12;
            break;
          }
          return _context28.abrupt("return", {
            status: -1,
            message: "Tên nhóm sai hoặc không tồn tại!"
          });
        case 12:
          if (topic) {
            _context28.next = 14;
            break;
          }
          return _context28.abrupt("return", {
            status: -1,
            message: "Đề tài không tồn tại!"
          });
        case 14:
          _context28.next = 16;
          return Group.findAll({
            where: {
              topicId: topic.id
            }
          });
        case 16:
          numOfGroup = _context28.sent;
          if (!group.topicId) {
            _context28.next = 19;
            break;
          }
          return _context28.abrupt("return", {
            status: -1,
            message: "Nhóm này đã có đề tài!"
          });
        case 19:
          if (!(numOfGroup && numOfGroup.length === topic.quantityGroup)) {
            _context28.next = 21;
            break;
          }
          return _context28.abrupt("return", {
            status: -1,
            message: "Đề tài này đã đủ số lượng nhóm!"
          });
        case 21:
          _context28.next = 23;
          return Group.update({
            topicId: topicId
          }, {
            where: {
              id: group.id
            }
          });
        case 23:
          update = _context28.sent;
          if (!(update[0] > 0)) {
            _context28.next = 28;
            break;
          }
          return _context28.abrupt("return", {
            status: 0,
            message: "G\xE1n \u0111\u1EC1 t\xE0i th\xE0nh c\xF4ng cho nh\xF3m ".concat(group.groupName, "!")
          });
        case 28:
          return _context28.abrupt("return", {
            status: -1,
            message: "G\xE1n \u0111\u1EC1 t\xE0i th\u1EA5t b\u1EA1i!"
          });
        case 29:
          _context28.next = 35;
          break;
        case 31:
          _context28.prev = 31;
          _context28.t0 = _context28["catch"](3);
          console.log("Lỗi: ", _context28.t0.message);
          return _context28.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 35:
        case "end":
          return _context28.stop();
      }
    }, _callee27, null, [[3, 31]]);
  }));
  return function assignTopicToGroup(_x30) {
    return _ref27.apply(this, arguments);
  };
}();
var handleCreateGroupLecturer = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(data) {
    var lecturer1, lecturer2, lecturer1Record, lecturer2Record, latestGroup, groupNumber, match, fullNameLecturer1, fullNameLecturer2, groupName, group;
    return _regeneratorRuntime().wrap(function _callee28$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          lecturer1 = data.lecturer1, lecturer2 = data.lecturer2;
          console.log("CheckL ", data);
          if (!(!lecturer1 || !lecturer2)) {
            _context29.next = 4;
            break;
          }
          return _context29.abrupt("return", {
            status: -1,
            message: "Mỗi nhóm phải có đủ 2 giảng viên!"
          });
        case 4:
          _context29.prev = 4;
          _context29.next = 7;
          return Lecturer.findOne({
            attributes: ["id", "fullName", "username", "phone", "email", "groupLecturerId"],
            where: {
              id: lecturer1
            }
          });
        case 7:
          lecturer1Record = _context29.sent;
          _context29.next = 10;
          return Lecturer.findOne({
            attributes: ["id", "fullName", "username", "phone", "email", "groupLecturerId"],
            where: {
              id: lecturer2
            }
          });
        case 10:
          lecturer2Record = _context29.sent;
          if (!(lecturer1Record.groupLecturerId || lecturer2Record.groupLecturerId)) {
            _context29.next = 13;
            break;
          }
          return _context29.abrupt("return", {
            status: -1,
            message: "Một hoặc cả hai giảng viên đã có nhóm, không thể tạo nhóm mới."
          });
        case 13:
          _context29.next = 15;
          return GroupLecturer.findOne({
            attributes: ["name"],
            order: [["createdAt", "DESC"]]
          });
        case 15:
          latestGroup = _context29.sent;
          groupNumber = 1;
          if (latestGroup) {
            match = latestGroup.name.match(/^Nhóm (\d+)/);
            if (match) {
              groupNumber = parseInt(match[1], 10) + 1;
            }
          }
          fullNameLecturer1 = lecturer1Record.fullName;
          fullNameLecturer2 = lecturer2Record.fullName;
          groupName = "Nh\xF3m ".concat(groupNumber, " - ").concat(fullNameLecturer1, " & ").concat(fullNameLecturer2);
          _context29.next = 23;
          return GroupLecturer.create({
            name: groupName,
            numOfMembers: 2
          });
        case 23:
          group = _context29.sent;
          _context29.next = 26;
          return lecturer1Record.update({
            groupLecturerId: group.id
          });
        case 26:
          _context29.next = 28;
          return lecturer2Record.update({
            groupLecturerId: group.id
          });
        case 28:
          return _context29.abrupt("return", {
            status: 0,
            message: "Tạo nhóm thành công!"
          });
        case 31:
          _context29.prev = 31;
          _context29.t0 = _context29["catch"](4);
          console.error("Lỗi khi tạo nhóm: ", _context29.t0.message);
          return _context29.abrupt("return", {
            status: -1,
            message: "Đã xảy ra lỗi khi tạo nhóm!"
          });
        case 35:
        case "end":
          return _context29.stop();
      }
    }, _callee28, null, [[4, 31]]);
  }));
  return function handleCreateGroupLecturer(_x31) {
    return _ref28.apply(this, arguments);
  };
}();
var getGroupLecturer = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
    var groups;
    return _regeneratorRuntime().wrap(function _callee29$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return GroupLecturer.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            include: [{
              model: Lecturer,
              as: "lecturers",
              attributes: ["id", "username", "fullName", "email", "phone"]
            }, {
              model: Group,
              as: "reviewGroups",
              attributes: ["id"]
            }]
          });
        case 3:
          groups = _context30.sent;
          if (!(groups && groups.length > 0)) {
            _context30.next = 8;
            break;
          }
          return _context30.abrupt("return", {
            status: 0,
            message: "Lấy danh sách nhóm giảng viên thành công!",
            groups: groups
          });
        case 8:
          return _context30.abrupt("return", {
            status: -1,
            message: "Không tìm thấy nhóm giảng viên nào!",
            groups: []
          });
        case 9:
          _context30.next = 15;
          break;
        case 11:
          _context30.prev = 11;
          _context30.t0 = _context30["catch"](0);
          console.error("Lỗi: ", _context30.t0.message);
          return _context30.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 15:
        case "end":
          return _context30.stop();
      }
    }, _callee29, null, [[0, 11]]);
  }));
  return function getGroupLecturer() {
    return _ref29.apply(this, arguments);
  };
}();
var paginationGroupsWithoutGroupLecturer = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(page, limit) {
    var offset, _yield$Group$findAndC2, count, rows, totalPages;
    return _regeneratorRuntime().wrap(function _callee30$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          if (page) {
            _context31.next = 3;
            break;
          }
          return _context31.abrupt("return", {
            status: 1,
            message: "Số trang không hợp lệ!"
          });
        case 3:
          if (limit) {
            _context31.next = 5;
            break;
          }
          return _context31.abrupt("return", {
            status: 1,
            message: "Số phần tử của trang không hợp lệ!"
          });
        case 5:
          offset = (page - 1) * limit;
          _context31.next = 8;
          return Group.findAndCountAll({
            distinct: true,
            attributes: ["id", "groupName", "numOfMembers"],
            where: {
              groupLecturerId: null
            },
            offset: offset,
            limit: limit,
            include: [{
              model: Student,
              as: "students",
              attributes: [],
              required: true
            }, {
              model: Topic,
              as: "topic",
              attributes: ["id", "title"],
              required: true
            }]
          });
        case 8:
          _yield$Group$findAndC2 = _context31.sent;
          count = _yield$Group$findAndC2.count;
          rows = _yield$Group$findAndC2.rows;
          totalPages = Math.ceil(count / limit);
          return _context31.abrupt("return", {
            status: 0,
            message: "Lấy danh sách thành công!",
            data: {
              totalRows: count,
              totalPages: totalPages,
              groupStudent: rows
            }
          });
        case 15:
          _context31.prev = 15;
          _context31.t0 = _context31["catch"](0);
          console.log("Lỗi: >>>>>>>>", _context31.t0.message);
          return _context31.abrupt("return", {
            status: -1,
            message: "Lấy danh sách thất bại!",
            data: null
          });
        case 19:
        case "end":
          return _context31.stop();
      }
    }, _callee30, null, [[0, 15]]);
  }));
  return function paginationGroupsWithoutGroupLecturer(_x32, _x33) {
    return _ref30.apply(this, arguments);
  };
}();
var assignGroupLecturer = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31(data) {
    var groupLecturerId, groupIds, groupLecturer;
    return _regeneratorRuntime().wrap(function _callee31$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          groupLecturerId = data.groupLecturerId, groupIds = data.groupIds;
          if (groupLecturerId) {
            _context32.next = 3;
            break;
          }
          return _context32.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin nhóm giảng viên!"
          });
        case 3:
          if (!(!groupIds || !Array.isArray(groupIds) || groupIds.length === 0)) {
            _context32.next = 5;
            break;
          }
          return _context32.abrupt("return", {
            status: -1,
            message: "Không tìm thấy thông tin nhóm học sinh!"
          });
        case 5:
          _context32.prev = 5;
          _context32.next = 8;
          return GroupLecturer.findOne({
            where: {
              id: groupLecturerId
            }
          });
        case 8:
          groupLecturer = _context32.sent;
          if (groupLecturer) {
            _context32.next = 11;
            break;
          }
          return _context32.abrupt("return", {
            status: -1,
            message: "Không tìm nhóm giảng viên trong học kì này!"
          });
        case 11:
          _context32.next = 13;
          return Group.update({
            groupLecturerId: groupLecturerId
          }, {
            where: {
              id: groupIds
            }
          });
        case 13:
          return _context32.abrupt("return", {
            status: 0,
            message: "Phân công nhóm giảng viên thành công!"
          });
        case 16:
          _context32.prev = 16;
          _context32.t0 = _context32["catch"](5);
          console.log("Lỗi: >>>>>>>>", _context32.t0.message);
          return _context32.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 20:
        case "end":
          return _context32.stop();
      }
    }, _callee31, null, [[5, 16]]);
  }));
  return function assignGroupLecturer(_x34) {
    return _ref31.apply(this, arguments);
  };
}();
var deleteLecturerGroup = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(data) {
    var id, res;
    return _regeneratorRuntime().wrap(function _callee32$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          id = data.id;
          if (id) {
            _context33.next = 3;
            break;
          }
          return _context33.abrupt("return", {
            status: -1,
            message: "Id nhóm giảng viên không hợp lệ!"
          });
        case 3:
          _context33.prev = 3;
          _context33.next = 6;
          return GroupLecturer.destroy({
            where: {
              id: id
            }
          });
        case 6:
          res = _context33.sent;
          if (!(res > 0)) {
            _context33.next = 11;
            break;
          }
          return _context33.abrupt("return", {
            status: 0,
            message: "Xoá nhóm thành công!"
          });
        case 11:
          return _context33.abrupt("return", {
            status: 0,
            message: "Xoá nhóm thất bại, không tìm thấy nhóm để xóa!"
          });
        case 12:
          _context33.next = 18;
          break;
        case 14:
          _context33.prev = 14;
          _context33.t0 = _context33["catch"](3);
          console.log("Lỗi: >>>>>>>>", _context33.t0.message);
          return _context33.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 18:
        case "end":
          return _context33.stop();
      }
    }, _callee32, null, [[3, 14]]);
  }));
  return function deleteLecturerGroup(_x35) {
    return _ref32.apply(this, arguments);
  };
}();
var deleteLecturerFromGroup = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(data) {
    var lecturerId, lecturer, group, groupName, _groupName$split, _groupName$split2, prefix, lecturers, nameParts, updatedNameParts, updatedGroupName;
    return _regeneratorRuntime().wrap(function _callee33$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          lecturerId = data.lecturerId;
          if (lecturerId) {
            _context34.next = 3;
            break;
          }
          return _context34.abrupt("return", {
            status: -1,
            message: "Không tìm thấy ID của giảng viên!"
          });
        case 3:
          _context34.prev = 3;
          _context34.next = 6;
          return Lecturer.findOne({
            where: {
              id: lecturerId
            }
          });
        case 6:
          lecturer = _context34.sent;
          if (lecturer) {
            _context34.next = 9;
            break;
          }
          return _context34.abrupt("return", {
            status: -1,
            message: "Giảng viên không tồn tại!"
          });
        case 9:
          _context34.next = 11;
          return GroupLecturer.findOne({
            where: {
              id: lecturer.groupLecturerId
            }
          });
        case 11:
          group = _context34.sent;
          if (group) {
            _context34.next = 14;
            break;
          }
          return _context34.abrupt("return", {
            status: -1,
            message: "Nhóm không tồn tại!"
          });
        case 14:
          // Lấy tên nhóm và tách tên giảng viên
          groupName = group.name; // Example: "Nhóm 1 - Văn Hê & Trường An"
          _groupName$split = groupName.split(" - "), _groupName$split2 = _slicedToArray(_groupName$split, 2), prefix = _groupName$split2[0], lecturers = _groupName$split2[1];
          nameParts = lecturers.split(" & "); // Xóa tên giảng viên khỏi tên nhóm
          updatedNameParts = nameParts.filter(function (name) {
            return name !== lecturer.fullName;
          }); // Nếu chỉ còn một giảng viên, không cần dấu "&"
          updatedGroupName = "";
          if (updatedNameParts.length === 1) {
            updatedGroupName = "".concat(prefix, " - ").concat(updatedNameParts[0]);
          } else if (updatedNameParts.length > 1) {
            updatedGroupName = "".concat(prefix, " - ").concat(updatedNameParts.join(" & "));
          }
          _context34.next = 22;
          return group.update({
            name: updatedGroupName
          });
        case 22:
          _context34.next = 24;
          return lecturer.update({
            groupLecturerId: null
          });
        case 24:
          return _context34.abrupt("return", {
            status: 0,
            message: "Giảng viên đã được xóa khỏi nhóm!"
          });
        case 27:
          _context34.prev = 27;
          _context34.t0 = _context34["catch"](3);
          console.error("Lỗi: ", _context34.t0.message);
          return _context34.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 31:
        case "end":
          return _context34.stop();
      }
    }, _callee33, null, [[3, 27]]);
  }));
  return function deleteLecturerFromGroup(_x36) {
    return _ref33.apply(this, arguments);
  };
}();
var addLecturerToGroup = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(data) {
    var username, groupId, lecturer, group, groupName, _groupName$split3, _groupName$split4, prefix, lecturers, nameParts, updatedGroupName;
    return _regeneratorRuntime().wrap(function _callee34$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          username = data.username, groupId = data.groupId;
          if (!(!username || !groupId)) {
            _context35.next = 3;
            break;
          }
          return _context35.abrupt("return", {
            status: -1,
            message: "Thiếu thông tin giảng viên hoặc nhóm!"
          });
        case 3:
          _context35.prev = 3;
          _context35.next = 6;
          return Lecturer.findOne({
            where: {
              username: username
            }
          });
        case 6:
          lecturer = _context35.sent;
          if (lecturer) {
            _context35.next = 9;
            break;
          }
          return _context35.abrupt("return", {
            status: -1,
            message: "Giảng viên không tồn tại!"
          });
        case 9:
          _context35.next = 11;
          return GroupLecturer.findOne({
            where: {
              id: groupId
            }
          });
        case 11:
          group = _context35.sent;
          if (group) {
            _context35.next = 14;
            break;
          }
          return _context35.abrupt("return", {
            status: -1,
            message: "Nhóm không tồn tại!"
          });
        case 14:
          if (!lecturer.groupLecturerId) {
            _context35.next = 16;
            break;
          }
          return _context35.abrupt("return", {
            status: -1,
            message: "Giảng viên đã có nhóm, không thể thêm vào nhóm mới."
          });
        case 16:
          _context35.next = 18;
          return lecturer.update({
            groupLecturerId: group.id
          });
        case 18:
          groupName = group.name;
          _groupName$split3 = groupName.split(" - "), _groupName$split4 = _slicedToArray(_groupName$split3, 2), prefix = _groupName$split4[0], lecturers = _groupName$split4[1];
          nameParts = lecturers.split(" & ");
          if (nameParts.includes(lecturer.fullName)) {
            _context35.next = 26;
            break;
          }
          nameParts.push(lecturer.fullName);
          updatedGroupName = "".concat(prefix, " - ").concat(nameParts.join(" & "));
          _context35.next = 26;
          return group.update({
            name: updatedGroupName
          });
        case 26:
          return _context35.abrupt("return", {
            status: 0,
            message: "Giảng viên đã được thêm vào nhóm!"
          });
        case 29:
          _context35.prev = 29;
          _context35.t0 = _context35["catch"](3);
          console.error("Lỗi khi thêm giảng viên vào nhóm: ", _context35.t0.message);
          return _context35.abrupt("return", {
            status: -1,
            message: "Đã xảy ra lỗi khi thêm giảng viên vào nhóm!"
          });
        case 33:
        case "end":
          return _context35.stop();
      }
    }, _callee34, null, [[3, 29]]);
  }));
  return function addLecturerToGroup(_x37) {
    return _ref34.apply(this, arguments);
  };
}();
var convertToGrade = function convertToGrade(averagePoint) {
  if (averagePoint >= 9.0) return "A+"; // A+
  if (averagePoint >= 8.5) return "A"; // A
  if (averagePoint >= 8.0) return "B+"; // B+
  if (averagePoint >= 7.0) return "B"; // B
  if (averagePoint >= 6.0) return "C+"; // C+
  if (averagePoint >= 5.5) return "C"; // C
  if (averagePoint >= 5.0) return "D+"; // D+
  if (averagePoint >= 4.0) return "D"; // D
  return "F"; // F
};
var getStatistics = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(termId) {
    var whereCondition, totalStudents, totalLecturers, totalGroupsStudent, totalTopics, totalGroupsLecturer, totalMajors, evaluations, gradeCounts;
    return _regeneratorRuntime().wrap(function _callee35$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          if (termId) {
            _context36.next = 2;
            break;
          }
          return _context36.abrupt("return", {
            status: -1,
            message: "Học kì trống hoặc không hợp lệ!"
          });
        case 2:
          whereCondition = termId ? {
            termId: termId
          } : {};
          _context36.prev = 3;
          _context36.next = 6;
          return TermStudent.count({
            where: whereCondition
          });
        case 6:
          totalStudents = _context36.sent;
          _context36.next = 9;
          return TermLecturer.count({
            where: whereCondition
          });
        case 9:
          totalLecturers = _context36.sent;
          _context36.next = 12;
          return Group.count({
            where: whereCondition
          });
        case 12:
          totalGroupsStudent = _context36.sent;
          _context36.next = 15;
          return Topic.count({
            where: whereCondition
          });
        case 15:
          totalTopics = _context36.sent;
          _context36.next = 18;
          return GroupLecturer.count();
        case 18:
          totalGroupsLecturer = _context36.sent;
          _context36.next = 21;
          return Major.findAll({
            attributes: ["majorName", [fn("COUNT", literal("Students.id")), "studentCount"]],
            include: [{
              model: Student,
              attributes: [],
              include: {
                model: TermStudent,
                attributes: [],
                where: {
                  termId: termId
                }
              }
            }],
            group: ["Major.id"]
          });
        case 21:
          totalMajors = _context36.sent;
          _context36.next = 24;
          return Evaluation.findAll({
            where: whereCondition
          });
        case 24:
          evaluations = _context36.sent;
          gradeCounts = {
            "A+": 0,
            A: 0,
            "B+": 0,
            B: 0,
            "C+": 0,
            C: 0,
            "D+": 0,
            D: 0,
            F: 0
          };
          evaluations.forEach(function (evaluation) {
            var grade = convertToGrade(evaluation.averagePoint);
            gradeCounts[grade]++;
          });
          return _context36.abrupt("return", {
            status: 0,
            message: "Thành công!",
            data: {
              totalStudents: totalStudents,
              totalLecturers: totalLecturers,
              totalGroupsStudent: totalGroupsStudent,
              totalTopics: totalTopics,
              totalGroupsLecturer: totalGroupsLecturer,
              totalMajors: totalMajors,
              gradeCounts: gradeCounts
            }
          });
        case 30:
          _context36.prev = 30;
          _context36.t0 = _context36["catch"](3);
          console.error("Lỗi: ", _context36.t0.message);
          return _context36.abrupt("return", {
            status: -1,
            message: "Lỗi chức năng!"
          });
        case 34:
        case "end":
          return _context36.stop();
      }
    }, _callee35, null, [[3, 30]]);
  }));
  return function getStatistics(_x38) {
    return _ref35.apply(this, arguments);
  };
}();
module.exports = {
  updateMajor: updateMajor,
  deleteMajor: deleteMajor,
  paginationPermission: paginationPermission,
  getAllPermission: getAllPermission,
  createPermission: createPermission,
  updatePermission: updatePermission,
  deletePermission: deletePermission,
  findByDescription: findByDescription,
  getRolePermissions: getRolePermissions,
  assignPermissionsToRole: assignPermissionsToRole,
  createGroupsStudent: createGroupsStudent,
  paginationGroupsStudent: paginationGroupsStudent,
  countStudent: countStudent,
  deleteGroupStudent: deleteGroupStudent,
  createNewTerm: createNewTerm,
  getTerms: getTerms,
  updateTerm: updateTerm,
  createMajor: createMajor,
  getMajors: getMajors,
  createNote: createNote,
  getNotes: getNotes,
  deleteNote: deleteNote,
  updateNote: updateNote,
  getAllLecturerTopics: getAllLecturerTopics,
  findTopicByTitleOrLecturerName: findTopicByTitleOrLecturerName,
  assignTopicToGroup: assignTopicToGroup,
  findGroupByNameOrTopicTitle: findGroupByNameOrTopicTitle,
  handleCreateGroupLecturer: handleCreateGroupLecturer,
  getGroupLecturer: getGroupLecturer,
  paginationGroupsWithoutGroupLecturer: paginationGroupsWithoutGroupLecturer,
  assignGroupLecturer: assignGroupLecturer,
  deleteLecturerGroup: deleteLecturerGroup,
  deleteLecturerFromGroup: deleteLecturerFromGroup,
  addLecturerToGroup: addLecturerToGroup,
  getStatistics: getStatistics
};