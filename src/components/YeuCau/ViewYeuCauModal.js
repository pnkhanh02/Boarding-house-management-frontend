import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ViewYeuCauModal(props) {
    let { showView, yeucauView, setShowView, phongs } = props;
    return (
      <Modal id="modal" isOpen={showView} fade={false}>
        <ModalHeader id="modalHeader">Xem Yêu cầu</ModalHeader>
        <ModalBody style={{height:"200px",overflowY:"auto"}}>
          <div>
            <Label>Tiêu đề:</Label> {yeucauView.title}
          </div>
          <div>
            <Label>Description:</Label> {yeucauView.description}
          </div>
          <div>
            <Label>Phone:</Label> {yeucauView.phone}
          </div>
          <div>
            <Label>Room:</Label> {yeucauView.roomTitle}
          </div>
          
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setShowView(false);
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  
  export default ViewYeuCauModal;