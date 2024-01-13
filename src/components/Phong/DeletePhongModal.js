import React from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { deletePhongAPI } from "../../APIs/PhongAPIs";

function DeletePhongModal(props) {
  let { setPhongs, phongs, setShowDelModal, showDelModal, phongToDel } = props;
  const onClickDel = () => {
    deletePhongAPI(phongToDel.id).then(() => {
      
      let updatePhongs = phongs.filter((p) => p.id !== phongToDel.id);
      setPhongs(updatePhongs);
      setShowDelModal(false);
      alert("Xoá thành công");
      
    });
  };
  return (
    <Modal isOpen={showDelModal} fade={false}>
      <ModalHeader>{`Bạn chắc chắn muốn xoá phòng ${phongToDel.title}`}</ModalHeader>
      <ModalFooter>
        <Button onClick={onClickDel}>Xác nhận</Button>
        <Button
          onClick={() => {
            setShowDelModal(false);
          }}
        >
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeletePhongModal;
