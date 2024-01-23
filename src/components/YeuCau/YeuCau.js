import React from "react";
import { useEffect, useState } from "react";
import "./YeuCau.css";
import { getAllYeuCauAPI, getNumberOfYeuCau } from "../../APIs/YeuCauAPIs";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import AddYeuCauModal from "./AddYeuCauModal";
import UpdateYeuCauModal from "./UpdateYeuCauModal";
import DeleteYeuCauModal from "./DeleteYeuCauModal";
import ViewYeuCauModal from "./ViewYeuCauModal";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function YeuCau(props) {
  let [lenght, setLength] = useState(0);
  let [page, setPage] = useState(0);
  let [phongs, setPhongs] = useState([]);
  let [yeucaus, setYeuCaus] = useState([]);
  let [searchYeuCau, setSearchYeuCau] = useState("");
  let [showAddYeuCau, setShowAddYeuCau] = useState(false);
  let [showDelYeuCau, setShowDelYeuCau] = useState(false);
  let [showUpdateYeuCau, setShowUpdateYeuCau] = useState(false);
  let [showView, setShowView] = useState(false);
  let [yeucauToDelOrUpdate, setYeuCauToDelOrUpdate] = useState({
    id: 0,
    title: "..",
  });
  let request = {
    pageNumber: page,
    pageSize: 8,
    sortField: "id",
    sortType: "DESC",
    title: searchYeuCau,
  };
  useEffect(() => {
    getNumberOfYeuCau().then((res) => {
      setLength(res);
    });
    getAllPhongsAPI().then((res) => {
      setPhongs(res);
    });
    getAllYeuCauAPI(request).then((res) => {
      setYeuCaus(res);
    });
  }, [searchYeuCau, page]);

  let filteredData =
    yeucaus && yeucaus.length > 0
      ? yeucaus.filter((p) => p.title.includes(searchYeuCau))
      : [
          {
            id: 0,
            title: "Không tìm thấy",
            description: "",
            phone: 0,
            room: "",
          },
        ];

  const itemsPerPage = request.pageSize;

  const totalPages = Math.ceil(lenght / itemsPerPage);
  console.log(totalPages);

  // const paginatedData = filteredData.slice(
  //   page * itemsPerPage,
  //   (page + 1) * itemsPerPage
  // );
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        {/* Thanh tìm kiếm */}
        <input
          className="input"
          type="text"
          placeholder="Search by title"
          value={searchYeuCau}
          onChange={(event) => {
            setSearchYeuCau(event.target.value);
          }}
        />

        <div className="button-container">
          {/* Button "Thêm" */}
          <button
            onClick={() => {
              setShowAddYeuCau(true);
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
              <th>Title</th>
              <th>Description</th>
              <th id="thPhone">Phone</th>
              <th id="thRoom">Room</th>
              <th id="thAction">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td id="tdPhone">{item.phone}</td>
                <td id="tdRoom">{item.roomTitle}</td>
                <td id="tdAction">
                  <button
                    onClick={() => {
                      setYeuCauToDelOrUpdate(item);
                      setShowView(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setYeuCauToDelOrUpdate(item); //set phòng để xoá là phòng ở dòng tương ứng
                      setShowUpdateYeuCau(true); //mở cửa sổ xoá
                    }}
                    className="action-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setYeuCauToDelOrUpdate(item);
                      setShowDelYeuCau(true);
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
        <AddYeuCauModal
          phongs={phongs}
          yeucaus={yeucaus}
          setYeuCaus={setYeuCaus}
          showAddYeuCau={showAddYeuCau}
          setShowAddYeuCau={setShowAddYeuCau}
        />
        <DeleteYeuCauModal
          yeucaus={yeucaus}
          setYeuCaus={setYeuCaus}
          showDelYeuCau={showDelYeuCau}
          setShowDelYeuCau={setShowDelYeuCau}
          yeucauToDel={yeucauToDelOrUpdate}
        />
        <UpdateYeuCauModal
          phongs={phongs}
          setShowUpdateYeuCau={setShowUpdateYeuCau}
          showUpdateYeuCau={showUpdateYeuCau}
          yeucaus={yeucaus}
          setYeuCaus={setYeuCaus}
          yeucauToUpdate={yeucauToDelOrUpdate}
          setYeuCauToUpdate={setYeuCauToDelOrUpdate}
        />
        <ViewYeuCauModal
          phongs={phongs}
          showView={showView}
          setShowView={setShowView}
          yeucauView={yeucauToDelOrUpdate}
        />
      </div>
    </div>
  );
}

export default YeuCau;
