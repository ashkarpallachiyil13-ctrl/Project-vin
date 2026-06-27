// static/modules/chatbot.js

async function chatWithAI(userMessage, history = []) {

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: userMessage,
                history: history

            })

        });

        const data = await response.json();

        return data.reply;

    } catch (error) {

        console.error("AI Error:", error);

        return "Something went wrong.";

    }

}// static/js/chatbot.js

async function sendMessage(userMessage) {

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userMessage
            })

        });

        const data = await response.json();

        console.log(data);

        return data.reply;

    } catch (error) {

        console.error("AI Error:", error);

        return "Something went wrong.";

    }

}