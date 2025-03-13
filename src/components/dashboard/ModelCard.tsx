import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Settings, MoreHorizontal, Play, Pause, Clock } from 'lucide-react';

interface ModelCardProps {
  name: string;
  description: string;
  type: 'text' | 'image' | 'voice' | 'multimodal';
  status: 'active' | 'inactive' | 'pending';
  usage: { current: number; total: number };
  lastUpdated: string;
  onClick: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  name,
  description,
  type,
  status,
  usage,
  lastUpdated,
  onClick,
}) => {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Ativo' },
    inactive: { variant: 'danger' as const, label: 'Inativo' },
    pending: { variant: 'warning' as const, label: 'Pendente' },
  };

  const typeConfig = {
    text: { label: 'Texto', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
    image: { label: 'Imagem', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
    voice: { label: 'Voz', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
    multimodal: { label: 'Multimodal', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="space-y-2 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeConfig[type].color}`}>
            {typeConfig[type].label}
          </div>
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].label}
          </Badge>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Uso</span>
            <span className="text-muted-foreground">
              {usage.current} / {usage.total}
            </span>
          </div>
          <Progress value={(usage.current / usage.total) * 100} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Atualizado {lastUpdated}
        </div>
        <div className="flex items-center space-x-2">
          {status === 'active' ? (
            <Button size="icon" variant="outline">
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="icon" variant="outline">
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
