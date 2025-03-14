
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Sparkles, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  modelType?: 'text' | 'image' | 'voice' | 'multimodal';
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = "Pergunte alguma coisa",
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
    <div className="w-full max-w-[650px] mx-auto mb-8">
      <div className="relative rounded-2xl border border-[#eee] shadow-sm bg-white">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className="min-h-[56px] max-h-[200px] py-3 pl-14 pr-10 resize-none border-0 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent rounded-2xl"
        />
        <div className="absolute left-3 bottom-3 flex space-x-1">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-[#F6F6F7]">
            <Plus className="h-5 w-5 text-[#8E9196]" />
          </Button>
        </div>
        <div className="absolute right-3 bottom-3 flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-[#F6F6F7]">
            <Search className="h-5 w-5 text-[#8E9196]" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-[#F6F6F7]">
            <Sparkles className="h-5 w-5 text-[#8E9196]" />
            <span className="sr-only">Investigar</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-black hover:bg-gray-800">
            <Mic className="h-5 w-5 text-white" />
            <span className="sr-only">Mic</span>
          </Button>
        </div>
      </div>
      <div className="text-xs text-center mt-2 text-[#8E9196]">
        O ChatGPT pode cometer erros. Considere verificar informações importantes.
      </div>
    </div>
  );
};
