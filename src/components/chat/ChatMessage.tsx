
import React from 'react';
import { cn, formatCodeBlocks } from '@/lib/utils';
import { Message } from '@/lib/db';
import { Avatar } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

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
        "w-full py-4 px-4 md:px-8",
        isUser ? "bg-white" : "bg-gray-50",
        isLastMessage && "animate-fadeIn"
      )}
    >
      <div className="max-w-[650px] mx-auto flex gap-4">
        <div className="mt-1 flex-shrink-0">
          <Avatar className={cn(
            "h-7 w-7",
            isUser ? "bg-[#5436DA]" : "bg-[#19C37D]"
          )}>
            {isUser ? (
              <User className="h-4 w-4 text-white" />
            ) : (
              <Bot className="h-4 w-4 text-white" />
            )}
          </Avatar>
        </div>
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
