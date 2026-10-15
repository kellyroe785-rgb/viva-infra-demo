import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';

export const MetricsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#272923] text-white py-16 lg:py-20 border-b border-[#3A3D35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            Standards & Benchmarks
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white leading-tight">
            {t.metrics.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A8A7A0] leading-relaxed">
            {t.metrics.subheading}
          </p>
        </motion.div>

        {/* 4 Quantitative Rigor Metric Cards with Tabular Numerals & Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { val: t.metrics.stat1Value, label: t.metrics.stat1Label, color: 'text-white' },
            { val: t.metrics.stat2Value, label: t.metrics.stat2Label, color: 'text-[#A9563B]' },
            { val: t.metrics.stat3Value, label: t.metrics.stat3Label, color: 'text-white' },
            { val: t.metrics.stat4Value, label: t.metrics.stat4Label, color: 'text-[#68715A]' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#2F322B] border border-[#44473C] p-6 flex flex-col justify-between hover:border-[#A9563B]/60 transition-colors"
            >
              <div className={`font-serif text-4xl sm:text-5xl font-bold ${stat.color} tabular-nums tracking-tight`}>
                {stat.val}
              </div>
              <div className="mt-4 pt-4 border-t border-[#44473C]/80 text-xs text-[#C5C4BD] font-medium leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
