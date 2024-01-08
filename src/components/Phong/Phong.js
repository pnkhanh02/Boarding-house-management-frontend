import { useEffect, useState } from "react";
import { getAllPhongsAPI } from "../../APIs/PhongAPIs";
import AddPhongModal from "./AddPhongModal";
import React from "react";
function Phong(props) {

    let [phongs, setPhongs] = useState([])
    let [search, setSearch] = useState("");
    let [showAddModal, setShowAddModal] = useState(false);
    console.log("show",showAddModal);

    useEffect(() => {
        getAllPhongsAPI().then((res) => {
            setPhongs(res)
        })
    },[])
    let filteredData = phongs && phongs.length > 0 ?
        phongs.filter((p) => p.title.includes(search) || p.address.includes(search) || parseInt(p.price) === parseInt(search)) :
        [{ id: 0, title: "Không tìm thấy", address: "", area: "", price: 0, status: "" },]
    return (
        <div>
            {/* Thanh tìm kiếm */}
            <input
                className="input"
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
            />

            <div className="button-container">
                {/* Button "Thêm" */}
                <button onClick={() => { setShowAddModal(true) }} className="add-button">Add</button>
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
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.address}</td>
                            <td>{item.area}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddPhongModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
        </div>
    )
}
export default Phong;