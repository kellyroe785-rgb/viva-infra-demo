import React from 'react';
import { Globe, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <footer className="bg-[#272923] text-[#E5E0D5] border-t border-[#3A3D35] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A3D35]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#A9563B] flex items-center justify-center text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 10h6" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#A9563B] font-mono">
              {t.brandDescriptor}
            </p>
            <p className="text-sm text-[#A8A7A0] leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>
            <div className="pt-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white border border-[#4A4E43] bg-[#2F322B] hover:bg-[#A9563B] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'தமிழ் பதிப்பு (Switch to Tamil)' : 'English Version'}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8A7A0]">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/projects')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8A7A0]">
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Residential & Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Commercial Centers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Structural Renovations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Turnkey Construction Management
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Studio & Consultation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              {t.contactPage.officeTitle}
            </h4>
            <p className="text-xs text-[#A8A7A0] leading-relaxed mb-3">
              {t.contactPage.officeAddress}
            </p>
            <p className="text-xs text-[#77766F] mb-4">
              {t.contactPage.workingHours}
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-1.5 text-xs text-[#A9563B] hover:text-[#C57458] font-medium transition-colors"
            >
              <span>{t.contactPage.submitButton}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Accreditation and Standards Notice */}
        <div className="pt-8 border-t border-[#35372F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#77766F]">
          <div className="max-w-2xl">
            <p className="leading-relaxed">
              <span className="text-white font-medium">{t.footer.legalTitle}:</span> {t.footer.demoNoticeText}
            </p>
          </div>
          <div className="whitespace-nowrap shrink-0">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
