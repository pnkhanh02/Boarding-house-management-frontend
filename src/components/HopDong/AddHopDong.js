import React, { Component } from "react";
import './AddHopDong.css';

class AddHopDong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            deadline: "",
            numOfPeople: "",
            room: "",
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        const { name, deadline, numOfPeople, room } = this.state;

        // Tạo một object chứa thông tin mới để gửi lên server
        const newContract = {
            name,
            deadline,
            numOfPeople,
            room,
        };

        // Gửi yêu cầu POST tới API để tạo hợp đồng mới
        fetch('http://localhost:8888/api/v1/hopdong/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContract), // Chuyển đổi object thành chuỗi JSON để gửi đi
        })
        .then(response => response.json())
        .then(data => {
            // Sau khi tạo thành công, có thể cập nhật state ở đây (nếu muốn)
            // Ví dụ: this.props.updateData(data);
            this.props.updateData(data);

            // Sau khi lưu xong, ẩn modal
            this.props.onCancel();
        })
        .catch(error => {
            console.error('Error creating contract:', error);
        });

        // Xử lý lưu thông tin khi nhấn "Save"
        // Ví dụ: Gọi hàm từ props để lưu thông tin vào state của HopDong.js
        // this.props.saveData(this.state);

        // Sau khi lưu xong, ẩn modal
        // this.props.onCancel();
    };

    render() {
        const scrollableContentStyles = {
            maxHeight: '400px',
            overflowY: 'auto',
            overflowX: 'hidden',
            /* Các thuộc tính CSS khác cho modal */
        };
        return (
            <div className="modal" style={scrollableContentStyles}>
                <button className="close-button" onClick={this.props.onCancel}>x</button>
                <h2>Add New Contract</h2>
                {/* <div style={scrollableContentStyles}> */}
                    {/* Nội dung có thanh cuộn dọc */}
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />

                    <label>Deadline:</label>
                    <input type="date" name="deadline" value={this.state.deadline} onChange={this.handleInputChange} />

                    <label>NumOfPeople:</label>
                    <input type="number" name="numOfPeople" value={this.state.numOfPeople} onChange={this.handleInputChange} />

                    <label>Room:</label>
                    <input type="text" name="room" value={this.state.room} onChange={this.handleInputChange} />
                {/* </div> */}
                <div className="button-container">
                    <button onClick={this.handleSave}>Save</button>
                    <button onClick={this.props.onCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default AddHopDong;