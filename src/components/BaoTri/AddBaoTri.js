import React, { Component } from "react";

class AddBaoTri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            description: "",
            price: "",
            room: "",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        // Xử lý lưu thông tin khi nhấn "Save"
        // Ví dụ: Gọi hàm từ props để lưu thông tin vào state của BaoTri.js
        // this.props.saveData(this.state);

        // Sau khi lưu xong, ẩn modal
        this.props.onCancel();
    };

    render() {
        return (
            <div className="modal">
                <button className="close-button" onClick={this.props.onCancel}>x</button>
                <h2>Add New Maintenance</h2>
                <label>Date:</label>
                <input type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />

                <label>Descripton:</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />

                <label>Price:</label>
                <input type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />

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

export default AddBaoTri;