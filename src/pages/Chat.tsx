import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { db, Conversation, Message, Model } from '@/lib/db';
import { ChatLayout } from '@/components/layout/ChatLayout';
import { toast } from 'sonner';

const Chat = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const availableModels = db.getModels().filter(m => m.status === 'active');
    setModels(availableModels);
    
    const userConversations = db.getConversations();
    
    if (modelId) {
      const selectedModel = availableModels.find(m => m.id === parseInt(modelId));
      if (selectedModel) {
        createNewConversation(parseInt(modelId));
      }
    } else if (userConversations.length > 0) {
      loadConversation(userConversations[0].id);
    } else {
      // Set up an empty conversation with welcome message
      setMessages([
        {
          id: 0,
          conversationId: 0,
          content: "Como posso ajudar?",
          role: 'assistant',
          timestamp: new Date().toISOString(),
          modelId: 1
        }
      ]);
    }
  }, [modelId]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const loadConversation = (conversationId: number) => {
    const conversation = db.getConversationById(conversationId);
    if (conversation) {
      setActiveConversation(conversation);
      const conversationMessages = db.getMessagesByConversationId(conversationId);
      setMessages(conversationMessages);
      
      navigate(`/chat`);
    }
  };
  
  const createNewConversation = (modelId?: number) => {
    const selectedModelId = modelId || models[0]?.id;
    
    if (!selectedModelId) {
      toast.error('Nenhum modelo disponível');
      return;
    }
    
    const selectedModel = db.getModelById(selectedModelId);
    
    const newConversation: Omit<Conversation, 'id'> = {
      title: `Nova conversa com ${selectedModel?.name || 'modelo desconhecido'}`,
      modelId: selectedModelId,
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const createdConversation = db.createConversation(newConversation);
    setActiveConversation(createdConversation);
    
    navigate(`/chat`);
    
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
  
  const handleSendMessage = (content: string) => {
    if (!activeConversation) {
      // Create a new conversation if none exists
      const defaultModelId = models.length > 0 ? models[0].id : 1;
      createNewConversation(defaultModelId);
      setTimeout(() => handleSendMessage(content), 100);
      return;
    }
    
    const userMessage: Omit<Message, 'id'> = {
      conversationId: activeConversation.id,
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
      modelId: activeConversation.modelId
    };
    
    const createdUserMessage = db.createMessage(userMessage);
    setMessages([...messages, createdUserMessage]);
    
    setIsLoading(true);
    
    const updatedConversation = db.getConversationById(activeConversation.id);
    if (updatedConversation) {
    }
    
    setTimeout(() => {
      const selectedModel = db.getModelById(activeConversation.modelId);
      
      let responseContent = '';
      
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
      
      const updatedConversation = db.getConversationById(activeConversation.id);
      if (updatedConversation) {
      }
    }, 1500);
  };
  
  const generateTextResponse = (userMessage: string) => {
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
    
    return "Entendi sua mensagem. Como assistente de IA, estou aqui para fornecer informações e ajudar com suas dúvidas. Por favor, me diga como posso ser útil para você.";
  };
  
  return (
    <ChatLayout>
      <div className="flex flex-col h-screen overflow-y-auto bg-white">
        <div className="flex-1 h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h3 className="text-3xl font-medium mb-6 text-gray-800">
                Como posso ajudar?
              </h3>
            </div>
          ) : (
            <div className="py-4">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  isLastMessage={index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 p-4 bg-white">
          <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            modelType="text"
          />
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;
