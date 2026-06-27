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

        history = data.get("history", [])
        user_message = data.get("message", "").strip()

        print("💬 MESSAGE:", user_message)
        print("🧠 HISTORY:", history)

        messages = [{
            "role": "user",
            "content": user_message
        }]

        print("🚀 SENDING TO OPENROUTER:", messages)

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5000",
                "X-Title": "Project Vin"
            },
            json={
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": messages
            },
            timeout=30
        )

        print("📡 STATUS CODE:", response.status_code)
        print("📡 RESPONSE TEXT:", response.text)

        response.raise_for_status()

        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except Exception as e:
        import traceback
        print("🔥 FULL ERROR TRACE:")
        traceback.print_exc()

        return jsonify({
            "reply": f"CRASH: {str(e)}"
        }), 500

        # API CALL
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5000",
                "X-Title": "Project Vin"
            },
            json={
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": messages
            },
            timeout=30
        )

        response.raise_for_status()

        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except requests.exceptions.HTTPError as e:
        print("🔥 HTTP ERROR:", e)
        try:
            print(response.text)
        except:
            pass

        return jsonify({
            "reply": "OpenRouter returned an HTTP error."
        }), 500

    except Exception as e:
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