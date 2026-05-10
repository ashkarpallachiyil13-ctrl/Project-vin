// static/js/stream.js

// =========================
// PROJECT VIN - STREAMING SYSTEM
// =========================

async function streamResponse(userMessage) {

    try {

        // Create streaming response
        const response = await puter.ai.chat(
            userMessage,
            {
                stream: true,
                model: "gpt-5.4-nano"
            }
        );

        // Output container
        const outputElement =
            document.getElementById("stream-output");

        // Clear previous response
        outputElement.innerHTML = "";

        // Store full response
        let fullResponse = "";

        // Stream chunks in real-time
        for await (const part of response) {

            // Ignore empty chunks
            if (!part?.text) {
                continue;
            }

            // Add chunk
            fullResponse += part.text;

            // Update UI live
            outputElement.innerHTML = fullResponse;
        }

        // Return completed response
        return fullResponse;

    } catch (error) {

        console.error("Streaming Error:", error);

        return "Streaming failed.";
    }
}


// =========================
// EXAMPLE USAGE
// =========================

// streamResponse(
//     "Explain the theory of relativity in detail"
// );