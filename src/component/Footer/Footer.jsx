import React, { useEffect } from "react";
import "./Footer.scss";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listProduct, NexPage } from "../redux/Reducer";

const Footer = () => {
  const distpatch = useDispatch();
  const products = useSelector(listProduct);
  useEffect(() => {}, []);

  const Next = (i) => {
    distpatch(NexPage(i));
  };

  return (
    <div className="footer">
      <Pagination
        defaultCurrent={1}
        pageSize={4}
        total={products.length}
        onChange={(page) => Next(page)}
      />
    </div>
  );
};

export default Footer;
