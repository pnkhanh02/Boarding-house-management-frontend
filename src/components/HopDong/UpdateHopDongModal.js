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
import { editHopDongAPI } from "../../APIs/HopDongAPIs";

function UpdateHopDongModal(props) {
  // Lấy dữ liệu từ Phong.js xuống:
  let {
    hopdongs,
    setHopDongs,
    showUpdateHopDong,
    setShowUpdateHopDong,
    hopdongToUpdate,
    phongs,
    setHopDongToUpdate,
  } = props;
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option value={p.id}>{p.title}</option>;
        })
      : null;
  let [id, setId] = useState("");
  let [name, setName] = useState("");
  let [deadline, setDeadline] = useState("");
  let [numOfPeople, setNumOfPeople] = useState(1);
  let [roomId, setRoomId] = useState(0);
  let hopdong = {
    id: id,
    name: name,
    deadline: deadline,
    numOfPeople: numOfPeople,
    roomId: roomId,
  };
  useEffect(() => {
    setId(hopdongToUpdate.id);
    setName(hopdongToUpdate.name);
    setDeadline(hopdongToUpdate.deadline);
    setNumOfPeople(hopdongToUpdate.numOfPeople);
    setRoomId(
      hopdongToUpdate.room && hopdongToUpdate.room.id
        ? hopdongToUpdate.room.id
        : ""
    );
  }, [hopdongToUpdate]);
  let clickUpdateHopDong = () => {
    //Gọi api update, cập nhật lại biến phongs(bằng hàm setPhongs), đóng cửa sổ lại

    editHopDongAPI(hopdong).then((res) => {
      console.log("RES", res);
      let hopdongUpdates = hopdongs.map((p) => (p.id === res.id ? res : p));
      setHopDongs([...hopdongUpdates]);
      setShowUpdateHopDong(false);
      alert("Thêm mới thành công");
    });
  };
  return (
    <Modal isOpen={showUpdateHopDong} fade={false}>
      <ModalHeader>{`Sửa hợp đồng ${hopdongToUpdate.name}`}</ModalHeader>
      <ModalBody>
        {" "}
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
              value={roomId}
              type="select"
              onChange={(event) => {
                setRoomId(event.target.value);
              }}
            >
              {options}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={clickUpdateHopDong}>Sửa</Button>
        <Button onClick={() => setShowUpdateHopDong(false)}>Huỷ</Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateHopDongModal;
