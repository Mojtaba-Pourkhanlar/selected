import React, { useEffect, useState } from "react";
import SelectedCurrency from "./components/selected";
import { TabsData } from "./context/TabsData";
import { getAllCoins } from "./services/api";

const ChartContainer = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getAllCoins();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(coins);

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <TabsData.Provider
      value={{
        coins,
        setCoins,
        loading,
        setLoading,
      }}>
      <SelectedCurrency />
    </TabsData.Provider>
  );
};

export default ChartContainer;
