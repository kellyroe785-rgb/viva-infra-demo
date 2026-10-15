import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Shield, Box, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ArchitecturalScene } from '../three/ArchitecturalScene';

interface HeroSectionProps {
  navigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | '3d'>('photo');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative bg-[#F8F7F2] border-b border-[#E6E1D8] pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Architectural Kicker & Context Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E6E1D8]"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-[#77766F] uppercase tracking-wider">
            <span className="text-[#A9563B] font-semibold">Viva Infra</span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.kicker}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Tamil Nadu, India</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#77766F]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#A9563B]" />
              {t.hero.badgeResidential}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#68715A]" />
              {t.hero.badgeCommercial}
            </span>
          </div>
        </motion.div>

        {/* 2-Column Split: Editorial Value Proposition + Media Viewer (Photo + 3D) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left Column: Animated Headline, Value Prop & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pr-2"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-[#272923] leading-[1.12] [text-wrap:balance]">
                {t.hero.headline}
              </h1>
              <p className="text-base sm:text-lg text-[#55564E] leading-relaxed font-normal max-w-xl">
                {t.hero.subhead}
              </p>
            </motion.div>

            {/* CTAs with hover and press motion */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors cursor-pointer shadow-sm group"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/projects')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#272923] bg-white border border-[#E6E1D8] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
              </motion.button>
            </motion.div>

            {/* Architecture Standard Proof Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-[#E6E1D8] grid grid-cols-2 gap-4"
            >
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#272923] tabular-nums">
                  100% BOQ
                </div>
                <div className="text-xs text-[#77766F] font-medium mt-0.5">
                  Itemized Cost Certainty
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#272923] tabular-nums">
                  10-Yr Warranty
                </div>
                <div className="text-xs text-[#77766F] font-medium mt-0.5">
                  RCC Structural Guarantee
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Container (Photorealistic Photography + 3D Studio Switcher) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-7 w-full relative"
          >
            {/* Media Mode Segmented Switcher (Zero-Pill Discipline: Clean Tabbed Control) */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono text-[#77766F] uppercase tracking-wider">
                Architectural Showcase
              </span>

              <div className="inline-flex items-center bg-white border border-[#E6E1D8] p-1 shadow-xs">
                <button
                  onClick={() => setActiveMediaTab('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    activeMediaTab === 'photo'
                      ? 'bg-[#272923] text-white shadow-xs'
                      : 'text-[#77766F] hover:text-[#272923]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Real Photography</span>
                </button>

                <button
                  onClick={() => setActiveMediaTab('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    activeMediaTab === '3d'
                      ? 'bg-[#272923] text-white shadow-xs'
                      : 'text-[#77766F] hover:text-[#272923]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-[#A9563B]" />
                  <span>Interactive 3D Model</span>
                </button>
              </div>
            </div>

            {/* Media Canvas / Container */}
            <div className="relative border border-[#E6E1D8] bg-white shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                {activeMediaTab === 'photo' ? (
                  <motion.div
                    key="hero-photo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] overflow-hidden group"
                  >
                    <motion.img
                      src="/images/hero/hero_modern_villa.jpg"
                      alt="Contemporary Indian Luxury Villa by Viva Infra"
                      loading="eager"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to secondary image if needed
                        (e.target as HTMLImageElement).src = '/images/projects/proj_01_main.jpg';
                      }}
                    />

                    {/* Gradient Scrim for Architectural Tone */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Architectural Caption Box */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white pointer-events-none">
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono text-[#FDBA74] tracking-wider uppercase">
                          Featured Architecture · Residence
                        </div>
                        <h3 className="font-serif text-2xl font-normal text-white drop-shadow-sm">
                          The Courtyard Villa Residency
                        </h3>
                        <p className="text-xs text-white/80 max-w-md font-light">
                          Cast-in-situ concrete cantilever, seasoned teak louvers, and private water atrium in Anna Nagar, Chennai.
                        </p>
                      </div>

                      <div className="bg-black/60 backdrop-blur-xs px-3 py-1.5 border border-white/15 text-[11px] font-mono text-white/90 shrink-0">
                        Built-Up: 4,850 sq.ft
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero-3d"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full"
                  >
                    <ArchitecturalScene />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Supporting Architectural Philosophy Ribbon with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#E6E1D8] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs"
        >
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider">
              01. Climate Responsive
            </span>
            <h4 className="font-serif text-lg font-medium text-[#272923]">
              Thermal Comfort & Daylight
            </h4>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Every building orientation is calculated for cross-ventilation, deep overhangs, and natural light harvesting.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider">
              02. Engineered Permanence
            </span>
            <h4 className="font-serif text-lg font-medium text-[#272923]">
              Seismic Rigor & NDT Testing
            </h4>
            <p className="text-xs text-[#77766F] leading-relaxed">
              Independent laboratory cube testing for every concrete pour and certified high-yield steel reinforcement.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider">
              03. Single-Point Turnkey
            </span>
            <h4 className="font-serif text-lg font-medium text-[#272923]">
              Contractual Transparency
            </h4>
            <p className="text-xs text-[#77766F] leading-relaxed">
              One responsible partner coordinating architectural design, civil execution, approvals, and interior millwork.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
