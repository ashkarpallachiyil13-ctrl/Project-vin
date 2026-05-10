// static/js/codex.js

// =========================
// PROJECT VIN - CODE GENERATION
// =========================

// This module handles:
// - Code generation
// - Debugging help
// - Algorithm generation
// - Programming assistance

async function generateCode(prompt) {

    try {

        // Prevent empty prompts
        if (!prompt || prompt.trim() === "") {

            console.error("No coding prompt provided.");

            return "Empty coding prompt.";
        }

        // Send request to coding model
        const response = await puter.ai.chat(
            prompt,
            {
                model: "openai/gpt-5.3-codex"
            }
        );

        console.log("Generated Code:", response);

        return response;

    } catch (error) {

        console.error(
            "Code Generation Error:",
            error
        );

        return "Code generation failed.";
    }
}


// =========================
// DEBUGGING MODE
// =========================

async function debugCode(code, issue) {

    const prompt = `
Debug this code:

${code}

Problem:
${issue}
`;

    return await generateCode(prompt);
}


// =========================
// CODE EXPLAINER
// =========================

async function explainCode(code) {

    const prompt = `
Explain this code in simple terms:

${code}
`;

    return await generateCode(prompt);
}


// =========================
// ALGORITHM GENERATOR
// =========================

async function generateAlgorithm(task) {

    const prompt = `
Write an optimized algorithm for:

${task}
`;

    return await generateCode(prompt);
}


// =========================
// EXAMPLE USAGE
// =========================

// generateCode(
//     "Write a Python binary search function"
// );

// debugCode(
//     "print(x)",
//     "x is undefined"
// );

// explainCode(
//     "for i in range(5): print(i)"
// );