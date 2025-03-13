
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Shield, 
  Users, 
  Key,
  Mail,
  Smartphone,
  FileText,
  PlusCircle
} from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas preferências e configurações da conta.
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 justify-start items-start space-y-1">
                <TabsTrigger value="profile" className="w-full justify-start px-3">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="account" className="w-full justify-start px-3">
                  <Users className="h-4 w-4 mr-2" />
                  Conta
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start px-3">
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-3">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start px-3">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Faturamento
                </TabsTrigger>
                <TabsTrigger value="api" className="w-full justify-start px-3">
                  <Key className="h-4 w-4 mr-2" />
                  API
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 space-y-6">
              <TabsContent value="profile" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Perfil</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais e como você aparece na plataforma.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">Nome</Label>
                            <Input id="first-name" defaultValue="Ana" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Sobrenome</Label>
                            <Input id="last-name" defaultValue="Silva" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="ana.silva@exemplo.com" />
                          <p className="text-sm text-muted-foreground">
                            Este email será usado para notificações e login.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea 
                            id="bio" 
                            placeholder="Escreva um pouco sobre você..."
                            defaultValue="Gerente de Inovação especializada em soluções de IA para empresas."
                            className="min-h-32"
                          />
                          <p className="text-sm text-muted-foreground">
                            Breve descrição para seu perfil. URLs são permitidas.
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-48 space-y-4">
                        <div className="space-y-2">
                          <Label>Foto de Perfil</Label>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                              <User className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Alterar</Button>
                              <Button size="sm" variant="outline">Remover</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Outros Contatos</CardTitle>
                    <CardDescription>
                      Adicione outros métodos de contato e informações relevantes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2" htmlFor="phone">
                          <Smartphone className="h-4 w-4" />
                          Telefone
                        </Label>
                        <Input id="phone" type="tel" placeholder="+55 (00) 00000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2" htmlFor="website">
                          <Globe className="h-4 w-4" />
                          Website
                        </Label>
                        <Input id="website" type="url" placeholder="https://seusite.com" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Conta</CardTitle>
                    <CardDescription>
                      Gerencie as configurações da sua conta e equipe.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Nome de Usuário</Label>
                      <Input id="username" defaultValue="anasilva" />
                      <p className="text-sm text-muted-foreground">
                        Este é o seu identificador único na plataforma.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" defaultValue="TechInova SA" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Cargo</Label>
                      <Input id="role" defaultValue="Gerente de Inovação" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Conta Multi-Fator</h3>
                          <p className="text-sm text-muted-foreground">
                            Adicione segurança extra com múltiplos usuários gerenciadores.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciamento de Equipe</CardTitle>
                    <CardDescription>
                      Adicione ou remova membros da sua equipe.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div className="space-y-1">
                          <p className="font-medium">ana.silva@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Você (Admin)</p>
                        </div>
                        <Badge>Admin</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between pb-4 border-b">
                        <div className="space-y-1">
                          <p className="font-medium">ricardo@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Ativo</p>
                        </div>
                        <Badge variant="outline">Editor</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">pedro@exemplo.com</p>
                          <p className="text-sm text-muted-foreground">Convidado</p>
                        </div>
                        <Badge variant="outline">Visualizador</Badge>
                      </div>
                      
                      <Button variant="outline" className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Adicionar Membro
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>
                      Proteja sua conta com autenticação avançada.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Autenticação de Dois Fatores (2FA)</h3>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma camada extra de segurança ao seu login.
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Alterar Senha</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Atualizar Senha</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Sessões Ativas</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b">
                          <div className="space-y-1">
                            <p className="font-medium">São Paulo, Brasil</p>
                            <p className="text-sm text-muted-foreground">Chrome • Windows • Agora</p>
                          </div>
                          <Badge>Atual</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="font-medium">Rio de Janeiro, Brasil</p>
                            <p className="text-sm text-muted-foreground">Safari • iOS • 2 dias atrás</p>
                          </div>
                          <Button variant="outline" size="sm">Encerrar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Escolha como e quando quer ser notificado.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="marketing" className="cursor-pointer">Atualizações da Plataforma</Label>
                            <p className="text-sm text-muted-foreground">
                              Receba novidades e atualizações sobre a plataforma.
                            </p>
                          </div>
                          <Switch id="marketing" defaultChecked />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="security" className="cursor-pointer">Alertas de Segurança</Label>
                            <p className="text-sm text-muted-foreground">
                              Receba notificações sobre atividades suspeitas.
                            </p>
                          </div>
                          <Switch id="security" defaultChecked />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="account" className="cursor-pointer">Atualizações da Conta</Label>
                            <p className="text-sm text-muted-foreground">
                              Receba informações sobre alterações em sua conta.
                            </p>
                          </div>
                          <Switch id="account" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Notificações no Aplicativo</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="comments" className="cursor-pointer">Comentários</Label>
                            <p className="text-sm text-muted-foreground">
                              Quando alguém comentar em seus modelos.
                            </p>
                          </div>
                          <Switch id="comments" defaultChecked />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="mentions" className="cursor-pointer">Menções</Label>
                            <p className="text-sm text-muted-foreground">
                              Quando alguém mencionar você em comentários.
                            </p>
                          </div>
                          <Switch id="mentions" defaultChecked />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="usage" className="cursor-pointer">Limites de Uso</Label>
                            <p className="text-sm text-muted-foreground">
                              Quando seus modelos atingirem 80% do limite de uso.
                            </p>
                          </div>
                          <Switch id="usage" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Faturamento</CardTitle>
                    <CardDescription>
                      Gerencie seu plano e métodos de pagamento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Plano Pro</p>
                          <p className="text-sm text-muted-foreground">R$ 149/mês</p>
                        </div>
                        <Button variant="outline">Alterar Plano</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Próxima cobrança em 15/06/2023
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Método de Pagamento</h3>
                      <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Visa •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expira em 12/2024</p>
                        </div>
                        <Button variant="outline">Alterar</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Histórico de Faturas</h3>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Exportar Todas
                        </Button>
                      </div>
                      <div className="divide-y border rounded-lg">
                        {[
                          { date: "15/05/2023", amount: "R$ 149,00", status: "Pago" },
                          { date: "15/04/2023", amount: "R$ 149,00", status: "Pago" },
                          { date: "15/03/2023", amount: "R$ 149,00", status: "Pago" },
                        ].map((invoice, index) => (
                          <div key={index} className="flex justify-between items-center p-4">
                            <div className="space-y-1">
                              <p className="font-medium">{invoice.date}</p>
                              <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="success">{invoice.status}</Badge>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="m-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chaves API</CardTitle>
                    <CardDescription>
                      Gerencie suas chaves de API para integração.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Suas Chaves</h3>
                        <Button size="sm">
                          <Key className="h-4 w-4 mr-2" />
                          Gerar Nova Chave
                        </Button>
                      </div>
                      <div className="divide-y border rounded-lg">
                        <div className="flex justify-between items-center p-4">
                          <div className="space-y-1">
                            <p className="font-medium">Chave de Produção</p>
                            <p className="text-sm text-muted-foreground">
                              <code className="bg-muted px-1 py-0.5 rounded">sk_live_••••••••••••••••••••••••</code>
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Mostrar</Button>
                        </div>
                        <div className="flex justify-between items-center p-4">
                          <div className="space-y-1">
                            <p className="font-medium">Chave de Teste</p>
                            <p className="text-sm text-muted-foreground">
                              <code className="bg-muted px-1 py-0.5 rounded">sk_test_••••••••••••••••••••••••</code>
                            </p>
                          </div>
                          <Button variant="outline" size="sm">Mostrar</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Webhooks</h3>
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">URL do Webhook</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="webhook-url" 
                            placeholder="https://sua-api.com/webhook" 
                            className="flex-1"
                          />
                          <Button variant="outline">Salvar</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações em tempo real sobre eventos na plataforma.
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Logs de API</h3>
                          <p className="text-sm text-muted-foreground">
                            Monitore e depure suas chamadas de API.
                          </p>
                        </div>
                        <Button variant="outline">Ver Logs</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
