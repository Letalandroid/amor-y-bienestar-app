
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'specialist';
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el Dr. García, especialista en salud sexual. ¿En qué puedo ayudarte hoy? Recuerda que esta conversación es completamente confidencial.',
      sender: 'specialist',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate specialist response
    setTimeout(() => {
      const responses = [
        "Gracias por tu pregunta. Es muy importante que hables sobre estos temas.",
        "Entiendo tu preocupación. Déjame explicarte...",
        "Es normal tener estas dudas. Te recomiendo...",
        "Para poder ayudarte mejor, ¿podrías darme más detalles?"
      ];
      
      const specialistResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'specialist',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, specialistResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/menu")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Menú
        </Button>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gradient mb-2">Chat Anónimo</h1>
            <p className="text-gray-600">Consulta con especialistas en salud sexual</p>
          </div>

          <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-lg">Tu privacidad es importante</h3>
              </div>
              <p className="text-gray-700">
                Esta conversación es completamente confidencial y anónima. 
                Nuestros especialistas están aquí para ayudarte sin juzgar.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-pink-600" />
                <div>
                  <CardTitle>Dr. García - Especialista en Salud Sexual</CardTitle>
                  <CardDescription>En línea</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} className="gradient-primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
