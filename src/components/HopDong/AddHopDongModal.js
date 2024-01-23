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
import "./HopDong.css";
import { createHopDongAPI } from "../../APIs/HopDongAPIs";

function AddHopDongModal(props) {
  let { showAddHopDong, setShowAddHopDong, setHopDongs, hopdongs, phongs } =
    props;
  let [name, setName] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [numOfPeople, setNumOfPeople] = useState(1);
  let [room, setRoom] = useState(0);
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option key={index} value={p.id}>{p.title}</option>;
        })
      : null;
  let hopdong = {
    name: name,
    startDate: startDate,
    endDate: endDate,
    numOfPeople: numOfPeople,
    roomId: room,
  };
  const onClickaddHopDong = () => {
    if (
      name.trim() !== "" &&
      startDate.trim() !== "" &&
      endDate.trim() !== "" &&
      numOfPeople > 0 && room!==0
    ) {
      createHopDongAPI(hopdong).then((res) => {
        setHopDongs([...hopdongs, res]);
        alert("Thêm mới thành công");
        setShowAddHopDong(false);
        setName("");
        setStartDate("");
        setEndDate("");
        setNumOfPeople(1);
        setRoom(0)
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
            <Label>StartDate:</Label>
            <Input
              placeholder="Nhập startDate..."
              value={startDate}
              type="date"
              onChange={(event) => {
                setStartDate(event.target.value);
              }}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>EndDate:</Label>
            <Input
              placeholder="Nhập endDate..."
              value={endDate}
              type="date"
              onChange={(event) => {
                setEndDate(event.target.value);
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
            ><option >---</option>{options}</Input>
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
