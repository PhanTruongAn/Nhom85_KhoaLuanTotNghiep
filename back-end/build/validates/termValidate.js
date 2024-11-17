"use strict";

var isFieldDate = function isFieldDate(field) {
  var date = new Date(field); // Chuyển đổi chuỗi thành đối tượng Date
  return !isNaN(date.getTime()); // Kiểm tra xem nó có phải là một ngày hợp lệ không
};
var isValidSemester = function isValidSemester(input) {
  var regex = /^HK(1|2|3) \d{4}-\d{4}$/;
  var rs = regex.test(input.trim());
  if (!rs) {
    return {
      status: 1,
      message: "Tên học kì phải theo định dạng: HK1/2/3 YYYY-YYYY"
    };
  }
  return {
    status: 0
  };
};
module.exports = {
  isFieldDate: isFieldDate,
  isValidSemester: isValidSemester
};