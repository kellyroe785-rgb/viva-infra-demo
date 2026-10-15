import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple, robust client-side route matcher
  const renderRoute = () => {
    // Exact routes
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentRoute === '/projects') {
      return <ProjectsPage navigate={navigate} />;
    }
    if (currentRoute.startsWith('/projects/')) {
      const slug = currentRoute.replace('/projects/', '').split('?')[0].split('#')[0];
      return <ProjectDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentRoute === '/services') {
      return <ServicesPage navigate={navigate} />;
    }
    if (currentRoute === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }

    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#272923] font-sans selection:bg-[#A9563B]/20 selection:text-[#85432F]">
        <Header currentRoute={currentRoute} navigate={navigate} />
        <main className="flex-1">
          {renderRoute()}
        </main>
        <Footer navigate={navigate} />
      </div>
    </LanguageProvider>
  );
}

export default App;
