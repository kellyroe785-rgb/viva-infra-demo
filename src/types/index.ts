export type Language = 'en' | 'ta';

export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'renovation';

export type ProjectStatus = 'completed' | 'in_progress' | 'concept';

export interface ProjectSpecification {
  plotArea: string;
  builtUpArea: string;
  floors: string;
  structuralSystem: string;
  timeline: string;
  energyRating?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  titleTa: string;
  category: 'residential' | 'commercial' | 'renovation';
  status: ProjectStatus;
  statusLabel: {
    en: string;
    ta: string;
  };
  location: string;
  locationTa: string;
  summary: string;
  summaryTa: string;
  description: string;
  descriptionTa: string;
  scope: string[];
  scopeTa: string[];
  specifications: ProjectSpecification;
  architecturalStyle: string;
  architecturalStyleTa: string;
  accentColor: string;
  featured: boolean;
  year: number;
  heroImage: string;
  gallery: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  titleTa: string;
  shortDesc: string;
  shortDescTa: string;
  fullDesc: string;
  fullDescTa: string;
  targetAudience: string;
  targetAudienceTa: string;
  scopeItems: string[];
  scopeItemsTa: string[];
  deliverables: string[];
  deliverablesTa: string[];
  typicalTimeline: string;
  typicalTimelineTa: string;
  iconName: 'home' | 'building' | 'hammer' | 'layers' | 'compass' | 'shield';
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  bio: string;
  bioTa: string;
  experienceYears: number;
  credentials: string;
  isDemoProfile: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  authorTa: string;
  roleOrProject: string;
  roleOrProjectTa: string;
  location: string;
  locationTa: string;
  quote: string;
  quoteTa: string;
  year: number;
  projectType: string;
  isDemoReview: boolean;
}

export interface FAQItem {
  id: string;
  category: 'process' | 'costing' | 'approvals' | 'quality';
  question: string;
  questionTa: string;
  answer: string;
  answerTa: string;
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: 'residential' | 'commercial' | 'renovation' | 'villa';
  projectLocation: string;
  approximateBudget: string;
  expectedTimeline: string;
  requirements: string;
  consent: boolean;
}

export interface EnquirySubmissionResult {
  success: boolean;
  message: string;
  messageTa: string;
  isDemoMode: boolean;
  submissionId?: string;
  errors?: Record<string, string>;
}
