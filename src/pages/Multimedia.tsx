
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Headphones, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Multimedia = () => {
  const navigate = useNavigate();

  const podcasts = [
    {
      title: "Hablemos de Sexualidad",
      episode: "Episodio 1: Mitos y Realidades",
      duration: "25:30",
      description: "Desmitificamos creencias comunes sobre la sexualidad"
    },
    {
      title: "Salud Sexual para Jóvenes",
      episode: "Episodio 3: Primera Vez",
      duration: "18:45",
      description: "Consejos para una primera experiencia sexual saludable"
    }
  ];

  const games = [
    {
      title: "Quiz de Salud Sexual",
      description: "Pon a prueba tus conocimientos de manera divertida",
      players: "1,234 jugadores"
    },
    {
      title: "Trivia Anticonceptivos",
      description: "Aprende sobre métodos anticonceptivos jugando",
      players: "856 jugadores"
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
            <h1 className="text-3xl font-bold text-gradient mb-2">Contenido Multimedia</h1>
            <p className="text-gray-600">Aprende de manera divertida e interactiva</p>
          </div>

          <Tabs defaultValue="podcasts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="games">Mini-juegos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="podcasts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {podcasts.map((podcast, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <Headphones className="w-6 h-6 text-purple-600" />
                        <span className="text-sm text-gray-500">{podcast.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{podcast.title}</CardTitle>
                      <CardDescription>{podcast.episode}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>
                      <Button className="w-full gradient-primary">
                        <Play className="w-4 h-4 mr-2" />
                        Reproducir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-4">
              <div className="text-center">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Videos Educativos
                    </h3>
                    <p className="text-gray-600">
                      Próximamente tendremos una biblioteca completa de videos educativos
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="games" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <Gamepad2 className="w-6 h-6 text-green-600" />
                        <span className="text-sm text-gray-500">{game.players}</span>
                      </div>
                      <CardTitle className="text-lg">{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => navigate("/test")} className="w-full gradient-primary">
                        Jugar Ahora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Multimedia;
