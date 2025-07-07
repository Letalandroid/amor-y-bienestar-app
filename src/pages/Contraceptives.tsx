
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Contraceptives = () => {
  const navigate = useNavigate();

  const contraceptives = [
    {
      name: "Condón masculino",
      effectiveness: "98%",
      type: "Barrera",
      description: "Protege contra embarazos e ITS. Fácil de usar y accesible.",
      pros: ["Protege contra ITS", "Sin efectos secundarios", "Fácil acceso"],
      cons: ["Puede romperse", "Requiere uso correcto"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Píldora anticonceptiva",
      effectiveness: "91%",
      type: "Hormonal",
      description: "Hormones que previenen la ovulación. Uso diario.",
      pros: ["Muy efectiva", "Regula menstruación", "Reversible"],
      cons: ["Efectos secundarios", "Uso diario", "No protege de ITS"],
      color: "bg-pink-100 text-pink-600"
    },
    {
      name: "DIU (Dispositivo Intrauterino)",
      effectiveness: "99%",
      type: "Dispositivo",
      description: "Dispositivo insertado en el útero. Larga duración.",
      pros: ["Muy efectivo", "Larga duración", "Reversible"],
      cons: ["Requiere procedimiento", "Posibles molestias"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      name: "Implante subdérmico",
      effectiveness: "99%",
      type: "Hormonal",
      description: "Varilla bajo la piel que libera hormonas. Dura 3 años.",
      pros: ["Muy efectivo", "Larga duración", "Conveniente"],
      cons: ["Efectos secundarios", "Requiere procedimiento"],
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Inyección anticonceptiva",
      effectiveness: "94%",
      type: "Hormonal",
      description: "Inyección hormonal cada 3 meses.",
      pros: ["Efectiva", "Privada", "Reduce menstruación"],
      cons: ["Efectos secundarios", "Visitas regulares"],
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      name: "Condón femenino",
      effectiveness: "95%",
      type: "Barrera",
      description: "Funda insertada en la vagina. Protege contra ITS.",
      pros: ["Protege contra ITS", "Control femenino", "Sin hormonas"],
      cons: ["Menos disponible", "Práctica necesaria"],
      color: "bg-indigo-100 text-indigo-600"
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
            <h1 className="text-3xl font-bold text-gradient mb-2">Métodos Anticonceptivos</h1>
            <p className="text-gray-600">Encuentra el método que mejor se adapte a ti</p>
          </div>

          <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Info className="w-6 h-6 text-pink-600" />
                <h3 className="font-semibold text-lg">Información importante</h3>
              </div>
              <p className="text-gray-700">
                La efectividad de los métodos anticonceptivos puede variar según el uso correcto y consistente. 
                Consulta con un profesional de la salud para elegir el método más adecuado para ti.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contraceptives.map((method, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-full ${method.color} flex items-center justify-center`}>
                      <Shield className="w-4 h-4" />
                    </div>
                    <Badge variant="secondary">{method.effectiveness} efectivo</Badge>
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                  <Badge variant="outline">{method.type}</Badge>
                  <CardDescription className="mt-2">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-green-600 mb-1">Ventajas:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {method.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-orange-600 mb-1">Consideraciones:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {method.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ¿Necesitas ayuda para elegir?
              </h3>
              <p className="text-gray-600 mb-4">
                Cada persona es única y lo que funciona para una puede no funcionar para otra. 
                Te recomendamos consultar con un profesional de la salud.
              </p>
              <Button onClick={() => navigate("/chat")} className="gradient-primary">
                Consultar con un Especialista
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contraceptives;
