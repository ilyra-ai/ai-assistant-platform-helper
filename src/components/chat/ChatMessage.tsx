
import React from 'react';
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
        "w-full py-6 px-4 md:px-8",
        isUser ? "bg-white" : "bg-white",
        isLastMessage && "animate-fadeIn"
      )}
    >
      <div className="max-w-[650px] mx-auto flex gap-4">
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className={cn(
            "prose-sm prose-p:leading-relaxed prose-pre:p-0",
          )}>
            {formatCodeBlocks(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};
