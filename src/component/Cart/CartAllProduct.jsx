import "./Cart.scss";
import {
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogInUser } from "../redux/Reducer";
import {
  listProductCart,
  DeleteCart,
  UpdateMoney,
  smallMoney,
} from "../redux/ReducerCart";
import useMoneyAll from "../../Hooks/useMoneyAll";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { DataUserLongIn } from "../redux/Reducer";
import { AddItemFirebase } from "../redux/ReducerCart";
import { Spin } from "antd";
const CartAllProduct = ({ OpenCart }) => {
  // danh sach san pham trong gio hang
  const itemProductCart = useSelector(listProductCart);
  const LogInCart = useSelector(LogInUser);
  const emailUser = useSelector(DataUserLongIn);
  const dispatch = useDispatch();
  // custom hooks tinh tong so tien cua san pham
  const moneyAll = useMoneyAll();
  // ===========
  const OnCart = (e) => {
    e.stopPropagation();
  };
  const DeleteProduct = (id) => {
    dispatch(DeleteCart(id));
  };
  //  tien so luong san pham
  const Increase = (id) => {
    dispatch(UpdateMoney(id));
  };
  // giam san pham
  const Reduction = (id) => {
    dispatch(smallMoney(id));
  };
  // mua hàng
  const Purchase = async () => {
    setloading(true);
    if (LogInCart && itemProductCart.length > 0) {
      const db = getFirestore();
      const docRef2 = doc(db, "users", emailUser[0].email);
      const docSnap = await getDoc(docRef2);
      //  ====== them 1 ky vao item trong mang de cho vao lich su mua hang
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const itemHitory = itemProductCart.map((itemx) => ({
        ...itemx,
        time: date,
      }));
      if (docSnap._document == null) {
        await setDoc(docRef2, {
          data: itemHitory,
        });
        console.log("b");
        alert("Mua hang thanh cong");
        setloading(false);
      }
      if (docSnap._document !== null) {
        await setDoc(docRef2, {
          data: [...docSnap.data().data].concat(itemHitory),
        });
        alert("Mua hang thanh cong");
        setloading(false);
      }
    } else {
      alert(" dang nhap de dc mua hang");
      setloading(false);
    }
    dispatch(AddItemFirebase());
  };
  // ==========
  const [loading, setloading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <div className="CartAll">
      <div className="List_Cart" onClick={OnCart}>
        <div className="List_Cart-header">
          Sản phẩm đã thêm
          <CloseOutlined
            className="Out"
            style={{ fontSize: "20px" }}
            onClick={OpenCart}
          />
        </div>
        {itemProductCart.map((items) => (
          <div className="Cart_Product" key={items.id}>
            <div className="Cart_Product-img">
              <img src={items.img} alt="" />
            </div>
            <div className="Cart_Product-Price">
              <div className="Cart_Product-name">
                <p>Name : {items.name}</p>
                <p>Price : {items.price} $</p>
              </div>
              <div className="Cart_Product-item">
                <p className="Next-Prever" onClick={() => Reduction(items.id)}>
                  -
                </p>
                <p>{items.type}</p>
                <p className="Next-Prever" onClick={() => Increase(items.id)}>
                  +
                </p>
                <p>{items.itemmoney} $</p>
                <DeleteOutlined
                  onClick={() => DeleteProduct(items.id)}
                  style={{ fontSize: "22px", color: "#000" }}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="Cart_total-money">
          <h4>Tổng Gía Tiền :</h4>
          <h4>{moneyAll} $</h4>
        </div>
        <div className="buying">
          <div style={{ display: LogInCart && "none" }}>
            Hãy đăng nhập để được mua hàng !
          </div>
          <button onClick={Purchase}>Mua hang</button>
          {loading && (
            <div>
              <Spin indicator={antIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartAllProduct;
