
import React, { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  UserPlus,
  Download,
  Filter,
  ArrowUpDown
} from 'lucide-react';

const usersData = [
  { 
    id: 1, 
    name: 'Ana Silva', 
    email: 'ana.silva@exemplo.com', 
    role: 'admin', 
    plan: 'Enterprise', 
    status: 'active',
    lastActive: '2 minutos atrás'
  },
  { 
    id: 2, 
    name: 'Ricardo Martins', 
    email: 'ricardo@exemplo.com', 
    role: 'user', 
    plan: 'Pro', 
    status: 'active',
    lastActive: '1 hora atrás'
  },
  { 
    id: 3, 
    name: 'Camila Costa', 
    email: 'camila@exemplo.com', 
    role: 'user', 
    plan: 'Basic', 
    status: 'inactive',
    lastActive: '3 dias atrás'
  },
  { 
    id: 4, 
    name: 'Pedro Alves', 
    email: 'pedro@exemplo.com', 
    role: 'manager', 
    plan: 'Pro', 
    status: 'active',
    lastActive: 'Agora'
  },
  { 
    id: 5, 
    name: 'Julia Santos', 
    email: 'julia@exemplo.com', 
    role: 'user', 
    plan: 'Basic', 
    status: 'pending',
    lastActive: '1 semana atrás'
  },
  { 
    id: 6, 
    name: 'Marcos Oliveira', 
    email: 'marcos@exemplo.com', 
    role: 'user', 
    plan: 'Enterprise', 
    status: 'active',
    lastActive: '5 horas atrás'
  },
  { 
    id: 7, 
    name: 'Fernanda Lima', 
    email: 'fernanda@exemplo.com', 
    role: 'manager', 
    plan: 'Pro', 
    status: 'active',
    lastActive: '2 dias atrás'
  },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const planColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Pro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  const roleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'manager': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    }
  };
  
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Ativo' },
    inactive: { variant: 'danger' as const, label: 'Inativo' },
    pending: { variant: 'warning' as const, label: 'Pendente' },
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie usuários e suas permissões na plataforma.
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Usuário
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Todos os Usuários</CardTitle>
            <CardDescription>
              Total de {usersData.length} usuários na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuários..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3 px-4 font-medium">
                      <div className="flex items-center">
                        Nome
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium">Email</th>
                    <th className="py-3 px-4 font-medium">Função</th>
                    <th className="py-3 px-4 font-medium">Plano</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Último acesso</th>
                    <th className="py-3 px-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColor(user.role)}`}>
                          {user.role === 'admin' ? 'Admin' : 
                           user.role === 'manager' ? 'Gerente' : 'Usuário'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${planColor(user.plan)}`}>
                          {user.plan}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusConfig[user.status as keyof typeof statusConfig].variant}>
                          {statusConfig[user.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {user.lastActive}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredUsers.length} de {usersData.length} usuários
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
