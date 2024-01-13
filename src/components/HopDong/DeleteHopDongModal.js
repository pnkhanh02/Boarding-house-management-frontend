import React from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { deleteHopDongAPI } from "../../APIs/HopDongAPIs";

function DeleteHopDongModal(props) {
  let { setHopDongs, hopdongs, setShowDelHopDong, showDelHopDong, hopdongToDel } = props;
  const onClickDelHopDong = () => {
    deleteHopDongAPI(hopdongToDel.id).then(() => {
      
      let updateHopDongs = hopdongs.filter((p) => p.id !== hopdongToDel.id);
      setHopDongs(updateHopDongs);
      setShowDelHopDong(false);
      alert("Xoá thành công");
      
    });
  };
  return (
    <Modal isOpen={showDelHopDong} fade={false}>
      <ModalHeader>{`Bạn chắc chắn muốn xoá hợp đồng ${hopdongToDel.name}`}</ModalHeader>
      <ModalFooter>
        <Button onClick={onClickDelHopDong}>Xác nhận</Button>
        <Button
          onClick={() => {
            setShowDelHopDong(false);
          }}
        >
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteHopDongModal;
