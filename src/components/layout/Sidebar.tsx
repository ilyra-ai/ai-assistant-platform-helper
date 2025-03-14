
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Users, Settings, Home, Database, 
  Network, Cog, DollarSign, BarChart3, Menu, X, MessageSquare 
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300 ease-in-out",
        isCollapsed ? "justify-center" : "justify-start",
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  
  // Close mobile sidebar when location changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);
  
  // Handle resize event to detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/chat", icon: MessageSquare, label: "Conversar" },
    { to: "/users", icon: Users, label: "Usuários" },
    { to: "/plans", icon: DollarSign, label: "Planos" },
    { to: "/models", icon: Database, label: "Modelos AI" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/network", icon: Network, label: "Rede" },
    { to: "/settings", icon: Settings, label: "Configurações" },
  ];
  
  const renderSidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4">
        <div className={cn(
          "flex items-center gap-2 transition-all duration-300",
          isCollapsed ? "justify-center w-full" : ""
        )}>
          <Cog className="h-6 w-6 text-primary" />
          {!isCollapsed && <span className="text-lg font-semibold">AI Platform</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn("hidden md:flex", isCollapsed ? "ml-0" : "")}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileSidebar}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      <div className="mt-auto p-4">
        <div className={cn(
          "rounded-md bg-sidebar-accent p-3 transition-all",
          isCollapsed ? "text-center" : ""
        )}>
          {isCollapsed ? (
            <Cog className="mx-auto h-5 w-5 text-sidebar-accent-foreground" />
          ) : (
            <>
              <p className="text-sm font-medium text-sidebar-accent-foreground">
                Plano Premium
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Renovação em 15 dias
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile sidebar trigger */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
        isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border p-0 shadow-lg transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {renderSidebarContent()}
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className={cn(
        "hidden md:flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {renderSidebarContent()}
      </div>
    </>
  );
}
