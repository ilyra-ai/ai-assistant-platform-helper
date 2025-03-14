
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PaperPlaneIcon, Mic, Image, RefreshCw } from 'lucide-react';

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
    <div className="border-t bg-card p-4">
      <div className="flex flex-col space-y-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="min-h-[80px] resize-none"
        />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {modelType === 'voice' || modelType === 'multimodal' ? (
              <Button variant="outline" size="icon" type="button" disabled={isLoading}>
                <Mic className="h-4 w-4" />
              </Button>
            ) : null}
            {modelType === 'image' || modelType === 'multimodal' ? (
              <Button variant="outline" size="icon" type="button" disabled={isLoading}>
                <Image className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || isLoading} 
            className="px-4"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <PaperPlaneIcon className="h-4 w-4 mr-2" />
            )}
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};
