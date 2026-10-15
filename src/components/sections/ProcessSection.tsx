import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: t.process.step1Title,
      desc: t.process.step1Desc,
    },
    {
      step: '02',
      title: t.process.step2Title,
      desc: t.process.step2Desc,
    },
    {
      step: '03',
      title: t.process.step3Title,
      desc: t.process.step3Desc,
    },
    {
      step: '04',
      title: t.process.step4Title,
      desc: t.process.step4Desc,
    },
    {
      step: '05',
      title: t.process.step5Title,
      desc: t.process.step5Desc,
    },
  ];

  return (
    <section className="bg-[#F8F7F2] py-20 border-b border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            {t.process.kicker}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.process.heading}
          </h2>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.process.subheading}
          </p>
        </motion.div>

        {/* 5-Step Editorial Numbered Flow with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-[#E6E1D8] p-6 flex flex-col justify-between group hover:border-[#A9563B] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="font-serif text-2xl font-bold text-[#A9563B] mb-4 group-hover:scale-105 transition-transform origin-left">
                  {item.step}.
                </div>
                <h3 className="font-serif text-lg font-medium text-[#272923] mb-3 leading-snug">
                  {item.title.split('. ')[1] || item.title}
                </h3>
                <p className="text-xs text-[#77766F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] font-mono text-[#77766F]">
                <span>Phase {item.step}</span>
                <span className="text-[#A9563B]">Milestone Gate</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
