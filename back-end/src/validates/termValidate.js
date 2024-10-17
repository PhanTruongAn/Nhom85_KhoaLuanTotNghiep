const isFieldDate = (field) => {
  const date = new Date(field); // Chuyển đổi chuỗi thành đối tượng Date
  return !isNaN(date.getTime()); // Kiểm tra xem nó có phải là một ngày hợp lệ không
};
const isValidSemester = (input) => {
  const regex = /^Học kì (I|II|III) \d{4}-\d{4}$/;
  const rs = regex.test(input.trim());
  if (!rs) {
    return {
      status: 1,
      message: "Tên học kì phải theo định dạng: Học kì I/II/III YYYY-YYYY",
    };
  }
  return { status: 0 };
};
module.exports = {
  isFieldDate,
  isValidSemester,
};
