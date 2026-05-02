# Restaurant App Clone (ResApp)

A React-based restaurant discovery and ordering app that mimics Swiggy. Users can browse restaurants, view menus, manage a cart, and search for eateries.

## Tech Stack

- **Frontend**: React 19, Redux Toolkit, React Router v6, Tailwind CSS 4
- **Bundler**: Parcel 2
- **Backend**: Node.js + Express (proxy/mock server for Swiggy API)
- **State**: Redux Toolkit (cart), React Context API (user auth)

## Project Structure

```
/
├── index.html          # Entry HTML
├── index.css           # Global styles
├── package.json        # Frontend deps + scripts
├── babel.config.js     # Babel config for Jest
├── .parcelrc           # Parcel transformer config
├── src/
│   ├── App.js          # Root component + router setup
│   ├── components/     # React UI components
│   └── utils/          # Hooks, Redux store, constants
└── backend/
    ├── server.js       # Express server (mock/proxy for Swiggy)
    └── package.json    # Backend deps
```

## Running the App

- **Frontend**: `npm start` → runs on port 5000 (0.0.0.0)
- **Backend**: `node backend/server.js` → runs on port 3001 (localhost)

## Workflows

- **Start application**: `npm start` on port 5000 (webview)
- **Backend API**: `node backend/server.js` on port 3001 (console)

## Key Notes

- The `MENU_API` in `src/utils/constants.js` points to `http://localhost:3001/api/menu/`
- The backend tries to proxy Swiggy's menu API and falls back to mock data if unavailable
- Restaurant list is fetched directly from Swiggy's public API in `Body.js`
- node-fetch v3 (ESM) is dynamically imported in the CommonJS backend

## Deployment

- Target: `autoscale`
- Build: `npm run build` (Parcel)
- Run: `node backend/server.js & npx serve dist -l 5000`
