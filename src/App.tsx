import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => {
  const { t } = useLanguage();
  return <div className="flex items-center justify-center h-screen">{t.common.loading}</div>;
};

const App = () => (
  <BrowserRouter>
    <LanguageProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uz" element={<Index />} />
          <Route path="/ru" element={<Index />} />
          <Route path="/en" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
