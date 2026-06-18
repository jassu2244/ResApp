export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// REACT_APP_MENU_API is set on Render pointing to the deployed backend.
// Locally Parcel proxies /api to localhost:3001, so we fall back to /api/menu/
export const MENU_API = process.env.REACT_APP_MENU_API || "/api/menu/";

// Derive the restaurants endpoint from the same backend base
export const RESTAURANTS_API = process.env.REACT_APP_MENU_API
  ? process.env.REACT_APP_MENU_API.replace(/\/menu\/?$/, "/restaurants")
  : "/api/restaurants";
