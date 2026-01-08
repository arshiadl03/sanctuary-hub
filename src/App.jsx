import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext.jsx";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";

// Pages
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

// Dashboard Pages
import Dashboard from "./pages/Dashboard"; // این حالا layout اصلی داشبورد می‌شه
import Children from "./pages/dashboard/Children";
import AddChild from "./pages/dashboard/AddChild";
import ChildDetail from "./pages/dashboard/ChildDetail";
import Rewards from "./pages/dashboard/Rewards";
import Attendance from "./pages/dashboard/Attendance";
import Evaluations from "./pages/dashboard/Evaluations";
import ManageMahafil from "./pages/dashboard/ManageMahafil";

const queryClient = new QueryClient();

// Layout مشترک برای داشبورد (سایدبار + Outlet)
function DashboardLayout() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background" dir="rtl">
        {/* Sidebar - بعداً کامپوننت جدا بساز */}
        <aside className="w-64 border-l bg-card p-6">
          <h2 className="text-2xl font-bold mb-8">داشبورد</h2>
          <nav className="space-y-3">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-accent">Overview</a>
            <a href="/dashboard/children" className="block px-4 py-2 rounded hover:bg-accent">کودکان</a>
            <a href="/dashboard/attendance" className="block px-4 py-2 rounded hover:bg-accent">حضورگیری</a>
            {/* لینک‌های دیگه */}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> {/* صفحات فرزند اینجا رندر می‌شن */}
        </main>
      </div>
    </ProtectedRoute>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/mahafil" element={<Mahafil />} />
              <Route path="/mahafil/:id" element={<MahfilDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />

              {/* Nested Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="children" element={<Children requiredRoles={["teacher", "admin"]} />} />
                <Route path="children/add" element={<AddChild />} />
                <Route path="children/:id" element={<ChildDetail />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="attendance" element={<Attendance requiredRoles={["teacher", "assistant", "admin"]} />} />
                <Route path="evaluations" element={<Evaluations requiredRoles={["teacher", "assistant", "admin"]} />} />
                <Route path="mahafil" element={<ManageMahafil requiredRoles={["admin"]} />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;