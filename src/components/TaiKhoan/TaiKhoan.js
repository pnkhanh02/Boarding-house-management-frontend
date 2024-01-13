import React from "react";
import "./TaiKhoan.css";
import { useEffect, useState } from "react";
import { getAllTaiKhoanAPI } from "../../APIs/TaiKhoanAPI";

function TaiKhoan(props) {
  let [phongs, setPhongs] = useState([]);
  let [taikhoans, setTaiKhoans] = useState([]);
  let [searchTaiKhoan, setSearchTaiKhoan] = useState("");
  let [showAddTaiKhoan, setShowAddTaiKhoan] = useState(false);
  let [showDelTaiKhoan, setShowDelTaiKhoan] = useState(false);
  let [showUpdateTaiKhoan, setShowUpdateTaiKhoan] = useState(false);
  let [taikhoanToDelOrUpdate, setTaiKhoanToDelOrUpdate] = useState({
    id: 0,
    username: "..",
  });

  useEffect(() => {
    // getAllPhongsAPI().then((res) => {
    //   setPhongs(res);
    // });
    getAllTaiKhoanAPI().then((res) => {
      setTaiKhoans(res);
    });
  }, []);

  let filteredData =
    taikhoans && taikhoans.length > 0
      ? taikhoans.filter((p) => p.username.includes(searchTaiKhoan))
      : [
          {
            id: 0,
            username: "Không tìm thấy",
            name: "",
            phoneNumber: 0,
            role: "",
            status: "",
          },
        ];
  return(
    <div>
      {/* Thanh tìm kiếm */}
      <input
        className="input"
        type="text"
        placeholder="Search by username"
        value={searchTaiKhoan}
        onChange={(event) => {
          setSearchTaiKhoan(event.target.value);
        }}
      />

      <div className="button-container">
        {/* Button "Thêm" */}
        <button
          onClick={() => {
            setShowAddTaiKhoan(true);
          }}
          className="add-button"
        >
          Add
        </button>
      </div>

      {/* Bảng hiển thị dữ liệu */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>phoneNumber</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              {/* <td id="tdRoom">
                {item.room.title ? item.room.title : "phòng đã bị xoá"}
              </td> */}
              <td id="tdAction">
                <button>
                    View
                </button>
                <button
                  onClick={() => {
                    setTaiKhoanToDelOrUpdate(item); //set phòng để xoá là phòng ở dòng tương ứng
                    setShowUpdateTaiKhoan(true); //mở cửa sổ xoá
                  }}
                  className="action-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setTaiKhoanToDelOrUpdate(item);
                    setShowDelTaiKhoan(true);
                  }}
                  className="action-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default TaiKhoan;
