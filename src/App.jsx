import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import BlogsAdmin from "./pages/admin/BlogsAdmin";
import Analytics from "./pages/admin/Analytics";
import ThemeAdmin from "./pages/admin/ThemeAdmin";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path="projects" element={<ProjectsAdmin />}/>
            <Route path="blogs" element={<BlogsAdmin />}/>
            <Route path="analytics" element={<Analytics />}/>
            <Route path="theme" element={<ThemeAdmin />}/>
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>);
export default App;
