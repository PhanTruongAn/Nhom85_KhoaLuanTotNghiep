# Nhom85_KhoaLuanTotNghiep

## Mô tả dự án
Đây là dự án khóa luận tốt nghiệp của nhóm 85, cung cấp hệ thống quản lý, triển khai và thực khóa luận tốt nghiệp cho sinh viên, giảng viên, và quản lý.

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

### Các tính năng nổi bật
- Hệ thống có chức năng thay đổi theme sáng, tối.
- Đăng nhập: Người dùng đăng nhập bằng khoản đã được cung cấp sẵn và dựa vào vai trò của tài khoản sẽ có quyền hạn và chức năng khác nhau.

![login](https://github.com/user-attachments/assets/7210037c-6bdb-4475-b6f9-f06ae9e82e32)

- Quên mật khẩu: Người dùng nhập username và mật khẩu mới sẽ được gửi về email đã đăng ký tài khoản, nếu tài khoản chưa có email thì nhập email mới.

![forget-pass](https://github.com/user-attachments/assets/48224cb2-2725-483d-970b-cbc6366bde01)


#### **Dành cho sinh viên:**
- Sinh viên có thể thay đổi thông tin cá nhân, đổi mật khẩu.
  ![info](https://github.com/user-attachments/assets/6a731843-b684-40c6-82ac-5f700262a8f3) ![change-pass](https://github.com/user-attachments/assets/be0798ae-50e6-4e87-adf9-45e441629335)


- Tham gia nhóm (chỉ mở trong thời gian được quản lý thiết lập), quản lý nhóm (chỉ có nhóm trưởng mới có thể thao tác với nhóm như chuyển quyền nhóm trưởng, xóa thành viên khỏi nhóm).

![join-group](https://github.com/user-attachments/assets/3ff645c1-e0cb-406e-8b95-e1afa36e6bbd) ![manage-group](https://github.com/user-attachments/assets/2c3f86f4-83b5-4f22-ad7d-fbf7d51864f7)


- Đăng ký đề tài (chỉ mở trong thời gian được quản lý thiết lập), quản lý đề tài (chỉ có nhóm trưởng mới có thể đăng ký cũng như hủy đăng ký đề tài).

![join-topic](https://github.com/user-attachments/assets/f8eed9c7-bd83-41f6-be31-1a013c09d33c) ![view-topic](https://github.com/user-attachments/assets/acdff459-5b4a-4215-9de3-eaaec8087497)

- Xem điểm số (chỉ mở trong thời gian được quản lý thiết lập)

![view-point](https://github.com/user-attachments/assets/ab5b64ed-36aa-483a-b64a-477fc0f57c10)

- Một số chức năng khác như xem tiêu chí đánh giá hoặc thông báo.

#### **Dành cho giảng viên:**
- Thêm mới đề tài: giảng viên có thể tải file excel mẫu về, dữ liệu vào file và tải file lên hệ thống để thêm đề tài.
![add-topic](https://github.com/user-attachments/assets/7f776d00-3c3e-40f6-9009-4214f91a6e45)

- Quản lý đề tài: giảng viên có thể chỉnh sửa, xóa, xem chi tiết đề tài, tìm kiếm hoặc gán nhóm sinh viên cho đề tài đó.
![manage-topic](https://github.com/user-attachments/assets/d6bbb17e-0d72-4d2a-bd3b-60cb01e5a225)

- Quản lý các nhóm đề tài: giảng viên chỉ có thể quản lý các nhóm đăng ký đề tài của mình, có thể chọn trưởng nhóm hoặc thêm, xóa sinh viên khỏi nhóm.

![manage-group](https://github.com/user-attachments/assets/932cf796-8730-44dc-8b76-4ca4708510c2) ![manage-group-2](https://github.com/user-attachments/assets/f2a6b70a-0d9c-46db-9e56-9057633cff0b)

- Xem nhóm chấm phản biện: giảng viên có thể xem thông tin giảng viên khác cùng nhóm chấm phản biện với mình và các nhóm sinh viên được phân công chấm phản biện.

![group](https://github.com/user-attachments/assets/0a152d58-8eb7-4b20-abf9-c735b39a2ddd)

- Chấm điểm cho sinh viên: nếu giảng viên là giảng viên hướng dẫn thì chỉ được chấm cột hướng dẫn, nếu là giảng viên phản biện thì được chấm cột phản biện và báo.

![pointed](https://github.com/user-attachments/assets/a6b68d4f-f19a-41dd-bca5-b9fbc91ebb94) ![pointed-1](https://github.com/user-attachments/assets/f9d6e153-afa1-476b-9e80-6678ce3e41eb)


#### **Dành cho quản lý:**
- Người quản lý có các chức năng tương tự giảng viên và được bổ sung thêm nhiều chức năng khác, tất cả dữ liệu được đều được quản lý qua từng học kì khác nhau. 
- Quản lý tài khoản sinh viên và giảng viên (các tài khoản được nhập từ file excel và cung cấp cho giảng viên, sinh viên sau khi đã được thêm vào hệ thống).

![add-student](https://github.com/user-attachments/assets/bd10b7e0-dc69-4f7a-9a12-1ce0f12e16b1) ![manage-student](https://github.com/user-attachments/assets/c9b0f917-2bd4-4992-8e5c-3b01086bbb42)


- Quản lý quyền hạn và gán quyền cho từng vai trò người dùng: người dùng có vai trò không được gán quyền hạn nào thì không thể thao tác với api, chức năng đó.


 ![permission](https://github.com/user-attachments/assets/f951d85d-d0d2-46e3-bd05-ac41501a0024) ![grant-permission](https://github.com/user-attachments/assets/cd784d1e-1a03-451a-a6a0-f1b04689a64d)

- Tạo, quản lý và phân công nhóm phản biện cho giảng viên: Quản lý có thể chọn 2 giảng viên thành 1 nhóm chấm phản biện và phân công các nhóm sinh viên cho nhóm chấm phản biện đó.

![manger-group-lectuer](https://github.com/user-attachments/assets/4f8c6f34-38fd-4a24-a2a0-a4dcac96e5e4) ![phan-cong](https://github.com/user-attachments/assets/f7329a77-e062-4ba8-a4e2-b8bf080a4c45) ![manger-group-lectuer](https://github.com/user-attachments/assets/325827f3-15e4-469f-94ae-b4f6a49bbfcd)


- Tạo và quản lý học kì: quản lý có thể tạo học kì và quản lý thời gian thực hiện khóa luận như: ngày bắt đầu (kết thúc), ngày bắt đầu (kết thúc) đăng ký đề tài (nhóm), ngày bắt đầu (kết thúc) công bố điểm số, ...

![create-term](https://github.com/user-attachments/assets/781d86f6-3a50-400e-a604-454375f80748) ![manage-term](https://github.com/user-attachments/assets/5479c753-67b9-4927-9b73-54e7fa905f84) ![edit-term](https://github.com/user-attachments/assets/a148d646-0376-48ac-9101-a425bd4f6e5a)




- Quản lý điểm số các nhóm: quản lý có thể thao tác trực tiếp điểm số các nhóm (xóa hoặc chỉnh sửa)

![manage-point](https://github.com/user-attachments/assets/e18e75cc-3109-487f-876a-9b833d2e1c14)

- Một số chức năng khác như quản lý học kì, thông báo.

![major](https://github.com/user-attachments/assets/6642b54f-21b2-46bd-bc9e-8d8da8b7c845) ![create-note](https://github.com/user-attachments/assets/d49f6315-d8a4-45ee-8b63-79962cca0631) ![manage-note](https://github.com/user-attachments/assets/e3217719-b85d-4c3a-bc07-ef3ec04dbe51)







