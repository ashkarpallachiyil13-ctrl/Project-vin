// static/js/image_gen.js

// =========================
// PROJECT VIN - IMAGE GENERATION
// =========================

async function generateImage(prompt) {

    try {

        // Prevent empty prompts
        if (!prompt || prompt.trim() === "") {
            console.error("Empty image prompt.");
            return;
        }

        // Generate image using Puter AI
        const imageElement = await puter.ai.txt2img(
            prompt,
            {
                model: "gpt-image-2"
            }
        );

        // Find image container
        const imageContainer = document.getElementById("image-container");

        // Clear old image (optional)
        imageContainer.innerHTML = "";

        // Add generated image
        imageContainer.appendChild(imageElement);

    } catch (error) {

        console.error("Image Generation Error:", error);

    }
}