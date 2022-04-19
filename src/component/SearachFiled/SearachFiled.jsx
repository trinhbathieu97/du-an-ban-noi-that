import React from "react";
import "./Searach.scss";
import searchImg from "../../asset/Search.png";
import SajariLogo from "../../asset/SajariLogo.png";
import { useDispatch } from "react-redux";
import { SearchProduct } from "../redux/Reducer";

const SearachFiled = () => {
  const ditpatch = useDispatch();
  const Seacrch = (e) => {
    ditpatch(SearchProduct(e.target.value));
  };

  return (
    <div className="SearachFiled">
      <div className="SearachFiled_search">
        <div className="logo_search">
          <img src={searchImg} alt="" />
        </div>
        <div className="SearachFiled_search-Sajari">
          <input type="text" placeholder="living room" onChange={Seacrch} />
          <div className="Powered_Sajari">
            <a href="">
              Powered by <span>Sajari.com</span>
            </a>
            <img src={SajariLogo} alt="" />
          </div>
        </div>
      </div>
      <div className="Dropdown">
        <select name="" id="">
          <option value="">Best match</option>
        </select>
      </div>
    </div>
  );
};

export default SearachFiled;
