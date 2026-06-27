# app.py

import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# =========================
# OPENROUTER API KEY
# =========================

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Optional: Warn if missing
if not OPENROUTER_API_KEY:
    print("WARNING: OPENROUTER_API_KEY is not set!")

# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():
    return render_template("index.html")


# =========================
# CHAT API
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "reply": "Please enter a message."
        })

    # TODO:
    # We'll call OpenRouter here in the next step.

    return jsonify({
        "reply": f"You said: {user_message}"
    })


# =========================
# HEALTH CHECK
# =========================

@app.route("/health")
def health():
    return jsonify({
        "status": "ARGUS Online"
    })


# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )