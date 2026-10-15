import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Layers, FileCheck, Award, ArrowRight, UserCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { TeamMember } from '../types';
import { repository } from '../lib/supabase/repository';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    let mounted = true;
    repository.getTeamMembers().then((data) => {
      if (mounted) {
        setTeamMembers(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

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
            Practice & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.aboutPage.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#55564E] leading-relaxed">
            {t.aboutPage.subtitle}
          </p>
        </motion.div>

        {/* Studio Photographic Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className="relative h-72 sm:h-96 overflow-hidden border border-[#E6E1D8] group">
            <img
              src="/images/about/studio_practice.jpg"
              alt="Viva Infra Structural Site Engineering"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs font-mono text-[#FDBA74] uppercase block">Engineering Oversight</span>
              <p className="font-serif text-lg text-white">On-site structural supervision & material quality verification</p>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 overflow-hidden border border-[#E6E1D8] group">
            <img
              src="/images/about/craftsmanship.jpg"
              alt="Viva Infra Architectural Detail & Craftsmanship"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs font-mono text-[#FDBA74] uppercase block">Architectural Distinction</span>
              <p className="font-serif text-lg text-white">Bespoke timber joinery, textured finishes, and daylight modulation</p>
            </div>
          </div>
        </motion.div>

        {/* Operating Philosophy Bento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#E6E1D8] p-8 lg:p-12 mb-16 shadow-xs"
        >
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
              Integrated Design-Build
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#272923] mb-4">
              {t.aboutPage.philosophyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#55564E] leading-relaxed mb-8">
              {t.aboutPage.philosophyBody}
            </p>
          </div>

          {/* 3 Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E6E1D8]">
            <div className="space-y-2">
              <div className="w-9 h-9 bg-[#F8F7F2] border border-[#E6E1D8] flex items-center justify-center text-[#A9563B] mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#272923]">
                {t.aboutPage.principle1Title}
              </h3>
              <p className="text-xs text-[#55564E] leading-relaxed">
                {t.aboutPage.principle1Desc}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 bg-[#F8F7F2] border border-[#E6E1D8] flex items-center justify-center text-[#68715A] mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#272923]">
                {t.aboutPage.principle2Title}
              </h3>
              <p className="text-xs text-[#55564E] leading-relaxed">
                {t.aboutPage.principle2Desc}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 bg-[#F8F7F2] border border-[#E6E1D8] flex items-center justify-center text-[#85432F] mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#272923]">
                {t.aboutPage.principle3Title}
              </h3>
              <p className="text-xs text-[#55564E] leading-relaxed">
                {t.aboutPage.principle3Desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Leadership & Engineering Section */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
              Organizational Blueprint
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#272923] mb-2">
              {t.aboutPage.teamTitle}
            </h2>
            <p className="text-sm text-[#55564E]">
              {t.aboutPage.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#E6E1D8] p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Architectural Monogram Avatar */}
                  <div className="w-16 h-16 bg-[#F8F7F2] border border-[#E6E1D8] flex items-center justify-center mb-5 text-[#272923] font-serif text-xl font-bold">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#272923] mb-1">
                    {language === 'ta' ? member.nameTa : member.name}
                  </h3>

                  <div className="text-xs text-[#A9563B] font-mono mb-3">
                    {language === 'ta' ? member.roleTa : member.role}
                  </div>

                  <p className="text-xs text-[#55564E] leading-relaxed mb-4">
                    {language === 'ta' ? member.bioTa : member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE1] text-[11px] font-mono text-[#77766F] space-y-1">
                  <div>{member.credentials}</div>
                  <div className="text-[#68715A]">{member.experienceYears}+ Years Practical Experience</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-[#272923] text-white p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl font-medium mb-1">
              Have a plot and looking for an architectural brief?
            </h3>
            <p className="text-xs text-[#A8A7A0]">
              Schedule a site review with our architectural and engineering directors.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors cursor-pointer shrink-0"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
