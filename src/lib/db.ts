
// Simulação de banco de dados MySQL
// Em uma implementação real, isso seria substituído por uma API que se comunica com MySQL

// Tipos
export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive' | 'pending';
  planId: number;
  createdAt: string;
  lastActive: string;
  avatarUrl?: string;
};

export type Model = {
  id: number;
  name: string;
  description: string;
  type: 'text' | 'image' | 'voice' | 'multimodal';
  status: 'active' | 'inactive' | 'pending';
  category: string;
  usage: { current: number; total: number };
  lastUpdated: string;
  settings?: Record<string, any>;
  createdBy: number;
};

export type Message = {
  id: number;
  conversationId: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  modelId: number;
};

export type Conversation = {
  id: number;
  title: string;
  modelId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type Plan = {
  id: number;
  name: string;
  price: number;
  features: string[];
  limits: Record<string, number>;
  active: boolean;
};

// Dados iniciais
const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    planId: 3,
    createdAt: '2023-01-15T08:30:00Z',
    lastActive: new Date().toISOString(),
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 2,
    name: 'Maria Silva',
    email: 'maria@example.com',
    role: 'manager',
    status: 'active',
    planId: 2,
    createdAt: '2023-03-10T14:15:00Z',
    lastActive: '2023-06-15T09:45:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
  },
  {
    id: 3,
    name: 'João Pereira',
    email: 'joao@example.com',
    role: 'user',
    status: 'inactive',
    planId: 1,
    createdAt: '2023-04-22T11:30:00Z',
    lastActive: '2023-05-01T16:20:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao'
  }
];

// Usando os mesmos modelos que já definimos no código existente
const models: Model[] = [
  {
    id: 1,
    name: "GPT Assistant Pro",
    description: "Modelo conversacional avançado para suporte ao cliente",
    type: "text",
    status: "active",
    usage: { current: 1250, total: 2000 },
    lastUpdated: "Hoje às 10:30",
    category: "chatbot",
    createdBy: 1
  },
  {
    id: 2,
    name: "Image Generator",
    description: "Gerador de imagens a partir de descrição textual",
    type: "image",
    status: "active",
    usage: { current: 450, total: 1000 },
    lastUpdated: "Ontem às 15:45",
    category: "creation",
    createdBy: 1
  },
  {
    id: 3,
    name: "Voice Assistant",
    description: "Assistente de voz para sistemas integrados",
    type: "voice",
    status: "pending",
    usage: { current: 120, total: 500 },
    lastUpdated: "2 dias atrás",
    category: "assistant",
    createdBy: 2
  },
  {
    id: 4,
    name: "Customer Support",
    description: "Especializado em atendimento ao cliente para e-commerce",
    type: "text",
    status: "active",
    usage: { current: 890, total: 1500 },
    lastUpdated: "3 horas atrás",
    category: "chatbot",
    createdBy: 1
  },
  {
    id: 5,
    name: "Code Assistant",
    description: "Ajuda desenvolvedores a escrever e depurar código",
    type: "text",
    status: "active",
    usage: { current: 720, total: 1000 },
    lastUpdated: "1 dia atrás",
    category: "assistant",
    createdBy: 2
  },
  {
    id: 6,
    name: "Multimodal Assistant",
    description: "Combina processamento de texto, imagem e voz",
    type: "multimodal",
    status: "inactive",
    usage: { current: 50, total: 500 },
    lastUpdated: "1 semana atrás",
    category: "assistant",
    createdBy: 1
  },
];

const conversations: Conversation[] = [
  {
    id: 1,
    title: "Suporte ao cliente",
    modelId: 1,
    userId: 1,
    createdAt: "2023-06-10T09:30:00Z",
    updatedAt: "2023-06-10T10:15:00Z"
  },
  {
    id: 2,
    title: "Geração de imagens",
    modelId: 2,
    userId: 2,
    createdAt: "2023-06-11T14:20:00Z",
    updatedAt: "2023-06-11T14:45:00Z"
  },
  {
    id: 3,
    title: "Assistente de código",
    modelId: 5,
    userId: 1,
    createdAt: "2023-06-12T16:10:00Z",
    updatedAt: "2023-06-12T16:30:00Z"
  }
];

const messages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    content: "Olá, preciso de ajuda com meu pedido #12345",
    role: "user",
    timestamp: "2023-06-10T09:30:00Z",
    modelId: 1
  },
  {
    id: 2,
    conversationId: 1,
    content: "Claro, vou verificar o status do seu pedido #12345. Um momento por favor.",
    role: "assistant",
    timestamp: "2023-06-10T09:30:15Z",
    modelId: 1
  },
  {
    id: 3,
    conversationId: 1,
    content: "Seu pedido está em fase de separação e deve ser enviado nas próximas 24 horas.",
    role: "assistant",
    timestamp: "2023-06-10T09:30:30Z",
    modelId: 1
  },
  {
    id: 4,
    conversationId: 2,
    content: "Gere uma imagem de um gato usando um chapéu de cowboy",
    role: "user",
    timestamp: "2023-06-11T14:20:00Z",
    modelId: 2
  },
  {
    id: 5,
    conversationId: 2,
    content: "[Imagem gerada: Gato com chapéu de cowboy]",
    role: "assistant",
    timestamp: "2023-06-11T14:20:10Z",
    modelId: 2
  },
  {
    id: 6,
    conversationId: 3,
    content: "Como faço para ordenar um array em JavaScript?",
    role: "user",
    timestamp: "2023-06-12T16:10:00Z",
    modelId: 5
  },
  {
    id: 7,
    conversationId: 3,
    content: "Você pode usar o método `.sort()` para ordenar um array em JavaScript. Por exemplo:\n\n```javascript\nconst array = [3, 1, 4, 1, 5];\narray.sort((a, b) => a - b);\nconsole.log(array); // [1, 1, 3, 4, 5]\n```\n\nPara ordenar strings, você pode simplesmente usar `.sort()` sem parâmetros.",
    role: "assistant",
    timestamp: "2023-06-12T16:10:15Z",
    modelId: 5
  }
];

