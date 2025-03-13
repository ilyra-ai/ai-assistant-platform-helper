
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cog, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Add parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleStartNow = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" />
        
        <div 
          ref={heroRef}
          className="absolute inset-0 opacity-70 dark:opacity-30"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M1 1H19V19" stroke="%237C8DB0" stroke-width="0.2" stroke-dasharray="1 3" stroke-linecap="round"/%3E%3C/svg%3E")',
            backgroundSize: '30px 30px',
          }}
        />
        
        <div className="container mx-auto px-6 relative">
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Cog className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold">AI Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate('/dashboard')}
              >
                Entrar
              </Button>
            </div>
          </nav>
          
          <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-block mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Inovação em Inteligência Artificial
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              A Plataforma de Assistentes AI mais 
              <span className="text-primary relative ml-2">
                Avançada
                <svg className="absolute inset-x-0 bottom-0 h-2 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0 10 Q 50 0 100 10 V 20 H 0 Z"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Gerencie assistentes e chatbots com total controle dos modelos, usuários e planos em uma única plataforma.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
                onClick={handleStartNow}
              >
                Começar Agora
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-6 text-lg transition-all duration-300"
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating gradient orbs for visual effect */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </header>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos Poderosos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para gerenciar assistentes de AI de forma eficiente
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gestão de Usuários",
                description: "Controle total sobre usuários, permissões e acesso aos recursos da plataforma.",
                icon: "👥"
              },
              {
                title: "Gestão de Planos",
                description: "Configure planos e preços flexíveis para diferentes necessidades e orçamentos.",
                icon: "💰"
              },
              {
                title: "Gestão de Modelos AI",
                description: "Integre e gerencie diversos modelos de IA com facilidade e eficiência.",
                icon: "🤖"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-lg shadow-sm animate-on-scroll"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll">
            Pronto para revolucionar seus assistentes AI?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-on-scroll">
            Entre agora e comece a aproveitar todo o potencial da nossa plataforma
          </p>
          <Button 
            size="lg"
            className="px-8 py-6 text-lg animate-on-scroll transition-all duration-300 transform hover:scale-105"
            onClick={handleStartNow}
          >
            Acessar Dashboard
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Cog className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">AI Platform</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Platform. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
