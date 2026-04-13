import { createContext, useContext, useMemo, useState } from "react";

const PosContext = createContext(null);

export const PosProvider = ({ children }) => {
  const [orderType, setOrderType] = useState("dine-in");
  const [selectedTable, setSelectedTable] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const resetPosState = () => {
    setOrderType("dine-in");
    setSelectedTable("");
    setPaymentMethod("cash");
  };

  const value = useMemo(
    () => ({
      orderType,
      selectedTable,
      paymentMethod,
      setOrderType,
      setSelectedTable,
      setPaymentMethod,
      resetPosState,
    }),
    [orderType, selectedTable, paymentMethod]
  );

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

export const usePos = () => {
  const context = useContext(PosContext);

  if (!context) {
    throw new Error("usePos must be used inside PosProvider");
  }

  return context;
};