
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Database, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  name: string;
  description: string;
  type: 'text' | 'image' | 'voice' | 'multimodal';
  status: 'active' | 'inactive' | 'pending';
  usage?: {
    current: number;
    total: number;
  };
  lastUpdated?: string;
  className?: string;
  onClick?: () => void;
}

export const ModelCard = ({
  name,
  description,
  type,
  status,
  usage,
  lastUpdated,
  className,
  onClick
}: ModelCardProps) => {
  const typeConfig = {
    text: { icon: Database, label: 'Texto', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    image: { icon: Database, label: 'Imagem', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
    voice: { icon: Database, label: 'Voz', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    multimodal: { icon: Database, label: 'Multimodal', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  };
  
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Ativo', pulse: true },
    inactive: { variant: 'danger' as const, label: 'Inativo', pulse: false },
    pending: { variant: 'warning' as const, label: 'Pendente', pulse: true },
  };
  
  const TypeIcon = typeConfig[type].icon;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer",
      className
    )} onClick={onClick}>
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <TypeIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <Badge 
            variant={statusConfig[status].variant}
            pulse={statusConfig[status].pulse}
          >
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">Tipo:</span>
            <Badge className={cn("ml-2", typeConfig[type].color)}>
              {typeConfig[type].label}
            </Badge>
          </div>
          {usage && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uso</span>
                <span className="font-medium">{usage.current} / {usage.total}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(usage.current / usage.total) * 100}%` }}
                />
              </div>
            </div>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Atualizado: {lastUpdated}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-end">
        <Button 
          variant="outline"
          size="sm"
          className="transition-all duration-200 transform hover:scale-105"
          onClick={(e) => {
            e.stopPropagation();
            // Add settings action here
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configurar
        </Button>
      </CardFooter>
    </Card>
  );
};
