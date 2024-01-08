import React, { Component } from "react";

class AddYeuCau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            phone: "",
            room: "",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        // Xử lý lưu thông tin khi nhấn "Save"
        // Ví dụ: Gọi hàm từ props để lưu thông tin vào state của YeuCau.js
        // this.props.saveData(this.state);

        // Sau khi lưu xong, ẩn modal
        this.props.onCancel();
    };

    render() {
        return (
            <div className="modal">
                <button className="close-button" onClick={this.props.onCancel}>x</button>
                <h2>Add New Requirement</h2>
                <label>Title:</label>
                <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />

                <label>Descripton:</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />

                <label>Phone:</label>
                <input type="number" name="phone" value={this.state.phone} onChange={this.handleInputChange} />

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

export default AddYeuCau;