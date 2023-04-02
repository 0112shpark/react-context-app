import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "./Error";
import { OrderContext } from "../context/OrderContext";

const Type = ({ orderType }) => {
  const [Items, setItems] = useState([]);
  const [Error, setError] = useState(false);
  const [OrderData, updateItemcount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = Items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      description={item.description}
      imagePath={item.imagePath}
      updateItemcount={(itemName, newItemCount) =>
        updateItemcount(itemName, newItemCount, orderType)
      }
    ></ItemComponent>
  ));

  if (Error) {
    return <ErrorBanner message="에러가 발생했습니다."></ErrorBanner>;
  }
  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: ${OrderData.totals[orderType]}</p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" ? "column" : "row",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
};

export default Type;
