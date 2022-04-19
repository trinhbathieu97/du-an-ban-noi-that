import React, { useRef, useState } from "react";
import { Modal } from "antd";
import { Tabs } from "antd";
import LoginUser from "./LoginUser/LoginUser";
import "./LogIn.scss";
import Registration from "./Registration/Registration";
import { useSelector, useDispatch } from "react-redux";
import { DataUserLongIn, LogInUser, LogOut } from "../redux/Reducer";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase/Firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { dataUserApp, GetItemFirebase } from "../redux/ReducerCart";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;
const LogIn = () => {
  const userApp = useSelector(dataUserApp);
  const DataUser = useSelector(DataUserLongIn);
  const OnLogIn = useSelector(LogInUser);
  const [OnlogOut, setOnlogOut] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tabs, setTabs] = useState("1");
  const distpatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const auth = getAuth(app);
  const OpenLogin = () => {
    setOnlogOut(!OnlogOut);
  };
  // // ------------ log uot
  const LogOutUser = () => {
    signOut(auth)
      .then(() => {
        distpatch(LogOut());
        localStorage.removeItem("tk");
        localStorage.removeItem("pass");
        localStorage.removeItem("item");
      })
      .catch((error) => {
        console.log(error);
      });
    OpenLogin();
  };
  // lay gia tri tu firebase ve
  const HitoryCart = async (e) => {
    e.stopPropagation();
    const db = getFirestore();
    // lay gia tri cua firebase
    const docRef2 = doc(db, "users", DataUser[0].email);
    const docSnap = await getDoc(docRef2);
    const DataCartHistory = docSnap.data().data;
    distpatch(GetItemFirebase(DataCartHistory));
    OpenLogin();
  };
  // khi dang ky thanh cong tu chuyen sang dang nhap
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log("w");
    }
  };
  return (
    <>
      <div
        onClick={showModal}
        className="login"
        style={{ display: OnLogIn && "none" }}
      >
        LogIn
      </div>
      {OnLogIn && (
        <div className="login" onClick={OpenLogin}>
          <div className="avtlist">
            {OnLogIn && <img className="avt" src={userApp.img} alt="" />}
          </div>
          {OnLogIn && <div className="nameUser">{userApp.email}</div>}
          {OnlogOut && (
            <div className="LogOut">
              <ul>
                <Link to="/user">Thông Tin</Link>
                <Link to="/a" onClick={HitoryCart}>
                  Lich su mua hang
                </Link>
                <a onClick={LogOutUser}>Đăng xuất</a>
              </ul>
            </div>
          )}
        </div>
      )}

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={true}
        style={{ textAlign: "center" }}
      >
        <Tabs
          activeKey={tabs}
          centered={true}
          onTabClick={(key) => setTabs(key)}
        >
          <TabPane tab="Đăng nhập" key="1">
            <LoginUser handleCancel={handleCancel} />
          </TabPane>
          <TabPane tab="Đăng ký" key="2">
            <Registration setas={setTabs} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default LogIn;
