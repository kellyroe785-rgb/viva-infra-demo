import React from 'react';
import { Compass, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NotFoundPageProps {
  navigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[75vh] bg-[#F8F7F2] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white border border-[#E6E1D8] p-10 text-center shadow-xs">
        <Compass className="w-12 h-12 text-[#A9563B] mx-auto mb-4" />
        <span className="text-xs font-mono text-[#A9563B] uppercase tracking-wider block mb-1">
          Error 404
        </span>
        <h1 className="font-serif text-3xl font-medium text-[#272923] mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-[#55564E] leading-relaxed mb-6">
          The architectural route you are navigating to does not exist or has been restructured.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#272923] hover:bg-[#A9563B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
