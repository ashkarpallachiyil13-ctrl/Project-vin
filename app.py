import os
import requests
import traceback

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

    try:
        data = request.get_json() or {}

        print("📩 RAW DATA:", data)

        user_message = data.get("message", "").strip()
        history = data.get("history", [])

        print("💬 MESSAGE:", user_message)
        print("🧠 HISTORY:", history)

        if not user_message:
            return jsonify({"reply": "Empty message"}), 400

        # Build safe messages
        messages = [{
            "role": "user",
            "content": user_message
        }]

        print("🚀 SENDING:", messages)

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5000",
                "X-Title": "Project Vin"
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": messages
            },
            timeout=30
        )

        print("📡 STATUS:", response.status_code)
        print("📡 RESPONSE:", response.text)

        response.raise_for_status()

        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except requests.exceptions.HTTPError as e:
        print("🔥 HTTP ERROR:", e)
        try:
            print("RAW:", response.text)
        except:
            pass

        return jsonify({
            "reply": "OpenRouter HTTP error"
        }), 500

    except Exception as e:
        print("🔥 FULL ERROR TRACE:")
        traceback.print_exc()

        return jsonify({
            "reply": f"SERVER ERROR: {str(e)}"
        }), 500

# =========================
# HEALTH CHECK
# =========================

@app.route("/health")
def health():
    return jsonify({"status": "ARGUS Online"})

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