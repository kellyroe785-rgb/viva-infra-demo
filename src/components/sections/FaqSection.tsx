import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { FAQItem } from '../../types';
import { repository } from '../../lib/supabase/repository';

export const FaqSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    repository.getFaqs().then((data) => {
      if (mounted) {
        setFaqs(data);
        if (data.length > 0) {
          setOpenId(data[0].id);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="bg-white py-20 border-b border-[#E6E1D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            {t.faq.kicker}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.faq.heading}
          </h2>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.faq.subheading}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.faq.categoryAll },
            { id: 'costing', label: t.faq.categoryCosting },
            { id: 'process', label: t.faq.categoryProcess },
            { id: 'approvals', label: t.faq.categoryApprovals },
            { id: 'quality', label: t.faq.categoryQuality },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#272923] text-white border-[#272923]'
                  : 'bg-[#F8F7F2] text-[#272923] border-[#E6E1D8] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#E6E1D8] bg-[#F8F7F2] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#272923] pr-2">
                    {language === 'ta' ? faq.questionTa : faq.question}
                  </span>
                  <span className="shrink-0 p-1 rounded-xs bg-white border border-[#E6E1D8] text-[#A9563B]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 text-sm text-[#55564E] leading-relaxed border-t border-[#E6E1D8]/60 bg-white">
                        <p>{language === 'ta' ? faq.answerTa : faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
