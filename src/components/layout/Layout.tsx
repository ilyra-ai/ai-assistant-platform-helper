
import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
};

// Helper function for smooth scroll-based animations
const handleScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  
  return () => {
    animatedElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
};

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const cleanup = handleScrollAnimations();
    return cleanup;
  }, []);
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300 ease-in-out",
        "px-4 py-6 md:px-8 md:py-8"
      )}>
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};
