import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Clock } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CtaBannerSectionProps {
  navigate: (route: string) => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({ navigate }) => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#A9563B] text-white py-20 relative overflow-hidden">
      {/* Decorative architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight mb-5 [text-wrap:balance]">
            {t.ctaSection.heading}
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            {t.ctaSection.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#272923] bg-white hover:bg-[#F8F7F2] transition-colors cursor-pointer shadow-md group"
            >
              <span>{t.ctaSection.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white border border-white/60 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.ctaSection.secondaryText}</span>
            </motion.button>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-white/80 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.ctaSection.responseTime}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
