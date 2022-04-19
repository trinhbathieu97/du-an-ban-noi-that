import "./Container.scss";
import React, { useState } from "react";
import { Slider } from "antd";
import Cart_product from "../../asset/Cart-produc.png";
import SearachFiled from "../SearachFiled/SearachFiled";
import reviews from "../../asset/reviews.png";
import { useSelector } from "react-redux";
import {
  listProduct2,
  MinMax,
  CollectionOpen1,
  CollectionOpen2,
  CollectionOpen3,
} from "../redux/Reducer";
import { useDispatch } from "react-redux";
import MuiTen from "../../asset/Muiten.png";
import { Color, Collection, Category } from "../Common/Common";
import { addCart, listProductCart } from "../redux/ReducerCart";
import { Link } from "react-router-dom";

const Container = () => {
  const data2 = useSelector(listProduct2);
  const ListCart = useSelector(listProductCart);
  const distpatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [onSelect1, setOnselect1] = useState(false);
  const [onSelect2, setOnselect2] = useState(false);
  const [onSelect3, setOnselect3] = useState(false);
  const [getSelect1, setGetSelect1] = useState("Collection");
  const [getSelect2, setGetSelect2] = useState("Color");
  const [getSelect3, setGetSelect3] = useState("Category");

  const OpenSelect = () => {
    setOpen(!open);
  };
  const OnSelect1 = () => {
    setOnselect1(!onSelect1);
  };
  const OnSelect2 = () => {
    setOnselect2(!onSelect2);
  };
  const OnSelect3 = () => {
    setOnselect3(!onSelect3);
  };

  const a = (value) => {
    distpatch(MinMax(value));
  };

  const Select_Collection_1 = (item) => {
    distpatch(CollectionOpen1(item));
    setGetSelect1(item);
    setOnselect1(!onSelect1);
  };
  const Select_Collection_2 = (item) => {
    distpatch(CollectionOpen2(item));
    setGetSelect2(item);
    setOnselect2(!onSelect2);
  };
  const Select_Collection_3 = (item) => {
    distpatch(CollectionOpen3(item));
    setGetSelect3(item);
    setOnselect3(!onSelect3);
  };
  // them san pham vao gio hang
  const addCartProduct = (item, e) => {
    e.preventDefault();
    distpatch(addCart(item));
  };

  return (
    <div>
      <SearachFiled />
      <div className="Container">
        <select name="" id="" className="Container_RPS" onClick={OpenSelect}>
          <option>Filters</option>
        </select>
        <div
          className="list-product list_Selection"
          style={{ display: open && "block" }}
        >
          <p className="list_Selection-fliter">FLITER BY</p>

          <div className="Selection">
            <div className="Selection_Open" onClick={OnSelect1}>
              <p>{getSelect1}</p>
              <p>
                <img src={MuiTen} alt="" />
              </p>
            </div>

            {onSelect1 && (
              <ul className="Selection_list">
                {Collection.map((x) => (
                  <li onClick={() => Select_Collection_1(x.item)} key={x.id}>
                    {x.item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="Selection">
            <div className="Selection_Open" onClick={OnSelect2}>
              <p>{getSelect2}</p>
              <p>
                <img src={MuiTen} alt="" />
              </p>
            </div>

            {onSelect2 && (
              <ul className="Selection_list">
                {Color.map((x) => (
                  <li onClick={() => Select_Collection_2(x.item)}>{x.item}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="Selection">
            <div className="Selection_Open" onClick={OnSelect3}>
              <p>{getSelect3}</p>
              <p>
                <img src={MuiTen} alt="" />
              </p>
            </div>

            {onSelect3 && (
              <ul className="Selection_list">
                {Category.map((x) => (
                  <li onClick={() => Select_Collection_3(x.item)}>{x.item}</li>
                ))}
              </ul>
            )}
          </div>

          <p className="list_Selection-Price">Price Range</p>

          <Slider
            range={{ draggableTrack: true }}
            defaultValue={[0, 10000]}
            onChange={(value) => a(value)}
            max={10000}
          />
          <div className="Selection-Price">
            <p>$0</p>
            <p>$10,000+</p>
          </div>
        </div>
        {/* chi tiet san pham  */}
        {data2.map((item) => (
          <Link
            className="list-product product_details"
            key={item.id}
            to={`/detail/${item.id}`}
          >
            <div>
              <img src={item.img} alt="" className="img_product" />
              <div className="product_details-cart">
                <p>{item.price}$</p>
                <div
                  className="add_product"
                  onClick={(e) => addCartProduct(item, e)}
                >
                  <img src={Cart_product} alt="" />
                  {[...ListCart].filter((x) => x.name === item.name).length >
                    0 && <span className="yes_product">1</span>}
                </div>
              </div>
            </div>
            <div className="product_reviews">
              <p className="product_reviews-Coombes">{item.name}</p>
              <p className="product_reviews-Lounge">{item.category}</p>
              <img src={reviews} alt="" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Container;
