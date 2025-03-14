
import React from 'react';
import { Conversation, Model } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Plus, 
  Trash2,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  models: Model[];
  activeConversationId?: number;
  onSelectConversation: (id: number) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (id: number) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  models,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation
}) => {
  // Ordena as conversas por data de atualização (mais recente primeiro)
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  // Encontra o modelo para uma conversa
  const getModelForConversation = (modelId: number) => {
    return models.find(model => model.id === modelId);
  };

  // Formata a data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Conversas</h2>
        <Button onClick={onCreateConversation} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nova
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {sortedConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-4">
              Nenhuma conversa encontrada
            </p>
            <Button variant="outline" onClick={onCreateConversation}>
              <Plus className="h-4 w-4 mr-2" />
              Iniciar conversa
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedConversations.map((conversation) => {
              const model = getModelForConversation(conversation.modelId);
              
              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-start justify-between p-3 rounded-md hover:bg-accent cursor-pointer group",
                    activeConversationId === conversation.id && "bg-accent"
                  )}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3 overflow-hidden">
                    <div className="bg-primary/10 rounded-md p-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-medium truncate text-sm">
                        {conversation.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(conversation.updatedAt)}</span>
                      </div>
                      {model && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {model.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
