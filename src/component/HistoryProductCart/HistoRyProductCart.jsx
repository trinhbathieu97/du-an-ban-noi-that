import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HistoRy.scss";
import { DataFirebaserCart } from "../redux/ReducerCart";
import { DeleteHitory } from "../redux/ReducerCart";

const HistoRyProductCart = () => {
  const DataProductFirebase = useSelector(DataFirebaserCart);

  const distpatch = useDispatch();
  const Delete = (id) => {
    distpatch(DeleteHitory(id));
  };

  return (
    <div className="History_Cart">
      <div className="History_Cart-header">Lịch sử mua hàng</div>
      <div>
        <table style={{ width: "100%" }}>
          <tr>
            <th className="History_Cart-type">Sản phẩm</th>
            <th className="History_Cart-type">Gía</th>
            <th className="History_Cart-type">Số lượng </th>
            <th className="History_Cart-type">thời gian</th>
            <th className="History_Cart-type">Tổng số tiền</th>
            <th className="History_Cart-type"></th>
          </tr>
          {DataProductFirebase.map((item) => (
            <tr className="list-type">
              <td className="name_product">
                <div className="product_hitory">
                  <div className="img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="name">
                    <p>{item.name}</p>
                  </div>
                </div>
              </td>
              <td>{item.price} $</td>
              <td>x{item.type}</td>
              <td>{item.time}</td>
              <td>{item.itemmoney} $</td>
              <td>
                <button className="Delete" onClick={() => Delete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default HistoRyProductCart;
