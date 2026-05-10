// static/js/image_analysis.js

// =========================
// PROJECT VIN - IMAGE ANALYSIS
// =========================

async function analyzeImage(imageUrl, question = "What do you see in this image?") {

    try {

        // Validate image URL
        if (!imageUrl || imageUrl.trim() === "") {

            console.error("No image URL provided.");

            return "No image provided.";
        }

        // Send image + prompt to AI
        const response = await puter.ai.chat(
            question,
            imageUrl,
            {
                model: "gpt-5.4-nano"
            }
        );

        // Print response
        console.log("Image Analysis:", response);

        // Return analysis
        return response;

    } catch (error) {

        console.error("Image Analysis Error:", error);

        return "Image analysis failed.";
    }
}