
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Shield, 
  Heart, 
  HelpCircle, 
  MessageCircle, 
  MapPin, 
  Brain, 
  Bell,
  Play,
  BookMarked,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const MainMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
    navigate("/");
  };

  const menuItems = [
    {
      title: "Educación Sexual",
      description: "Aprende sobre sexualidad de forma clara y científica",
      icon: BookOpen,
      path: "/education",
      color: "bg-blue-500",
    },
    {
      title: "Métodos Anticonceptivos",
      description: "Información sobre diferentes métodos de prevención",
      icon: Shield,
      path: "/contraceptives",
      color: "bg-green-500",
    },
    {
      title: "ITS - Infecciones de Transmisión Sexual",
      description: "Prevención, síntomas y tratamiento",
      icon: Heart,
      path: "/stis",
      color: "bg-red-500",
    },
    {
      title: "Preguntas Frecuentes",
      description: "Respuestas a las dudas más comunes",
      icon: HelpCircle,
      path: "/faq",
      color: "bg-yellow-500",
    },
    {
      title: "Chat Anónimo",
      description: "Habla con un especialista de forma confidencial",
      icon: MessageCircle,
      path: "/chat",
      color: "bg-purple-500",
    },
    {
      title: "Centros de Salud",
      description: "Encuentra centros de salud cercanos",
      icon: MapPin,
      path: "/map",
      color: "bg-indigo-500",
    },
    {
      title: "Test Interactivo",
      description: "Pon a prueba tus conocimientos",
      icon: Brain,
      path: "/test",
      color: "bg-pink-500",
    },
    {
      title: "Recordatorios",
      description: "Configura recordatorios para tu cuidado",
      icon: Bell,
      path: "/reminders",
      color: "bg-orange-500",
    },
    {
      title: "Multimedia",
      description: "Videos, podcasts y juegos educativos",
      icon: Play,
      path: "/multimedia",
      color: "bg-teal-500",
    },
    {
      title: "Mi Diario Privado",
      description: "Espacio personal para tus pensamientos y emociones",
      icon: BookMarked,
      path: "/diary",
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">CuidaTe</h1>
              <p className="text-gray-600">
                {user?.isAnonymous ? "Usuario Anónimo" : `Hola, ${user?.email || "Usuario"}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {!user?.isAnonymous && (
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Mi Perfil
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
        <Card className="mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">¡Bienvenido/a a tu espacio seguro!</CardTitle>
            <CardDescription className="text-center">
              Aquí encontrarás información confiable, herramientas útiles y apoyo para cuidar tu salud sexual. 
              Todo en un ambiente respetuoso y sin juicios. 💖
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.path}
                className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            Tu salud sexual importa. Estamos aquí para apoyarte en cada paso del camino.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Toda la información es confidencial y está protegida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
