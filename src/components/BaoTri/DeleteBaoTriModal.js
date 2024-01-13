import React from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import { deleteBaoTriAPI } from "../../APIs/BaoTriAPI";

function DeleteBaoTriModal(props) {
    let {
      setBaoTris,
      baotris,
      setShowDelBaoTri,
      showDelBaoTri,
      baotriToDel,
    } = props;
    const onClickDelBaoTri = () => {
      deleteBaoTriAPI(baotriToDel.id).then(() => {
        let updateBaoTris = baotris.filter((p) => p.id !== baotriToDel.id);
        setBaoTris(updateBaoTris);
        setShowDelBaoTri(false);
        alert("Xoá thành công");
      });
    };
    return (
      <Modal isOpen={showDelBaoTri} fade={false}>
        <ModalHeader>{`Bạn chắc chắn muốn xoá bảo trì ${baotriToDel.title}`}</ModalHeader>
        <ModalFooter>
          <Button onClick={onClickDelBaoTri}>Xác nhận</Button>
          <Button
            onClick={() => {
              setShowDelBaoTri(false);
            }}
          >
            Huỷ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  
  export default DeleteBaoTriModal;