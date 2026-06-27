# app.py

import os
import requests

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# =========================
# OPENROUTER API KEY
# =========================

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

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

    history = data.get("history", [])
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "reply": "Please enter a message."
        })

    try:

        # Build conversation history
        messages = history + [
            {
                "role": "user",
                "content": user_message
            }
        ]

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",

            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5000",
                "X-Title": "Project Vin"
            },

            json={
                "model": "openai/gpt-oss-120b:free",

                "messages": messages,

                "reasoning": {
                    "enabled": True
                }
            }

        )

        response.raise_for_status()

        result = response.json()

        reply = result["choices"][0]["message"]["content"]

        return jsonify({
            "reply": reply
        })

    except requests.exceptions.HTTPError:

        try:
            print(response.json())
        except Exception:
            print(response.text)

        return jsonify({
            "reply": "OpenRouter returned an error."
        }), 500

    except Exception as e:

    import traceback
    print("🔥 FULL ERROR:")
    traceback.print_exc()

    return jsonify({
        "reply": f"SERVER ERROR: {str(e)}"
    }), 500

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