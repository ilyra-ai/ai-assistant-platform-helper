
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Check, Plus, Edit, Trash2, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Plans = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Planos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie planos e preços para seus usuários.
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Plano
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6">
            <TabsTrigger value="plans">Planos</TabsTrigger>
            <TabsTrigger value="analytics">Análise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Básico",
                  price: "R$ 49",
                  period: "mês",
                  description: "Ideal para pequenas empresas e startups",
                  features: [
                    "Até 5 assistentes",
                    "100.000 mensagens por mês",
                    "Acesso à API básica",
                    "Suporte por email",
                    "Modelos padrão"
                  ],
                  popular: false,
                  usersCount: 1145,
                  trend: { value: 8.5, positive: true }
                },
                {
                  id: 2,
                  name: "Pro",
                  price: "R$ 149",
                  period: "mês",
                  description: "Perfeito para equipes em crescimento",
                  features: [
                    "Até 20 assistentes",
                    "500.000 mensagens por mês",
                    "Acesso à API completa",
                    "Suporte prioritário",
                    "Modelos avançados",
                    "Personalização de marca",
                    "Analytics avançados"
                  ],
                  popular: true,
                  usersCount: 814,
                  trend: { value: 12.3, positive: true }
                },
                {
                  id: 3,
                  name: "Enterprise",
                  price: "R$ 499",
                  period: "mês",
                  description: "Para empresas que precisam de escala",
                  features: [
                    "Assistentes ilimitados",
                    "Mensagens ilimitadas",
                    "API com alta disponibilidade",
                    "Suporte 24/7",
                    "Todos os modelos disponíveis",
                    "Customização total",
                    "Analytics em tempo real",
                    "Modelos de IA personalizados",
                    "SLA garantido"
                  ],
                  popular: false,
                  usersCount: 584,
                  trend: { value: 6.7, positive: true }
                }
              ].map((plan) => (
                <Card key={plan.id} className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
                  plan.popular ? 'border-primary ring-1 ring-primary ring-opacity-60' : ''
                }`}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1">
                      Mais Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.popular ? "Selecionar Plano" : "Ver Detalhes"}
                    </Button>
                    <div className="flex justify-between items-center w-full text-sm">
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-muted-foreground">{plan.usersCount} usuários</span>
                      </div>
                      <span className={`flex items-center ${
                        plan.trend.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {plan.trend.positive ? '↑' : '↓'} {plan.trend.value}%
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recursos por Plano</CardTitle>
                <CardDescription>Comparação detalhada entre os planos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Recurso</th>
                        <th className="text-center py-3 px-4 font-medium">Básico</th>
                        <th className="text-center py-3 px-4 font-medium">Pro</th>
                        <th className="text-center py-3 px-4 font-medium">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { feature: "Assistentes", basic: "5", pro: "20", enterprise: "Ilimitado" },
                        { feature: "Mensagens/mês", basic: "100K", pro: "500K", enterprise: "Ilimitado" },
                        { feature: "Modelos de IA", basic: "Padrão", pro: "Avançados", enterprise: "Todos + Personalizados" },
                        { feature: "Suporte", basic: "Email", pro: "Prioritário", enterprise: "24/7 com SLA" },
                        { feature: "Analytics", basic: "Básico", pro: "Avançado", enterprise: "Em tempo real" },
                        { feature: "Personalização", basic: "Limitada", pro: "Extensa", enterprise: "Total" },
                        { feature: "API", basic: "Básica", pro: "Completa", enterprise: "Alta disponibilidade" },
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 font-medium">{row.feature}</td>
                          <td className="py-3 px-4 text-center">{row.basic}</td>
                          <td className="py-3 px-4 text-center">{row.pro}</td>
                          <td className="py-3 px-4 text-center">{row.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Receita Mensal", value: "R$ 45.280", trend: { value: 12.5, positive: true } },
                { title: "Plano Mais Popular", value: "Pro", description: "42% dos usuários" },
                { title: "Taxa de Conversão", value: "24.8%", trend: { value: 3.2, positive: true } },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
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
                      {stat.description && (
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Plano</CardTitle>
                <CardDescription>Análise de desempenho e conversão dos planos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Básico", percentage: 45, count: 1145, revenue: "R$ 56.105", color: "bg-blue-500" },
                    { name: "Pro", percentage: 32, count: 814, revenue: "R$ 121.286", color: "bg-indigo-500" },
                    { name: "Enterprise", percentage: 23, count: 584, revenue: "R$ 291.416", color: "bg-violet-500" },
                  ].map((plan) => (
                    <div key={plan.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full ${plan.color} mr-2`} />
                          <span className="text-sm font-medium">{plan.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{plan.count} usuários</Badge>
                          <span className="text-sm font-medium">{plan.revenue}</span>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Plans;
