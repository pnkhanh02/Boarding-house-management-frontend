import React, { Component } from "react";
import './YeuCau.css';
import AddYeuCau from "./AddYeuCau";
import EditYeuCau from "./EditYeuCau";

class YeuCau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: "", // Dữ liệu tìm kiếm
            data: [ // Dữ liệu mẫu cho bảng
                { id: 1, title: "A1", description: "sửa bình nước", phone: "0234235234", room: 2 },
                { id: 2, title: "B1", description: "thêm tủ", phone: "0234235235", room: 3 },
                { id: 3, title: "C1", description: "lắp điều hòa", phone: "0234235236", room: 4 },
                { id: 4, title: "A2", description: "abc", phone: "0234235237", room: 5 },
                { id: 5, title: "B2", description: "edf", phone: "0234235238", room: 1 },
            ],
            isAdding: false,
            isEditing: false,
            selectedItem: null, // Lưu thông tin item đang được chỉnh sửa
        };
    }

    // Hàm xử lý thay đổi dữ liệu tìm kiếm
    handleSearch = event => {
        this.setState({ searchData: event.target.value });
    };

    // Hàm xử lý hiển thị modal AddYeuCau khi nhấn vào nút "Add"
    handleAddClick = () => {
        this.setState({ isAdding: true });
    };

    // Hàm xử lý ẩn modal AddYeuCau khi click vào nút "Cancel"
    handleCancel = () => {
        this.setState({ isAdding: false });
    };

    // Hàm xử lý hiển thị modal EditYeuCau khi nhấn vào nút "Edit"
    handleEditClick = item => {
        this.setState({ isEditing: true, selectedItem: item });
    };

    render() {
        // Lọc dữ liệu dựa trên kết quả tìm kiếm
        const filteredData = this.state.data.filter(item =>
            item.title.toLowerCase().includes(this.state.searchData.toLowerCase())
        );

        return (
            <div>
                {/* Thanh tìm kiếm */}
                <input 
                    className="input"
                    type="text"
                    placeholder="Search by title"
                    value={this.state.searchData}
                    onChange={this.handleSearch}
                />

                <div className="button-container">
                    {/* Button "Thêm" */}
                    <button className="add-button" onClick={this.handleAddClick}>Add</button>
                </div>

                {/* Bảng hiển thị dữ liệu */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Phone</th>
                            <th>Room</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.phone}</td>
                                <td>{item.room}</td>
                                <td>
                                    <button className="action-button" onClick={() => this.handleEditClick(item)}>Edit</button>
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Hiển thị modal AddYeuCau nếu trạng thái isAdding là true */}
                {this.state.isAdding && (
                    <AddYeuCau onCancel={this.handleCancel} />
                )}

                {/* Hiển thị modal EditYeuCau nếu trạng thái isEditing là true */}
                {this.state.isEditing && (
                    <EditYeuCau onCancel={() => this.setState({ isEditing: false })} item={this.state.selectedItem} />
                )}
            </div>
        );
    }
}

export default YeuCau;