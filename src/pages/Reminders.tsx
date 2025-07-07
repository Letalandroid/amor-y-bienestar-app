
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Bell, Trash2, Heart, Pill, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  title: string;
  type: 'pill' | 'checkup' | 'custom';
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  message: string;
}

const Reminders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Tomar píldora anticonceptiva',
      type: 'pill',
      time: '09:00',
      frequency: 'daily',
      isActive: true,
      message: '💊 Es hora de tomar tu píldora. ¡Tu salud es importante!'
    },
    {
      id: '2',
      title: 'Chequeo médico',
      type: 'checkup',
      time: '10:00',
      frequency: 'monthly',
      isActive: true,
      message: '🏥 Recuerda programar tu chequeo médico mensual'
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    type: 'custom' as 'pill' | 'checkup' | 'custom',
    time: '',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
    message: ''
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const positiveMessages = [
    "Hoy es un buen día para cuidarte 💖",
    "Tu bienestar es tu prioridad 🌟",
    "Cada día es una oportunidad para quererte más 💕",
    "Cuidar de ti es un acto de amor propio 🌸",
    "Tu salud es tu mayor tesoro 💎",
    "Hoy eliges cuidarte y eso es maravilloso 🦋"
  ];

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      type: newReminder.type,
      time: newReminder.time,
      frequency: newReminder.frequency,
      isActive: true,
      message: newReminder.message || `⏰ Recordatorio: ${newReminder.title}`
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      type: 'custom',
      time: '',
      frequency: 'daily',
      message: ''
    });
    setIsDialogOpen(false);

    toast({
      title: "Recordatorio creado",
      description: "Tu recordatorio ha sido configurado exitosamente.",
    });
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast({
      title: "Recordatorio eliminado",
      description: "El recordatorio ha sido eliminado.",
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pill': return <Pill className="w-4 h-4" />;
      case 'checkup': return <Calendar className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pill': return 'bg-pink-100 text-pink-600';
      case 'checkup': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diario';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensual';
      default: return frequency;
    }
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
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gradient mb-2">Recordatorios</h1>
            <p className="text-gray-600">Configura recordatorios para cuidar tu salud</p>
          </div>

          {/* Positive Messages */}
          <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-0">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-800">
                {positiveMessages[Math.floor(Math.random() * positiveMessages.length)]}
              </p>
            </CardContent>
          </Card>

          {/* Add Reminder Button */}
          <div className="flex justify-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Recordatorio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuevo Recordatorio</DialogTitle>
                  <DialogDescription>
                    Configura un recordatorio personalizado para cuidar tu salud.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      placeholder="Ej: Tomar vitaminas"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select 
                      value={newReminder.type} 
                      onValueChange={(value: 'pill' | 'checkup' | 'custom') => 
                        setNewReminder({ ...newReminder, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pill">Medicamento</SelectItem>
                        <SelectItem value="checkup">Chequeo médico</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frecuencia</Label>
                    <Select 
                      value={newReminder.frequency} 
                      onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                        setNewReminder({ ...newReminder, frequency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje personalizado</Label>
                    <Input
                      id="message"
                      value={newReminder.message}
                      onChange={(e) => setNewReminder({ ...newReminder, message: e.target.value })}
                      placeholder="Mensaje que aparecerá en la notificación"
                    />
                  </div>

                  <Button onClick={addReminder} className="w-full gradient-primary">
                    Crear Recordatorio
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full ${getTypeColor(reminder.type)} flex items-center justify-center`}>
                        {getTypeIcon(reminder.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{reminder.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{reminder.time}</Badge>
                          <Badge variant="outline">{getFrequencyText(reminder.frequency)}</Badge>
                          <Badge variant={reminder.isActive ? "default" : "secondary"}>
                            {reminder.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{reminder.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleReminder(reminder.id)}
                      >
                        {reminder.isActive ? "Desactivar" : "Activar"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {reminders.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tienes recordatorios configurados
                </h3>
                <p className="text-gray-600">
                  Crea tu primer recordatorio para empezar a cuidar tu salud de manera consistente.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
