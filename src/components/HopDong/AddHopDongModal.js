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
import "./HopDong.css";
import { createHopDongAPI } from "../../APIs/HopDongAPIs";

function AddHopDongModal(props) {
  let { showAddHopDong, setShowAddHopDong, setHopDongs, hopdongs, phongs } =
    props;
  let [name, setName] = useState("");
  let [deadline, setDeadline] = useState("");
  let [numOfPeople, setNumOfPeople] = useState(1);
  let [room, setRoom] = useState(0);
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option value={p.id}>{p.title}</option>;
        })
      : null;
  let hopdong = {
    name: name,
    deadline: deadline,
    numOfPeople: numOfPeople,
    roomId: room,
  };
  const onClickaddHopDong = () => {
    if (
      name.trim() !== "" &&
      deadline.trim() !== "" &&
      numOfPeople > 0 &&
      room.trim() !== ""
    ) {
      createHopDongAPI(hopdong).then((res) => {
        setHopDongs([...hopdongs, res]);
        alert("Thêm mới thành công");
        setShowAddHopDong(false);
      });
    } else {
      alert("Vui lòng nhập đủ thông tin!");
    }
  };
  return (
    <Modal id="modal" isOpen={showAddHopDong} fade={false}>
      <ModalHeader id="modalHeader">Thêm mới hợp đồng</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Tên họp đồng:</Label>
            <Input
              placeholder="Nhập tên họp đồng..."
              value={name}
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Deadline:</Label>
            <Input
              placeholder="Nhập deadline..."
              value={deadline}
              type="date"
              onChange={(event) => {
                setDeadline(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>NumOfPeople:</Label>
            <Input
              placeholder="NumOfPeople..."
              value={numOfPeople}
              type="number"
              min={1}
              onChange={(event) => {
                setNumOfPeople(event.target.value);
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
            >{options}</Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClickaddHopDong}>Thêm</Button>
        <Button
          onClick={() => {
            setShowAddHopDong(false);
          }}
        >
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddHopDongModal;
