import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { MetricsSection } from '../components/sections/MetricsSection';
import { FeaturedProjectsSection } from '../components/sections/FeaturedProjectsSection';
import { ServicesOverviewSection } from '../components/sections/ServicesOverviewSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { DifferentiatorsSection } from '../components/sections/DifferentiatorsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaBannerSection } from '../components/sections/CtaBannerSection';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div>
      <HeroSection navigate={navigate} />
      <MetricsSection />
      <FeaturedProjectsSection navigate={navigate} />
      <ServicesOverviewSection navigate={navigate} />
      <ProcessSection />
      <DifferentiatorsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection navigate={navigate} />
    </div>
  );
};
