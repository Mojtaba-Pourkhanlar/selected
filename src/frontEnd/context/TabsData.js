import { createContext } from "react";

export const TabsData = createContext({
  coins: [],
  setCoins: () => {},
  loading: false,
  setLoading: () => {},
});
