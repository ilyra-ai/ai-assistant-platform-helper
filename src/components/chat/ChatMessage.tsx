
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
        "flex w-full gap-4 py-6 px-4 md:px-8",
        isUser ? "bg-background" : "bg-muted/20",
        isLastMessage && "animate-fadeIn"
      )}
    >
      <div className="max-w-screen-md w-full mx-auto flex gap-4">
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isUser ? (
            <MessageSquare className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose-sm prose-p:leading-relaxed prose-pre:p-0">
            {formatCodeBlocks(message.content)}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
