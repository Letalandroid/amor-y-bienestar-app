
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit3, Trash2, Heart, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  created_at: string;
  updated_at: string;
}

const Diary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mood: ""
  });

  const moods = [
    { value: "happy", label: "😊 Feliz", color: "text-yellow-500" },
    { value: "sad", label: "😢 Triste", color: "text-blue-500" },
    { value: "anxious", label: "😰 Ansioso/a", color: "text-red-500" },
    { value: "calm", label: "😌 Tranquilo/a", color: "text-green-500" },
    { value: "excited", label: "🤩 Emocionado/a", color: "text-purple-500" },
    { value: "confused", label: "😕 Confundido/a", color: "text-gray-500" },
    { value: "grateful", label: "🙏 Agradecido/a", color: "text-pink-500" }
  ];

  useEffect(() => {
    if (user && !user.isAnonymous) {
      fetchEntries();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las entradas del diario.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.isAnonymous) {
      toast({
        title: "Acceso requerido",
        description: "Necesitas iniciar sesión para usar el diario privado.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "El título y contenido son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditing && selectedEntry) {
        const { error } = await supabase
          .from('diary_entries')
          .update({
            title: formData.title,
            content: formData.content,
            mood: formData.mood || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedEntry.id);

        if (error) throw error;

        toast({
          title: "¡Actualizado!",
          description: "Tu entrada ha sido actualizada exitosamente.",
        });
      } else {
        const { error } = await supabase
          .from('diary_entries')
          .insert({
            title: formData.title,
            content: formData.content,
            mood: formData.mood || null,
            user_id: user.id
          });

        if (error) throw error;

        toast({
          title: "¡Guardado!",
          description: "Tu entrada ha sido guardada en tu diario privado.",
        });
      }

      setFormData({ title: "", content: "", mood: "" });
      setIsDialogOpen(false);
      setIsEditing(false);
      setSelectedEntry(null);
      fetchEntries();
    } catch (error) {
      console.error('Error saving diary entry:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la entrada. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || ""
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      toast({
        title: "Eliminado",
        description: "La entrada ha sido eliminada de tu diario.",
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la entrada.",
        variant: "destructive",
      });
    }
  };

  const openNewEntry = () => {
    setFormData({ title: "", content: "", mood: "" });
    setIsEditing(false);
    setSelectedEntry(null);
    setIsDialogOpen(true);
  };

  const getMoodDisplay = (mood?: string) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.label : null;
  };

  if (!user || user.isAnonymous) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/menu")}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gradient">Mi Diario Privado</h1>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Acceso Requerido</CardTitle>
              <CardDescription>
                Para usar tu diario privado necesitas iniciar sesión. Esto garantiza que solo tú puedas acceder a tus pensamientos y emociones.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate("/")}
                className="gradient-primary"
              >
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/menu")}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gradient">Mi Diario Privado</h1>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewEntry} className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Entrada
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Editar Entrada" : "Nueva Entrada del Diario"}
                </DialogTitle>
                <DialogDescription>
                  Escribe tus pensamientos, emociones o cualquier cosa que quieras recordar. Todo es completamente privado.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="¿Cómo te sientes hoy?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mood">Estado de ánimo (opcional)</Label>
                  <Select value={formData.mood} onValueChange={(value) => setFormData({...formData, mood: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu estado de ánimo" />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood.value} value={mood.value}>
                          <span className={mood.color}>{mood.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Escribe aquí tus pensamientos, emociones, cambios físicos o cualquier cosa que quieras recordar..."
                    rows={6}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {isEditing ? "Actualizar" : "Guardar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-500" />
                Tu Espacio Seguro
              </CardTitle>
              <CardDescription>
                Este es tu diario personal y privado. Solo tú puedes ver estas entradas. Aquí puedes escribir sobre tus emociones, cambios físicos, preguntas sobre sexualidad, o cualquier cosa que quieras recordar. 🔒
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Cargando tus entradas...</p>
          </div>
        ) : entries.length === 0 ? (
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardContent className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tu diario está vacío</h3>
              <p className="text-gray-600 mb-4">
                Comienza escribiendo tu primera entrada. Puede ser sobre cómo te sientes hoy, alguna pregunta que tengas, o cualquier cosa que quieras recordar.
              </p>
              <Button onClick={openNewEntry} className="gradient-primary">
                Escribir Primera Entrada
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(entry.created_at), "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                        {entry.mood && (
                          <span className="ml-3 text-sm">
                            {getMoodDisplay(entry.mood)}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                  {entry.updated_at !== entry.created_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Última actualización: {format(new Date(entry.updated_at), "d/MM/yyyy HH:mm", { locale: es })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary;
