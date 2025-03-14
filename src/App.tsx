
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Models from "./pages/Models";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

// Debug component to log route changes
const RouteLogger = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);
  
  return null;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteLogger />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/models" element={<Models />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/settings" element={<Settings />} />
            {/* The chat route now uses its own independent layout */}
            <Route path="/chat/:modelId?" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
