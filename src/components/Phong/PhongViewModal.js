import React, { useState } from "react";
import {
  Button,
  Modal,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { createDanhGiaAPI } from "../../APIs/DanhGiaAPIs";
import { createBinhLuanAPI } from "../../APIs/BinhLuanAPIs";


function PhongViewModal(props) {
  let [newRating, setNewRating] = useState(5);
  let [hideRate, setHideRate] = useState(true);
  let [newContent, setNewContent] = useState();
  const tinhSoTrungBinh = (arr) => {
    if (arr.length === 0) {
      return 0; // Tránh chia cho 0 nếu danh sách trống
    }

    const tong = arr.reduce((acc, curr) => acc + curr, 0);
    const trungBinh = tong / arr.length;

    // Làm tròn đến 1 chữ số thập phân
    const trungBinhLamTron = trungBinh.toFixed(1);

    return parseFloat(trungBinhLamTron);
  };
  let { showView, phongView, setShowView, setPhongView } = props;
  let danhGias =phongView&&phongView.danhGias? phongView.danhGias:[];
  let rates =danhGias.length>0? danhGias.map((dg) => dg.rating):[];
  let rating = tinhSoTrungBinh(rates);
  let binhLuans =phongView&&phongView.binhLuans? phongView.binhLuans:[];
  let clickAddDanhGia = () => {
    let danhGiaCheck = danhGias&&danhGias.length>0?danhGias.find((dg)=>dg.account.id===localStorage.getItem("id")):{id:0}
    console.log("da",danhGiaCheck);
    if(danhGiaCheck&&danhGiaCheck.id===0||danhGiaCheck===undefined){alert("Bạn chỉ được đánh giá một lần")}else{
      let newDanhGia = {
        rating: newRating,
        accountId: localStorage.getItem("id"),
        roomId: phongView.id,
      };
      createDanhGiaAPI(newDanhGia).then((res) => {
        console.log("GG",res);
        let newRates = [...rates, res];
        let phong = { ...phongView, danhGias: newRates };
        setPhongView(phong);
      });
    }
  };
  let clickAddBinhLuan = () => {
    let newBinhLuan = {
      content: newContent,
      accountId: localStorage.getItem("id"),
      roomId: phongView.id,
    };
    createBinhLuanAPI(newBinhLuan).then((res) => {

      let newContents = [...binhLuans, res];
      let phong = { ...phongView, binhLuans: newContents };
      setPhongView(phong);
    });
  };
  return (
    <Modal id="modal" isOpen={showView} fade={false}>
      <ModalHeader id="modalHeader">Xem phòng</ModalHeader>
      <ModalBody style={{ height: "400px", overflowY: "auto" }}>
        <div>
          <Label>Tên phòng:</Label> {phongView.title}
        </div>
        <div>
          <Label>Địa chỉ:</Label> {phongView.address}
        </div>
        <div>
          <Label>Area:</Label> {phongView.area}
        </div>
        <div>
          <Label>Giá:</Label> {phongView.price}
        </div>
        <div>
          <Label>Tình trạng:</Label> {phongView.status}
        </div>
        <div>
          <Label>Ảnh:</Label>
          <img
            style={{ marginTop: "20px", width: "460px", objectFit: "cover" }}
            alt="Lỗi tải ảnh"
            src={phongView.imageUrl}
          ></img>
        </div>
        <hr></hr>
        <div>
          <Label
            onClick={() => {
              if (hideRate === true) {
                setHideRate(false);
              } else setHideRate(true);
            }}
          >{`Đánh giá trung bình: ${rating}`}</Label>
          <div hidden={hideRate}>
            {danhGias.length>0?danhGias.map((dg) => {
              return (
                <div style={{marginTop: "5px", marginBottom: "5px"}}>
                  <b>{`${dg.account.username}: `}</b>
                  {dg.rating}
                </div>
              );
            }):null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Input
                value={newRating}
                type="number"
                min={1}
                max={5}
                onChange={(event) => {
                  setNewRating(event.target.value);
                }}
              ></Input>
              <Button onClick={clickAddDanhGia} color="success">Đánh giá</Button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <Label>Bình luận:</Label>
          <div>
            {phongView.binhLuans&&phongView.binhLuans.length>0?phongView.binhLuans.map((bl, index) => {
              return (
                <div style={{marginTop: "5px", marginBottom: "5px"}}>
                  <b>{`${bl.account.username}: `}</b>
                  {bl.content}
                </div>
              );
            }):null}
          </div>
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <Input
                value={newContent}
                type="text"
                onChange={(event) => {
                  setNewContent(event.target.value);
                }}
              ></Input>
              <Button onClick={clickAddBinhLuan} color="success">Bình Luận</Button>
            </div>
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

export default PhongViewModal;
