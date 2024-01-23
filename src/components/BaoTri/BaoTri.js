import React from "react";
import "./BaoTri.css";
import { useEffect, useState } from "react";
import { getAllBaoTriAPI, getNumberOfBaoTri } from "../../APIs/BaoTriAPI";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import AddBaoTriModal from "./AddBaoTriModal";
import UpdateBaoTriModal from "./UpdateBaoTriModal";
import DeleteBaoTriModal from "./DeleteBaoTriModal";
import ViewBaoTriModal from "./ViewBaoTriModal";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function BaoTri(props) {
  let [lenght, setLength] = useState(0);
  let [page, setPage] = useState(0);
  let [phongs, setPhongs] = useState([]);
  let [baotris, setBaoTris] = useState([]);
  let [searchBaoTri, setSearchBaoTri] = useState("");
  let [showAddBaoTri, setShowAddBaoTri] = useState(false);
  let [showDelBaoTri, setShowDelBaoTri] = useState(false);
  let [showUpdateBaoTri, setShowUpdateBaoTri] = useState(false);
  let [showView, setShowView] = useState(false);
  let [baotriToDelOrUpdate, setBaoTriToDelOrUpdate] = useState({
    id: 0,
    maintenanceDate: "..",
  });
  let request = {
    pageNumber: page,
    pageSize: 8,
    sortField: "id",
    sortType: "DESC",
    maintenanceDate: searchBaoTri,
  };

  useEffect(() => {
    getNumberOfBaoTri().then((res) => {
      setLength(res);
    });
    getAllPhongsAPI().then((res) => {
      setPhongs(res);
    });
    getAllBaoTriAPI(request).then((res) => {
      setBaoTris(res);
    });
  }, [searchBaoTri, page]);

  let filteredData =
    baotris && baotris.length > 0
      ? baotris.filter((p) => p.maintenanceDate.includes(searchBaoTri))
      : [
          {
            id: 0,
            maintenanceDate: "Không tìm thấy",
            description: "",
            price: 0,
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
          placeholder="Search by date"
          value={searchBaoTri}
          onChange={(event) => {
            setSearchBaoTri(event.target.value);
          }}
        />

        <div className="button-container">
          {/* Button "Thêm" */}
          <button
            onClick={() => {
              setShowAddBaoTri(true);
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
              <th>MaintenanceDate</th>
              <th>Description</th>
              <th>Price</th>
              <th id="thRoom">Room</th>
              <th id="thAction">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.maintenanceDate}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td id="tdRoom">
                  {item.roomTitle}
                </td>
                <td id="tdAction">
                  <button
                    onClick={() => {
                      setBaoTriToDelOrUpdate(item);
                      setShowView(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setBaoTriToDelOrUpdate(item); //set phòng để xoá là phòng ở dòng tương ứng
                      setShowUpdateBaoTri(true); //mở cửa sổ xoá
                    }}
                    className="action-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setBaoTriToDelOrUpdate(item);
                      setShowDelBaoTri(true);
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
        <AddBaoTriModal
          phongs={phongs}
          baotris={baotris}
          setBaoTris={setBaoTris}
          showAddBaoTri={showAddBaoTri}
          setShowAddBaoTri={setShowAddBaoTri}
        />
        <DeleteBaoTriModal
          baotris={baotris}
          setBaoTris={setBaoTris}
          showDelBaoTri={showDelBaoTri}
          setShowDelBaoTri={setShowDelBaoTri}
          baotriToDel={baotriToDelOrUpdate}
        />
        <UpdateBaoTriModal
          phongs={phongs}
          setShowUpdateBaoTri={setShowUpdateBaoTri}
          showUpdateBaoTri={showUpdateBaoTri}
          baotris={baotris}
          setBaoTris={setBaoTris}
          baotriToUpdate={baotriToDelOrUpdate}
          setBaoTriToUpdate={setBaoTriToDelOrUpdate}
        />
        <ViewBaoTriModal
          phongs={phongs}
          showView={showView}
          setShowView={setShowView}
          baotriView={baotriToDelOrUpdate}
        />
      </div>
    </div>
  );
}

export default BaoTri;
