// static/js/web.js

// =========================
// PROJECT VIN - WEB SEARCH
// =========================

// This module allows Vin to:
// - Search the web
// - Read webpages
// - Summarize online content
// - Answer live-information questions

async function webSearch(prompt) {

    try {

        // Send request with web search tool
        const response = await puter.ai.chat(
            prompt,
            {
                model: "openai/gpt-5.2-chat",

                tools: [
                    {
                        type: "web_search"
                    }
                ]
            }
        );

        // Print response
        console.log("Web Search Result:", response);

        // Return AI response
        return response;

    } catch (error) {

        console.error(
            "Web Search Error:",
            error
        );

        return "Web search failed.";
    }
}


// =========================
// URL SUMMARIZER
// =========================

async function summarizeWebsite(url) {

    const prompt =
        `Summarize this webpage: ${url}`;

    return await webSearch(prompt);
}


// =========================
// LIVE QUESTION SEARCH
// =========================

async function askWeb(question) {

    return await webSearch(question);
}


// =========================
// EXAMPLE USAGE
// =========================

// summarizeWebsite(
//     "https://docs.puter.com/user-pays-model/"
// );

// askWeb(
//     "What are the latest AI trends?"
// );