import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Phong from './components/Phong/Phong';
import HopDong from './components/HopDong/HopDong';
import YeuCau from './components/YeuCau/YeuCau';
import BaoTri from './components/BaoTri/BaoTri';
import TaiKhoan from './components/TaiKhoan/TaiKhoan';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/baiDang" element={<Phong />} />
            <Route path="/hopDong" element={<HopDong />} />
            <Route path="/yeuCau" element={<YeuCau />} />
            <Route path="/baoTri" element={<BaoTri />} />
            <Route path="/taiKhoan" element={<TaiKhoan />} />
          </Routes>

        </div>
      </div>
    </Router>



  );
}

export default App;
