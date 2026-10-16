import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { useRealtimeNotifications } from "./hooks/useRealtimeNotifications";
import { AppSidebar } from "./components/layout/AppSidebar";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalHooks = () => {
  useRealtimeNotifications();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GlobalHooks />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={false}>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 min-w-0 flex flex-col">
                {/* Floating trigger — always visible */}
                <div className="fixed top-3 left-3 z-[60]">
                  <SidebarTrigger className="h-9 w-9 rounded-xl glass-strong hover:bg-primary/15 hover:text-primary transition-colors" />
                </div>
                <AppRoutes />
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
