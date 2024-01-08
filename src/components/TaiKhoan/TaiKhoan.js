import React, { Component } from "react";
import './TaiKhoan.css';
import EditTaiKhoan from "./EditTaiKhoan";

class TaiKhoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: "", // Dữ liệu tìm kiếm
            data: [ // Dữ liệu mẫu cho bảng
                { id: 1, username: "nguyenvana", name: "Nguyễn Văn A", phonenumber: "0123234345", role: "ADMIN", status: "ACTIVE" },
                { id: 2, username: "nguyenvanb", name: "Nguyễn Văn B", phonenumber: "0223234344", role: "LANDLORD", status: "ACTIVE" },
                { id: 3, username: "nguyenvanc", name: "Nguyễn Văn C", phonenumber: "0323234343", role: "LANDLORD", status: "ACTIVE" },
                { id: 4, username: "nguyenvand", name: "Nguyễn Văn D", phonenumber: "0423234342", role: "CUSTOMER", status: "LOCKED" },
                { id: 5, username: "nguyenvane", name: "Nguyễn Văn E", phonenumber: "0523234341", role: "CUSTOMER", status: "ACTIVE" },
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

    // Hàm xử lý ẩn modal AddYeuCau khi click vào nút "Cancel"
    // handleCancel = () => {
    //     this.setState({ isAdding: false });
    // };

    // Hàm xử lý hiển thị modal EditYeuCau khi nhấn vào nút "Edit"
    handleEditClick = item => {
        this.setState({ isEditing: true, selectedItem: item });
    };

    render() {
        // Lọc dữ liệu dựa trên kết quả tìm kiếm
        const filteredData = this.state.data.filter(item =>
            item.username.toLowerCase().includes(this.state.searchData.toLowerCase())
        );

        return (
            <div>
                {/* Thanh tìm kiếm */}
                <input 
                    className="input"
                    type="text"
                    placeholder="Search by username"
                    value={this.state.searchData}
                    onChange={this.handleSearch}
                />

                <div className="button-container">
                    {/* Button "Thêm" */}
                    <button className="add-button">Add</button>
                </div>

                {/* Bảng hiển thị dữ liệu */}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.name}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.role}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className="action-button" onClick={() => this.handleEditClick(item)}>Edit</button>
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Hiển thị modal EditYeuCau nếu trạng thái isEditing là true */}
                {this.state.isEditing && (
                    <EditTaiKhoan onCancel={() => this.setState({ isEditing: false })} item={this.state.selectedItem} />
                )}
            </div>
        );
    }
}

export default TaiKhoan;