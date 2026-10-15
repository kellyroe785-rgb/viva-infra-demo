import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Compass, Building, Layers, Hammer, Shield, Check, Clock, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Service } from '../types';
import { repository } from '../lib/supabase/repository';

interface ServicesPageProps {
  navigate: (route: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    repository.getServices().then((data) => {
      if (mounted) {
        setServices(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        return <Home className="w-6 h-6 text-[#A9563B]" />;
      case 'compass':
        return <Compass className="w-6 h-6 text-[#A9563B]" />;
      case 'building':
        return <Building className="w-6 h-6 text-[#A9563B]" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-[#A9563B]" />;
      case 'hammer':
        return <Hammer className="w-6 h-6 text-[#A9563B]" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-[#A9563B]" />;
      default:
        return <Home className="w-6 h-6 text-[#A9563B]" />;
    }
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            Disciplines & Capabilities
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.servicesPage.title}
          </h1>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.servicesPage.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#77766F] font-mono">Loading architectural services...</p>
          </div>
        ) : (
          /* Services List: Comprehensive Multi-Column Breakdown with Real Photography */
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="bg-white border border-[#E6E1D8] overflow-hidden shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Visual Anchor: Real Architectural Photography */}
                  <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-[#EAE5DA]">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 p-2.5 bg-white/95 backdrop-blur-xs border border-white/20">
                      {getIcon(service.iconName)}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-mono text-[#FDBA74] uppercase block">
                        DISCIPLINE 0{index + 1}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-white drop-shadow-sm">
                        {language === 'ta' ? service.titleTa : service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Scope Checklist & Deliverables */}
                  <div className="lg:col-span-7 p-8 lg:p-10 space-y-6 flex flex-col justify-between">
                    <div className="space-y-5">
                      <p className="text-sm text-[#55564E] leading-relaxed">
                        {language === 'ta' ? service.fullDescTa : service.fullDesc}
                      </p>

                      <div className="p-4 bg-[#F8F7F2] border border-[#E6E1D8] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#272923]">
                          <Users className="w-3.5 h-3.5 text-[#A9563B]" />
                          <span>{t.servicesPage.targetAudience}</span>
                        </div>
                        <p className="text-xs text-[#55564E] leading-relaxed">
                          {language === 'ta' ? service.targetAudienceTa : service.targetAudience}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#A9563B] font-semibold mb-3">
                          {t.servicesPage.scopeHeader}
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(language === 'ta' ? service.scopeItemsTa : service.scopeItems).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-[#272923] leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-[#68715A] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE1]">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-2">
                          {t.servicesPage.deliverablesHeader}
                        </h4>
                        <ul className="space-y-1">
                          {(language === 'ta' ? service.deliverablesTa : service.deliverables).map((item, idx) => (
                            <li key={idx} className="text-xs text-[#55564E] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#A9563B] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-[#F0ECE1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#77766F]">
                        <Clock className="w-3.5 h-3.5 text-[#A9563B]" />
                        <span>
                          {t.servicesPage.timelineHeader}:{' '}
                          <strong className="text-[#272923]">
                            {language === 'ta' ? service.typicalTimelineTa : service.typicalTimeline}
                          </strong>
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/contact')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#272923] hover:bg-[#A9563B] transition-colors cursor-pointer"
                      >
                        <span>{t.servicesPage.enquireService}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
