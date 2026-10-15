import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Layers, Image as ImageIcon } from 'lucide-react';
import { Project } from '../../types';

interface ProjectVisualProps {
  project: Project;
  aspect?: '16:9' | '4:3' | '3:2' | 'auto';
  className?: string;
  showBadge?: boolean;
  priorityImage?: string;
  allowCadToggle?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  project,
  aspect = '4:3',
  className = '',
  showBadge = true,
  priorityImage,
  allowCadToggle = true,
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'cad'>('photo');
  const [imgError, setImgError] = useState<boolean>(false);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const aspectClass =
    aspect === '16:9'
      ? 'aspect-video'
      : aspect === '3:2'
      ? 'aspect-[3/2]'
      : aspect === 'auto'
      ? ''
      : 'aspect-[4/3]';

  const imageUrl = priorityImage || project.heroImage;

  return (
    <div
      className={`relative w-full ${aspectClass} bg-[#F4EFE6] border border-[#E6E1D8] overflow-hidden group select-none flex items-center justify-center ${className}`}
    >
      <AnimatePresence mode="wait">
        {viewMode === 'photo' && !imgError ? (
          <motion.div
            key="photo-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full relative overflow-hidden"
          >
            {/* Subtle loading shimmer */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-[#EFE9DC] animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <motion.img
              src={imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Architectural Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ) : (
          /* Technical CAD Elevation Blueprint Mode or Fallback */
          <motion.div
            key="cad-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full relative flex items-center justify-center bg-[#F3EFE6]"
          >
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #D8D1C2 1px, transparent 1px), linear-gradient(to bottom, #D8D1C2 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <svg
              className="w-full h-full p-6 text-[#272923]"
              viewBox="0 0 360 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Baseline */}
              <line x1="20" y1="200" x2="340" y2="200" stroke="#272923" strokeWidth="1.8" />
              <line x1="16" y1="204" x2="344" y2="204" stroke="#77766F" strokeWidth="0.8" strokeDasharray="4 2" />

              {/* Massing */}
              <rect x="55" y="115" width="155" height="77" fill="#FFFFFF" stroke="#272923" strokeWidth="1.4" />
              <rect x="210" y="125" width="95" height="67" fill="#A9563B" fillOpacity="0.15" stroke="#A9563B" strokeWidth="1.2" />
              <rect x="40" y="48" width="185" height="67" fill="#FFFFFF" stroke="#272923" strokeWidth="1.5" />
              <rect x="225" y="70" width="80" height="45" fill="#D8E8F5" fillOpacity="0.5" stroke="#68715A" strokeWidth="1" />
              <rect x="30" y="42" width="205" height="6" fill="#272923" />

              {/* Louvers */}
              {[65, 80, 95, 110, 125, 140].map((lx) => (
                <line key={lx} x1={lx} y1="52" x2={lx} y2="108" stroke="#A9563B" strokeWidth="1.8" />
              ))}

              <g stroke="#77766F" strokeWidth="0.6">
                <line x1="30" y1="216" x2="330" y2="216" />
                <line x1="30" y1="212" x2="30" y2="220" />
                <line x1="330" y1="212" x2="330" y2="220" />
              </g>
              <text
                x="180"
                y="228"
                fill="#77766F"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                letterSpacing="1"
              >
                ELEVATION · {project.specifications.builtUpArea} · {project.specifications.structuralSystem.split(' ')[0]}
              </text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left Badge: Clean unboxed metadata */}
      {showBadge && (
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono text-white/90 border border-white/10 z-10">
          <span className="text-[#FDBA74] font-semibold">{project.year}</span> · {project.category.toUpperCase()}
        </div>
      )}

      {/* Interactive Toggle Pill (Photo vs CAD) - Only on project detail or interactive card */}
      {allowCadToggle && !imgError && (
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/75 backdrop-blur-xs border border-white/15 p-0.5 rounded flex items-center text-[10px] font-mono text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('photo');
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === 'photo' ? 'bg-[#A9563B] text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              Photo
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('cad');
              }}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === 'cad' ? 'bg-[#A9563B] text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              CAD
            </button>
          </div>
        </div>
      )}

      {/* Bottom Right Architectural Style Tag */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white/95 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border border-white/10 z-10 pointer-events-none">
        {project.architecturalStyle}
      </div>
    </div>
  );
};
