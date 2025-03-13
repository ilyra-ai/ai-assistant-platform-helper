
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModelCard } from '@/components/dashboard/ModelCard';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Database, Settings, BarChart3, Filter } from 'lucide-react';

const modelsData = [
  {
    id: 1,
    name: "GPT Assistant Pro",
    description: "Modelo conversacional avançado para suporte ao cliente",
    type: "text" as const,
    status: "active" as const,
    usage: { current: 1250, total: 2000 },
    lastUpdated: "Hoje às 10:30",
    category: "chatbot"
  },
  {
    id: 2,
    name: "Image Generator",
    description: "Gerador de imagens a partir de descrição textual",
    type: "image" as const,
    status: "active" as const,
    usage: { current: 450, total: 1000 },
    lastUpdated: "Ontem às 15:45",
    category: "creation"
  },
  {
    id: 3,
    name: "Voice Assistant",
    description: "Assistente de voz para sistemas integrados",
    type: "voice" as const,
    status: "pending" as const,
    usage: { current: 120, total: 500 },
    lastUpdated: "2 dias atrás",
    category: "assistant"
  },
  {
    id: 4,
    name: "Customer Support",
    description: "Especializado em atendimento ao cliente para e-commerce",
    type: "text" as const,
    status: "active" as const,
    usage: { current: 890, total: 1500 },
    lastUpdated: "3 horas atrás",
    category: "chatbot"
  },
  {
    id: 5,
    name: "Code Assistant",
    description: "Ajuda desenvolvedores a escrever e depurar código",
    type: "text" as const,
    status: "active" as const,
    usage: { current: 720, total: 1000 },
    lastUpdated: "1 dia atrás",
    category: "assistant"
  },
  {
    id: 6,
    name: "Multimodal Assistant",
    description: "Combina processamento de texto, imagem e voz",
    type: "multimodal" as const,
    status: "inactive" as const,
    usage: { current: 50, total: 500 },
    lastUpdated: "1 semana atrás",
    category: "assistant"
  },
];

const Models = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredModels = modelsData.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || model.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Modelos AI</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie e configure os modelos de IA da sua plataforma.
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Modelo
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Métricas de Modelos</CardTitle>
            <CardDescription>
              Visão geral do desempenho dos seus modelos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Total de Modelos", value: "12", icon: <Database className="h-5 w-5 text-primary" /> },
                { title: "Modelos Ativos", value: "8", icon: <Settings className="h-5 w-5 text-primary" /> },
                { title: "Total de Chamadas", value: "1.2M", trend: { value: 8.5, positive: true }, icon: <BarChart3 className="h-5 w-5 text-primary" /> },
                { title: "Tempo Médio de Resposta", value: "240ms", trend: { value: 12.3, positive: false }, icon: <BarChart3 className="h-5 w-5 text-primary" /> },
              ].map((stat, index) => (
                <Card key={index} className="overflow-hidden bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <div className="flex items-baseline space-x-2">
                          <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>
                          {stat.trend && (
                            <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${
                              stat.trend.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                            }`}>
                              <span className={stat.trend.positive ? 'text-green-500' : 'text-red-500'}>
                                {stat.trend.positive ? '↑' : '↓'} {Math.abs(stat.trend.value)}%
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      {stat.icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {stat.icon}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row gap-4 mb-1 justify-between items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar modelos..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="chatbot">Chatbots</TabsTrigger>
                <TabsTrigger value="assistant">Assistentes</TabsTrigger>
                <TabsTrigger value="creation">Criação</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              name={model.name}
              description={model.description}
              type={model.type}
              status={model.status}
              usage={model.usage}
              lastUpdated={model.lastUpdated}
              onClick={() => console.log(`Model ${model.id} clicked`)}
            />
          ))}
          
          {filteredModels.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Nenhum modelo encontrado</h3>
              <p className="text-muted-foreground mt-1">
                Tente usar termos diferentes ou adicione um novo modelo.
              </p>
              <Button className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Modelo
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Models;
