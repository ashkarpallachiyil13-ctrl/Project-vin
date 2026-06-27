// =========================
// A.R.G.U.S Conversation Memory
// V1 - Remembers last 10 exchanges
// =========================

const MAX_EXCHANGES = 10;
const MAX_CHAT_MESSAGES = MAX_EXCHANGES * 2;

// System prompt is always kept
const conversation = [
    {
        role: "system",
        content: "You are A.R.G.U.S, an intelligent AI assistant."
    }
];

// Add a message
function addMessage(role, content) {
    conversation.push({
        role: role,
        content: content
    });

    trimMemory();
}

// Keep only the last 10 exchanges
function trimMemory() {
    while (conversation.length > MAX_CHAT_MESSAGES + 1) {
        // Remove the oldest chat message
        // Keep the system prompt at index 0
        conversation.splice(1, 1);
    }
}

// Get the conversation history
function getConversation() {
    return conversation;
}

// Clear conversation but keep system prompt
function clearConversation() {
    conversation.splice(1);
}

// Debug helper
function printConversation() {
    console.log(conversation);
}