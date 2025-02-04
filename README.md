# Nhom85_KhoaLuanTotNghiep

## Mô tả dự án

Đây là dự án khóa luận tốt nghiệp của nhóm 85, cung cấp hệ thống quản lý và hỗ trợ cho sinh viên, giảng viên, và quản lý. 


### Các tính năng nổi bật
- Đăng nhập: Người dùng đăng nhập bằng khoản đã được cung cấp sẵn và dựa vào vai trò của tài khoản sẽ có quyền hạn và chức năng khác nhau.
![login](https://github.com/user-attachments/assets/7210037c-6bdb-4475-b6f9-f06ae9e82e32)

- Quên mật khẩu: Người dùng nhập username và mật khẩu mới sẽ được gửi về email đã đăng ký tài khoản, nếu tài khoản chưa có email thì nhập email mới.
![forget-pass](https://github.com/user-attachments/assets/48224cb2-2725-483d-970b-cbc6366bde01)


#### **Dành cho sinh viên:**
- Tham gia nhóm, quản lý nhóm.
- Đăng ký đề tài, quản lý đề tài.
- Xem điểm số.

#### **Dành cho giảng viên:**
- Thêm mới và quản lý đề tài.
- Quản lý các nhóm đề tài.
- Chấm điểm cho sinh viên.

#### **Dành cho quản lý:**
- Quản lý tài khoản sinh viên và giảng viên.
- Phân quyền và vai trò người dùng.

## Công nghệ sử dụng

### Frontend:
- **HTML, CSS (SCSS), Javascript, ReactJS.**
- **Redux Toolkit, Ant Design, Material-UI.**
- **Axios** để kết nối API.

### Backend:
- **Node.js** với **ExpressJS** để xây dựng REST API.
- **Sequelize** để thực hiện ORM.
- **MySQL** cho cơ sở dữ liệu.
- **JWT** để xác thực và phân quyền người dùng.

### Triển khai:
- **Docker** và **Nginx** để triển khai ứng dụng.
