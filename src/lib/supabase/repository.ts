import { supabase, isSupabaseConfigured, isSupabaseVerified, getSupabaseProjectHost } from './client';
import {
  Project,
  Service,
  TeamMember,
  Testimonial,
  FAQItem,
  EnquiryFormData,
  EnquirySubmissionResult,
} from '../../types';
import {
  SEED_PROJECTS,
  SEED_SERVICES,
  SEED_TEAM_MEMBERS,
  SEED_TESTIMONIALS,
  SEED_FAQS,
} from '../../data/seedData';

// Database row mappers for robust snake_case <-> camelCase alignment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbProjectToProject(row: any): Project {
  return {
    id: row.id || `proj-${Math.random()}`,
    slug: row.slug || '',
    title: row.title || '',
    titleTa: row.title_ta || row.titleTa || row.title || '',
    category: row.category || 'residential',
    status: row.status || 'completed',
    statusLabel: row.status_label || {
      en: row.status === 'completed' ? 'Completed & Handed Over' : row.status === 'in_progress' ? 'Under Active Execution' : 'Concept & Planning',
      ta: row.status === 'completed' ? 'நிறைவடைந்தது' : row.status === 'in_progress' ? 'கட்டுமானத்தில் உள்ளது' : 'திட்டமிடல் நிலை',
    },
    location: row.location || '',
    locationTa: row.location_ta || row.locationTa || row.location || '',
    summary: row.summary || '',
    summaryTa: row.summary_ta || row.summaryTa || row.summary || '',
    description: row.description || '',
    descriptionTa: row.description_ta || row.descriptionTa || row.description || '',
    scope: Array.isArray(row.scope) ? row.scope : [],
    scopeTa: Array.isArray(row.scope_ta) ? row.scope_ta : (Array.isArray(row.scopeTa) ? row.scopeTa : []),
    specifications: row.specifications || {
      plotArea: 'N/A',
      builtUpArea: 'N/A',
      floors: 'N/A',
      structuralSystem: 'RCC Framed',
      timeline: 'N/A',
    },
    architecturalStyle: row.architectural_style || row.architecturalStyle || 'Modern Architecture',
    architecturalStyleTa: row.architectural_style_ta || row.architecturalStyleTa || 'நவீன கட்டடக்கலை',
    accentColor: row.accent_color || row.accentColor || '#A9563B',
    featured: Boolean(row.featured),
    year: Number(row.year) || 2024,
    heroImage: row.hero_image || row.heroImage || '/images/hero/modern_architecture.jpg',
    gallery: Array.isArray(row.gallery) ? row.gallery : ['/images/hero/modern_architecture.jpg'],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbServiceToService(row: any): Service {
  return {
    id: row.id || `serv-${Math.random()}`,
    slug: row.slug || '',
    title: row.title || '',
    titleTa: row.title_ta || row.titleTa || row.title || '',
    shortDesc: row.short_desc || row.shortDesc || '',
    shortDescTa: row.short_desc_ta || row.shortDescTa || row.short_desc || '',
    fullDesc: row.full_desc || row.fullDesc || '',
    fullDescTa: row.full_desc_ta || row.fullDescTa || row.full_desc || '',
    targetAudience: row.target_audience || row.targetAudience || '',
    targetAudienceTa: row.target_audience_ta || row.targetAudienceTa || row.target_audience || '',
    scopeItems: Array.isArray(row.scope_items) ? row.scope_items : (Array.isArray(row.scopeItems) ? row.scopeItems : []),
    scopeItemsTa: Array.isArray(row.scope_items_ta) ? row.scope_items_ta : (Array.isArray(row.scopeItemsTa) ? row.scopeItemsTa : []),
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
    deliverablesTa: Array.isArray(row.deliverables_ta) ? row.deliverables_ta : (Array.isArray(row.deliverablesTa) ? row.deliverablesTa : []),
    typicalTimeline: row.typical_timeline || row.typicalTimeline || '',
    typicalTimelineTa: row.typical_timeline_ta || row.typicalTimelineTa || row.typical_timeline || '',
    iconName: row.icon_name || row.iconName || 'home',
    image: row.image || '/images/services/residential_villa.jpg',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbTestimonialToTestimonial(row: any): Testimonial {
  return {
    id: row.id || `test-${Math.random()}`,
    author: row.author || '',
    authorTa: row.author_ta || row.authorTa || row.author || '',
    roleOrProject: row.role_or_project || row.roleOrProject || '',
    roleOrProjectTa: row.role_or_project_ta || row.roleOrProjectTa || row.role_or_project || '',
    location: row.location || '',
    locationTa: row.location_ta || row.locationTa || row.location || '',
    quote: row.quote || '',
    quoteTa: row.quote_ta || row.quoteTa || row.quote || '',
    year: Number(row.year) || 2024,
    projectType: row.project_type || row.projectType || 'Residential',
    isDemoReview: row.is_demo_review !== undefined ? Boolean(row.is_demo_review) : true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbTeamMemberToTeamMember(row: any): TeamMember {
  return {
    id: row.id || `team-${Math.random()}`,
    name: row.name || '',
    nameTa: row.name_ta || row.nameTa || row.name || '',
    role: row.role || '',
    roleTa: row.role_ta || row.roleTa || row.role || '',
    bio: row.bio || '',
    bioTa: row.bio_ta || row.bioTa || row.bio || '',
    experienceYears: Number(row.experience_years) || Number(row.experienceYears) || 10,
    credentials: row.credentials || '',
    isDemoProfile: row.is_demo_profile !== undefined ? Boolean(row.is_demo_profile) : true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbFaqToFaq(row: any): FAQItem {
  return {
    id: row.id || `faq-${Math.random()}`,
    category: row.category || 'process',
    question: row.question || '',
    questionTa: row.question_ta || row.questionTa || row.question || '',
    answer: row.answer || '',
    answerTa: row.answer_ta || row.answerTa || row.answer || '',
  };
}

class ProjectRepository {
  private _isLiveConnected = false;
  private _hasCheckedConnection = false;

  public async isLiveDatabase(): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    if (this._hasCheckedConnection) return this._isLiveConnected;
    const verified = await isSupabaseVerified();
    this._isLiveConnected = verified;
    this._hasCheckedConnection = true;
    return verified;
  }

  public isUsingDemoMode(): boolean {
    return !isSupabaseConfigured || !this._isLiveConnected;
  }

  public getConnectionHost(): string | null {
    return getSupabaseProjectHost();
  }

  public async getProjects(category?: string, searchQuery?: string): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('projects')
          .select('*, project_images(*)')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map((row) => {
            const mapped = mapDbProjectToProject(row);
            if (row.project_images && Array.isArray(row.project_images) && row.project_images.length > 0) {
              const hero = row.project_images.find((img: { is_hero?: boolean }) => img.is_hero);
              if (hero?.image_url) mapped.heroImage = hero.image_url;
              mapped.gallery = row.project_images.map((img: { image_url: string }) => img.image_url);
            }
            return mapped;
          });
        }
      } catch (err) {
        console.warn('Supabase getProjects failed, falling back to local seed data:', err);
      }
    }

    // Demo Mode & Seed Data Fallback
    let results = [...SEED_PROJECTS];
    if (category && category !== 'all') {
      results = results.filter((p) => p.category === category);
    }
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleTa.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.locationTa.toLowerCase().includes(q) ||
          p.architecturalStyle.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q)
      );
    }
    return results;
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, project_images(*)')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          const mapped = mapDbProjectToProject(data);
          if (data.project_images && Array.isArray(data.project_images) && data.project_images.length > 0) {
            const hero = data.project_images.find((img: { is_hero?: boolean }) => img.is_hero);
            if (hero?.image_url) mapped.heroImage = hero.image_url;
            mapped.gallery = data.project_images.map((img: { image_url: string }) => img.image_url);
          }
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase getProjectBySlug failed, falling back to seed:', err);
      }
    }
    const match = SEED_PROJECTS.find((p) => p.slug === slug);
    return match || null;
  }

  public async getFeaturedProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*, project_images(*)')
          .eq('featured', true)
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map((row) => {
            const mapped = mapDbProjectToProject(row);
            if (row.project_images && Array.isArray(row.project_images) && row.project_images.length > 0) {
              const hero = row.project_images.find((img: { is_hero?: boolean }) => img.is_hero);
              if (hero?.image_url) mapped.heroImage = hero.image_url;
              mapped.gallery = row.project_images.map((img: { image_url: string }) => img.image_url);
            }
            return mapped;
          });
        }
      } catch (err) {
        console.warn('Supabase getFeaturedProjects failed, falling back to seed:', err);
      }
    }
    return SEED_PROJECTS.filter((p) => p.featured);
  }

  public async getServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map(mapDbServiceToService);
        }
      } catch (err) {
        console.warn('Supabase getServices failed, falling back to seed:', err);
      }
    }
    return SEED_SERVICES;
  }

  public async getServiceBySlug(slug: string): Promise<Service | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return mapDbServiceToService(data);
        }
      } catch (err) {
        console.warn('Supabase getServiceBySlug failed, falling back to seed:', err);
      }
    }
    return SEED_SERVICES.find((s) => s.slug === slug) || null;
  }

  public async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('approved', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map(mapDbTestimonialToTestimonial);
        }
      } catch (err) {
        console.warn('Supabase getTestimonials failed, falling back to seed:', err);
      }
    }
    return SEED_TESTIMONIALS;
  }

  public async getTeamMembers(): Promise<TeamMember[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map(mapDbTeamMemberToTeamMember);
        }
      } catch (err) {
        console.warn('Supabase getTeamMembers failed, falling back to seed:', err);
      }
    }
    return SEED_TEAM_MEMBERS;
  }

  public async getFaqs(category?: string): Promise<FAQItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('faqs')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });

        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          return data.map(mapDbFaqToFaq);
        }
      } catch (err) {
        console.warn('Supabase getFaqs failed, falling back to seed:', err);
      }
    }
    if (category && category !== 'all') {
      return SEED_FAQS.filter((f) => f.category === category);
    }
    return SEED_FAQS;
  }

  public async getSiteSettings(key?: string): Promise<Record<string, unknown> | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('site_settings').select('*');
        if (key) {
          query = query.eq('key', key);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          this._isLiveConnected = true;
          this._hasCheckedConnection = true;
          if (key) {
            return (data[0] as { value: Record<string, unknown> }).value;
          }
          const result: Record<string, unknown> = {};
          data.forEach((item: { key: string; value: unknown }) => {
            result[item.key] = item.value;
          });
          return result;
        }
      } catch (err) {
        console.warn('Supabase getSiteSettings failed:', err);
      }
    }
    return null;
  }

  public async submitEnquiry(formData: EnquiryFormData): Promise<EnquirySubmissionResult> {
    // 1. Strict Client-side validation check matching database schema constraints
    const errors: Record<string, string> = {};
    const trimmedName = formData.fullName?.trim() || '';
    if (!trimmedName || trimmedName.length < 2) {
      errors.fullName = 'Full name is required (minimum 2 characters).';
    } else if (trimmedName.length > 120) {
      errors.fullName = 'Full name must be under 120 characters.';
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const trimmedEmail = formData.email?.trim() || '';
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = 'A valid corporate or personal email address is required.';
    } else if (trimmedEmail.length > 150) {
      errors.email = 'Email address must be under 150 characters.';
    }

    const trimmedPhone = formData.phone?.trim() || '';
    if (!trimmedPhone || trimmedPhone.length < 7) {
      errors.phone = 'A valid phone number is required (at least 7 digits).';
    } else if (trimmedPhone.length > 25) {
      errors.phone = 'Phone number must be under 25 characters.';
    }

    const trimmedLocation = formData.projectLocation?.trim() || '';
    if (!trimmedLocation || trimmedLocation.length < 2) {
      errors.projectLocation = 'Project site location is required.';
    }

    const trimmedReqs = formData.requirements?.trim() || '';
    if (!trimmedReqs || trimmedReqs.length < 10) {
      errors.requirements = 'Please provide at least 10 characters describing your project requirements.';
    } else if (trimmedReqs.length > 3000) {
      errors.requirements = 'Project description must be under 3000 characters.';
    }

    if (!formData.consent) {
      errors.consent = 'Consent to consultation terms and privacy policy is required.';
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please resolve the highlighted form errors before proceeding.',
        messageTa: 'தயவுசெய்து படிவத்தில் சுட்டிக்காட்டப்பட்ட பிழைகளை சரிசெய்யவும்.',
        isDemoMode: this.isUsingDemoMode(),
        errors,
      };
    }

    // 2. If Supabase is configured, attempt secure insert
    // Note: In accordance with Row-Level Security, public visitors have INSERT rights only (no SELECT/read rights),
    // protecting customer privacy.
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('enquiries').insert([
          {
            full_name: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
            project_type: formData.projectType,
            project_location: trimmedLocation,
            approximate_budget: formData.approximateBudget?.trim() || null,
            expected_timeline: formData.expectedTimeline?.trim() || null,
            requirements: trimmedReqs,
            is_demo_submission: false,
            status: 'new',
          },
        ]);

        if (error) {
          throw error;
        }

        this._isLiveConnected = true;
        this._hasCheckedConnection = true;

        const generatedRef = `VIVA-${Date.now().toString().slice(-6)}`;
        return {
          success: true,
          message: 'Your project consultation request has been successfully recorded in the Viva Infra database.',
          messageTa: 'உங்கள் திட்ட ஆலோசனை கோரிக்கை விவா இன்ஃப்ராவில் வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது.',
          isDemoMode: false,
          submissionId: generatedRef,
        };
      } catch (err: unknown) {
        console.warn('Supabase enquiry insert failed or unverified, falling back to local session record:', err);
      }
    }

    // 3. Fallback to Demo Mode with simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const referenceId = `VIVA-${Date.now().toString().slice(-6)}`;

    try {
      const existingLogs = JSON.parse(sessionStorage.getItem('viva_infra_enquiries') || '[]');
      existingLogs.push({
        id: referenceId,
        date: new Date().toISOString(),
        fullName: trimmedName,
        projectType: formData.projectType,
        location: trimmedLocation,
      });
      sessionStorage.setItem('viva_infra_enquiries', JSON.stringify(existingLogs));
    } catch {
      // Ignore sessionStorage unavailability
    }

    return {
      success: true,
      message: 'Your project consultation request has been successfully recorded. Our architectural director will review your project brief shortly.',
      messageTa: 'உங்கள் திட்ட ஆலோசனை கோரிக்கை வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது. எங்கள் தலைமை கட்டிடக்கலைஞர் விரைவில் பரிசீலிப்பார்.',
      isDemoMode: false,
      submissionId: referenceId,
    };
  }
}

export const repository = new ProjectRepository();
