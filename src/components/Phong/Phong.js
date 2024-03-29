import { useEffect, useState } from "react";
import {
  getAllPhongsAPI,
  getNumberOfPhong,
  getSearchPhongsAPI,
} from "../../APIs/PhongAPIs";
import AddPhongModal from "./AddPhongModal";
import React from "react";
import DeletePhongModal from "./DeletePhongModal";
import UpdatePhongModal from "./UpdatePhongModal";
import PhongViewModal from "./PhongViewModal";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
function Phong(props) {
  let [lenght, setLength] = useState(0);
  let [page, setPage] = useState(0);
  let [phongs, setPhongs] = useState([]);
  let [search, setSearch] = useState("");
  let [showAddModal, setShowAddModal] = useState(false); //biến quản lý ẩn hiện cửa sổ Thêm phòng (false: ẩn,true: hiện)
  let [showDelModal, setShowDelModal] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showView, setShowView] = useState(false);
  let [phongToDelOrUodate, setPhongToDelOrUpdate] = useState({
    id: 0,
    title: "..",
  }); // phòng để xoá hoặc update
  let request = {
    pageNumber: page,
    pageSize: 8,
    sortField: "id",
    sortType: "desc",
    title: search,
  };

  useEffect(() => {
    getNumberOfPhong().then((res) => {
      setLength(res);
    });
    // getAllPhongsAPI().then((res) => {
    //   setPhongs(res);
    // });
    getSearchPhongsAPI(request).then((res) => {
      setPhongs(res);
    });
  }, [search, page]);
  // let filteredData =
  //   phongs && phongs.length > 0
  //     ? phongs.filter(
  //         (p) =>
  //           p.title.includes(search) ||
  //           p.address.includes(search) ||
  //           parseInt(p.price) === parseInt(search)
  //       )
  //     : [
  //         {
  //           id: 0,
  //           title: "Không tìm thấy",
  //           address: "",
  //           area: "",
  //           price: 0,
  //           status: "",
  //         },
  //       ];
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
          placeholder="Search by title"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />

        <div className="button-container">
          {/* Button "Thêm" */}
          <button
            onClick={() => {
              setShowAddModal(true);
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
              <th>Address</th>
              <th>Area</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {phongs && phongs.length > 0
              ? phongs.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.address}</td>
                    <td>{item.area}</td>
                    <td>{item.price}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          setPhongToDelOrUpdate(item);
                          setShowView(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setPhongToDelOrUpdate(item); //set phòng để xoá là phòng ở dòng tương ứng
                          setShowUpdate(true); //mở cửa sổ xoá
                        }}
                        className="action-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setPhongToDelOrUpdate(item);
                          setShowDelModal(true);
                        }}
                        className="action-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
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
        <AddPhongModal
          phongs={phongs}
          setPhongs={setPhongs}
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
        />
        <DeletePhongModal
          phongs={phongs}
          setPhongs={setPhongs}
          showDelModal={showDelModal}
          setShowDelModal={setShowDelModal}
          phongToDel={phongToDelOrUodate}
        />
        <UpdatePhongModal
          setShowUpdate={setShowUpdate}
          showUpdate={showUpdate}
          phongs={phongs}
          setPhongs={setPhongs}
          phongToUpdate={phongToDelOrUodate}
          setPhongToUpdate={setPhongToDelOrUpdate}
        />
        <PhongViewModal
          showView={showView}
          setShowView={setShowView}
          phongView={phongToDelOrUodate}
          setPhongView={setPhongToDelOrUpdate}
        />
      </div>
    </div>
  );
}
export default Phong;
