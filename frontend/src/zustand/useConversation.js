import { create } from "zustand";

//
const useConversation = create((set) => ({
  // Selected conversation
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  // Messages
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
