// static/js/temp.js

// =========================
// PROJECT VIN - TEMPERATURE ENGINE
// =========================

// CORE AI CALL WRAPPER
async function generateTemperatureResponse(
    prompt,
    temperature = 0.7,
    maxTokens = 100
) {

    try {

        const response = await puter.ai.chat(
            prompt,
            {
                model: "gpt-5.4-nano",
                temperature,
                max_tokens: maxTokens
            }
        );

        return response;

    } catch (error) {

        console.error("Temperature System Error:", error);

        return "Temperature response failed.";
    }
}


// =========================
// EMOTION → TEMPERATURE MAPPING
// =========================

function getTemperatureFromEmotion(emotion) {

    if (!emotion || !emotion.sentiment) return 0.7;

    switch (emotion.sentiment) {

        case "excited":
            return 0.9;

        case "angry":
            return 0.4;

        case "sad":
            return 0.6;

        case "positive":
            return 0.8;

        case "negative":
            return 0.5;

        default:
            return 0.7;
    }
}


// =========================
// INTENT → RESPONSE BEHAVIOR
// =========================

function getIntentOverrides(intent) {

    const config = {
        temperature: 0.7,
        maxTokens: 120
    };

    switch (intent) {

        case "image":
            config.temperature = 0.8;
            config.maxTokens = 200;
            break;

        case "translate":
            config.temperature = 0.2;
            config.maxTokens = 80;
            break;

        case "code":
            config.temperature = 0.3;
            config.maxTokens = 300;
            break;

        case "chat":
        default:
            config.temperature = 0.7;
            config.maxTokens = 150;
            break;
    }

    return config;
}


// =========================
// MAIN VIN SMART ENGINE
// =========================

async function smartTemperatureChat(prompt, emotion, intent) {

    // 1. Base emotion control
    let temperature = getTemperatureFromEmotion(emotion);

    // 2. Intent override system
    const overrides = getIntentOverrides(intent);

    // 3. Merge logic (intent wins if specific)
    temperature = overrides.temperature ?? temperature;
    const maxTokens = overrides.maxTokens ?? 120;

    // 4. Execute AI call
    return await generateTemperatureResponse(
        prompt,
        temperature,
        maxTokens
    );
}


// =========================
// OPTIONAL SIMPLE MODES
// =========================

// LOW CREATIVITY MODE
async function focusedMode(prompt) {
    return await generateTemperatureResponse(prompt, 0.2, 50);
}

// HIGH CREATIVITY MODE
async function creativeMode(prompt) {
    return await generateTemperatureResponse(prompt, 0.9, 200);
}