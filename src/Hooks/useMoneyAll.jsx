import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listProductCart } from "../component/redux/ReducerCart";

const useMoneyAll = () => {
  const itemProductCart = useSelector(listProductCart);
  const [moneyAll, setMoneyAll] = useState(0);

  const MoneyAllProduct = itemProductCart.reduce((x, y) => {
    return (x += y.itemmoney);
  }, 0);
  useEffect(() => {
    setMoneyAll(MoneyAllProduct);
  }, [itemProductCart]);
  return moneyAll;
};

export default useMoneyAll;
