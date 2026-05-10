// static/js/chatbot.js

async function sendMessage(userMessage) {

    try {

        // Send message to Puter AI
        const response = await puter.ai.chat(
            userMessage,
            {
                model: "gpt-5.4-nano"
            }
        );

        // Print response
        console.log(response);

        // Return response
        return response;

    } catch (error) {

        console.error("AI Error:", error);

        return "Something went wrong.";

    }
}