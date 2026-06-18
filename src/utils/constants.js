export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const MENU_API = process.env.REACT_APP_MENU_API || "/api/menu/";

export const RESTAURANTS_API = process.env.REACT_APP_MENU_API
  ? process.env.REACT_APP_MENU_API.replace(/\/menu\/?$/, "/restaurants")
  : "/api/restaurants";
