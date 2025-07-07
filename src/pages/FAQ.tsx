
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "¿A qué edad es normal empezar a ser sexualmente activo?",
      answer: "No hay una edad 'normal' específica. Lo importante es que te sientas preparado/a emocional y físicamente, tengas información sobre sexo seguro y puedas consentir de manera informada. En muchos países, la edad de consentimiento está entre los 14-18 años."
    },
    {
      question: "¿Puedo quedar embarazada en mi primera vez?",
      answer: "Sí, es posible quedar embarazada en la primera relación sexual si no se usan métodos anticonceptivos. El embarazo puede ocurrir en cualquier momento que haya penetración vaginal sin protección, independientemente de si es la primera vez o no."
    },
    {
      question: "¿El condón es 100% efectivo?",
      answer: "Ningún método anticonceptivo es 100% efectivo. El condón, cuando se usa correctamente, tiene una efectividad del 98% para prevenir embarazos y es muy efectivo para prevenir ITS. Su efectividad puede reducirse por uso incorrecto, rotura o caducidad."
    },
    {
      question: "¿Puedo contraer ITS por sexo oral?",
      answer: "Sí, es posible contraer ITS a través del sexo oral. Infecciones como herpes, gonorrea, clamidia y VIH pueden transmitirse por contacto oral-genital. Se recomienda usar condones o barreras dentales para el sexo oral."
    },
    {
      question: "¿Cómo puedo hablar con mis padres sobre sexualidad?",
      answer: "Elige un momento tranquilo, comienza con preguntas simples y específicas. Puedes decir algo como 'Tengo algunas preguntas sobre mi cuerpo/salud sexual, ¿podemos hablar?' Si te sientes incómodo, considera hablar con un consejero o profesional de salud."
    },
    {
      question: "¿Es normal tener diferentes orientaciones sexuales?",
      answer: "Sí, es completamente normal. La orientación sexual es diversa y puede incluir heterosexualidad, homosexualidad, bisexualidad, pansexualidad y otras. Lo importante es aceptarte a ti mismo/a y buscar apoyo si lo necesitas."
    }
  ];

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
            <h1 className="text-3xl font-bold text-gradient mb-2">Preguntas Frecuentes</h1>
            <p className="text-gray-600">Respuestas a las dudas más comunes sobre salud sexual</p>
          </div>

          <Card className="bg-gradient-to-r from-teal-100 to-blue-100 border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <HelpCircle className="w-6 h-6 text-teal-600" />
                <h3 className="font-semibold text-lg">¿No encuentras tu pregunta?</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Si tienes una pregunta que no está aquí, no dudes en consultar con nuestros especialistas.
              </p>
              <Button onClick={() => navigate("/chat")} className="gradient-primary">
                Hacer una Consulta
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
