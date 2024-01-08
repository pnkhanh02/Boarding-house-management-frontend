import { useState } from "react";
import { Form } from "react-router-dom";
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import React from "react";
function AddPhongModal(props) {
    let [title, setTitle] = useState("");
    let [address, setAddress] = useState("");
    let [area, setArea] = useState(0);
    let [price, setPrice] = useState(0);
    let [status, setStatus] = useState("");
    let [url, setUrl] = useState("");
    let { showModal, setShowModal } = props;
    console.log("SHOW",showModal);
    return (
        <Modal isOpen={showModal} fade={false}>
            <ModalHeader>Tạo phòng mới</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input
                            onChange={(event) => { setTitle(event.target.value) }} type="text" value={title} placeholder="Nhập tên phòng..." >
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter><Button onClick={() => { setShowModal(false) }}>Đóng</Button></ModalFooter>
        </Modal>
    )
}
export default AddPhongModal;