// static/js/translator.js

// =========================
// PROJECT VIN - TRANSLATOR
// =========================

async function translateText(text, targetLanguage = null) {

    try {

        if (!text || text.trim() === "") {
            return "No text to translate.";
        }

        // =========================
        // LANGUAGE MAP (SOURCE OF TRUTH)
        // =========================

        const languageMap = [
            { key: "german", value: "German" },
            { key: "spanish", value: "Spanish" },
            { key: "french", value: "French" },
            { key: "hindi", value: "Hindi" },
            { key: "malayalam", value: "Malayalam" },
            { key: "english", value: "English" }
        ];

        let detectedLanguage = null;

        const lowerText = text.toLowerCase();

        // =========================
        // STEP 1: DETECT LANGUAGE FROM TEXT
        // =========================

        for (let lang of languageMap) {
            if (lowerText.includes(lang.key)) {
                detectedLanguage = lang.value;
                break;
            }
        }

        // =========================
        // STEP 2: PRIORITY RULE
        // UI language > detected language > default
        // =========================

        if (targetLanguage) {
            detectedLanguage = targetLanguage;
        }

        if (!detectedLanguage) {
            detectedLanguage = "English";
        }

        // =========================
        // STEP 3: CLEAN INPUT TEXT
        // remove language trigger words
        // =========================

        let cleanText = text;

        for (let lang of languageMap) {

            const regex = new RegExp(`\\b${lang.key}\\b`, "gi");

            cleanText = cleanText.replace(regex, "");
        }

        cleanText = cleanText.replace(/\s+/g, " ").trim();

        // =========================
        // DEBUG (KEEP FOR TESTING)
        // =========================

        console.log("Detected Language:", detectedLanguage);
        console.log("Clean Text:", cleanText);

        // =========================
        // STEP 4: PROMPT ENGINEERING
        // =========================

        const prompt = `
You are a professional translator.

Translate the text into: ${detectedLanguage}

Rules:
- Output ONLY the translation
- No explanations
- No extra text

Text:
${cleanText}
`;

        // =========================
        // STEP 5: AI CALL
        // =========================

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