
import React from 'react';
import { MessageSquare, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
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
        "flex w-full gap-2 py-4",
        isLastMessage && "animate-fadeIn"
      )}
    >
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isUser ? (
          <MessageSquare className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="prose-sm prose-p:leading-relaxed prose-pre:p-0">
          {/* Renderiza código de forma especial */}
          {message.content.includes('```') ? (
            <div>
              {message.content.split('```').map((part, index) => {
                if (index % 2 === 0) {
                  return (
                    <div key={index} className="whitespace-pre-wrap">
                      {part}
                    </div>
                  );
                } else {
                  const [language, ...code] = part.split('\n');
                  return (
                    <pre 
                      key={index} 
                      className="mt-2 mb-2 rounded-md bg-muted p-4 overflow-x-auto text-sm"
                    >
                      <code className="whitespace-pre">
                        {code.join('\n')}
                      </code>
                    </pre>
                  );
                }
              })}
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};
