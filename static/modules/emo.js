// static/js/emo.js

// =========================
// PROJECT VIN - EMOTION SYSTEM
// =========================

// This module handles:
// - Sentiment analysis
// - Emotion detection
// - Mood estimation
// - Future adaptive personality systems

async function analyzeEmotion(text) {

    try {

        // Validate input
        if (!text || text.trim() === "") {

            console.error("No text provided.");

            return {
                sentiment: "neutral",
                confidence: 0,
                reasoning: "No text provided."
            };
        }

        // Emotion analysis prompt
        const prompt = `
Analyze the sentiment of the following text.

Return your response as a JSON object
with these fields:

- sentiment:
"positive", "negative", or "neutral"

- confidence:
a number between 0 and 1

- reasoning:
brief explanation of the sentiment

Text:
${text}

Respond only with valid JSON.
No additional text.
`;

        // Send request to AI
        const response =
            await puter.ai.chat(
                prompt,
                {
                    model: "gpt-5-nano"
                }
            );

        // Parse JSON response
        const analysis = JSON.parse(response);

        console.log(
            "Emotion Analysis:",
            analysis
        );

        return analysis;

    } catch (error) {

        console.error(
            "Emotion System Error:",
            error
        );

        return {
            sentiment: "neutral",
            confidence: 0,
            reasoning: "Emotion analysis failed."
        };
    }
}


// =========================
// MOOD DISPLAY HELPER
// =========================

function displayEmotion(analysis) {

    const emotionContainer =
        document.getElementById(
            "emotion-container"
        );

    if (!emotionContainer) return;

    emotionContainer.innerHTML = `
        <strong>Sentiment:</strong>
        ${analysis.sentiment}<br>

        <strong>Confidence:</strong>
        ${(analysis.confidence * 100)
            .toFixed(1)}%<br>

        <strong>Reasoning:</strong>
        ${analysis.reasoning}
    `;
}


// =========================
// EXAMPLE USAGE
// =========================

// (async () => {

//     const result = await analyzeEmotion(
//         "The service was okay, but the food was disappointing."
//     );

//     displayEmotion(result);

// })();