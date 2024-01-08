import React, { Component } from "react";

class EditTaiKhoan extends Component {
    constructor(props) {
        super(props);
        // Sử dụng props để lấy thông tin hiện tại của item cần chỉnh sửa
        this.state = {
            username: props.item.username || "",
            name: props.item.name || "",
            phonenumber: props.item.phonenumber || "",
            role: props.item.role || "",
            status: props.item.status || "",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        // Xử lý lưu thông tin khi nhấn "Save"
        // Ví dụ: Gọi hàm từ props để lưu thông tin vào state của TaiKhoan.js
        // this.props.saveData(this.state);

        // Sau khi lưu xong, ẩn modal
        this.props.onCancel();
    };

    render() {
        return (
            <div className="modal">
                <button className="close-button" onClick={this.props.onCancel}>x</button>
                <h2>Edit Account</h2>
                <label>Username:</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />

                <label>Name:</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />

                <label>PhoneNumber:</label>
                <input type="number" name="phonenumber" value={this.state.phonenumber} onChange={this.handleInputChange} />

                <label>Role:</label>
                <input type="text" name="role" value={this.state.role} onChange={this.handleInputChange} />
                
                <label>Status:</label>
                <input type="text" name="status" value={this.state.status} onChange={this.handleInputChange} />
                <div className="button-container">
                    <button onClick={this.handleSave}>Save</button>
                    <button onClick={this.props.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default EditTaiKhoan;