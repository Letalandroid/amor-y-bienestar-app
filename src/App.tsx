
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import MainMenu from "./pages/MainMenu";
import Education from "./pages/Education";
import Contraceptives from "./pages/Contraceptives";
import STIs from "./pages/STIs";
import FAQ from "./pages/FAQ";
import Chat from "./pages/Chat";
import Map from "./pages/Map";
import InteractiveTest from "./pages/InteractiveTest";
import Reminders from "./pages/Reminders";
import Multimedia from "./pages/Multimedia";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MainMenu />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contraceptives" element={<Contraceptives />} />
            <Route path="/stis" element={<STIs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/map" element={<Map />} />
            <Route path="/test" element={<InteractiveTest />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/multimedia" element={<Multimedia />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
