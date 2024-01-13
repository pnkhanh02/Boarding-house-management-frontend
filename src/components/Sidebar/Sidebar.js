import React from "react";
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.Component {
    render() {
      return (
       
          <div>
            <ul>
              {/* <li><a href="#home">Home</a></li>
                      <li><a href="#baiDang">Bài Đăng</a></li>
                      <li><a href="#hopDong">Hợp Đồng</a></li>
                      <li><a href="#yeuCau">Yêu Cầu</a></li>
                      <li><a href="#baoTri">Bảo Trì</a></li>
                      <li><a href="#taiKhoan">Tài Khoản</a></li>
                      <li><a href="#thongKe">Thống Kê</a></li> */}
  
              <li>
                <NavLink to="/homePage" activeClassName="activeLink">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/baiDang" activeClassName="activeLink">
                  Bài Đăng
                </NavLink>
              </li>
              <li>
                <NavLink to="/hopDong" activeClassName="activeLink">
                  Hợp Đồng
                </NavLink>
              </li>
              <li>
                <NavLink to="/yeuCau" activeClassName="activeLink">
                  Yêu Cầu
                </NavLink>
              </li>
              <li>
                <NavLink to="/baoTri" activeClassName="activeLink">
                  Bảo Trì
                </NavLink>
              </li>
              <li>
                <NavLink to="/taiKhoan" activeClassName="activeLink">
                  Tài Khoản
                </NavLink>
              </li>
              <li>
                <NavLink to="/thongKe" activeClassName="activeLink">
                  Thống Kê
                </NavLink>
              </li>
            </ul>
          </div>
      );
    }
  }

export default Sidebar;