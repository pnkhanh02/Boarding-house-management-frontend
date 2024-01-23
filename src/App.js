import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Phong from "./components/Phong/Phong";
import HopDong from "./components/HopDong/HopDong";
import YeuCau from "./components/YeuCau/YeuCau";
import BaoTri from "./components/BaoTri/BaoTri";
import TaiKhoan from "./components/TaiKhoan/TaiKhoan";
import HomePage from "./components/Home/HomePage";
import DangNhap from "./components/DangNhap/DangNhap";
import DangKy from "./components/DangKy/DangKy";
import ThongKe from "./components/ThongKe/ThongKe";

function App() {
  return (
    <Router>
      <div className="app">
        {/* <Header />
        <Sidebar /> */}
        <div className="content">
          <Routes>
            <Route path="/dangKy" element={<DangKy />} />
            <Route path="/" element={<DangNhap />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/baiDang" element={<Phong />} />
            <Route path="/hopDong" element={<HopDong />} />
            <Route path="/yeuCau" element={<YeuCau />} />
            <Route path="/baoTri" element={<BaoTri />} />
            <Route path="/taiKhoan" element={<TaiKhoan />} />
            <Route path="/thongKe" element={<ThongKe />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
