
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, Image, RefreshCw, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  modelType?: 'text' | 'image' | 'voice' | 'multimodal';
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = "Digite sua mensagem...",
  modelType = 'text'
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto border rounded-xl bg-background/80 backdrop-blur-sm shadow-sm mb-8 transition-all hover:shadow-md">
      <div className="flex flex-col space-y-2 p-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="min-h-[60px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
        />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {modelType === 'voice' || modelType === 'multimodal' ? (
              <Button variant="outline" size="icon" type="button" disabled={isLoading} className="rounded-full">
                <Mic className="h-4 w-4" />
              </Button>
            ) : null}
            {modelType === 'image' || modelType === 'multimodal' ? (
              <Button variant="outline" size="icon" type="button" disabled={isLoading} className="rounded-full">
                <Image className="h-4 w-4" />
              </Button>
            ) : null}
            <Button variant="outline" size="icon" type="button" disabled={isLoading || !message.trim()} className="rounded-full">
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || isLoading} 
            className="px-5 rounded-full transition-all"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};
