import sys
import os
import requests
import threading
import time

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Fix Windows terminal Unicode issue safely to satisfy type checkers
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore

# Load API key from .env — override=True ensures .env always wins
load_dotenv(override=True)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

app = Flask(__name__)
CORS(app)

# ─────────────────────────────────────────────────────────
#  KEEP-ALIVE — pings server every 10 min so Render free
#  tier never spins down (saves ~30s cold start wait)
# ─────────────────────────────────────────────────────────
RENDER_URL = os.getenv("RENDER_URL", "").rstrip("/")  # set this in Render env vars

def keep_alive():
    """Background thread: ping self every 10 minutes."""
    while True:
        time.sleep(600)  # 10 minutes
        if RENDER_URL:
            try:
                requests.get(f"{RENDER_URL}/", timeout=10)
                print("Keep-alive ping sent")
            except Exception as e:
                print(f"Keep-alive ping failed: {e}")

# Start keep-alive only in production (when RENDER_URL is set)
if RENDER_URL:
    t = threading.Thread(target=keep_alive, daemon=True)
    t.start()
    print(f"Keep-alive active — pinging {RENDER_URL} every 10 min")

# ─────────────────────────────────────────────────────────
#  RESTAURANT DATA — ResApp's actual restaurant list
# ─────────────────────────────────────────────────────────
RESTAURANTS = [
    {
        "name": "Wendy's Burgers",
        "cuisines": ["Burgers", "American"],
        "rating": 4.4,
        "deliveryTime": "45-50 mins",
        "costForTwo": "Rs.350 for two",
        "locality": "Sector 4, Noida",
        "popular_items": ["Cajun Spicy Paneer Burger (Rs.149)", "Cajun Spicy Chicken Burger (Rs.149)", "Crispy Fries"],
        "highlights": ["40% off with TRYNEW", "Bestseller items"],
    },
    {
        "name": "Domino's Pizza",
        "cuisines": ["Pizza", "Italian", "Fast Food"],
        "rating": 4.2,
        "deliveryTime": "30-35 mins",
        "costForTwo": "Rs.400 for two",
        "locality": "Multiple locations",
        "popular_items": ["Margherita Pizza (Rs.199)", "Chicken Dominator (Rs.449)", "Garlic Breadsticks (Rs.129)"],
        "highlights": ["Buy 1 Get 1 on Tuesdays", "Late night delivery"],
    },
    {
        "name": "Biryani Blues",
        "cuisines": ["Biryani", "North Indian", "Mughlai"],
        "rating": 4.5,
        "deliveryTime": "40-50 mins",
        "costForTwo": "Rs.500 for two",
        "locality": "Sector 18, Noida",
        "popular_items": ["Chicken Dum Biryani (Rs.349)", "Mutton Biryani (Rs.449)", "Veg Biryani (Rs.249)"],
        "highlights": ["Award-winning biryani", "Huge portions", "Dum cooked"],
    },
    {
        "name": "McDonald's",
        "cuisines": ["Burgers", "Fast Food"],
        "rating": 4.1,
        "deliveryTime": "25-30 mins",
        "costForTwo": "Rs.300 for two",
        "locality": "Multiple locations",
        "popular_items": ["McSpicy Paneer (Rs.219)", "McAloo Tikki (Rs.99)", "McFlurry (Rs.129)"],
        "highlights": ["Value meals", "Kids Happy Meals"],
    },
    {
        "name": "Haldiram's",
        "cuisines": ["North Indian", "Sweets", "Vegetarian"],
        "rating": 4.3,
        "deliveryTime": "35-40 mins",
        "costForTwo": "Rs.350 for two",
        "locality": "Sector 37, Noida",
        "popular_items": ["Dal Makhani (Rs.249)", "Paneer Butter Masala (Rs.299)", "Gulab Jamun (Rs.149)"],
        "highlights": ["100% vegetarian", "Fresh sweets daily"],
    },
    {
        "name": "KFC",
        "cuisines": ["Fried Chicken", "Burgers"],
        "rating": 4.0,
        "deliveryTime": "30-40 mins",
        "costForTwo": "Rs.450 for two",
        "locality": "Multiple locations",
        "popular_items": ["Zinger Burger (Rs.249)", "8 Pc Chicken Bucket (Rs.699)", "Popcorn Chicken (Rs.179)"],
        "highlights": ["Zinger burgers", "Chicken buckets for parties"],
    },
    {
        "name": "Subway",
        "cuisines": ["Healthy", "Sandwiches"],
        "rating": 4.2,
        "deliveryTime": "20-30 mins",
        "costForTwo": "Rs.350 for two",
        "locality": "Multiple locations",
        "popular_items": ["Veggie Delite (Rs.179)", "Chicken Teriyaki (Rs.299)", "Meatball Marinara (Rs.249)"],
        "highlights": ["Customizable", "Low calorie options"],
    },
    {
        "name": "Wow Momo",
        "cuisines": ["Momos", "Chinese", "Asian"],
        "rating": 4.1,
        "deliveryTime": "25-35 mins",
        "costForTwo": "Rs.250 for two",
        "locality": "Sector 62, Noida",
        "popular_items": ["Steamed Veg Momos (Rs.99)", "Pan-Fried Chicken Momos (Rs.149)", "Tandoori Momos (Rs.179)"],
        "highlights": ["Budget-friendly", "Best momos in town"],
    },
    {
        "name": "Barbeque Nation",
        "cuisines": ["Barbeque", "North Indian", "Grills"],
        "rating": 4.6,
        "deliveryTime": "50-60 mins",
        "costForTwo": "Rs.800 for two",
        "locality": "Sector 18, Noida",
        "popular_items": ["Chicken Tikka (Rs.399)", "Mutton Seekh Kebab (Rs.449)", "Paneer Tikka (Rs.349)"],
        "highlights": ["Best for groups", "Unlimited starters", "Live grill"],
    },
    {
        "name": "Shake Shack",
        "cuisines": ["Burgers", "Shakes", "American"],
        "rating": 4.4,
        "deliveryTime": "35-45 mins",
        "costForTwo": "Rs.600 for two",
        "locality": "Cyber Hub, Gurugram",
        "popular_items": ["ShackBurger (Rs.449)", "Chicken Shack (Rs.499)", "Vanilla Shake (Rs.349)"],
        "highlights": ["Premium burgers", "Thick milkshakes"],
    },
]


