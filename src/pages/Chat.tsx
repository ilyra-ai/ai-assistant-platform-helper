import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { db, Conversation, Message, Model } from '@/lib/db';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { 
  MessageSquare, 
  Settings,
  PanelLeft, 
  Loader2,
  Bot,
  RefreshCw,
  Sparkles,
  Info,
  Plus
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Chat = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  
  // Estado
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  
  // Ref para rolagem automática
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Carrega dados iniciais
  useEffect(() => {
    // Carregar modelos
    const availableModels = db.getModels().filter(m => m.status === 'active');
    setModels(availableModels);
    
    // Carregar conversas
    const userConversations = db.getConversations();
    setConversations(userConversations);
    
    // Se um modelId foi fornecido na URL, cria uma nova conversa
    if (modelId) {
      const selectedModel = availableModels.find(m => m.id === parseInt(modelId));
      if (selectedModel) {
        createNewConversation(parseInt(modelId));
      }
    } 
    // Caso contrário, verifica se já existe alguma conversa
    else if (userConversations.length > 0) {
      loadConversation(userConversations[0].id);
    }
  }, [modelId]);
  
  // Rolagem automática quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Carrega uma conversa existente
  const loadConversation = (conversationId: number) => {
    const conversation = db.getConversationById(conversationId);
    if (conversation) {
      setActiveConversation(conversation);
      setConversationTitle(conversation.title);
      const conversationMessages = db.getMessagesByConversationId(conversationId);
      setMessages(conversationMessages);
      
      // Atualiza a URL
      navigate(`/chat`);
    }
  };
  
  // Cria uma nova conversa
  const createNewConversation = (modelId?: number) => {
    // Se nenhum modelo foi especificado, usa o primeiro disponível
    const selectedModelId = modelId || models[0]?.id;
    
    if (!selectedModelId) {
      toast.error('Nenhum modelo disponível');
      return;
    }
    
    const selectedModel = db.getModelById(selectedModelId);
    
    const newConversation: Omit<Conversation, 'id'> = {
      title: `Nova conversa com ${selectedModel?.name || 'modelo desconhecido'}`,
      modelId: selectedModelId,
      userId: 1, // Usuário fixo para demonstração
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const createdConversation = db.createConversation(newConversation);
    setConversations([...conversations, createdConversation]);
    setActiveConversation(createdConversation);
    setConversationTitle(createdConversation.title);
    setMessages([]);
    
    // Atualiza a URL
    navigate(`/chat`);
    
    // Mensagem de boas-vindas
    const welcomeMessage: Omit<Message, 'id'> = {
      conversationId: createdConversation.id,
      content: `Olá! Sou o assistente baseado no modelo ${selectedModel?.name}. Como posso ajudar você hoje?`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      modelId: selectedModelId
    };
    
    const createdMessage = db.createMessage(welcomeMessage);
    setMessages([createdMessage]);
  };
  
  // Exclui uma conversa
  const deleteConversation = (conversationId: number) => {
    db.deleteConversation(conversationId);
    const updatedConversations = conversations.filter(c => c.id !== conversationId);
    setConversations(updatedConversations);
    
    // Se a conversa ativa foi excluída, carrega outra ou limpa
    if (activeConversation?.id === conversationId) {
      if (updatedConversations.length > 0) {
        loadConversation(updatedConversations[0].id);
      } else {
        setActiveConversation(null);
        setMessages([]);
      }
    }
    
    toast.success('Conversa excluída');
  };
  
  // Envia uma nova mensagem
  const handleSendMessage = (content: string) => {
    if (!activeConversation) {
      toast.error('Nenhuma conversa ativa');
      return;
    }
    
    // Adiciona a mensagem do usuário
    const userMessage: Omit<Message, 'id'> = {
      conversationId: activeConversation.id,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
      modelId: activeConversation.modelId
    };
    
    const createdUserMessage = db.createMessage(userMessage);
    setMessages([...messages, createdUserMessage]);
    
    // Simula resposta do assistente
    setIsLoading(true);
    
    // Atualiza a lista de conversas
    const updatedConversation = db.getConversationById(activeConversation.id);
    if (updatedConversation) {
      setConversations(conversations.map(c => 
        c.id === updatedConversation.id ? updatedConversation : c
      ));
    }
    
    // Gera resposta simulada após um breve atraso
    setTimeout(() => {
      const selectedModel = db.getModelById(activeConversation.modelId);
      
      let responseContent = '';
      
      // Conteúdo diferente baseado no tipo de modelo
      switch (selectedModel?.type) {
        case 'text':
          responseContent = generateTextResponse(content);
          break;
        case 'image':
          responseContent = "Aqui está a imagem que você solicitou: [Imagem gerada baseada na sua descrição]";
          break;
        case 'voice':
          responseContent = "Mensagem de voz processada. Aqui está minha resposta em texto.";
          break;
        case 'multimodal':
          responseContent = "Processado seu conteúdo combinado de texto e mídia. Aqui está minha resposta.";
          break;
        default:
          responseContent = "Não foi possível determinar o tipo de modelo para gerar uma resposta adequada.";
      }
      
      const assistantMessage: Omit<Message, 'id'> = {
        conversationId: activeConversation.id,
        content: responseContent,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        modelId: activeConversation.modelId
      };
      
      const createdAssistantMessage = db.createMessage(assistantMessage);
      setMessages([...messages, createdUserMessage, createdAssistantMessage]);
      setIsLoading(false);
      
      // Atualiza novamente a lista de conversas
      const updatedConversation = db.getConversationById(activeConversation.id);
      if (updatedConversation) {
        setConversations(conversations.map(c => 
          c.id === updatedConversation.id ? updatedConversation : c
        ));
      }
    }, 1500);
  };
  
  // Gera uma resposta de texto simulada
  const generateTextResponse = (userMessage: string) => {
    // Respostas simples para demonstração
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hey')) {
      return "Olá! Como posso ajudar você hoje?";
    }
    
    if (lowerMessage.includes('como vai') || lowerMessage.includes('tudo bem')) {
      return "Estou funcionando perfeitamente, obrigado por perguntar! Como posso ser útil para você?";
    }
    
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada')) {
      return "Foi um prazer ajudar! Se precisar de mais alguma coisa, estou à disposição.";
    }
    
    if (lowerMessage.includes('ajuda') || lowerMessage.includes('ajudar')) {
      return "Claro, estou aqui para ajudar! Por favor, me diga mais especificamente o que você precisa.";
    }
    
    if (lowerMessage.includes('código') || lowerMessage.includes('programar') || lowerMessage.includes('javascript')) {
      return "Aqui está um exemplo de código JavaScript para uma função simples:\n\n```javascript\nfunction somar(a, b) {\n  return a + b;\n}\n\nconst resultado = somar(5, 3);\nconsole.log(resultado); // 8\n```\n\nEspero que isso ajude! Posso explicar mais detalhadamente se necessário.";
    }
    
    // Resposta genérica para outros casos
    return "Entendi sua mensagem. Como assistente de IA, estou aqui para fornecer informações e ajudar com suas dúvidas. Por favor, me diga como posso ser útil para você.";
  };
  
  // Atualiza o título da conversa
  const updateConversationTitle = () => {
    if (!activeConversation) return;
    
    db.updateConversation(activeConversation.id, { title: conversationTitle });
    setConversations(conversations.map(c => 
      c.id === activeConversation.id ? { ...c, title: conversationTitle } : c
    ));
    setEditingTitle(false);
    
    toast.success('Título atualizado');
  };
  
  // Altera o modelo da conversa ativa
  const handleModelChange = (modelId: number) => {
    if (!activeConversation) return;
    
    db.updateConversation(activeConversation.id, { modelId });
    setActiveConversation({ ...activeConversation, modelId });
    
    const selectedModel = db.getModelById(modelId);
    
    // Mensagem de transição
    const transitionMessage: Omit<Message, 'id'> = {
      conversationId: activeConversation.id,
      content: `Modelo alterado para ${selectedModel?.name}. Como posso ajudar você?`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      modelId: modelId
    };
    
    const createdMessage = db.createMessage(transitionMessage);
    setMessages([...messages, createdMessage]);
    
    toast.success(`Modelo alterado para ${selectedModel?.name}`);
  };
  
  // Obtém o modelo ativo
  const activeModel = activeConversation 
    ? models.find(m => m.id === activeConversation.modelId)
    : null;
  
  return (
    <ChatLayout>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="border-b p-4 flex items-center justify-between bg-background z-10">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2 md:hidden"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              <h1 className="text-xl font-bold tracking-tight">Chat AI</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => createNewConversation(activeModel?.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Conversa
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className={cn(
              "border-r bg-muted/40 w-64 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden",
              sidebarOpen ? "md:block" : "hidden",
            )}
          >
            <ConversationList
              conversations={conversations}
              models={models}
              activeConversationId={activeConversation?.id}
              onSelectConversation={loadConversation}
              onCreateConversation={() => createNewConversation()}
              onDeleteConversation={deleteConversation}
            />
          </div>
          
          {/* Área de mensagens */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeConversation ? (
              <>
                {/* Barra do modelo selecionado */}
                <div className="border-b p-3 bg-background flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 max-w-screen-md mx-auto w-full px-4">
                    {editingTitle ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={conversationTitle}
                          onChange={(e) => setConversationTitle(e.target.value)}
                          className="h-8"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateConversationTitle();
                            }
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          onClick={updateConversationTitle}
                          className="h-8"
                        >
                          Salvar
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => setEditingTitle(true)}
                        title="Clique para editar"
                      >
                        {conversationTitle}
                      </div>
                    )}
                    
                    <div className="w-48 ml-auto">
                      <ModelSelector
                        models={models}
                        selectedModelId={activeConversation.modelId}
                        onSelectModel={handleModelChange}
                      />
                    </div>
                  </div>
                </div>
              
                {/* Lista de mensagens */}
                <div className="flex-1 overflow-y-auto bg-background">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">
                        Comece uma conversa
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md mb-4">
                        Este assistente está pronto para responder suas perguntas e ajudar com suas tarefas.
                      </p>
                    </div>
                  ) : (
                    <>
                      {messages.map((message, index) => (
                        <ChatMessage 
                          key={message.id} 
                          message={message}
                          isLastMessage={index === messages.length - 1}
                        />
                      ))}
                      {isLoading && (
                        <div className="py-6 px-4 md:px-8">
                          <div className="max-w-screen-md mx-auto flex items-center">
                            <div className="h-8 w-8 flex-shrink-0 mr-4"></div>
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
                
                {/* Entrada de mensagem */}
                <div className="px-4 py-4 bg-background border-t">
                  <ChatInput 
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    modelType={activeModel?.type}
                  />
                </div>
              </>
            ) : (
              // Estado vazio - nenhuma conversa selecionada
              <div className="flex flex-col items-center justify-center h-full p-8 bg-muted/10">
                <div className="max-w-md text-center">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Chat</h2>
                  <p className="text-muted-foreground mb-6">
                    Selecione uma conversa existente ou inicie uma nova para começar a interagir com nossos modelos de IA.
                  </p>
                  
                  <Card className="mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Modelos Disponíveis</CardTitle>
                      <CardDescription>
                        Escolha um dos nossos modelos especializados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {models.slice(0, 4).map(model => (
                          <Card 
                            key={model.id}
                            className="cursor-pointer hover:bg-accent transition-colors"
                            onClick={() => createNewConversation(model.id)}
                          >
                            <CardContent className="p-4 flex flex-col gap-2">
                              <div className="font-medium text-sm">{model.name}</div>
                              <Badge variant="outline" className="w-fit">
                                {model.type}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => createNewConversation()}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Nova Conversa
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>As respostas são simuladas para fins de demonstração</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
