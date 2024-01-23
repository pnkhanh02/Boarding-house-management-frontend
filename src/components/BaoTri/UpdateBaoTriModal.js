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
import { editBaoTriAPI } from "../../APIs/BaoTriAPI";

function UpdateBaoTriModal(props) {
    // Lấy dữ liệu từ Phong.js xuống:
    let {
      baotris,
      setBaoTris,
      showUpdateBaoTri,
      setShowUpdateBaoTri,
      baotriToUpdate,
      phongs,
      setBaoTriToUpdate,
    } = props;
    let options =
      phongs && phongs.length > 0
        ? phongs.map((p, index) => {
            return <option value={p.id}>{p.title}</option>;
          })
        : null;
    let [id, setId] = useState("");
    let [maintenanceDate, setMaintenanceDate] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState(1);
    let [roomId, setRoomId] = useState(0);
    let baotri = {
      id: id,
      maintenanceDate: maintenanceDate,
      description: description,
      price: price,
      roomId: roomId,
    };
    useEffect(() => {
      setId(baotriToUpdate.id);
      setMaintenanceDate(baotriToUpdate.maintenanceDate);
      setDescription(baotriToUpdate.description);
      setPrice(baotriToUpdate.price);
      setRoomId(
        baotriToUpdate.roomId
          
      );
    }, [baotriToUpdate]);
    let clickUpdateBaoTri = () => {
      //Gọi api update, cập nhật lại biến phongs(bằng hàm setPhongs), đóng cửa sổ lại
  
      editBaoTriAPI(baotri).then((res) => {
        console.log("RES", res);
        let baotriUpdates = baotris.map((p) => (p.id === res.id ? res : p));
        setBaoTris([...baotriUpdates]);
        setShowUpdateBaoTri(false);
        alert("Update thành công");
      });
    };
    return (
      <Modal isOpen={showUpdateBaoTri} fade={false}>
        <ModalHeader>{`Sửa bảo trì ${baotriToUpdate.maintenanceDate}`}</ModalHeader>
        <ModalBody>
          {" "}
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
                value={roomId}
                type="select"
                onChange={(event) => {
                  setRoomId(event.target.value);
                }}
              ><option>---</option>
                {options}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={clickUpdateBaoTri}>Sửa</Button>
          <Button onClick={() => setShowUpdateBaoTri(false)}>Huỷ</Button>
        </ModalFooter>
      </Modal>
    );
  }
  
  export default UpdateBaoTriModal;