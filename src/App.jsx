import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext.jsx";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Mahafil from "./pages/Mahafil";
import MahfilDetail from "./pages/MahfilDetail";
import Register from './pages/Register';
import Auth from "./pages/Auth";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Children from "./pages/dashboard/Children";
import AddChild from "./pages/dashboard/AddChild";
import ChildDetail from "./pages/dashboard/ChildDetail";
import Rewards from "./pages/dashboard/Rewards";
import Attendance from "./pages/dashboard/Attendance";
import Evaluations from "./pages/dashboard/Evaluations";
import ManageMahafil from "./pages/dashboard/ManageMahafil";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/mahafil" element={<Mahafil />} />
              <Route path="/mahafil/:id" element={<MahfilDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* مسیرهای داشبورد */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/children" element={
                <ProtectedRoute>
                  <Children />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/children/add" element={
                <ProtectedRoute>
                  <AddChild />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/children/:id" element={
                <ProtectedRoute>
                  <ChildDetail />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/rewards" element={
                <ProtectedRoute>
                  <Rewards />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/attendance" element={
                <ProtectedRoute requiredRoles={["teacher", "assistant", "admin"]}>
                  <Attendance />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/evaluations" element={
                <ProtectedRoute requiredRoles={["teacher", "assistant", "admin"]}>
                  <Evaluations />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/mahafil" element={
                <ProtectedRoute requiredRoles={["admin"]}>
                  <ManageMahafil />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
