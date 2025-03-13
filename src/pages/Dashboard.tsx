import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ModelCard } from '@/components/dashboard/ModelCard';
import { 
  Users, MessageSquare, Database, 
  BarChart3, Activity, Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Simulate API loading with a nice animation
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    
    const statsElements = document.querySelectorAll('.stat-card');
    statsElements.forEach((element, index) => {
      const timeout = setTimeout(() => {
        element.classList.add('animate-scale-in');
        element.classList.remove('opacity-0');
      }, 100 * index);
      timeoutIds.push(timeout);
    });
    
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo à sua plataforma de assistentes AI.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Última atualização: {new Date().toLocaleTimeString()}
            </span>
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card opacity-0">
            <StatCard
              title="Total de Usuários"
              value="2,543"
              trend={{ value: 12.5, positive: true }}
              icon={<Users className="h-5 w-5 text-primary" />}
            />
          </div>
          <div className="stat-card opacity-0">
            <StatCard
              title="Conversas Hoje"
              value="1,254"
              trend={{ value: 8.2, positive: true }}
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />
          </div>
          <div className="stat-card opacity-0">
            <StatCard
              title="Modelos Ativos"
              value="8"
              description="5 em uso"
              icon={<Database className="h-5 w-5 text-primary" />}
            />
          </div>
          <div className="stat-card opacity-0">
            <StatCard
              title="Taxa de Conversão"
              value="24.5%"
              trend={{ value: 3.2, positive: false }}
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
            />
          </div>
        </div>
        
        {/* Active Models */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Modelos Ativos</h2>
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ModelCard
              name="GPT Assistant Pro"
              description="Modelo conversacional avançado para suporte ao cliente"
              type="text"
              status="active"
              usage={{ current: 1250, total: 2000 }}
              lastUpdated="Hoje às 10:30"
              onClick={() => console.log('Model clicked')}
            />
            <ModelCard
              name="Image Generator"
              description="Gerador de imagens a partir de descrição textual"
              type="image"
              status="active"
              usage={{ current: 450, total: 1000 }}
              lastUpdated="Ontem às 15:45"
              onClick={() => console.log('Model clicked')}
            />
            <ModelCard
              name="Voice Assistant"
              description="Assistente de voz para sistemas integrados"
              type="voice"
              status="pending"
              usage={{ current: 120, total: 500 }}
              lastUpdated="2 dias atrás"
              onClick={() => console.log('Model clicked')}
            />
          </div>
        </div>
        
        {/* Recent Activity & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>As ações mais recentes na sua plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Novo modelo adicionado", 
                    description: "Modelo 'Customer Support Assistant' foi adicionado",
                    time: "10 minutos atrás",
                    status: "success"
                  },
                  { 
                    title: "Plano atualizado", 
                    description: "Plano 'Enterprise' foi atualizado com novos limites",
                    time: "2 horas atrás",
                    status: "info"
                  },
                  { 
                    title: "Novo usuário", 
                    description: "Carlos Silva se registrou na plataforma",
                    time: "5 horas atrás",
                    status: "default"
                  },
                  { 
                    title: "Alerta de uso", 
                    description: "Modelo 'Chat Assistant' atingiu 90% do limite",
                    time: "1 dia atrás",
                    status: "warning"
                  },
                  { 
                    title: "Atualização de sistema", 
                    description: "Sistema atualizado para versão 2.4.0",
                    time: "2 dias atrás",
                    status: "info"
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start pb-4 last:pb-0 last:mb-0 border-b last:border-0">
                    <div className={`h-2 w-2 mt-2 rounded-full mr-3 ${
                      activity.status === "success" ? "bg-green-500" :
                      activity.status === "warning" ? "bg-yellow-500" :
                      activity.status === "info" ? "bg-blue-500" : "bg-primary"
                    }`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Planos</CardTitle>
              <CardDescription>Distribuição de usuários por plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Básico", percentage: 45, count: 1145, color: "bg-blue-500" },
                  { name: "Pro", percentage: 32, count: 814, color: "bg-indigo-500" },
                  { name: "Enterprise", percentage: 23, count: 584, color: "bg-violet-500" },
                ].map((plan) => (
                  <div key={plan.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${plan.color} mr-2`} />
                        <span className="text-sm font-medium">{plan.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{plan.count} usuários</Badge>
                        <span className="text-sm font-medium">{plan.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={`h-full ${plan.color} transition-all duration-500`}
                        style={{ width: `${plan.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium mb-2">Resumo de Uso</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total de chamadas API</span>
                    <span className="text-sm font-medium">1.2M / 2M</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: '60%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Renovação em 15 dias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
