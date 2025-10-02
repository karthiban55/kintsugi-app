// screens/ChatbotScreen.js

import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView, StyleSheet } from 'react-native';

const BOT_USER = {
  _id: 2,
  name: 'Kintsugi AI',
  avatar: 'https://i.imgur.com/gPcrbBC.png', // A simple Kintsugi-style logo
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);

  // This sets the initial welcome message from the bot
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! I am Kintsugi, your personal wellness companion. How are you feeling today?',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  // This function is called when the user sends a message
  const onSend = useCallback((messages = []) => {
    // 1. Add the user's message to the chat
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    // 2. Simulate a bot reply after a short delay
    setTimeout(() => {
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: 'Thank you for sharing. In our next step, I will be able to have a real conversation.',
        createdAt: new Date(),
        user: BOT_USER,
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [botMessage]),
      );
    }, 1000); // 1 second delay
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1, // This ID represents the current user
        }}
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