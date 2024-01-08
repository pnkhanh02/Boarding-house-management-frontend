import React, { Component } from "react";
import './HopDong.css';
import AddHopDong from "./AddHopDong";
import EditHopDong from "./EditHopDong";


class HopDong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchData: "", // Dữ liệu tìm kiếm
            data: [ // Dữ liệu mẫu cho bảng
                // { id: 1, name: "A1", deadline: "2024-01-01", numofpeople: 2, room: 2 },
                // { id: 2, name: "B1", deadline: "2024-02-01", numofpeople: 3, room: 3 },
                // { id: 3, name: "C1", deadline: "2024-03-01", numofpeople: 2, room: 4 },
                // { id: 4, name: "A2", deadline: "2024-04-01", numofpeople: 1, room: 5 },
                // { id: 5, name: "B2", deadline: "2024-05-01", numofpeople: 3, room: 1 },
                
            ],
            isAdding: false,
            isEditing: false,
            selectedItem: null, // Lưu thông tin item đang được chỉnh sửa
            currentPage: 1, // Trang hiện tại
            itemsPerPage: 5, // Số hàng trên mỗi trang
        };
    }

    componentDidMount() {
        // Fetch data from the API when the component mounts
        fetch('http://localhost:8888/api/v1/hopdong/getAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ data }); // Update the state with fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Hàm xử lý thay đổi dữ liệu tìm kiếm
    handleSearch = event => {
        this.setState({ searchData: event.target.value });
    };

    // Hàm xử lý hiển thị modal AddHopDong khi nhấn vào nút "Add"
    handleAddClick = () => {
        this.setState({ isAdding: true });
    };

    // Hàm xử lý ẩn modal AddHopDong khi click vào nút "Cancel"
    handleCancel = () => {
        this.setState({ isAdding: false });
    };

    // Hàm xử lý hiển thị modal EditHopDong khi nhấn vào nút "Edit"
    handleEditClick = item => {
        this.setState({ isEditing: true, selectedItem: item });
    };

    // Phương thức để cập nhật dữ liệu trong state
    updateData = newData => {
        this.setState(prevState => ({
            data: [...prevState.data, newData],
        }));
    };

    render() {
        // Lọc dữ liệu dựa trên kết quả tìm kiếm
        const filteredData = this.state.data.filter(item =>
            item.name.toLowerCase().includes(this.state.searchData.toLowerCase())
        );

        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div>
                {/* Thanh tìm kiếm */}
                <input 
                    className="input"
                    type="text"
                    placeholder="Search by name"
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
                            <th>Name</th>
                            <th>Deadline</th>
                            <th>NumOfPeople</th>
                            <th>Room</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.deadline}</td>
                                <td>{item.numOfPeople}</td>
                                <td>{item.room ? item.room.id : ''}</td>
                                <td>
                                    <button className="action-button" onClick={() => this.handleEditClick(item)}>Edit</button>
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    <button
                        onClick={() =>
                            this.setState({ currentPage: currentPage - 1 })
                        }
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {filteredData.length > itemsPerPage &&
                        Array(Math.ceil(filteredData.length / itemsPerPage))
                            .fill(null)
                            .map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => this.setState({ currentPage: index + 1 })}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                    <button
                        onClick={() =>
                            this.setState({ currentPage: currentPage + 1 })
                        }
                        disabled={currentItems.length < itemsPerPage}
                    >
                        Next
                    </button>
                </div>

                {/* Hiển thị modal AddHopDong nếu trạng thái isAdding là true */}
                {this.state.isAdding && (
                    <AddHopDong onCancel={this.handleCancel} updateData={this.updateData}/>
                )}

                {/* Hiển thị modal EditHopDong nếu trạng thái isEditing là true */}
                {this.state.isEditing && (
                    <EditHopDong onCancel={() => this.setState({ isEditing: false })} item={this.state.selectedItem} />
                )}
            </div>
        );
    }
}

export default HopDong;