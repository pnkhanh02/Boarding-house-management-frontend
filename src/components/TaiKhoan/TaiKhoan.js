import React from "react";
import "./TaiKhoan.css";
import { useEffect, useState } from "react";
import {
  getAllTaiKhoanAPI,
  getNumberOfTaiKhoan,
  getSearchTaiKhoansAPI,
} from "../../APIs/TaiKhoanAPI";
import ViewTaiKhoanModal from "./ViewTaiKhoanModal";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function TaiKhoan(props) {
  let [lenght, setLength] = useState(0);
  let [page, setPage] = useState(0);
  let [phongs, setPhongs] = useState([]);
  let [taikhoans, setTaiKhoans] = useState([]);
  let [searchTaiKhoan, setSearchTaiKhoan] = useState("");
  let [showAddTaiKhoan, setShowAddTaiKhoan] = useState(false);
  let [showDelTaiKhoan, setShowDelTaiKhoan] = useState(false);
  let [showUpdateTaiKhoan, setShowUpdateTaiKhoan] = useState(false);
  let [showView, setShowView] = useState(false);
  let [taikhoanToDelOrUpdate, setTaiKhoanToDelOrUpdate] = useState({
    id: 0,
    username: "..",
  });
  let request = {
    pageNumber: page,
    pageSize: 8,
    sortField: "id",
    sortType: "DESC",
    username: searchTaiKhoan,
  };

  useEffect(() => {
    // getAllPhongsAPI().then((res) => {
    //   setPhongs(res);
    // });
    getNumberOfTaiKhoan().then((res) => {
      setLength(res);
    });
    // getAllTaiKhoanAPI().then((res) => {
    //   setTaiKhoans(res);
    // });
    getSearchTaiKhoansAPI(request).then((res) => {
      setTaiKhoans(res);
    });
  }, [searchTaiKhoan, page]);

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
  const itemsPerPage = request.pageSize;

  const totalPages = Math.ceil(lenght / itemsPerPage);
  console.log(totalPages);
  return (
    <div>
      <Header />
      <Sidebar />
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

        {/* <div className="button-container">
        
        <button
          onClick={() => {
            setShowAddTaiKhoan(true);
          }}
          className="add-button"
        >
          Add
        </button>
      </div> */}

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
                  <button
                    onClick={() => {
                      setTaiKhoanToDelOrUpdate(item);
                      setShowView(true);
                    }}
                  >
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
                  {/* <button
                    onClick={() => {
                      setTaiKhoanToDelOrUpdate(item);
                      setShowDelTaiKhoan(true);
                    }}
                    className="action-button"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination-container">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <button>{page + 1}</button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
        <ViewTaiKhoanModal
          phongs={phongs}
          showView={showView}
          setShowView={setShowView}
          taikhoanView={taikhoanToDelOrUpdate}
        />
      </div>
    </div>
  );
}

export default TaiKhoan;
