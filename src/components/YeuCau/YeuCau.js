import React from "react";
import { useEffect, useState } from "react";
import "./YeuCau.css";
import { getAllYeuCauAPI } from "../../APIs/YeuCauAPIs";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import AddYeuCauModal from "./AddYeuCauModal";
import UpdateYeuCauModal from "./UpdateYeuCauModal";
import DeleteYeuCauModal from "./DeleteYeuCauModal";

function YeuCau(props) {
  let [phongs, setPhongs] = useState([]);
  let [yeucaus, setYeuCaus] = useState([]);
  let [searchYeuCau, setSearchYeuCau] = useState("");
  let [showAddYeuCau, setShowAddYeuCau] = useState(false);
  let [showDelYeuCau, setShowDelYeuCau] = useState(false);
  let [showUpdateYeuCau, setShowUpdateYeuCau] = useState(false);
  let [yeucauToDelOrUpdate, setYeuCauToDelOrUpdate] = useState({
    id: 0,
    title: "..",
  });

  useEffect(() => {
    getAllPhongsAPI().then((res) => {
      setPhongs(res);
    });
    getAllYeuCauAPI().then((res) => {
      setYeuCaus(res);
    });
  }, []);

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
  return (
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
              <td id="tdRoom">
                {item.room.title ? item.room.title : "phòng đã bị xoá"}
              </td>
              <td id="tdAction">
                <button>View</button>
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
    </div>
  );
}

export default YeuCau;
