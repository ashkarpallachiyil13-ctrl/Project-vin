// static/js/translator.js

// =========================
// PROJECT VIN - TRANSLATOR
// =========================

// This module handles:
// - Language translation
// - Multi-language support
// - Future Malayalam support
// - AI-powered translations

async function translateText(
    text,
    targetLanguage
) {

    try {

        // Validate input
        if (!text || text.trim() === "") {

            console.error("No text provided.");

            return "No text to translate.";
        }

        // Validate language
        if (!targetLanguage ||
            targetLanguage.trim() === "") {

            console.error(
                "No target language provided."
            );

            return "No target language.";
        }

        // Translation prompt
        const prompt = `
Translate to ${targetLanguage}.
Output only the translation,
nothing else:

${text}
`;

        // Send request to AI
        const translation =
            await puter.ai.chat(
                prompt,
                {
                    model: "gpt-5-nano"
                }
            );

        console.log(
            "Translation:",
            translation
        );

        return translation;

    } catch (error) {

        console.error(
            "Translation Error:",
            error
        );

        return "Translation failed.";
    }
}


// =========================
// AUTO LANGUAGE DETECTION
// =========================

async function autoTranslate(
    text,
    targetLanguage
) {

    const prompt = `
Detect the language and translate
to ${targetLanguage}.

Output only the translation.

Text:
${text}
`;

    try {

        const response =
            await puter.ai.chat(
                prompt,
                {
                    model: "gpt-5-nano"
                }
            );

        return response;

    } catch (error) {

        console.error(
            "Auto Translation Error:",
            error
        );

        return "Auto translation failed.";
    }
}


// =========================
// EXAMPLE USAGE
// =========================

// translateText(
//     "Hello, how are you?",
//     "Spanish"
// );

// autoTranslate(
//     "സുഖമാണോ",
//     "English"
// );