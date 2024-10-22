import React from "react";
import "./style.scss";
const Footer = () => {
  return (
    <div className="container-main">
      <footer
        className="text-center text-lg-start"
        style={{ backgroundColor: "#929fba" }}
      >
        <div className="container p-4 pb-0">
          <section>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-4 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-4 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-4"></i> Khoa Công nghệ Thông tin
                  - Lầu 1 - Nhà H
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> Email:
                  daotao.fit@iuh.edu.vn
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> Điện thoại: 028.
                  389.40390 - 167
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow fit iuh
                </h6>

                <div className="container icon-container">
                  <a
                    className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: "#3b5998" }}
                    href="https://www.facebook.com/khoacntt.iuh"
                    role="button"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-primary btn-floating m-1"
                    style={{ backgroundColor: "#dd4b39" }}
                    href="https://fit.iuh.edu.vn/"
                    role="button"
                    target="_blank"
                  >
                    <i className="fab fa-google"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2017 Khoa Công nghệ thông tin - Đại học Công nghiệp Thành phố Hồ Chí
          Minh
        </div>
      </footer>
    </div>
  );
};

export default Footer;
