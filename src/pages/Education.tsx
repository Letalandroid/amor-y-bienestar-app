
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Education = () => {
  const navigate = useNavigate();

  const videos = [
    {
      title: "¿Qué es la educación sexual integral?",
      duration: "8:32",
      description: "Conceptos básicos sobre educación sexual",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop"
    },
    {
      title: "Anatomía y fisiología reproductiva",
      duration: "12:15",
      description: "Conoce tu cuerpo y su funcionamiento",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    },
    {
      title: "Comunicación en las relaciones",
      duration: "10:45",
      description: "Cómo hablar de sexualidad con tu pareja",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop"
    }
  ];

  const articles = [
    {
      title: "Derechos sexuales y reproductivos",
      excerpt: "Conoce tus derechos fundamentales en materia de salud sexual y reproductiva.",
      readTime: "5 min"
    },
    {
      title: "Mitos y realidades sobre la sexualidad",
      excerpt: "Desmitificamos las creencias más comunes sobre la sexualidad humana.",
      readTime: "7 min"
    },
    {
      title: "Diversidad sexual y género",
      excerpt: "Entendiendo la diversidad en orientación sexual e identidad de género.",
      readTime: "6 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gradient mb-2">Educación Sexual</h1>
            <p className="text-gray-600">Aprende sobre sexualidad de manera integral y responsable</p>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="articles">Artículos</TabsTrigger>
              <TabsTrigger value="workshops">Talleres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-pink-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="articles" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <BookOpen className="w-6 h-6 text-pink-600" />
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="workshops" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <Users className="w-8 h-8 text-pink-600 mb-2" />
                    <CardTitle>Taller de Comunicación Asertiva</CardTitle>
                    <CardDescription>
                      Aprende a comunicarte de manera efectiva sobre temas de sexualidad
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full gradient-primary">Próximamente</Button>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <Users className="w-8 h-8 text-purple-600 mb-2" />
                    <CardTitle>Taller de Autoconocimiento</CardTitle>
                    <CardDescription>
                      Explora tu sexualidad de manera saludable y responsable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full gradient-primary">Próximamente</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Education;
