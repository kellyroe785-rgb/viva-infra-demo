import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Testimonial } from '../../types';
import { repository } from '../../lib/supabase/repository';

export const TestimonialsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    let mounted = true;
    repository.getTestimonials().then((data) => {
      if (mounted) {
        setTestimonials(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-[#F8F7F2] py-20 border-b border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            {t.testimonials.kicker}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.testimonials.heading}
          </h2>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.testimonials.subheading}
          </p>
        </motion.div>

        {/* Testimonials Bento Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white border border-[#E6E1D8] p-7 flex flex-col justify-between hover:border-[#A9563B] hover:shadow-md transition-all duration-300"
            >
              <div>
                <Quote className="w-6 h-6 text-[#A9563B]/40 mb-4" />
                <p className="text-sm text-[#272923] leading-relaxed italic mb-6">
                  "{language === 'ta' ? item.quoteTa : item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1]">
                <div className="font-serif text-base font-semibold text-[#272923]">
                  {language === 'ta' ? item.authorTa : item.author}
                </div>
                <div className="text-xs text-[#77766F] font-mono mt-0.5">
                  {language === 'ta' ? item.roleOrProjectTa : item.roleOrProject} · {language === 'ta' ? item.locationTa : item.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
