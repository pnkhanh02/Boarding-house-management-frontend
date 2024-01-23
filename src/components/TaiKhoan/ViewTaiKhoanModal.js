import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

function ViewTaiKhoanModal(props) {
    let { showView, taikhoanView, setShowView, phongs } = props;
    return (
      <Modal id="modal" isOpen={showView} fade={false}>
        <ModalHeader id="modalHeader">{`Tài khoản ${taikhoanView.username}`}</ModalHeader>
        <ModalBody style={{height:"200px",overflowY:"auto"}}>
          <div>
            <Label>Username:</Label> {taikhoanView.username}
          </div>
          <div>
            <Label>Name:</Label> {taikhoanView.name}
          </div>
          <div>
            <Label>Phone Number:</Label> {taikhoanView.phoneNumber}
          </div>
          <div>
            <Label>Role:</Label> {taikhoanView.role}
          </div>
          <div>
            <Label>Status:</Label> {taikhoanView.status}
          </div>
          {/* <div>
            <Label>Room:</Label> {taikhoanView.room.title ? taikhoanView.room.title : "phòng đã bị xoá"}
          </div> */}
          
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
  
  export default ViewTaiKhoanModal;