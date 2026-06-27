// =========================
// A.R.G.U.S Conversation Memory
// V1 - Remembers last 10 exchanges
// =========================

const Memory = {

    // Number of user/assistant exchanges to remember
    MAX_EXCHANGES: 10,

    // Conversation history
    conversation: [
        {
            role: "system",
            content: "You are A.R.G.U.S, an intelligent AI assistant."
        }
    ],

    // Add a message
    add(role, content) {

        this.conversation.push({
            role: role,
            content: content
        });

        this.trim();
    },

    // Keep only the last 10 exchanges
    trim() {

        const maxMessages = (this.MAX_EXCHANGES * 2) + 1;

        while (this.conversation.length > maxMessages) {
            // Never remove the system prompt
            this.conversation.splice(1, 1);
        }

    },

    // Return conversation history
    get() {
        return [...this.conversation];
    },

    // Clear chat memory (keep system prompt)
    clear() {
        this.conversation.splice(1);
    },

    // Print memory to console
    print() {
        console.log(this.conversation);
    }

};