const plans: Plan[] = [
  {
    id: 1,
    name: "Básico",
    price: 29.99,
    features: ["Acesso a modelos de texto", "Limite de 1000 mensagens/mês", "Suporte por email"],
    limits: { messages: 1000, models: 2 },
    active: true
  },
  {
    id: 2,
    name: "Pro",
    price: 99.99,
    features: ["Todos os recursos do plano Básico", "Acesso a modelos de imagem", "Limite de 5000 mensagens/mês", "Suporte prioritário"],
    limits: { messages: 5000, models: 5 },
    active: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: 299.99,
    features: ["Todos os recursos do plano Pro", "Acesso a todos os modelos", "Mensagens ilimitadas", "Suporte 24/7", "API dedicada"],
    limits: { messages: -1, models: -1 },
    active: true
  }
];

// Funções simuladas de banco de dados
let nextUserId = users.length + 1;
let nextModelId = models.length + 1;
let nextConversationId = conversations.length + 1;
let nextMessageId = messages.length + 1;

// API simulada
export const db = {
  // Usuários
  getUsers: () => [...users],
  getUserById: (id: number) => users.find(u => u.id === id),
  createUser: (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: nextUserId++ };
    users.push(newUser);
    return newUser;
  },
  updateUser: (id: number, data: Partial<User>) => {
    const index = users.findIndex(u => u.id === id);
    if (index >= 0) {
      users[index] = { ...users[index], ...data };
      return users[index];
    }
    return null;
  },
  deleteUser: (id: number) => {
    const index = users.findIndex(u => u.id === id);
    if (index >= 0) {
      const deleted = users[index];
      users.splice(index, 1);
      return deleted;
    }
    return null;
  },

  // Modelos
  getModels: () => [...models],
  getModelById: (id: number) => models.find(m => m.id === id),
  createModel: (model: Omit<Model, 'id'>) => {
    const newModel = { ...model, id: nextModelId++ };
    models.push(newModel);
    return newModel;
  },
  updateModel: (id: number, data: Partial<Model>) => {
    const index = models.findIndex(m => m.id === id);
    if (index >= 0) {
      models[index] = { ...models[index], ...data };
      return models[index];
    }
    return null;
  },
  deleteModel: (id: number) => {
    const index = models.findIndex(m => m.id === id);
    if (index >= 0) {
      const deleted = models[index];
      models.splice(index, 1);
      return deleted;
    }
    return null;
  },

  // Conversas
  getConversations: () => [...conversations],
  getConversationsByUserId: (userId: number) => 
    conversations.filter(c => c.userId === userId),
  getConversationById: (id: number) => 
    conversations.find(c => c.id === id),
  createConversation: (conversation: Omit<Conversation, 'id'>) => {
    const newConversation = { ...conversation, id: nextConversationId++ };
    conversations.push(newConversation);
    return newConversation;
  },
  updateConversation: (id: number, data: Partial<Conversation>) => {
    const index = conversations.findIndex(c => c.id === id);
    if (index >= 0) {
      conversations[index] = { ...conversations[index], ...data };
      return conversations[index];
    }
    return null;
  },
  deleteConversation: (id: number) => {
    const index = conversations.findIndex(c => c.id === id);
    if (index >= 0) {
      const deleted = conversations[index];
      conversations.splice(index, 1);
      // Também excluir mensagens associadas
      const messagesToDelete = messages.filter(m => m.conversationId === id);
      messagesToDelete.forEach(m => {
        const msgIndex = messages.findIndex(msg => msg.id === m.id);
        if (msgIndex >= 0) {
          messages.splice(msgIndex, 1);
        }
      });
      return deleted;
    }
    return null;
  },

  // Mensagens
  getMessages: () => [...messages],
  getMessagesByConversationId: (conversationId: number) => 
    messages.filter(m => m.conversationId === conversationId),
  getMessageById: (id: number) => 
    messages.find(m => m.id === id),
  createMessage: (message: Omit<Message, 'id'>) => {
    const newMessage = { ...message, id: nextMessageId++ };
    messages.push(newMessage);
    
    // Atualizar a data da última atualização da conversa
    const conversationIndex = conversations.findIndex(c => c.id === message.conversationId);
    if (conversationIndex >= 0) {
      conversations[conversationIndex].updatedAt = new Date().toISOString();
    }
    
    return newMessage;
  },

  // Planos
  getPlans: () => [...plans],
  getPlanById: (id: number) => plans.find(p => p.id === id),

  // Estatísticas
  getStats: () => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalModels: models.length,
      activeModels: models.filter(m => m.status === 'active').length,
      totalConversations: conversations.length,
      totalMessages: messages.length,
      messagesByModel: models.map(model => ({
        modelId: model.id,
        modelName: model.name,
        messagesCount: messages.filter(m => m.modelId === model.id).length
      })),
      usersByPlan: plans.map(plan => ({
        planId: plan.id,
        planName: plan.name,
        usersCount: users.filter(u => u.planId === plan.id).length
      }))
    };
  }
};
