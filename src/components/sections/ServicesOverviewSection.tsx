import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Compass, Building, Layers, Hammer, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Service } from '../../types';
import { repository } from '../../lib/supabase/repository';

interface ServicesOverviewSectionProps {
  navigate: (route: string) => void;
}

export const ServicesOverviewSection: React.FC<ServicesOverviewSectionProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let mounted = true;
    repository.getServices().then((data) => {
      if (mounted) {
        setServices(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'home':
        return <Home className="w-5 h-5 text-[#A9563B]" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-[#A9563B]" />;
      case 'building':
        return <Building className="w-5 h-5 text-[#A9563B]" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-[#A9563B]" />;
      case 'hammer':
        return <Hammer className="w-5 h-5 text-[#A9563B]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#A9563B]" />;
      default:
        return <Home className="w-5 h-5 text-[#A9563B]" />;
    }
  };

  return (
    <section className="bg-[#F8F7F2] py-20 border-b border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
              {t.servicesOverview.kicker}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
              {t.servicesOverview.heading}
            </h2>
            <p className="mt-3 text-base text-[#55564E] leading-relaxed">
              {t.servicesOverview.subheading}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#272923] border border-[#E6E1D8] bg-white hover:bg-[#272923] hover:text-white transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>{t.servicesOverview.exploreServices}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>

        {/* 6 Services Grid with Real Architectural Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-[#E6E1D8] overflow-hidden flex flex-col justify-between hover:border-[#A9563B] hover:shadow-md transition-all duration-300 group cursor-pointer"
              onClick={() => navigate('/services')}
            >
              {/* Photorealistic Discipline Image */}
              <div className="relative w-full h-44 overflow-hidden bg-[#EAE5DA]">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-xs border border-white/20">
                  {getIcon(service.iconName)}
                </div>
                <div className="absolute bottom-3 right-3 text-xs font-mono text-white/90 font-medium">
                  0{idx + 1}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#272923] group-hover:text-[#A9563B] transition-colors mb-2.5">
                    {language === 'ta' ? service.titleTa : service.title}
                  </h3>

                  <p className="text-xs text-[#55564E] leading-relaxed mb-6 line-clamp-3">
                    {language === 'ta' ? service.shortDescTa : service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                  <span className="text-[#77766F] font-mono">
                    {language === 'ta' ? service.typicalTimelineTa : service.typicalTimeline}
                  </span>
                  <span className="text-[#A9563B] font-semibold group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                    <span>{t.servicesOverview.learnMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
