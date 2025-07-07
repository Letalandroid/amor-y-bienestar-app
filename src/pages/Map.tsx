
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Map = () => {
  const navigate = useNavigate();

  const healthCenters = [
    {
      name: "Centro de Salud Sexual Integral",
      address: "Av. Principal 123, Centro",
      phone: "+1 234-567-8901",
      hours: "Lun-Vie: 8:00-18:00",
      services: ["Consulta ginecológica", "Pruebas ITS", "Anticonceptivos"],
      distance: "0.5 km"
    },
    {
      name: "Hospital Público Municipal",
      address: "Calle Salud 456, Zona Norte",
      phone: "+1 234-567-8902",
      hours: "24 horas",
      services: ["Emergencias", "Consulta general", "Especialistas"],
      distance: "1.2 km"
    },
    {
      name: "Clínica de Planificación Familiar",
      address: "Av. Libertad 789, Zona Sur",
      phone: "+1 234-567-8903",
      hours: "Lun-Sáb: 9:00-17:00",
      services: ["Planificación familiar", "Consulta jóvenes", "Educación sexual"],
      distance: "2.1 km"
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
            <h1 className="text-3xl font-bold text-gradient mb-2">Centros de Salud Cercanos</h1>
            <p className="text-gray-600">Encuentra atención médica especializada cerca de ti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>Mapa interactivo próximamente</p>
                  <p className="text-sm">Se integrará con servicios de mapas</p>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              {healthCenters.map((center, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <Badge variant="secondary">{center.distance}</Badge>
                    </div>
                    <CardDescription>{center.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{center.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{center.hours}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Servicios:</p>
                        <div className="flex flex-wrap gap-1">
                          {center.services.map((service, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full gradient-primary">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
