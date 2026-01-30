import { Message } from "@/types/chat";
import { StructuredMessage } from "./StructuredMessage";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div 
      className={cn(
        "flex gap-4 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div 
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div 
        className={cn(
          "flex-1 max-w-3xl",
          isUser ? "text-right" : "text-left"
        )}
      >
        {isUser ? (
          <div className="inline-block bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        ) : message.structuredResponse ? (
          <div className="bg-card rounded-2xl rounded-tl-sm p-5 shadow-premium border border-border">
            <StructuredMessage response={message.structuredResponse} />
          </div>
        ) : (
          <div className="inline-block bg-card text-card-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-1.5 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
