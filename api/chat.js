// api/chat.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// This is a special Vercel function that handles requests.
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { message, history } = request.body;

    // Get the API key securely from the Vercel environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
        history: history, // Pass the previous conversation history
    });

    const result = await chat.sendMessage(message);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    return response.status(200).json({ reply: text });

  } catch (error) {
    console.error("Error in AI function:", error);
    return response.status(500).json({ error: 'Failed to get AI response.' });
  }
}