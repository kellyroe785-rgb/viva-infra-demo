import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, RotateCcw, ArrowUpRight, Compass, Building, Hammer } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { repository } from '../lib/supabase/repository';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectVisual } from '../components/projects/ProjectVisual';

interface ProjectsPageProps {
  navigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    repository.getProjects().then((data) => {
      if (mounted) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesEn =
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.architecturalStyle.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q);
        const matchesTa =
          p.titleTa.toLowerCase().includes(q) ||
          p.locationTa.toLowerCase().includes(q) ||
          p.architecturalStyleTa.toLowerCase().includes(q) ||
          p.summaryTa.toLowerCase().includes(q);
        return matchesEn || matchesTa;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-2">
            Viva Infra Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.projectsPage.title}
          </h1>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.projectsPage.subtitle}
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-[#E6E1D8] p-5 mb-10 shadow-xs space-y-4"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#77766F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.projectsPage.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 text-xs text-[#272923] bg-[#F8F7F2] border border-[#E6E1D8] focus:outline-hidden focus:border-[#A9563B] placeholder-[#77766F]"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#77766F] whitespace-nowrap">
                Status:
              </span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs text-[#272923] bg-[#F8F7F2] border border-[#E6E1D8] px-3 py-2 focus:outline-hidden focus:border-[#A9563B] cursor-pointer"
              >
                <option value="all">{t.projectsPage.statusAll}</option>
                <option value="completed">{t.projectsPage.statusCompleted}</option>
                <option value="in_progress">{t.projectsPage.statusInProgress}</option>
                <option value="concept">{t.projectsPage.statusConcept}</option>
              </select>
            </div>
          </div>

          {/* Category Tabs & Reset Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0ECE1]">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: t.projectsPage.filterAll },
                { id: 'residential', label: t.projectsPage.filterResidential },
                { id: 'commercial', label: t.projectsPage.filterCommercial },
                { id: 'renovation', label: t.projectsPage.filterRenovation },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#272923] text-white border-[#272923]'
                      : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#77766F]">
              <span className="font-mono tabular-nums">
                {filteredProjects.length} {t.projectsPage.resultsCount}
              </span>

              {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery !== '') && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[#A9563B] hover:text-[#85432F] font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.projectsPage.resetFilters}</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Grid with Staggered Motion */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#77766F] font-mono">Loading projects catalog...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-[#E6E1D8] p-12 text-center max-w-lg mx-auto"
          >
            <Compass className="w-10 h-10 text-[#77766F] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-2xl font-medium text-[#272923] mb-2">
              {t.projectsPage.noResultsTitle}
            </h3>
            <p className="text-xs text-[#77766F] leading-relaxed mb-6">
              {t.projectsPage.noResultsDesc}
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.projectsPage.resetFilters}</span>
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                  className="bg-white border border-[#E6E1D8] flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                >
                  <div className="overflow-hidden">
                    <ProjectVisual project={project} aspect="4:3" />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      {/* Unboxed metadata line */}
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#77766F] uppercase mb-2">
                        <span className="text-[#A9563B] font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.specifications.builtUpArea}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      <h3 className="font-serif text-xl font-medium text-[#272923] group-hover:text-[#A9563B] transition-colors mb-2">
                        {language === 'ta' ? project.titleTa : project.title}
                      </h3>

                      <p className="text-xs text-[#55564E] leading-relaxed line-clamp-3 mb-4">
                        {language === 'ta' ? project.summaryTa : project.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                      <span className="text-[#77766F] text-[11px] font-mono">
                        {language === 'ta' ? project.locationTa : project.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#A9563B] font-semibold group-hover:translate-x-1 transition-transform">
                        <span>{t.featuredProjects.viewProject}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Project Consultation Inquiries Strip */}
        <div className="mt-16 bg-[#272923] text-white p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#3A3D35]">
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl font-medium mb-1">
              Have an upcoming site or plot development?
            </h3>
            <p className="text-xs text-[#A8A7A0]">
              Our engineering directors review land contours, zoning bylaws, and structural feasibility.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors cursor-pointer shrink-0"
          >
            <span>{t.ctaSection.buttonText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
