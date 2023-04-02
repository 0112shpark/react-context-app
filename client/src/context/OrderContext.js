import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricesPerItem = {
    products: 1000,
    options: 500,
  };
  const calculateSubtotal = (orderType, orderCount) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricesPerItem[orderType];
  };

  useEffect(() => {
    const productTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productTotal + optionsTotal;

    setTotals({
      products: productTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemcount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };

      const orderCountMap = orderCounts[orderType];

      orderCountMap.set(itemName, parseInt(newItemCount));
      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemcount];
  }, [orderCounts, totals]);

  return (
    <OrderContext.Provider value={value} {...props}></OrderContext.Provider>
  );
}
