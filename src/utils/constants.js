export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

// On Render: BACKEND_URL env var points to the deployed resapp-backend service.
// Locally: falls back to /api which Parcel proxies to localhost:3001
const API_BASE = process.env.BACKEND_URL || "";

export const MENU_API = `${API_BASE}/api/menu/`;
export const RESTAURANTS_API = `${API_BASE}/api/restaurants`;
