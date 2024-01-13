import React from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { deleteYeuCauAPI } from "../../APIs/YeuCauAPIs";

function DeleteYeuCauModal(props) {
  let {
    setYeuCaus,
    yeucaus,
    setShowDelYeuCau,
    showDelYeuCau,
    yeucauToDel,
  } = props;
  const onClickDelYeuCau = () => {
    deleteYeuCauAPI(yeucauToDel.id).then(() => {
      let updateYeuCaus = yeucaus.filter((p) => p.id !== yeucauToDel.id);
      setYeuCaus(updateYeuCaus);
      setShowDelYeuCau(false);
      alert("Xoá thành công");
    });
  };
  return (
    <Modal isOpen={showDelYeuCau} fade={false}>
      <ModalHeader>{`Bạn chắc chắn muốn xoá yêu cầu ${yeucauToDel.title}`}</ModalHeader>
      <ModalFooter>
        <Button onClick={onClickDelYeuCau}>Xác nhận</Button>
        <Button
          onClick={() => {
            setShowDelYeuCau(false);
          }}
        >
          Huỷ
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteYeuCauModal;
