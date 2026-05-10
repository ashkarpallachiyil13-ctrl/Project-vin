// static/js/stream.js

// =========================
// PROJECT VIN - STREAM ENGINE
// =========================


// =========================
// CHECK IF STREAM SHOULD RUN
// =========================

function shouldStream(text, intent) {

    if (!text) return false;

    // Only stream for chat mode
    if (intent && intent !== "chat") return false;

    // Stream long responses only
    if (text.length > 60) return true;

    return false;
}


// =========================
// STREAMING ENGINE
// =========================

async function streamResponse(userMessage) {

    try {

        const outputElement =
            document.getElementById("stream-output");

        if (!outputElement) return "";

        outputElement.innerHTML = "";

        let fullResponse = "";

        const response = await puter.ai.chat(
            userMessage,
            {
                stream: true,
                model: "gpt-5.4-nano"
            }
        );

        for await (const part of response) {

            if (!part?.text) continue;

            fullResponse += part.text;

            // LIVE UPDATE
            outputElement.innerHTML = fullResponse;
        }

        return fullResponse;

    } catch (error) {

        console.error("Streaming Error:", error);

        return "Streaming failed.";
    }
}


// =========================
// SMART STREAM WRAPPER (NEW CORE)
// =========================

async function smartStreamResponse(text, intent, emotion) {

    // Decide if streaming should happen
    const useStream = shouldStream(text, intent);

    // Emotion-based speed feel (future upgrade hook)
    const isExcited = emotion?.sentiment === "excited";

    try {

        if (useStream) {

            return await streamResponse(text);

        } else {

            // fallback normal response
            const response = await puter.ai.chat(text, {
                model: "gpt-5.4-nano"
            });

            const outputElement =
                document.getElementById("stream-output");

            if (outputElement) {
                outputElement.innerHTML = response;
            }

            return response;
        }

    } catch (error) {

        console.error("Smart Stream Error:", error);

        return "Response failed.";
    }
}