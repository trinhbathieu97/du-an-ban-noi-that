import React, { useCallback, useRef } from "react";
import "./Info.scss";
import { Modal, Input } from "antd";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataUserApp, getUerApp } from "../redux/ReducerCart";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { DataUserLongIn } from "../redux/Reducer";
const InfoUser = () => {
  const distpatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dataUser = useSelector(dataUserApp);
  const emailUser = useSelector(DataUserLongIn);
  const [img, setimg] = useState(dataUser.img);
  const [name, setName] = useState(dataUser.name);
  const [email, setEmail] = useState(dataUser.email);
  const [phone, setPhone] = useState(dataUser.phone);
  const [address, setAddress] = useState(dataUser.address);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const db = getFirestore();
    const docRef2 = doc(db, "usersApp", emailUser[0].email);
    await setDoc(docRef2, {
      user: {
        name: name,
        email: email,
        img: img,
        phone: phone,
        address: address,
      },
    });
    const all = await getDoc(docRef2);
    distpatch(getUerApp(all.data().user));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const userAppChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
    if (e.target.name === "address") {
      setAddress(e.target.value);
    }
    if (e.target.name === "img") {
      setimg(e.target.value);
    }
  };

  return (
    <div className="User">
      <div className="InfoUser">
        <div className="InfoUser_avta">
          <div className="InfoUser_avta-img">
            <img src={dataUser.img} alt="" />
          </div>
          <div className="inFo_name">{dataUser.name}</div>
        </div>
        <div className="info_user">
          <div className="user_detail">
            <div>
              <span className="list">Name :</span> {dataUser.name}
            </div>
          </div>
          <div className="user_detail">
            <div>
              <span className="list">Email :</span> {dataUser.email}
            </div>
          </div>
          <div className="user_detail">
            <div>
              <span className="list">Phone Number :</span>
              {dataUser.phone}
            </div>
          </div>
          <div className="user_detail">
            <div>
              <span className="list">Address :</span>
              {dataUser.address}
            </div>
          </div>
        </div>
      </div>
      <div className="handle_user">
        <div className="canl">
          <button onClick={showModal}>chinh sua</button>
          <Modal
            title="InFo User"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p className="nav">
              Name
              <Input
                type="text"
                name="name"
                value={name}
                onChange={userAppChange}
              />
            </p>
            <p className="nav">
              Img
              <Input
                type="text"
                name="img"
                value={img}
                onChange={userAppChange}
              />
            </p>
            <p className="nav">
              Email
              <Input
                type="text"
                name="email"
                value={email}
                onChange={userAppChange}
              />
            </p>
            <p className="nav">
              Phone Number{" "}
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={userAppChange}
              />
            </p>
            <p className="nav">
              Address{" "}
              <Input
                type="text"
                name="address"
                value={address}
                onChange={userAppChange}
              />
            </p>
          </Modal>
          <button>canl</button>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
