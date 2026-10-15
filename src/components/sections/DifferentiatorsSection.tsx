import React from 'react';
import { motion } from 'motion/react';
import { FileCheck, Users, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const DifferentiatorsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 border-b border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            {t.differentiators.kicker}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.differentiators.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FileCheck className="w-5 h-5 text-[#A9563B]" />,
              title: t.differentiators.card1Title,
              desc: t.differentiators.card1Desc,
              tag: 'Guaranteed Contract Rates',
            },
            {
              icon: <Users className="w-5 h-5 text-[#68715A]" />,
              title: t.differentiators.card2Title,
              desc: t.differentiators.card2Desc,
              tag: 'Daily Resident Site Engineer',
            },
            {
              icon: <Eye className="w-5 h-5 text-[#85432F]" />,
              title: t.differentiators.card3Title,
              desc: t.differentiators.card3Desc,
              tag: 'Weekly Portal Milestones',
            },
            {
              icon: <CheckCircle2 className="w-5 h-5 text-[#272923]" />,
              title: t.differentiators.card4Title,
              desc: t.differentiators.card4Desc,
              tag: 'Single Contract Point',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 bg-[#F8F7F2] border border-[#E6E1D8] flex flex-col justify-between hover:border-[#A9563B] hover:shadow-sm transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-[#E6E1D8] flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-medium text-[#272923] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#55564E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E6E1D8] text-[11px] font-mono text-[#77766F]">
                {item.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
