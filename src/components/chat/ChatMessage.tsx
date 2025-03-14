
import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { cn, formatCodeBlocks } from '@/lib/utils';
import { Message } from '@/lib/db';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLastMessage = false 
}) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full gap-4 py-6 px-4 md:px-8 border-b border-border/30",
        isUser ? "bg-background" : "bg-muted/10",
        isLastMessage && "animate-fadeIn"
      )}
    >
      <div className="max-w-screen-md w-full mx-auto flex gap-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full shadow-sm transition-all",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        )}>
          {isUser ? (
            <MessageSquare className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className={cn(
            "prose-sm prose-p:leading-relaxed prose-pre:p-0",
            "rounded-lg p-3",
            isUser ? "" : "bg-accent/30"
          )}>
            {formatCodeBlocks(message.content)}
          </div>
          <div className="flex items-center gap-2 ml-1">
            <div className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
