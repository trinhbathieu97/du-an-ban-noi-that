import React, { useRef, useState } from "react";
import "./Header.scss";
import logo from "../../asset/Logo.png";
import Cart from "../../asset/Cart.png";
import menuRPS from "../../asset/menuReponsip.png";
import CartPRS from "../../asset/Cart_Rps.png";
import Xoff from "../../asset/Xoff.png";
import LogIn from "../LogIn/LogIn";
import CartAllProduct from "../Cart/CartAllProduct";
import { useSelector } from "react-redux";
import { listProductCart } from "../redux/ReducerCart";
import { Link } from "react-router-dom";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const ListCart = useSelector(listProductCart);

  const OpenMenu = () => {
    setOpen(!open);
  };

  const OpenCart = () => {
    setOnCart(!onCart);
  };

  return (
    <div className="header">
      <div className="header_navbar">
        <div className="header_menu">
          <img src={logo} alt="" className="header_menu-logo" />
        </div>

        <div
          className="header_list-navbar"
          style={{ display: open && "block" }}
        >
          <div className="header_menu-RPS">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="cart_X-RPS">
              <div>
                <img src={CartPRS} alt="" />
              </div>
              <div>
                <img src={Xoff} alt="" className="cart_X" onClick={OpenMenu} />
              </div>
            </div>
          </div>
          <div className="list_menu-RPS">
            <Link to="/" className="Home">
              Home
            </Link>
            <a href="">SHOP</a>
            <a href="">MAGAZINE</a>
          </div>
        </div>
      </div>
      <div className="header_cart-login">
        <div className="add_product-header" onClick={OpenCart}>
          <img src={Cart} alt="" />
          {ListCart.length > 0 && (
            <span className="yes_product-header">{ListCart.length}</span>
          )}

          {onCart && <CartAllProduct OpenCart={OpenCart} />}
        </div>

        <LogIn />

        <img src={menuRPS} alt="" className="MenuRPS" onClick={OpenMenu} />
      </div>
    </div>
  );
};

export default Header;
