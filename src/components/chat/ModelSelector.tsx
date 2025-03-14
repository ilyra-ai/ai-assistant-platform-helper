
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Model } from '@/lib/db';
import { Badge } from '@/components/ui/badge';

interface ModelSelectorProps {
  models: Model[];
  selectedModelId: number;
  onSelectModel: (modelId: number) => void;
  className?: string;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModelId,
  onSelectModel,
  className
}) => {
  // Filtrar apenas modelos ativos
  const activeModels = models.filter(model => model.status === 'active');
  
  const handleModelChange = (value: string) => {
    const modelId = parseInt(value, 10);
    onSelectModel(modelId);
  };

  // Obter modelo selecionado
  const selectedModel = models.find(model => model.id === selectedModelId);

  const getTypeLabel = (type: 'text' | 'image' | 'voice' | 'multimodal') => {
    switch(type) {
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'voice': return 'Voz';
      case 'multimodal': return 'Multimodal';
      default: return type;
    }
  };

  return (
    <div className={className}>
      <Select
        value={selectedModelId.toString()}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um modelo" />
        </SelectTrigger>
        <SelectContent>
          {activeModels.map(model => (
            <SelectItem key={model.id} value={model.id.toString()}>
              <div className="flex items-center justify-between w-full">
                <span>{model.name}</span>
                <Badge variant="outline" className="ml-2">
                  {getTypeLabel(model.type)}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedModel && (
        <div className="mt-2 text-xs text-muted-foreground">
          {selectedModel.description}
        </div>
      )}
    </div>
  );
};
