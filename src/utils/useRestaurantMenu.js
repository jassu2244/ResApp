import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      if (!data.ok) throw new Error("Bad response");
      const json = await data.json();
      // json.data can be undefined if the API shape is unexpected
      setResInfo(json.data || false);
    } catch {
      // false signals "failed" so the page can stop showing shimmer
      setResInfo(false);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
