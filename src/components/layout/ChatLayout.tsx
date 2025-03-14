
import React from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen w-full bg-background">
      {/* Close button (visible only on desktop) */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleClose}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Return to Dashboard</span>
        </Button>
      </div>
      
      {/* Main chat area */}
      <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
};
