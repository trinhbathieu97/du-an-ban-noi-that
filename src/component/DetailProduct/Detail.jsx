import { FontSizeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProduct2 } from "../redux/Reducer";
import "./DetailApp.scss";
const Detail = () => {
  const { id } = useParams();
  const productDetail = useSelector(listProduct2);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchedProduct = productDetail.find((item) => item.id == id);
    console.log(fetchedProduct);
    productDetail && setProduct(fetchedProduct);
  }, [productDetail, id]);

  if (!product) return <></>;

  return (
    <div className="detailProduct">
      <div className="img_product">
        <div>
          <img src={product.img} alt="" />
        </div>
        <div className="info_detail">
          <div className="name_Product">
            <p>
              <Rate allowHalf defaultValue={2.5} />
            </p>
            <h1>{product.name}</h1>
            <h2>
              <span className="symbol">Pricer :</span> {product.price} $
            </h2>
            <div></div>
          </div>
          <div className="amount_product">
            <ul>
              <Button type="primary" shape="circle">
                -
              </Button>
              <li>1</li>
              <Button type="primary" shape="circle">
                +
              </Button>
            </ul>
          </div>
          <div className="Product_typeo">
            <h4>
              {" "}
              <span className="symbol">Typeo :</span> {product.Collection}
            </h4>
            <h4>
              {" "}
              <span className="symbol">Room :</span> {product.category}
            </h4>
          </div>
          <div className="Add_product">
            <Button
              style={{
                height: "50px",
                width: "120%",
                fontSize: "20px",
                background: "#000",
                color: "#fff",
              }}
            >
              Mua hang
            </Button>
            <div>
              <ShoppingCartOutlined style={{ fontSize: "40px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
