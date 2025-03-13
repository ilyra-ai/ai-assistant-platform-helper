
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className 
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
              {trend && (
                <span className={cn(
                  "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium",
                  trend.positive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100",
                  "dark:bg-opacity-20"
                )}>
                  <span className={trend.positive ? "text-green-500" : "text-red-500"}>
                    {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
