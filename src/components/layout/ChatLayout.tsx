
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenSquare, MessageCircle, Plus, Settings } from 'lucide-react';

type ChatLayoutProps = {
  children: React.ReactNode;
};

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const navigate = useNavigate();

  // Handle closing the chat and returning to dashboard
  const handleClose = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar with conversation list */}
      <div className="w-[260px] bg-[#f7f7f8] border-r border-[#e5e5e5] flex flex-col h-screen">
        {/* Top section with new chat button */}
        <div className="p-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-start gap-2 text-gray-700 bg-white border-[#e5e5e5] hover:bg-gray-50"
            onClick={() => navigate('/chat')}
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="px-2">
            {/* Recent conversations section */}
            <div className="text-xs font-medium text-gray-500 px-2 py-2 uppercase">
              Recent
            </div>
            
            {/* Conversation items */}
            <ConversationItem active label="ChatGPT" />
            <ConversationItem label="Rapé e Sopro Ideal" />
            <ConversationItem label="Manual de Compliance" />
            <ConversationItem label="Mapa Astral Védico" />
            <ConversationItem label="Análise de Doenças" />
            
            {/* Previous conversations section */}
            <div className="text-xs font-medium text-gray-500 px-2 py-2 mt-4 uppercase">
              Previous 7 Days
            </div>
            
            {/* Additional conversations */}
            <ConversationItem label="Design System Review" />
            <ConversationItem label="Product Planning" />
            <ConversationItem label="Marketing Strategy" />
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="p-3 border-t border-[#e5e5e5]">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex items-center justify-start gap-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/dashboard')}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex items-center justify-start gap-2 text-gray-700 hover:bg-gray-100 mt-1"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* Main chat content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Helper component for conversation items
const ConversationItem = ({ label, active = false }: { label: string; active?: boolean }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-2 p-2 rounded-md cursor-pointer text-gray-700 mb-1 hover:bg-gray-100",
        active ? "bg-gray-100" : ""
      )}
    >
      <MessageCircle className="h-4 w-4" />
      <span className="text-sm truncate">{label}</span>
    </div>
  );
};
