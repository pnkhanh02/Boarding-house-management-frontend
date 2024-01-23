import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ViewHopDongModal(props) {
    let { showView, hopdongView, setShowView, phongs } = props;
    console.log("DD",hopdongView);
    return (
      <Modal id="modal" isOpen={showView} fade={false}>
        <ModalHeader id="modalHeader">Xem hợp đồng</ModalHeader>
        <ModalBody style={{height:"200px",overflowY:"auto"}}>
          <div>
            <Label>Tên hợp đồng:</Label> {hopdongView.name}
          </div>
          <div>
            <Label>StartDate:</Label> {hopdongView.startDate}
          </div>
          <div>
            <Label>EndDate:</Label> {hopdongView.endDate}
          </div>
          <div>
            <Label>NumOfPeople:</Label> {hopdongView.numOfPeople}
          </div>
          <div>
            <Label>Room:</Label> {hopdongView.roomTitle}
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
  
  export default ViewHopDongModal;