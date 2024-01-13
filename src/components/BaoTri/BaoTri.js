import React from "react";
import "./BaoTri.css";
import { useEffect, useState } from "react";
import { getAllBaoTriAPI } from "../../APIs/BaoTriAPI";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import AddBaoTriModal from "./AddBaoTriModal";
import UpdateBaoTriModal from "./UpdateBaoTriModal";
import DeleteBaoTriModal from "./DeleteBaoTriModal";

function BaoTri(props) {
  let [phongs, setPhongs] = useState([]);
  let [baotris, setBaoTris] = useState([]);
  let [searchBaoTri, setSearchBaoTri] = useState("");
  let [showAddBaoTri, setShowAddBaoTri] = useState(false);
  let [showDelBaoTri, setShowDelBaoTri] = useState(false);
  let [showUpdateBaoTri, setShowUpdateBaoTri] = useState(false);
  let [baotriToDelOrUpdate, setBaoTriToDelOrUpdate] = useState({
    id: 0,
    maintenanceDate: "..",
  });

  useEffect(() => {
    getAllPhongsAPI().then((res) => {
      setPhongs(res);
    });
    getAllBaoTriAPI().then((res) => {
      setBaoTris(res);
    });
  }, []);

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
  return (
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
                {item.room.title ? item.room.title : "phòng đã bị xoá"}
              </td>
              <td id="tdAction">
                <button>
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
    </div>
  );
}

export default BaoTri;
