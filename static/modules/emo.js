// static/js/emo.js

// =========================
// PROJECT VIN - EMOTION ENGINE
// =========================

// GLOBAL EMOTION ANALYZER (used across entire bot)
async function analyzeEmotion(text) {

    try {

        if (!text || text.trim() === "") {
            return {
                sentiment: "neutral",
                confidence: 0,
                reasoning: "Empty input"
            };
        }

        // =========================
        // EMOTION PROMPT (STRICT JSON)
        // =========================

        const prompt = `
You are an emotion analysis system.

Analyze the sentiment of the text.

Return ONLY valid JSON:

{
  "sentiment": "positive | negative | neutral | angry | excited | sad",
  "confidence": 0.0 to 1.0,
  "reasoning": "short explanation"
}

Rules:
- No extra text
- No markdown
- Only JSON output

Text:
${text}
`;

        // =========================
        // AI CALL
        // =========================

        const response = await puter.ai.chat(prompt, {
            model: "gpt-5-nano"
        });

        // =========================
        // SAFE PARSE (IMPORTANT FIX)
        // =========================

        let analysis;

        try {
            analysis = JSON.parse(response);
        } catch (e) {

            console.error("JSON Parse Failed:", response);

            return {
                sentiment: "neutral",
                confidence: 0.5,
                reasoning: "Parse error fallback"
            };
        }

        console.log("Emotion Analysis:", analysis);

        return analysis;

    } catch (error) {

        console.error("Emotion System Error:", error);

        return {
            sentiment: "neutral",
            confidence: 0,
            reasoning: "Emotion system failure"
        };
    }
}


// =========================
// GLOBAL EMOTION DISPLAY
// =========================

function displayEmotion(analysis) {

    const emotionContainer =
        document.getElementById("emotion-container");

    if (!emotionContainer || !analysis) return;

    emotionContainer.innerHTML = `
        <div style="padding:10px; border-top:1px solid #333;">
            <strong>Sentiment:</strong> ${analysis.sentiment}<br>
            <strong>Confidence:</strong> ${(analysis.confidence * 100).toFixed(1)}%<br>
            <strong>Reasoning:</strong> ${analysis.reasoning}
        </div>
    `;
}