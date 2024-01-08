import React, { Component } from "react";

class EditHopDong extends Component {
    constructor(props) {
        super(props);
        // Sử dụng props để lấy thông tin hiện tại của item cần chỉnh sửa
        this.state = {
            name: props.item.name || "",
            deadline: props.item.deadline || "",
            numOfPeople: props.item.numOfPeople || "",
            room: props.item.room || "",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        // Xử lý lưu thông tin khi nhấn "Save"
        // Ví dụ: Gọi hàm từ props để lưu thông tin vào state của HopDong.js
        // this.props.saveData(this.state);

        // Sau khi lưu xong, ẩn modal
        this.props.onCancel();
    };

    render() {
        return (
            <div className="modal">
                <button className="close-button" onClick={this.props.onCancel}>x</button>
                <h2>Edit Contract</h2>
                <label>Name:</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />

                <label>Deadline:</label>
                <input type="date" name="deadline" value={this.state.deadline} onChange={this.handleInputChange} />

                <label>NumOfPeople:</label>
                <input type="number" name="numOfPeople" value={this.state.numOfPeople} onChange={this.handleInputChange} />

                <label>Room:</label>
                <input type="text" name="room" value={this.state.room} onChange={this.handleInputChange} />

                <div className="button-container">
                    <button onClick={this.handleSave}>Save</button>
                    <button onClick={this.props.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default EditHopDong;