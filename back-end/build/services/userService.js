"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _index = _interopRequireDefault(require("../models/index"));
var _lodash = _interopRequireDefault(require("lodash"));
var _jwtAction = _interopRequireDefault(require("../middleware/jwtAction"));
var _roleService = _interopRequireDefault(require("./roleService"));
var _sequelize = require("sequelize");
var _mailer = require("../utils/mailer");
var _commonUtils = _interopRequireDefault(require("../utils/commonUtils"));
var _templateHtml = _interopRequireDefault(require("../utils/templateHtml"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Salt Bcrypt
var salt = _bcryptjs["default"].genSaltSync(10);

//Models Database
var _require = require("../models"),
  Student = _require.Student,
  Lecturer = _require.Lecturer,
  Role = _require.Role;
// Hash Password
var hashPassword = function hashPassword(password) {
  var hashPassword = _bcryptjs["default"].hashSync(password, salt);
  return hashPassword;
};

// Tìm tài khoản dựa vào username
var findAccount = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(username) {
    var student, lecturer;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Student.findOne({
            where: {
              username: username
            },
            // include: {
            //   model: Major,
            //   as: "major",
            //   attributes: { exclude: ["createdAt", "updatedAt"] },
            // },
            attributes: {
              exclude: ["createdAt", "updatedAt", "MajorId", "RoleId"]
            }
          });
        case 2:
          student = _context.sent;
          if (!student) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", student);
        case 5:
          _context.next = 7;
          return Lecturer.findOne({
            where: {
              username: username
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "RoleId"]
            }
          });
        case 7:
          lecturer = _context.sent;
          if (!lecturer) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", lecturer);
        case 10:
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function findAccount(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getEmailByUserName = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var res, _data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!data && !data.username)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", {
            status: 1,
            message: "Hãy nhập username!"
          });
        case 2:
          _context2.next = 4;
          return findAccount(data.username);
        case 4:
          res = _context2.sent;
          if (!res) {
            _context2.next = 10;
            break;
          }
          _data = _lodash["default"].pick(res, ["email"]);
          return _context2.abrupt("return", {
            status: 0,
            message: "Tìm tài khoản thành công!",
            data: _data
          });
        case 10:
          return _context2.abrupt("return", {
            status: -1,
            message: "Tài khoản không tồn tại!",
            data: null
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getEmailByUserName(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
//Chức năng đăng nhập
var login = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var username, password, user, role, comparePassword, payload, accessToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          username = data.username;
          password = data.password;
          if (!(!username || !password)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", {
            status: -1,
            message: "Hãy điền đầy đủ thông tin!",
            data: null
          });
        case 4:
          _context3.next = 6;
          return findAccount(username);
        case 6:
          user = _context3.sent;
          _context3.next = 9;
          return Role.findOne({
            where: {
              id: user.roleId
            },
            attributes: ["id", "name", "description"]
          });
        case 9:
          role = _context3.sent;
          if (!user) {
            _context3.next = 19;
            break;
          }
          comparePassword = _bcryptjs["default"].compareSync(password, user.password);
          if (!comparePassword) {
            _context3.next = 18;
            break;
          }
          // const role = await roleService.getRoleWithId(user);
          payload = {
            username: user.username,
            role: role
          };
          accessToken = _jwtAction["default"].createToken(payload);
          return _context3.abrupt("return", {
            status: 0,
            message: "Đăng nhập thành công!",
            data: {
              accessToken: accessToken
            }
          });
        case 18:
          return _context3.abrupt("return", {
            status: -1,
            message: "Sai mật khẩu",
            data: null
          });
        case 19:
          return _context3.abrupt("return", {
            status: -1,
            message: "Tài khoản không tồn tài!",
            data: null
          });
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function login(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var changePassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var username, currentPassword, newPassword, roleName, student, comparePassword, hashPass, res, lecturer, comparePassword2, _hashPass, _res;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          username = data.username, currentPassword = data.currentPassword, newPassword = data.newPassword, roleName = data.roleName;
          console.log(username, currentPassword, newPassword, roleName);
          _context4.t0 = roleName;
          _context4.next = _context4.t0 === "STUDENT" ? 6 : 23;
          break;
        case 6:
          _context4.next = 8;
          return Student.findOne({
            where: {
              username: username
            }
          });
        case 8:
          student = _context4.sent;
          comparePassword = _bcryptjs["default"].compareSync(currentPassword, student.password);
          if (comparePassword) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", {
            status: 1,
            message: "Mật khẩu cũ không đúng!"
          });
        case 14:
          hashPass = hashPassword(newPassword);
          _context4.next = 17;
          return Student.update({
            password: hashPass
          }, {
            where: {
              username: username
            }
          });
        case 17:
          res = _context4.sent;
          if (!res) {
            _context4.next = 22;
            break;
          }
          return _context4.abrupt("return", {
            status: 0,
            message: "Cập nhật mật khẩu thành công!"
          });
        case 22:
          return _context4.abrupt("return", {
            status: -1,
            message: "Cập nhật mật khẩu thất bại!"
          });
        case 23:
          _context4.next = 25;
          return Lecturer.findOne({
            where: {
              username: username
            }
          });
        case 25:
          lecturer = _context4.sent;
          comparePassword2 = _bcryptjs["default"].compareSync(currentPassword, lecturer.password);
          if (comparePassword2) {
            _context4.next = 31;
            break;
          }
          return _context4.abrupt("return", {
            status: 1,
            message: "Mật khẩu cũ không đúng!"
          });
        case 31:
          _hashPass = hashPassword(newPassword);
          _context4.next = 34;
          return Lecturer.update({
            password: _hashPass
          }, {
            where: {
              username: username
            }
          });
        case 34:
          _res = _context4.sent;
          if (!_res) {
            _context4.next = 39;
            break;
          }
          return _context4.abrupt("return", {
            status: 0,
            message: "Cập nhật mật khẩu thành công!"
          });
        case 39:
          return _context4.abrupt("return", {
            status: -1,
            message: "Cập nhật mật khẩu thất bại!"
          });
        case 40:
          _context4.next = 45;
          break;
        case 42:
          _context4.prev = 42;
          _context4.t1 = _context4["catch"](0);
          return _context4.abrupt("return", {
            status: -1,
            message: _context4.t1
          });
        case 45:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 42]]);
  }));
  return function changePassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var sendEmail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data) {
    var email, username, password, newPassword, hashPass, payload, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          email = data.email, username = data.username;
          if (!(!data && !email)) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", {
            status: 1,
            message: "Hãy nhập email!"
          });
        case 3:
          password = _commonUtils["default"].getRandomPassword();
          newPassword = password.toString();
          _mailer.mailer.sendMail(email, "IUH - Cấp lại mật khẩu mới", _templateHtml["default"].getPassHtml(password));
          hashPass = hashPassword(newPassword);
          payload = {
            username: username,
            password: hashPass
          };
          _context5.next = 10;
          return updateForgotPassword(payload);
        case 10:
          result = _context5.sent;
          if (!(result && result.status === 0)) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", result);
        case 15:
          return _context5.abrupt("return", {
            status: -1,
            message: "Cấp mật khẩu mới thất bại!"
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function sendEmail(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
// Forgot Password
var updateForgotPassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    var username, password, student, lecturer;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          username = data.username, password = data.password;
          _context6.next = 3;
          return Student.findOne({
            where: {
              username: username
            }
          });
        case 3:
          student = _context6.sent;
          if (!student) {
            _context6.next = 9;
            break;
          }
          student.password = password;
          _context6.next = 8;
          return student.save();
        case 8:
          return _context6.abrupt("return", {
            status: 0,
            message: "Cấp mật khẩu mới thành công cho sinh viên!"
          });
        case 9:
          _context6.next = 11;
          return Lecturer.findOne({
            where: {
              username: username
            }
          });
        case 11:
          lecturer = _context6.sent;
          if (!lecturer) {
            _context6.next = 17;
            break;
          }
          lecturer.password = password;
          _context6.next = 16;
          return lecturer.save();
        case 16:
          return _context6.abrupt("return", {
            status: 0,
            message: "Cấp mật khẩu mới thành công cho giảng viên!"
          });
        case 17:
          return _context6.abrupt("return", {
            status: 1,
            message: "Không tìm thấy người dùng với tên đăng nhập này!"
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateForgotPassword(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  login: login,
  hashPassword: hashPassword,
  changePassword: changePassword,
  findAccount: findAccount,
  getEmailByUserName: getEmailByUserName,
  sendEmail: sendEmail,
  updateForgotPassword: updateForgotPassword
};