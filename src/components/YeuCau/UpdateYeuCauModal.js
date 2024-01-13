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
import { editYeuCauAPI } from "../../APIs/YeuCauAPIs";

function UpdateYeuCauModal(props) {
  // Lấy dữ liệu từ Phong.js xuống:
  let {
    yeucaus,
    setYeuCaus,
    showUpdateYeuCau,
    setShowUpdateYeuCau,
    yeucauToUpdate,
    phongs,
    setYeuCauToUpdate,
  } = props;
  let options =
    phongs && phongs.length > 0
      ? phongs.map((p, index) => {
          return <option value={p.id}>{p.title}</option>;
        })
      : null;
  let [id, setId] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [phone, setPhone] = useState(1);
  let [roomId, setRoomId] = useState(0);
  let yeucau = {
    id: id,
    title: title,
    description: description,
    phone: phone,
    roomId: roomId,
  };
  useEffect(() => {
    setId(yeucauToUpdate.id);
    setTitle(yeucauToUpdate.title);
    setDescription(yeucauToUpdate.description);
    setPhone(yeucauToUpdate.phone);
    setRoomId(
      yeucauToUpdate.room && yeucauToUpdate.room.id
        ? yeucauToUpdate.room.id
        : ""
    );
  }, [yeucauToUpdate]);
  let clickUpdateYeuCau = () => {
    //Gọi api update, cập nhật lại biến phongs(bằng hàm setPhongs), đóng cửa sổ lại

    editYeuCauAPI(yeucau).then((res) => {
      console.log("RES", res);
      let yeucauUpdates = yeucaus.map((p) => (p.id === res.id ? res : p));
      setYeuCaus([...yeucauUpdates]);
      setShowUpdateYeuCau(false);
      alert("Update thành công");
    });
  };
  return (
    <Modal isOpen={showUpdateYeuCau} fade={false}>
      <ModalHeader>{`Sửa yêu cầu ${yeucauToUpdate.title}`}</ModalHeader>
      <ModalBody>
        {" "}
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
        <Button onClick={clickUpdateYeuCau}>Sửa</Button>
        <Button onClick={() => setShowUpdateYeuCau(false)}>Huỷ</Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateYeuCauModal;
