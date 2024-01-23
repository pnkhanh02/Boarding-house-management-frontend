import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "./Phong.css";
import { createPhongsAPI } from "../../APIs/PhongAPIs";
function AddPhongModal(props) {
  let { showAddModal, setShowAddModal, setPhongs, phongs } = props;
  let [roomTitle, setRoomTitle] = useState("");
  let [address, setAddress] = useState("");
  let [area, setArea] = useState(1);
  let [price, setPrice] = useState(0);
  let [status, setStatus] = useState("AVAILABLE");
  let [url, setUrl] = useState("");
  let phong = {
    title: roomTitle,
    address: address,
    area: area,
    price: price,
    status: status,
    imageUrl: url,
  };
  const onClickadd = () => {
    if (
      roomTitle.trim() !== "" &&
      address.trim() !== "" &&
      price > 0 &&
      url.trim() !== ""
    ) {
      createPhongsAPI(phong).then((res) => {
        setPhongs([...phongs, res]);
        alert("Thêm mới thành công");
        setShowAddModal(false);
      });
    } else {
      alert("Vui lòng nhập đủ thông tin!");
    }
  };
  return (
    <Modal id="modal" isOpen={showAddModal} fade={false} >
      <ModalHeader id="modalHeader">Thêm mới phòng</ModalHeader>
      <ModalBody style={{height:"500px",overflowY:"auto"}}>
        <Form>
          <FormGroup>
            <Label>Tên phòng:</Label>
            <Input
              placeholder="Nhập tên phòng..."
              value={roomTitle}
              type="text"
              onChange={(event) => {
                setRoomTitle(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Địa chỉ:</Label>
            <Input
              placeholder="Nhập địa chỉ..."
              value={address}
              type="text"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Area:</Label>
            <Input
              placeholder="Area..."
              value={area}
              type="number"
              min={1}
              onChange={(event) => {
                setArea(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Giá:</Label>
            <Input
              placeholder="Nhập giá..."
              value={price}
              type="number"
              min={0}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Tình trạng:</Label>
            <Input
              value={status}
              type="select"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option value={"AVAILABLE"}>AVAILABLE</option>
              <option value={"OCCUPIED"}>OCCUPIED</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Ảnh:</Label>
            <Input
              placeholder="Nhập link ảnh..."
              value={url}
              type="text"
              onChange={(event) => {
                setUrl(event.target.value);
              }}
            ></Input>
            <img style={{ marginTop:"20px",width:"460px" ,objectFit:"cover"}} alt="Lỗi tải ảnh" src={url}></img>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClickadd}>Thêm</Button>
        <Button
          onClick={() => {
            setShowAddModal(false);
          }}
        >
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddPhongModal;
