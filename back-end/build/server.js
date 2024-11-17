"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./configs/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors2 = _interopRequireDefault(require("cors"));
var _connectDB = _interopRequireDefault(require("./configs/connectDB"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("dotenv").config();
var app = (0, _express["default"])();
//config view engine
(0, _viewEngine["default"])(app);

//config body-parser
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors2["default"])(_defineProperty(_defineProperty({
  allowedHeaders: ["authorization", "Content-Type"],
  // you can change the headers
  exposedHeaders: ["authorization"],
  // you can change the headers
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true
}, "origin", true), "credentials", true)));
//Test connection database
(0, _connectDB["default"])();
//Config cookie parser
app.use((0, _cookieParser["default"])());
//init web routes
(0, _web["default"])(app);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(">>>Backend is running port = " + PORT);
});