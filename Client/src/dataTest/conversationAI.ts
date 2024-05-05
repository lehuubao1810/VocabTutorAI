import { ConversationAIType } from "../type/ConversationAI";

export const conversationsAI: ConversationAIType[] = [
  {
    id: "1",
    name: "John",
    description: "John is a character in the game.",
    image: "https://via.placeholder.com/150",
    uid: "1",
    botId: "1",
    history: [
      {
        role: "user",
        parts: "Hello",
      },
      {
        role: "ai",
        parts: "Hi, how can I help you?",
      },
      {
        role: "user",
        parts: "I have a question.",
      },
      {
        role: "ai",
        parts: "Sure, what is your question?",
      },
      {
        role: "user",
        parts: "How are you?",
      },
      {
        role: "ai",
        parts: "I'm fine, thank you. How about you?",
      },
      {
        role: "user",
        parts: "I'm good, too.",
      },
      {
        role: "ai",
        parts: "That's great to hear.",
      },
      {
        role: "user",
        parts: "What is your name?",
      },
      {
        role: "ai",
        parts: "My name is John.",
      },
      {
        role: "user",
        parts: "Nice to meet you, John.",
      },
      {
        role: "ai",
        parts: "Nice to meet you, too.",
      },
      {
        role: "user",
        parts: "Goodbye",
      },
      {
        role: "ai",
        parts: "Goodbye, have a nice day.",
      },
      
    ],
  },
];
