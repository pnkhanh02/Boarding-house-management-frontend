import React, { Component } from "react";
import './BaoTri.css';
import AddBaoTri from "./AddBaoTri";
import EditBaoTri from "./EditBaoTri";

class BaoTri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: "", // Dữ liệu tìm kiếm
            data: [ // Dữ liệu mẫu cho bảng
                { id: 1, date: "2024-02-02", description: "sửa bình nước", price: 100000, room: 2 },
                { id: 2, date: "2024-03-02", description: "thêm tủ", price: 200000, room: 3 },
                { id: 3, date: "2024-04-02", description: "lắp điều hòa", price: 300000, room: 4 },
                { id: 4, date: "2024-05-02", description: "abc", price: 400000, room: 5 },
                { id: 5, date: "2024-06-02", description: "edf", price: 500000, room: 1 },
                
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

    // Hàm xử lý hiển thị modal AddBaoTri khi nhấn vào nút "Add"
    handleAddClick = () => {
        this.setState({ isAdding: true });
    };

    // Hàm xử lý ẩn modal AddBaoTri khi click vào nút "Cancel"
    handleCancel = () => {
        this.setState({ isAdding: false });
    };

    // Hàm xử lý hiển thị modal EditBaoTri khi nhấn vào nút "Edit"
    handleEditClick = item => {
        this.setState({ isEditing: true, selectedItem: item });
    };

    render() {
        // Lọc dữ liệu dựa trên kết quả tìm kiếm
        const filteredData = this.state.data.filter(item =>
            item.date.toLowerCase().includes(this.state.searchData.toLowerCase())
        );

        return (
            <div>
                {/* Thanh tìm kiếm */}
                <input 
                    className="input"
                    type="text"
                    placeholder="Search by date"
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
                            <th>Date</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Room</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.room}</td>
                                <td>
                                    <button className="action-button" onClick={() => this.handleEditClick(item)}>Edit</button>
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Hiển thị modal AddBaoTri nếu trạng thái isAdding là true */}
                {this.state.isAdding && (
                    <AddBaoTri onCancel={this.handleCancel} />
                )}

                {/* Hiển thị modal EditBaoTri nếu trạng thái isEditing là true */}
                {this.state.isEditing && (
                    <EditBaoTri onCancel={() => this.setState({ isEditing: false })} item={this.state.selectedItem} />
                )}
            </div>
        );
    }
}

export default BaoTri;