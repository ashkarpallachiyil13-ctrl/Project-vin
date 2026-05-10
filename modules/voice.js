// static/js/voice.js

// =========================
// PROJECT VIN - VOICE SYSTEM
// =========================

// This module handles:
// - Text-to-Speech
// - Voice playback
// - Audio generation
// - Future voice expansion

async function speakText(text) {

    try {

        // Prevent empty text
        if (!text || text.trim() === "") {

            console.error("No text provided.");

            return;
        }

        // Generate speech
        const audio = await puter.ai.txt2speech(
            text,
            {
                provider: "openai"
            }
        );

        // Add controls
        audio.setAttribute("controls", "");

        // Optional autoplay
        // audio.autoplay = true;

        // Find voice container
        const voiceContainer =
            document.getElementById("voice-container");

        // Clear old audio
        voiceContainer.innerHTML = "";

        // Add audio player
        voiceContainer.appendChild(audio);

        return audio;

    } catch (error) {

        console.error(
            "Voice System Error:",
            error
        );

        return "Speech generation failed.";
    }
}


// =========================
// AUTO SPEAK AI RESPONSE
// =========================

async function speakAIResponse(aiText) {

    return await speakText(aiText);
}


// =========================
// EXAMPLE USAGE
// =========================

// speakText(
//     "Hello world! This is Project Vin."
// );