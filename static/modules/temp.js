// static/js/temp.js

// =========================
// PROJECT VIN - TEMPERATURE CONTROL
// =========================

// This module controls:
// - Creativity
// - Randomness
// - Response length
// - AI behavior tuning

async function generateTemperatureResponse(
    prompt,
    temperature = 0.7,
    maxTokens = 100
) {

    try {

        // Send request to AI
        const response = await puter.ai.chat(
            prompt,
            {
                model: "gpt-5.4-nano",

                // Creativity level
                temperature: temperature,

                // Maximum response length
                max_tokens: maxTokens
            }
        );

        return response;

    } catch (error) {

        console.error(
            "Temperature System Error:",
            error
        );

        return "Temperature response failed.";
    }
}


// =========================
// FOCUSED RESPONSE MODE
// =========================

async function focusedMode(prompt) {

    return await generateTemperatureResponse(
        prompt,
        0.2,   // Low creativity
        50
    );
}


// =========================
// CREATIVE RESPONSE MODE
// =========================

async function creativeMode(prompt) {

    return await generateTemperatureResponse(
        prompt,
        0.8,   // High creativity
        150
    );
}


// =========================
// EXAMPLE USAGE
// =========================

// Focused factual answer
// focusedMode("Tell me about Mars");

// Creative answer
// creativeMode("Tell me about Mars");