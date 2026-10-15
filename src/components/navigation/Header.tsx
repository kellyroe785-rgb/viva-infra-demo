import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F7F2]/95 backdrop-blur-xs border-b border-[#E6E1D8] shadow-xs py-3'
          : 'bg-[#F8F7F2] border-b border-[#E6E1D8]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (Action & Lang) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Viva Infra Home"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-[#272923] flex items-center justify-center text-white transition-colors group-hover:bg-[#A9563B]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 10h6" />
                <path d="M9 14h6" />
                <path d="M9 18h6" />
              </svg>
            </motion.div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#272923]">
              {t.brandName}
            </span>
          </button>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#272923]" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('/')}
              className={`hover:text-[#A9563B] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentRoute === '/' ? 'text-[#A9563B] border-b-2 border-[#A9563B]' : 'text-[#77766F]'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('/projects')}
              className={`hover:text-[#A9563B] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentRoute.startsWith('/projects') ? 'text-[#A9563B] border-b-2 border-[#A9563B]' : 'text-[#77766F]'
              }`}
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => handleNavClick('/services')}
              className={`hover:text-[#A9563B] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentRoute === '/services' ? 'text-[#A9563B] border-b-2 border-[#A9563B]' : 'text-[#77766F]'
              }`}
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`hover:text-[#A9563B] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentRoute === '/about' ? 'text-[#A9563B] border-b-2 border-[#A9563B]' : 'text-[#77766F]'
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`hover:text-[#A9563B] transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                currentRoute === '/contact' ? 'text-[#A9563B] border-b-2 border-[#A9563B]' : 'text-[#77766F]'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Zone 3: Language Toggle & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bilingual Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#272923] border border-[#E6E1D8] bg-white hover:bg-[#F8F7F2] transition-colors cursor-pointer"
              aria-label={`Switch language. Current language: ${language === 'en' ? 'English' : 'Tamil'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#A9563B]" />
              <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </motion.button>

            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('/contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#272923] hover:bg-[#A9563B] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <span>{t.nav.enquire}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#272923] hover:text-[#A9563B] border border-[#E6E1D8] bg-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden mt-3 pt-3 border-t border-[#E6E1D8] bg-[#F8F7F2] pb-4 space-y-2"
            >
              <button
                onClick={() => handleNavClick('/')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#272923] hover:bg-white rounded transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleNavClick('/projects')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#272923] hover:bg-white rounded transition-colors"
              >
                {t.nav.projects}
              </button>
              <button
                onClick={() => handleNavClick('/services')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#272923] hover:bg-white rounded transition-colors"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#272923] hover:bg-white rounded transition-colors"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#272923] hover:bg-white rounded transition-colors"
              >
                {t.nav.contact}
              </button>
              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('/contact')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors"
                >
                  <span>{t.nav.enquire}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
