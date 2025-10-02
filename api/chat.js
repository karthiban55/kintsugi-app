// api/chat.js - SIMPLE TEST MODE

export default async function handler(request, response) {
  // This function now ignores the Google AI and replies instantly.
  return response.status(200).json({ reply: "This is a test reply. If you see this, the connection is working." });
}