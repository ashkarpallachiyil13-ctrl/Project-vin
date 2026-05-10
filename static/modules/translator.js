// static/js/translator.js

// =========================
// PROJECT VIN - LANGUAGE INTELLIGENCE v3
// =========================

async function translateText(text, targetLanguage = null) {

    try {

        if (!text || text.trim() === "") {
            return "No text to translate.";
        }

        // =========================
        // STEP 1: LANGUAGE EXTRACTION (SMART)
        // =========================

        function extractTargetLanguage(input) {

            const patterns = [
                /in ([a-zA-Z\- ]+)$/i,
                /in ([a-zA-Z\- ]+)\?/i,
                /translate (?:to )?([a-zA-Z\- ]+)/i,
                /how do (?:i|you) say .* in ([a-zA-Z\- ]+)/i
            ];

            for (let p of patterns) {
                const match = input.match(p);
                if (match && match[1]) {
                    return match[1].trim().toLowerCase();
                }
            }

            return null;
        }

        let detectedLanguage =
            targetLanguage ||
            extractTargetLanguage(text) ||
            "english";

        // =========================
        // STEP 2: CLEAN TEXT (SMART EXTRACTION)
        // =========================

        let cleanText = text
            .replace(/how do i say/i, "")
            .replace(/how do you say/i, "")
            .replace(/translate (to)?/i, "")
            .replace(/in [a-zA-Z\- ]+/i, "")
            .replace(/\?/g, "")
            .trim();

        // =========================
        // STEP 3: TONE DETECTION (CASUAL / FORMAL)
        // =========================

        function detectTone(input) {

            const formalWords = ["sir", "madam", "please", "kindly"];
            const casualWords = ["bro", "yo", "lol", "dude"];

            let formal = formalWords.some(w => input.toLowerCase().includes(w));
            let casual = casualWords.some(w => input.toLowerCase().includes(w));

            if (formal) return "formal";
            if (casual) return "casual";

            return "neutral";
        }

        const tone = detectTone(text);

        // =========================
        // STEP 4: UNIVERSAL TRANSLATION PROMPT
        // =========================

        const prompt = `
You are a world-class multilingual translation engine.

TASK:
Translate ONLY the phrase into: ${detectedLanguage}

RULES:
- Preserve meaning exactly
- Do NOT translate instructions or metadata
- Keep tone: ${tone}
- If sentence is natural conversation, keep it natural in target language
- Output ONLY final translation
- No explanations

INPUT PHRASE:
${cleanText}
`;

        // =========================
        // STEP 5: AI CALL
        // =========================

        const translation = await puter.ai.chat(prompt, {
            model: "gpt-5-nano"
        });

        return translation;

    } catch (error) {

        console.error("Translation Error:", error);

        return "Translation failed.";
    }
}