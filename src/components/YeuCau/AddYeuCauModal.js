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
import "./YeuCau.css";
import { createYeuCauAPI } from "../../APIs/YeuCauAPIs";

function AddYeuCauModal(props) {
  let { showAddYeuCau, setShowAddYeuCau, setYeuCaus, yeucaus, phongs } =
    props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [phone, setPhone] = useState(1);
  let [room, setRoom] = useState(0);
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option value={p.id}>{p.title}</option>;
        })
      : null;
  let yeucau = {
    title: title,
    description: description,
    phone: phone,
    roomId: room,
  };
  const onClickaddYeuCau = () => {
    if (
      title.trim() !== "" &&
      description.trim() !== "" &&
      phone > 0 &&
      room !== 0
    ) {
      createYeuCauAPI(yeucau).then((res) => {
        setYeuCaus([...yeucaus, res]);
        alert("Thêm mới thành công");
        setShowAddYeuCau(false);
      });
    } else {
      alert("Vui lòng nhập đủ thông tin!");
    }
  };
  return (
    <Modal id="modal" isOpen={showAddYeuCau} fade={false}>
      <ModalHeader id="modalHeader">Thêm mới yêu cầu</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Tiêu đề:</Label>
            <Input
              placeholder="Nhập tiêu đề..."
              value={title}
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Description:</Label>
            <Input
              placeholder="Nhập description..."
              value={description}
              type="text"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Phone:</Label>
            <Input
              placeholder="Phone..."
              value={phone}
              type="number"
              min={1}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Room:</Label>
            <Input
              value={room}
              type="select"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            ><option>---</option>{options}</Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClickaddYeuCau}>Thêm</Button>
        <Button
          onClick={() => {
            setShowAddYeuCau(false);
          }}
        >
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddYeuCauModal;
