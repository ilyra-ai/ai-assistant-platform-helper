
import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pulse?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', pulse = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors";
    
    const sizeClasses = {
      sm: "text-xs px-2 py-0.5",
      md: "text-xs px-2.5 py-0.5",
      lg: "text-sm px-3 py-1",
    };
    
    const variantClasses = {
      default: "bg-primary/10 text-primary",
      success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      outline: "border border-border bg-transparent",
    };
    
    const pulseClass = pulse ? "before:animate-ping before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-20 relative" : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          sizeClasses[size],
          variantClasses[variant],
          pulseClass,
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
