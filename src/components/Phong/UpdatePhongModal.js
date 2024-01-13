import React, { useEffect, useState } from "react";
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
import { editPhongAPI } from "../../APIs/PhongAPIs";

function UpdatePhongModal(props) {
  // Lấy dữ liệu từ Phong.js xuống:
  let {
    phongs,
    setPhongs,
    showUpdate,
    setShowUpdate,
    phongToUpdate,
    setPhongToUpdate,
  } = props;

  let [roomTitle, setRoomTitle] = useState("");
  let [address, setAddress] = useState("");
  let [area, setArea] = useState(1);
  let [price, setPrice] = useState(0);
  let [status, setStatus] = useState("AVAILABLE");
  let [url, setUrl] = useState("");
  let phongUpdate = {
    id: phongToUpdate.id,
    title: roomTitle,
    address: address,
    area: area,
    price: price,
    status: status,
    imageUrl: url,
  };
  useEffect(() => {
    setRoomTitle(phongToUpdate.title);
    setAddress(phongToUpdate.address);
    setArea(phongToUpdate.area);
    setPrice(phongToUpdate.price);
    setStatus(phongToUpdate.status);
    setUrl(phongToUpdate.imageUrl);
  }, [phongToUpdate]);
  let clickUpdate = () => {
    //Gọi api update, cập nhật lại biến phongs(bằng hàm setPhongs), đóng cửa sổ lại
    if (
      roomTitle.trim() !== "" &&
      address.trim() !== "" &&
      price > 0 &&
      url.trim() !== ""
    ) {
      editPhongAPI(phongUpdate).then((res) => {
        let phongUpdates = phongs.map((p)=>p.id===res.id?res:p);
        setPhongs([...phongUpdates]);
        setShowUpdate(false);
        alert("Update thành công");
      });
    } else {
      alert("Vui lòng nhập đủ thông tin!");
    }
  };
  return (
    <Modal isOpen={showUpdate} fade={false}>
      <ModalHeader>{`Sửa phòng ${phongToUpdate.title}`}</ModalHeader>
      <ModalBody>
        {" "}
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
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={clickUpdate}>Sửa</Button>
        <Button onClick={() => setShowUpdate(false)}>Huỷ</Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdatePhongModal;