def build_restaurant_context() -> str:
    lines = []
    for r in RESTAURANTS:
        items = ", ".join(r["popular_items"])
        lines.append(
            f"- {r['name']} | Rating: {r['rating']}/5 | Cuisines: {', '.join(r['cuisines'])} | "
            f"Delivery: {r['deliveryTime']} | Cost: {r['costForTwo']} | Location: {r['locality']}\n"
            f"  Popular dishes: {items}"
        )
    return "\n".join(lines)


# ─────────────────────────────────────────────────────────
#  SYSTEM PROMPT
# ─────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are ResBot, a friendly and enthusiastic AI food assistant for ResApp - a food delivery platform in India.

Your job:
- Help users find the best restaurants and dishes based on what they are craving
- Give specific recommendations from the restaurant list below
- Answer questions about food, delivery, pricing, and the app
- Keep replies short (4-8 lines), warm, and use food emojis naturally
- When recommending, mention restaurant name, rating, and 1-2 popular dishes
- If user asks for veg food, only recommend veg-friendly places (Haldiram's, Subway, Domino's, Wow Momo veg options)

Available restaurants on ResApp:
{restaurant_context}

Rules:
- Only recommend from the list above
- Use **bold** for restaurant and dish names
- Be warm, fun, and conversational
- Decline non-food questions politely
- Never make up restaurant names or prices not in the list
- Keep responses concise and easy to read""".format(
    restaurant_context=build_restaurant_context()
)


# ─────────────────────────────────────────────────────────
#  GEMINI REST API CALL
# ─────────────────────────────────────────────────────────
def call_gemini(user_message: str, history: list) -> str:
    if not GEMINI_API_KEY or GEMINI_API_KEY.strip() == "":
        return (
            "No Gemini API key found! Open chatbot/.env and set:\n"
            "GEMINI_API_KEY=your_key_here\n\n"
            "Get a free key at: https://aistudio.google.com/app/apikey"
        )

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    )

    # Build conversation contents
    contents = []

    # Add recent chat history for context (last 6 messages)
    for msg in history[-6:]:
        role = "user" if msg.get("role") == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": msg.get("text", "")}]
        })

    # Add current user message
    contents.append({
        "role": "user",
        "parts": [{"text": user_message}]
    })

    payload = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.8,
            "maxOutputTokens": 400,
            "topP": 0.95,
        }
    }

    try:
        response = requests.post(url, json=payload, timeout=20)

        if response.status_code == 400:
            err = response.json().get("error", {}).get("message", "Bad request")
            return f"API Error: {err}\n\nPlease check your API key in chatbot/.env"

        if response.status_code == 429:
            return "Too many requests! Please wait a few seconds and try again."

        response.raise_for_status()
        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        return text.strip()

    except requests.exceptions.Timeout:
        return "Response is taking too long. Please try again!"
    except (KeyError, IndexError):
        return "Got an unexpected response from Gemini. Please try again!"
    except Exception as e:
        return f"Error: {str(e)}"


# ─────────────────────────────────────────────────────────
#  API ROUTES
# ─────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def home():
    key_ok = bool(GEMINI_API_KEY and GEMINI_API_KEY.strip())
    return jsonify({
        "status": "ResApp Chatbot running!",
        "provider": "Google Gemini",
        "model": "gemini-2.5-flash",
        "ai_enabled": key_ok,
        "restaurants": len(RESTAURANTS),
    })


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "Send a JSON body with a 'message' field."}), 400

    user_message = data["message"].strip()
    if not user_message:
        return jsonify({"error": "Message cannot be empty."}), 400

    history = data.get("history", [])
    reply = call_gemini(user_message, history)

    return jsonify({"reply": reply, "status": "ok"})


@app.route("/restaurants", methods=["GET"])
def get_restaurants():
    return jsonify({"restaurants": RESTAURANTS, "count": len(RESTAURANTS)})


# ─────────────────────────────────────────────────────────
#  RUN
# ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    key_ok = bool(GEMINI_API_KEY and GEMINI_API_KEY.strip())
    port = int(os.getenv("PORT", "5001"))
    print("ResApp Chatbot (Gemini) starting...")
    print(f"Model  : gemini-2.5-flash")
    print(f"AI     : {'ACTIVE' if key_ok else 'NO KEY - add GEMINI_API_KEY to chatbot/.env'}")
    print(f"Server : http://localhost:{port}")
    app.run(debug=os.getenv("FLASK_DEBUG") == "1", host="0.0.0.0", port=port)
