// static/js/translator.js

// =========================
// PROJECT VIN - TRANSLATOR
// =========================

// This module handles:
// - Language translation
// - Multi-language support
// - Future Malayalam support
// - AI-powered translations

async function translateText(text, targetLanguage = null) {

    try {

        if (!text || text.trim() === "") {
            return "No text to translate.";
        }

        // =========================
        // AUTO LANGUAGE TRIGGER DETECTION
        // =========================

        const languageKeywords = {
            german: "German",
            spanish: "Spanish",
            french: "French",
            hindi: "Hindi",
            malayalam: "Malayalam",
            english: "English"
        };

        let detectedLanguage = targetLanguage;

        // If no language passed, try detecting from text
        if (!detectedLanguage) {

            const lowerText = text.toLowerCase();

            for (const key in languageKeywords) {

                if (lowerText.includes(key)) {

                    detectedLanguage = languageKeywords[key];

                    break;
                }
            }
        }

        // Default fallback
        if (!detectedLanguage) {
            detectedLanguage = "English";
        }

        // =========================
        // CLEAN INPUT (remove trigger word)
        // =========================

        let cleanText = text;

        for (const key in languageKeywords) {

            const regex = new RegExp(`\\b${key}\\b`, "i");

            cleanText = cleanText.replace(regex, "");
        }

        cleanText = cleanText.trim();

        // =========================
        // PROMPT
        // =========================

        const prompt = `
Translate to ${detectedLanguage}.

Output ONLY the translation.

Text:
${cleanText}
`;

        const translation = await puter.ai.chat(
            prompt,
            {
                model: "gpt-5-nano"
            }
        );

        return translation;

    } catch (error) {

        console.error("Translation Error:", error);

        return "Translation failed.";
    }
}