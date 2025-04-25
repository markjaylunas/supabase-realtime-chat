import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ChatMessage } from "@/hooks/use-realtime-chat";
import { cn, formatMessageTime } from "@/lib/utils";
import { User } from "lucide-react";

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showHeader: boolean;
}

export const ChatMessageItem = ({
  message,
  isOwnMessage,
  showHeader,
}: ChatMessageItemProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const renderMessageContent = (content: string) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    // Split the content by URLs
    const parts = content.split(urlPattern);
    
    return parts.map((part, index) => {
      // Check if this part is a URL
      if (part.match(urlPattern)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary/80"
          >
            {part}
          </a>
        );
      }
      // Return regular text
      return part;
    });
  };

  return (
    <div
      className={`flex mt-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={cn("max-w-[75%] w-fit flex flex-col gap-1", {
          "items-end": isOwnMessage,
        })}
      >
        {showHeader && (
          <div
            className={cn("flex items-center gap-2 text-xs mb-1 mt-2", {
              "justify-end flex-row-reverse": isOwnMessage,
            })}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={message.user.avatar_url || ""}
                alt={message.user.name}
              />
              <AvatarFallback>
                {message.user.name ? (
                  <p className="text-xl font-bold">
                    {getInitials(message.user.name)}
                  </p>
                ) : (
                  <User className="h-6 w-6" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className={"font-medium"}>{message.user.name}</span>
              <span className="text-foreground/50 text-xs">
                {formatMessageTime(message.createdAt)}
              </span>
            </div>
          </div>
        )}
        <div
          className={cn(
            "py-2 px-3 rounded-xl text-sm w-fit",
            isOwnMessage
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {renderMessageContent(message.content)}
        </div>
      </div>
    </div>
  );
};
