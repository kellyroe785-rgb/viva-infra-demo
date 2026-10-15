import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, ArrowRight, ShieldCheck, Ruler, Calendar, MapPin, Compass, Image as ImageIcon, Box } from 'lucide-react';
import { Project } from '../types';
import { repository } from '../lib/supabase/repository';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectVisual } from '../components/projects/ProjectVisual';

interface ProjectDetailPageProps {
  slug: string;
  navigate: (route: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, navigate }) => {
  const { language, t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'photo' | 'cad'>('photo');

  useEffect(() => {
    let mounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setActiveImageIndex(0);
    setActiveTab('photo');

    repository.getProjectBySlug(slug).then((data) => {
      if (mounted) {
        setProject(data);
        if (data) {
          repository.getProjects(data.category).then((allInCat) => {
            if (mounted) {
              setRelatedProjects(allInCat.filter((p) => p.slug !== data.slug).slice(0, 3));
            }
          });
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#77766F] font-mono">Loading project blueprint...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] bg-[#F8F7F2] flex items-center justify-center py-16 px-4">
        <div className="max-w-md text-center bg-white border border-[#E6E1D8] p-8">
          <Compass className="w-12 h-12 text-[#A9563B] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-medium text-[#272923] mb-2">Project Not Found</h2>
          <p className="text-xs text-[#77766F] leading-relaxed mb-6">
            The project blueprint you are looking for does not exist in the active catalog or has been moved.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#272923] hover:bg-[#A9563B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.projectDetail.backToProjects}</span>
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.heroImage];
  const activeImage = galleryImages[activeImageIndex] || project.heroImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#F8F7F2] min-h-screen py-10 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#272923] hover:text-[#A9563B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.projectDetail.backToProjects}</span>
          </button>

          <span className="text-[11px] font-mono text-[#A9563B] bg-white border border-[#E6E1D8] px-3 py-1">
            {t.projectDetail.sampleBadge}
          </span>
        </div>

        {/* Project Header Lockup */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#77766F] uppercase mb-3">
            <span className="text-[#A9563B] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ta' ? project.statusLabel.ta : project.statusLabel.en}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'ta' ? project.locationTa : project.location}</span>
            <span aria-hidden="true">·</span>
            <span>Year {project.year}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#272923] leading-tight mb-4">
            {language === 'ta' ? project.titleTa : project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#55564E] leading-relaxed max-w-3xl">
            {language === 'ta' ? project.summaryTa : project.summary}
          </p>
        </div>

        {/* Media Showcase: Photorealistic Photography Gallery with Mode Switcher */}
        <div className="mb-14 bg-white border border-[#E6E1D8] p-3 sm:p-5 shadow-xs">
          {/* Top Controls: Switcher between High-Res Photos and CAD Blueprint */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0ECE1]">
            <div className="text-xs font-mono text-[#77766F] uppercase">
              Architectural Visual Showcase · {project.title}
            </div>

            <div className="inline-flex items-center bg-[#F8F7F2] border border-[#E6E1D8] p-1">
              <button
                onClick={() => setActiveTab('photo')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'photo' ? 'bg-[#272923] text-white shadow-xs' : 'text-[#77766F] hover:text-[#272923]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photorealistic Gallery</span>
              </button>
              <button
                onClick={() => setActiveTab('cad')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'cad' ? 'bg-[#272923] text-white shadow-xs' : 'text-[#77766F] hover:text-[#272923]'
                }`}
              >
                <Ruler className="w-3.5 h-3.5 text-[#A9563B]" />
                <span>CAD Elevation Plan</span>
              </button>
            </div>
          </div>

          {/* Main Visual Display */}
          <AnimatePresence mode="wait">
            {activeTab === 'photo' ? (
              <motion.div
                key={`photo-${activeImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full aspect-video sm:aspect-[21/9] bg-[#272923] overflow-hidden group"
              >
                <img
                  src={activeImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono pointer-events-none">
                  <span>PLATE 0{activeImageIndex + 1} — ARCHITECTURAL PERSPECTIVE</span>
                  <span>{project.specifications.builtUpArea}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cad-plan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectVisual project={project} aspect="16:9" allowCadToggle={false} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Thumbnails Strip (When in Photo mode and multiple images exist) */}
          {activeTab === 'photo' && galleryImages.length > 1 && (
            <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 h-16 sm:h-20 shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#A9563B] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] font-mono text-white px-1">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Content Split: Narrative & Scope vs Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left Column: Narrative & Scope */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#272923] mb-4 pb-2 border-b border-[#E6E1D8]">
                {t.projectDetail.projectOverview}
              </h2>
              <p className="text-sm sm:text-base text-[#55564E] leading-relaxed whitespace-pre-line">
                {language === 'ta' ? project.descriptionTa : project.description}
              </p>
            </div>

            {/* Scope of Work */}
            <div>
              <h3 className="font-serif text-xl font-medium text-[#272923] mb-4 pb-2 border-b border-[#E6E1D8]">
                {t.projectDetail.architecturalScope}
              </h3>
              <ul className="space-y-3">
                {(language === 'ta' ? project.scopeTa : project.scope).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#272923]">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-[#A9563B]/10 flex items-center justify-center shrink-0 text-[#A9563B]">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Technical Specifications Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E6E1D8] p-6 sm:p-8 shadow-xs sticky top-24">
              <h3 className="font-serif text-xl font-semibold text-[#272923] mb-6 pb-3 border-b border-[#E6E1D8] flex items-center justify-between">
                <span>{t.projectDetail.technicalSpecifications}</span>
                <Ruler className="w-4 h-4 text-[#A9563B]" />
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                  <span className="text-[#77766F] font-medium">{t.projectDetail.plotArea}</span>
                  <span className="font-mono font-semibold text-[#272923]">{project.specifications.plotArea}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                  <span className="text-[#77766F] font-medium">{t.projectDetail.builtUpArea}</span>
                  <span className="font-mono font-semibold text-[#272923]">{project.specifications.builtUpArea}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                  <span className="text-[#77766F] font-medium">{t.projectDetail.floors}</span>
                  <span className="font-mono text-[#272923]">{project.specifications.floors}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                  <span className="text-[#77766F] font-medium">{t.projectDetail.structuralSystem}</span>
                  <span className="text-right font-medium text-[#272923] max-w-[180px]">{project.specifications.structuralSystem}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                  <span className="text-[#77766F] font-medium">{t.projectDetail.timeline}</span>
                  <span className="font-mono text-[#A9563B] font-semibold">{project.specifications.timeline}</span>
                </div>

                {project.specifications.energyRating && (
                  <div className="flex items-center justify-between py-2 border-b border-[#F0ECE1]">
                    <span className="text-[#77766F] font-medium">{t.projectDetail.energyRating}</span>
                    <span className="text-right text-[#68715A] font-medium max-w-[180px]">{project.specifications.energyRating}</span>
                  </div>
                )}
              </div>

              {/* Consultation Inquire Box */}
              <div className="mt-8 pt-6 border-t border-[#E6E1D8] bg-[#F8F7F2] p-4 text-center">
                <h4 className="font-serif text-base font-semibold text-[#272923] mb-1.5">
                  {t.projectDetail.interestedTitle}
                </h4>
                <p className="text-xs text-[#77766F] leading-relaxed mb-4">
                  {t.projectDetail.interestedDesc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/contact')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] transition-colors cursor-pointer shadow-sm"
                >
                  <span>{t.projectDetail.inquireButton}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-[#E6E1D8]">
            <h3 className="font-serif text-2xl font-normal text-[#272923] mb-8">
              {t.projectDetail.relatedProjects}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-[#E6E1D8] overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/projects/${rel.slug}`)}
                >
                  <div className="w-full h-48 overflow-hidden bg-[#EAE5DA]">
                    <img
                      src={rel.heroImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] font-mono text-[#A9563B] uppercase mb-1">
                        {rel.category} · {rel.specifications.builtUpArea}
                      </div>
                      <h4 className="font-serif text-lg font-medium text-[#272923] group-hover:text-[#A9563B] transition-colors mb-2">
                        {language === 'ta' ? rel.titleTa : rel.title}
                      </h4>
                    </div>
                    <div className="text-xs text-[#77766F] font-mono pt-3 border-t border-[#F0ECE1]">
                      {language === 'ta' ? rel.locationTa : rel.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
