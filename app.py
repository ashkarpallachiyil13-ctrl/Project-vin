# app.py

import os
from flask import Flask, render_template

app = Flask(__name__)

# =========================
# HOME ROUTE
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# HEALTH CHECK (optional but useful)
# =========================
@app.route("/health")
def health():
    return {"status": "Vin is alive"}

# =========================
# RUN SERVER (Render-safe)
# =========================
if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )