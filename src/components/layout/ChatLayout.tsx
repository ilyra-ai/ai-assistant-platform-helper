
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, PenSquare } from 'lucide-react';

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
    <div className="flex min-h-screen bg-[#F6F6F7]">
      {/* Sidebar with conversation list */}
      <div className="w-[260px] bg-white border-r border-[#F1F1F1] flex flex-col h-screen">
        {/* Top section with new chat button */}
        <div className="p-3 flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-start gap-2 text-[#403E43]"
            onClick={() => navigate('/chat')}
          >
            <PenSquare className="h-4 w-4" />
            <span>ChatGPT 4o</span>
          </Button>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2">
            {/* Static conversation items for demo */}
            <ConversationItem active label="ChatGPT" />
            <ConversationItem label="Sora" />
            <ConversationItem label="Mapa Astral Védico: ..." />
            <ConversationItem label="Lyra - Análise de For..." />
            <ConversationItem label="Análise de Doenças ..." />
            <ConversationItem label="LYRA DM – O Ma..." />
            <ConversationItem label="Explorar GPTs" />
            
            {/* Projects header */}
            <div className="py-3 px-2 text-sm font-medium text-[#8A898C]">
              Projetos
            </div>
            
            {/* Project item */}
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F6F6F7] cursor-pointer text-[#403E43]">
              <PenSquare className="h-4 w-4" />
              <span className="text-sm">Novo projeto</span>
            </div>
            
            {/* Today section */}
            <div className="py-3 px-2 text-sm font-medium text-[#8A898C]">
              Hoje
            </div>
            
            {/* Today items */}
            <div className="flex flex-col gap-1">
              <div className="p-2 rounded-md hover:bg-[#F6F6F7] cursor-pointer text-sm text-[#403E43]">
                Rapé e Sopro Ideal
              </div>
              <div className="p-2 rounded-md hover:bg-[#F6F6F7] cursor-pointer text-sm text-[#403E43]">
                Manual de Compliance Detali
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between p-2 border-b bg-white">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="rounded-md hover:bg-[#F6F6F7]"
            >
              <Search className="h-5 w-5 text-[#8E9196]" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-white text-[#8E9196] border-[#eee] mr-2"
            >
              Temporário
            </Button>
            <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center text-white">
              d
            </div>
          </div>
        </div>
        
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
        "flex items-center gap-2 p-2 rounded-md cursor-pointer",
        active ? "bg-[#F6F6F7]" : "hover:bg-[#F6F6F7]"
      )}
    >
      <div className={cn(
        "h-6 w-6 rounded-full flex items-center justify-center",
        active ? "bg-[#0B96F0] text-white" : "bg-[#F1F1F1] text-[#8E9196]"
      )}>
        {label.substring(0, 1)}
      </div>
      <span className="text-sm text-[#403E43]">{label}</span>
    </div>
  );
};

