import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { selectedConversation, messages, setMessages } = useConversation();
  const receiverId = selectedConversation?._id;

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/messages/${receiverId}`);

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.log("Error fetching messages", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, setMessages, receiverId]);

  return { loading, messages };
};

export default useGetMessages;
