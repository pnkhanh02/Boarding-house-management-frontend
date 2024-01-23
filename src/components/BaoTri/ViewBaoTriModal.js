import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ViewBaoTriModal(props) {
    let { showView, baotriView, setShowView, phongs } = props;
    return (
      <Modal id="modal" isOpen={showView} fade={false}>
        <ModalHeader id="modalHeader">Xem Bảo trì</ModalHeader>
        <ModalBody style={{height:"200px",overflowY:"auto"}}>
          <div>
            <Label>Ngày bảo trì:</Label> {baotriView.maintenanceDate}
          </div>
          <div>
            <Label>Description:</Label> {baotriView.description}
          </div>
          <div>
            <Label>Price:</Label> {baotriView.price}
          </div>
          <div>
            <Label>Room:</Label> {baotriView.roomTitle}
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
  
  export default ViewBaoTriModal;