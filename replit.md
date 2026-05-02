# ResApp — Cinematic Food Delivery App (Swiggy Clone)

A React-based restaurant discovery and ordering app with a full cinematic dark UI design. Users can browse restaurants, view menus, add items to cart, search, and switch between dark/light themes.

## Tech Stack

- **Frontend**: React 19, Redux Toolkit, React Router v6, Tailwind CSS v4, Parcel 2
- **Backend**: Node.js + Express (Swiggy API proxy with mock fallbacks)
- **Fonts**: Poppins (display), Nunito (body), Space Grotesk (mono) via Google Fonts
- **State**: Redux Toolkit (cart), React Context API (logged-in user)

## Design System

CSS custom properties in `index.css`:

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0A0A0A` | `#F5F0E8` |
| `--surface` | `#151515` | `#FDFAF4` |
| `--surface-2` | `#1E1E1E` | `#EDE8DC` |
| `--red` | `#E8231A` | `#C9271F` |
| `--green` | `#22C55E` | `#1A9E4A` |
| `--yellow` | `#F5A623` | `#C98A10` |
| `--f-display` | Poppins 700–900 | — |
| `--f-body` | Nunito 400–700 | — |
| `--f-mono` | Space Grotesk 500–700 | — |

Theme is toggled via `data-theme="dark|light"` on `<html>` and persisted in localStorage. A no-flash script in `index.html` reads localStorage on initial load.

## Project Structure

```
/
├── index.html          # Entry HTML + no-flash theme script
├── index.css           # Design tokens, keyframes, utility classes
├── package.json        # Frontend deps + scripts
├── .proxyrc.json       # Parcel dev proxy: /api → localhost:3001
├── src/
│   ├── App.js          # Root component + React Router setup
│   ├── components/
│   │   ├── Header.js           # Fixed nav, scroll-aware glass, theme toggle, cart badge
│   │   ├── Body.js             # Hero section, Featured Dishes, Restaurant grid
│   │   ├── RestaurantCard.js   # Dark card with image, rating chip, hover lift
│   │   ├── Shimmer.js          # Dark shimmer loading grid
│   │   ├── RestaurantMenu.js   # Menu page with restaurant header + accordion
│   │   ├── RestaurantCategory.js # Collapsible menu category accordion
│   │   ├── ItemList.js         # Menu items with Add button + Redux dispatch
│   │   ├── ShimmerMenu.js      # Dark shimmer for menu page
│   │   ├── Cart.js             # Cart page with item list, total, checkout + clear
│   │   ├── About.js            # About page with stats, UserClass GitHub card
│   │   ├── UserClass.js        # Class component: fetches GitHub API for jassu2244
│   │   ├── Contact.js          # Contact form with validation + success state
│   │   ├── Grocery.js          # Grocery store with categories, filter, add/remove qty
│   │   └── Error.js            # 404/error page with Go Home + Go Back buttons
│   └── utils/
│       ├── constants.js        # CDN_URL, MENU_API = "/api/menu/"
│       ├── cartSlice.js        # Redux slice: addItem, removeItem, clearCart
│       ├── appStore.js         # Redux store
│       ├── useRestaurantMenu.js # Custom hook: fetches /api/menu/:resId
│       ├── useOnlineStatus.js  # Custom hook: online/offline status
│       └── UserContext.js      # React context for logged-in user
└── backend/
    └── server.js       # Express server: proxies Swiggy → mock fallback
                        # Routes: GET /api/restaurants, GET /api/menu/:id, GET /api/health
```

## Running the App

- **Frontend**: `npm start` → Parcel dev server on port 5000
- **Backend**: `node backend/server.js` → Express on port 3001

## Backend API Routes

| Route | Description |
|---|---|
| `GET /api/restaurants` | Proxies Swiggy restaurant list → mock fallback |
| `GET /api/menu/:restaurantId` | Proxies Swiggy menu API → mock fallback |
| `GET /api/health` | Health check |

- `node-fetch` v2.7.0 (CJS) — imported with `require('node-fetch')`
- All API calls try live Swiggy first; fall back to rich mock data on failure

## Key Conventions

- No hardcoded hex in JSX — always use CSS variables (`var(--red)`, etc.)
- All animations via `className` (`.anim-1`, `.float-2`, `.pulse-red`, `.bounce-in`, `.card-anim`, `.shimmer-elem`) — not inline styles
- Light theme activates automatically via `[data-theme="light"]` in CSS
- Hero uses `.hero` CSS class for the radial gradient (light-mode overrides inside CSS)
- `MENU_API = "/api/menu/"` → proxied by `.proxyrc.json` to backend port 3001
