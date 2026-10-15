import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { repository } from '../../lib/supabase/repository';
import { useLanguage } from '../../i18n/LanguageContext';
import { ProjectVisual } from '../projects/ProjectVisual';

interface FeaturedProjectsSectionProps {
  navigate: (route: string) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    repository.getFeaturedProjects().then((data) => {
      if (mounted) {
        setFeaturedProjects(data.slice(0, 4));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-20 border-b border-[#E6E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
              {t.featuredProjects.kicker}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#272923] leading-tight">
              {t.featuredProjects.heading}
            </h2>
            <p className="mt-3 text-base text-[#55564E] leading-relaxed">
              {t.featuredProjects.subheading}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#272923] border border-[#E6E1D8] bg-[#F8F7F2] hover:bg-[#272923] hover:text-white transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>{t.featuredProjects.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>

        {/* Projects Grid: 2 Marquee Projects on top, 2 secondary in row */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#77766F] font-mono">Loading featured projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="bg-[#F8F7F2] border border-[#E6E1D8] overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <div className="relative overflow-hidden">
                  <ProjectVisual project={project} aspect="16:9" />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Unboxed Metadata with · separator (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#77766F] mb-2 uppercase">
                      <span className="text-[#A9563B] font-semibold">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{language === 'ta' ? project.locationTa : project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.specifications.builtUpArea}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#272923] group-hover:text-[#A9563B] transition-colors mb-3">
                      {language === 'ta' ? project.titleTa : project.title}
                    </h3>

                    <p className="text-sm text-[#55564E] leading-relaxed mb-6">
                      {language === 'ta' ? project.summaryTa : project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between text-xs">
                    <span className="text-[#77766F] font-mono">
                      {language === 'ta' ? project.architecturalStyleTa : project.architecturalStyle}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#A9563B] group-hover:translate-x-1.5 transition-transform">
                      <span>{t.featuredProjects.viewProject}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
