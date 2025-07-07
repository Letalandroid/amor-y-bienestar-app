
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el método anticonceptivo más efectivo para prevenir embarazos?",
    options: ["Condón", "Píldora anticonceptiva", "DIU", "Método del ritmo"],
    correctAnswer: 2,
    explanation: "El DIU (Dispositivo Intrauterino) tiene una efectividad del 99% para prevenir embarazos.",
    category: "Anticonceptivos"
  },
  {
    id: 2,
    question: "¿Qué ITS puede transmitirse incluso con el uso de condón?",
    options: ["VIH", "Gonorrea", "Herpes genital", "Clamidia"],
    correctAnswer: 2,
    explanation: "El herpes genital puede transmitirse por contacto piel a piel en áreas no cubiertas por el condón.",
    category: "ITS"
  },
  {
    id: 3,
    question: "¿Cuándo es recomendable hacerse una prueba de ITS?",
    options: ["Solo si tienes síntomas", "Una vez al año", "Después de cada nueva pareja", "Nunca es necesario"],
    correctAnswer: 1,
    explanation: "Se recomienda hacerse pruebas de ITS al menos una vez al año o después de tener una nueva pareja sexual.",
    category: "Prevención"
  },
  {
    id: 4,
    question: "¿Cuál es la edad promedio de inicio de la pubertad en las niñas?",
    options: ["8-9 años", "10-11 años", "12-13 años", "14-15 años"],
    correctAnswer: 1,
    explanation: "La pubertad en las niñas generalmente comienza entre los 10-11 años, aunque puede variar.",
    category: "Desarrollo"
  },
  {
    id: 5,
    question: "¿Qué porcentaje de efectividad tiene el condón masculino correctamente usado?",
    options: ["85%", "95%", "98%", "100%"],
    correctAnswer: 2,
    explanation: "El condón masculino usado correctamente tiene una efectividad del 98% para prevenir embarazos.",
    category: "Anticonceptivos"
  }
];

const InteractiveTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setTestCompleted(true);
      }
    }, 2000);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setTestCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "¡Excelente! Tienes muy buenos conocimientos sobre salud sexual.";
    if (percentage >= 60) return "¡Bien! Tienes conocimientos básicos, pero puedes mejorar.";
    if (percentage >= 40) return "Regular. Te recomendamos revisar más contenido educativo.";
    return "Necesitas reforzar tus conocimientos. ¡La educación sexual es importante!";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/menu")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Menú
          </Button>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">¡Test Completado!</CardTitle>
              <CardDescription>
                Has terminado el test de conocimientos sobre salud sexual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {score}/{questions.length}
                </div>
                <div className={`text-lg font-semibold ${getScoreColor()}`}>
                  {Math.round((score / questions.length) * 100)}% Correcto
                </div>
                <p className="text-gray-600 mt-2">
                  {getScoreMessage()}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Resultados por pregunta:</h3>
                {questions.map((q, index) => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{q.question}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {q.category}
                      </Badge>
                    </div>
                    <div className="ml-4">
                      {answers[index] === q.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button onClick={resetTest} className="w-full" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Repetir Test
                </Button>
                <Button onClick={() => navigate("/education")} className="w-full gradient-primary">
                  Ir a Educación Sexual
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/menu")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Menú
        </Button>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary">
                {questions[currentQuestion].category}
              </Badge>
              <span className="text-sm text-gray-600">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
            <CardTitle className="text-lg">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showResult ? (
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`w-full text-left justify-start h-auto py-3 px-4 ${
                      selectedAnswer === index ? "gradient-primary" : ""
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6 gradient-primary"
                >
                  {currentQuestion === questions.length - 1 ? "Finalizar Test" : "Siguiente Pregunta"}
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {selectedAnswer === questions[currentQuestion].correctAnswer ? "¡Correcto!" : "Incorrecto"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveTest;
