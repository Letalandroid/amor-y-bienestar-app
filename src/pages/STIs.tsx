
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Shield, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const STIs = () => {
  const navigate = useNavigate();

  const commonSTIs = [
    {
      name: "Clamidia",
      symptoms: ["Flujo vaginal anormal", "Dolor al orinar", "Dolor abdominal"],
      treatment: "Antibióticos",
      prevention: "Uso de condón",
      severity: "Moderada"
    },
    {
      name: "Gonorrea",
      symptoms: ["Flujo vaginal/uretral", "Dolor al orinar", "Dolor pélvico"],
      treatment: "Antibióticos",
      prevention: "Uso de condón",
      severity: "Moderada"
    },
    {
      name: "Herpes genital",
      symptoms: ["Ampollas dolorosas", "Picazón", "Dolor"],
      treatment: "Antivirales (control)",
      prevention: "Uso de condón, comunicación",
      severity: "Crónica"
    },
    {
      name: "VIH",
      symptoms: ["Síntomas similares a gripe", "Fatiga", "Pérdida de peso"],
      treatment: "Tratamiento antirretroviral",
      prevention: "Uso de condón, PrEP",
      severity: "Grave"
    }
  ];

  const preventionTips = [
    "Usa condón en todas las relaciones sexuales",
    "Limita el número de parejas sexuales",
    "Habla abiertamente con tu pareja sobre ITS",
    "Hazte pruebas regularmente",
    "Vacúnate contra VPH y Hepatitis B",
    "Evita compartir jeringas o agujas"
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
            <h1 className="text-3xl font-bold text-gradient mb-2">Infecciones de Transmisión Sexual</h1>
            <p className="text-gray-600">Información sobre prevención, síntomas y tratamiento</p>
          </div>

          <Tabs defaultValue="prevention" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="prevention">Prevención</TabsTrigger>
              <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
              <TabsTrigger value="treatment">Tratamiento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="prevention" className="space-y-6">
              <Card className="bg-gradient-to-r from-green-100 to-teal-100 border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <CardTitle>La prevención es clave</CardTitle>
                  </div>
                  <CardDescription>
                    La mayoría de las ITS se pueden prevenir con las medidas adecuadas
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {preventionTips.map((tip, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms" className="space-y-6">
              <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <h3 className="font-semibold text-lg">Importante</h3>
                  </div>
                  <p className="text-gray-700">
                    Muchas ITS pueden ser asintomáticas. Si eres sexualmente activo/a, 
                    es importante hacerte pruebas regularmente, incluso si no tienes síntomas.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commonSTIs.map((sti, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{sti.name}</CardTitle>
                        <Badge variant={sti.severity === "Grave" ? "destructive" : "secondary"}>
                          {sti.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-orange-600 mb-1">Síntomas comunes:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {sti.symptoms.map((symptom, i) => (
                              <li key={i}>• {symptom}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-blue-600 mb-1">Prevención:</h4>
                          <p className="text-sm text-gray-600">{sti.prevention}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="treatment" className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                    <CardTitle>Tratamiento y seguimiento</CardTitle>
                  </div>
                  <CardDescription>
                    La mayoría de las ITS tienen tratamiento efectivo cuando se detectan a tiempo
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commonSTIs.map((sti, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">{sti.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm text-green-600 mb-1">Tratamiento:</h4>
                          <p className="text-sm text-gray-600">{sti.treatment}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Es importante completar todo el tratamiento y que la pareja también sea tratada.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    ¿Crees que puedes tener una ITS?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No esperes. Busca atención médica inmediatamente. El diagnóstico temprano 
                    es clave para un tratamiento exitoso.
                  </p>
                  <div className="space-x-4">
                    <Button onClick={() => navigate("/map")} className="gradient-primary">
                      Encontrar Centro de Salud
                    </Button>
                    <Button onClick={() => navigate("/chat")} variant="outline">
                      Chat con Especialista
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default STIs;
