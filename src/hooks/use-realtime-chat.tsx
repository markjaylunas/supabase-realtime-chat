import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar_url?: string | null;
  };
}

interface UseRealtimeChatProps {
  roomName: string;
  username: string;
}

export function useRealtimeChat({ roomName, username }: UseRealtimeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get the current user's ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting current user:", error);
        return;
      }
      setUserId(data.user.id);
    };
    
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`room:${roomName}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room=eq.${roomName}`,
        },
        async (payload) => {
          // Fetch the complete message with user info from the view
          const { data, error } = await supabase
            .from("user_messages")
            .select("*")
            .eq("id", payload.new.id)
            .single();
            
          if (error) {
            console.error("Error fetching new message details:", error);
            return;
          }
          
          const newMessage = {
            id: data.id,
            content: data.content,
            createdAt: data.created_at,
            user: {
              id: data.user_id,
              name: data.user_name,
              avatar_url: data.user_avatar_url,
            },
          };
          
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    // Fetch initial messages from the view
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("user_messages")
        .select("*")
        .eq("room", roomName)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }

      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.created_at,
        user: {
          id: msg.user_id,
          name: msg.user_name,
          avatar_url: msg.user_avatar_url,
        },
      }));

      setMessages(formattedMessages);
    };

    fetchMessages();

    return () => {
      channel.unsubscribe();
    };
  }, [roomName, userId]);

  const sendMessage = async (content: string) => {
    if (!userId) {
      console.error("Cannot send message: User ID not available");
      return;
    }
    
    const { error } = await supabase.from("messages").insert({
      content,
      room: roomName,
      user_id: userId,
    });

    if (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
}
