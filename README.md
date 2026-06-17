# Restaurant App Clone

This project is a clone of a restaurant application built with React. It allows users to browse a list of restaurants, view their menus, add items to a cart, and simulate ordering. The app demonstrates modern React features, component-based architecture, and state management.

## Features

- Browse restaurant listings
- View detailed restaurant menus
- Add items to cart and manage cart
- Search for restaurants
- User profile and context
- Responsive UI with shimmer loading effects
- Mock data for development and testing

## Folder Structure

- `src/` - Main source code
  - `components/` - React components (Header, Body, Cart, RestaurantCard, etc.)
  - `utils/` - Utility functions and custom hooks
  - `mocks/` - Mock JSON data for restaurants and menus
  - `__test__/` - Unit tests for components
- `coverage/` - Test coverage reports

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Hosting the Chatbot on Render

The chatbot is a separate Python web service in `chatbot/`. This repo includes
`render.yaml`, so on Render you can create a new Blueprint from the repo and it
will deploy the `resapp-chatbot` service.

Required Render environment variables for the chatbot service:

- `GEMINI_API_KEY`: your Google Gemini API key
- `RENDER_URL`: the deployed chatbot URL, for example `https://resapp-chatbot.onrender.com`

The service start command is:

```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

After the chatbot is deployed, set this environment variable on your hosted
frontend and redeploy it:

```bash
CHATBOT_API_URL=https://resapp-chatbot.onrender.com
```

The chatbot also sends a self-ping every 10 minutes when `RENDER_URL` is set.
That helps keep the free Render service warm and reduces cold-start downtime.

## Technologies Used

- React
- Redux (for cart state)
- Jest (for testing)

## Notes

- Mock data is used for restaurant and menu listings
- Coverage reports are generated after running tests

## License

This project is for educational purposes only.
