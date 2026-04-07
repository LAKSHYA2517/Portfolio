import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { getSettings } from "@/lib/data";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import BlogsAdmin from "./pages/admin/BlogsAdmin";
import Analytics from "./pages/admin/Analytics";
import ThemeAdmin from "./pages/admin/ThemeAdmin";
import NoveltyLab from "./pages/admin/NoveltyLab";
const queryClient = new QueryClient();

function ThemeBootSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.themeMode || "system");
  }, [setTheme]);

  return null;
}

const App = () => (<QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <ThemeBootSync />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <div className="app-shell">
            <Routes>
              <Route path="/" element={<Index />}/>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />}/>
                <Route path="projects" element={<ProjectsAdmin />}/>
                <Route path="blogs" element={<BlogsAdmin />}/>
                <Route path="analytics" element={<Analytics />}/>
                <Route path="novelty" element={<NoveltyLab />}/>
                <Route path="theme" element={<ThemeAdmin />}/>
              </Route>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </div>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>);
export default App;
