// static/js/tool.js

// =========================
// PROJECT VIN - TOOL SYSTEM
// =========================

// Define available AI tools
const tools = [

    {
        type: "function",

        function: {

            name: "calculate",

            description: "Perform basic math operations",

            parameters: {

                type: "object",

                properties: {

                    operation: {
                        type: "string",

                        enum: [
                            "add",
                            "subtract",
                            "multiply",
                            "divide"
                        ]
                    },

                    a: {
                        type: "number"
                    },

                    b: {
                        type: "number"
                    }
                },

                required: [
                    "operation",
                    "a",
                    "b"
                ]
            }
        }
    }
];


// =========================
// TOOL EXECUTION ENGINE
// =========================

function executeTool(toolName, args) {

    switch (toolName) {

        case "calculate":

            return calculate(
                args.operation,
                args.a,
                args.b
            );

        default:

            return "Unknown tool.";
    }
}


// =========================
// CALCULATOR TOOL
// =========================

function calculate(operation, a, b) {

    switch (operation) {

        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":

            if (b === 0) {
                return "Cannot divide by zero.";
            }

            return a / b;

        default:
            return "Invalid operation.";
    }
}


// =========================
// AI TOOL HANDLER
// =========================

async function askAIWithTools(userMessage) {

    try {

        // Send message to AI
        const response = await puter.ai.chat(
            userMessage,
            {
                model: "gpt-5.4-nano",
                tools: tools
            }
        );

        // Check if AI requested a tool
        if (response.message.tool_calls) {

            const toolCall =
                response.message.tool_calls[0];

            // Tool name
            const toolName =
                toolCall.function.name;

            // Parse arguments
            const args = JSON.parse(
                toolCall.function.arguments
            );

            // Execute tool
            const result =
                executeTool(toolName, args);

            console.log("Tool Result:", result);

            return result;
        }

        // Normal AI response
        return response;

    } catch (error) {

        console.error("Tool System Error:", error);

        return "Tool execution failed.";
    }
}