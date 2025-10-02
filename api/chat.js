// api/chat.js - FINAL SIMULATION MODE

export default async function handler(request, response) {
  // Simulate a 1-second delay to feel like a real AI
  await new Promise(resolve => setTimeout(resolve, 1000));

  // A list of helpful, pre-programmed responses
  const responses = [
    "That's a very interesting point. Could you tell me more about how that made you feel?",
    "Thank you for sharing that with me. It takes courage to be open about our feelings.",
    "I understand. Remember to be kind to yourself. What's one small, kind thing you can do for yourself right now?",
    "That sounds challenging. Let's try a simple breathing exercise. Breathe in for 4 seconds, hold for 4, and out for 6.",
  ];

  // Pick a random response from the list
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // Send the simulated response back to the app
  return response.status(200).json({ reply: randomResponse });
}