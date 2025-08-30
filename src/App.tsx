import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnrollmentProvider } from "@/contexts/EnrollmentContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Step1 from "./pages/enroll/Step1";
import Step2 from "./pages/enroll/Step2";
import Step3 from "./pages/enroll/Step3";
import Review from "./pages/enroll/Review";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <EnrollmentProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enroll/step-1" element={<Step1 />} />
            <Route path="/enroll/step-2" element={<Step2 />} />
            <Route path="/enroll/step-3" element={<Step3 />} />
            <Route path="/enroll/review" element={<Review />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EnrollmentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
