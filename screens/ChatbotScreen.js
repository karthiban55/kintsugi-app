// screens/ChatbotScreen.js

import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { SafeAreaView, StyleSheet } from 'react-native';

// --- IMPORTANT: PASTE YOUR VERCEL URL HERE ---
const API_URL = 'https://kintsugi-d5fgoci1r-karthibans-projects-ade1358f.vercel.app/api/chat'; 
// Make sure it starts with https:// and does NOT end with a slash /

const BOT_USER = {
  _id: 2,
  name: 'Kintsugi AI',
  avatar: 'https://i.imgur.com/gPcrbBC.png',
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I am Kintsugi, your personal wellness companion. How can I help you today?',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    // 1. Add the user's message to the chat UI immediately
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const userMessage = messages[0].text;

    // 2. Prepare the conversation history for the AI
    // We format it into the { role, parts } structure that the Gemini API expects
    const history = messages.slice(1).reverse().map(msg => ({
        role: msg.user._id === 1 ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    // 3. Send the message and history to our secure Vercel backend
    fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage, history: history }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.reply) {
          const botMessage = {
            _id: new Date().getTime() + 1,
            text: data.reply,
            createdAt: new Date(),
            user: BOT_USER,
          };
          // 4. Add the AI's response to the chat UI
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [botMessage]),
          );
        }
      })
      .catch(error => {
        console.error("Failed to fetch AI response:", error);
      });
  }, []);

  // Custom styling for the message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { // User's bubble
            backgroundColor: '#007AFF',
          },
          left: { // Bot's bubble
            backgroundColor: '#E5E5EA',
          },
        }}
        textStyle={{
          right: {
            color: '#FFFFFF',
          },
          left: {
            color: '#000000',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        placeholder="Type your message here..."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default ChatbotScreen;