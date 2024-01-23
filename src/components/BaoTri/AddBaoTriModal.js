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
import { createBaoTriAPI } from "../../APIs/BaoTriAPI";

function AddBaoTriModal(props) {
    let { showAddBaoTri, setShowAddBaoTri, setBaoTris, baotris, phongs } =
    props;
  let [maintenanceDate, setMaintenanceDate] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(1);
  let [room, setRoom] = useState(0);
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option value={p.id}>{p.title}</option>;
        })
      : null;
  let baotri = {
    maintenanceDate: maintenanceDate,
    description: description,
    price: price,
    roomId: room,
  };
  const onClickaddBaoTri = () => {
    if (
      maintenanceDate.trim() !== "" &&
      description.trim() !== "" &&
      price > 0 &&
      room!==0
    ) {
      createBaoTriAPI(baotri).then((res) => {
        setBaoTris([...baotris, res]);
        alert("Thêm mới thành công");
        setShowAddBaoTri(false);
      });
    } else {
      alert("Vui lòng nhập đủ thông tin!");
    }
  };
  return (
    <Modal id="modal" isOpen={showAddBaoTri} fade={false}>
      <ModalHeader id="modalHeader">Thêm mới bảo trì</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Ngày bảo trì:</Label>
            <Input
              placeholder="Nhập ngày bảo trì..."
              value={maintenanceDate}
              type="date"
              onChange={(event) => {
                setMaintenanceDate(event.target.value);
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
            <Label>Price:</Label>
            <Input
              placeholder="Price..."
              value={price}
              type="number"
              min={1}
              onChange={(event) => {
                setPrice(event.target.value);
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
        <Button onClick={onClickaddBaoTri}>Thêm</Button>
        <Button
          onClick={() => {
            setShowAddBaoTri(false);
          }}
        >
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddBaoTriModal;