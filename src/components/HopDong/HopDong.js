import React from "react";
import { useEffect, useState } from "react";
// import './HopDong.css';
import { getAllHopDongAPI, getNumberOfHopDong } from "../../APIs/HopDongAPIs";
import AddHopDongModal from "./AddHopDongModal";
import DeleteHopDongModal from "./DeleteHopDongModal";
import UpdateHopDongModal from "./UpdateHopDongModal";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import ViewHopDongModal from "./ViewHopDongModal";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function HopDong(props) {
  let [lenght, setLength] = useState(0);
  let [page, setPage] = useState(0);
  let [phongs, setPhongs] = useState([]);
  let [hopdongs, setHopDongs] = useState([]);
  let [searchHopDong, setSearchHopDong] = useState("");
  let [showAddHopDong, setShowAddHopDong] = useState(false); //biến quản lý ẩn hiện cửa sổ Thêm phòng (false: ẩn,true: hiện)
  let [showDelHopDong, setShowDelHopDong] = useState(false);
  let [showUpdateHopDong, setShowUpdateHopDong] = useState(false);
  let [showView, setShowView] = useState(false);
  let [hopdongToDelOrUpdate, setHopDongToDelOrUpdate] = useState({
    id: 0,
    name: "..",
  }); // phòng để xoá hoặc update
  let request = {
    pageNumber: page,
    pageSize: 8,
    sortField: "id",
    sortType: "DESC",
    name: searchHopDong,
  };
  useEffect(() => {
    getNumberOfHopDong().then((res) => {
      setLength(res);
    });
    getAllPhongsAPI().then((res) => {
      setPhongs(res);
    });
    getAllHopDongAPI(request).then((res) => {
      setHopDongs(res);
    });
  }, [searchHopDong, page]);

  let filteredData =
    hopdongs && hopdongs.length > 0
      ? hopdongs.filter((p) => p.name.includes(searchHopDong))
      : [
          {
            id: 0,
            name: "Không tìm thấy",
            deadline: "",
            numOfPeople: 0,
            room: "",
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
          placeholder="Search by name"
          value={searchHopDong}
          onChange={(event) => {
            setSearchHopDong(event.target.value);
          }}
        />

        <div className="button-container">
          {/* Button "Thêm" */}
          <button
            onClick={() => {
              setShowAddHopDong(true);
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
              <th>Name</th>
              <th id="thDeadline">StartDate</th>
              <th id="thDeadline">EndDate</th>
              <th id="thNumOfPeople">NumOfPeople</th>
              <th>Room</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td id="tdDeadline">{item.startDate}</td>
                <td id="tdDeadline">{item.endDate}</td>
                <td id="tdNumOfPeople">{item.numOfPeople}</td>
                <td>{item.roomTitle}</td>
                <td>
                  <button
                    onClick={() => {
                      setHopDongToDelOrUpdate(item);
                      setShowView(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setHopDongToDelOrUpdate(item); //set phòng để xoá là phòng ở dòng tương ứng
                      setShowUpdateHopDong(true); //mở cửa sổ xoá
                    }}
                    className="action-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setHopDongToDelOrUpdate(item);
                      setShowDelHopDong(true);
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
        <AddHopDongModal
          phongs={phongs}
          hopdongs={hopdongs}
          setHopDongs={setHopDongs}
          showAddHopDong={showAddHopDong}
          setShowAddHopDong={setShowAddHopDong}
        />
        <DeleteHopDongModal
          hopdongs={hopdongs}
          setHopDongs={setHopDongs}
          showDelHopDong={showDelHopDong}
          setShowDelHopDong={setShowDelHopDong}
          hopdongToDel={hopdongToDelOrUpdate}
        />
        <UpdateHopDongModal
          phongs={phongs}
          setShowUpdateHopDong={setShowUpdateHopDong}
          showUpdateHopDong={showUpdateHopDong}
          hopdongs={hopdongs}
          setHopDongs={setHopDongs}
          hopdongToUpdate={hopdongToDelOrUpdate}
          setHopDongToUpdate={setHopDongToDelOrUpdate}
        />
        <ViewHopDongModal
          phongs={phongs}
          showView={showView}
          setShowView={setShowView}
          hopdongView={hopdongToDelOrUpdate}
        />
      </div>
    </div>
  );
}
export default HopDong;
