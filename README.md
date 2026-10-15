# Viva Infra — Architecture, Construction & Infrastructure

A high-performance, responsive web application for **Viva Infra**, an architecture, residential villa, and commercial construction practice based in Tamil Nadu, India.

Built with React 19, TypeScript, Three.js (interactive 3D architectural viewer), Tailwind CSS, and Supabase database architecture.

---

## 🌟 Key Features

1. **Interactive 3D Architectural Scene**:
   - Built with Three.js using physically-based rendering (PBR) materials, directional sunlight, and PCF soft shadow maps.
   - Multi-level villa model with cantilevered upper bedroom suite, courtyard teak wood louvers, glass balustrades, entry portal, and landscape water basin.
   - Camera presets: *Isometric*, *Entrance*, *Terrace*, and *Plan*.
   - Exploded Floor Plates mode to separate floor slabs and reveal internal volumetric organization.
   - Golden Dusk & Daylight lighting switch.
   - Unified collapsible bottom control dock that eliminates viewport occlusion.
   - High-fidelity 2D architectural elevation fallback for devices without WebGL or with reduced-motion preferences.

2. **Complete Bilingual English & Tamil (EN / தமிழ்) Localization**:
   - Comprehensive translation dictionary (`src/i18n/translations.ts`) covering all routes, navigation, hero, process phases, services, FAQs, project specifications, forms, validation messages, and footer.
   - Language persistence via `localStorage` with dynamic HTML `lang` attribute updates and Tamil typography fallbacks.

3. **Curated Portfolio & CAD Visualizer**:
   - 12 comprehensive sample projects across Residential, Luxury Villa, Commercial Offices, and Structural Renovations.
   - Dynamic project detail routes (`/projects/:slug`) displaying technical specifications (plot size, built-up area, structural frame, seismic resistance, timeline).
   - Resilient architectural CAD vector visualizer adhering to the Zero-Broken-Image Policy.

4. **Service & Capability Directory**:
   - In-depth breakdowns of 6 construction disciplines: Residential Construction, Luxury Villas, Commercial Buildings, Workspace Fit-outs, Structural Remodeling, and Turnkey Project Management.
   - Details on target audience, core scope checklists, deliverables, and duration estimates.

5. **Validated Consultation Enquiry Flow**:
   - Comprehensive multi-field enquiry form: Project typology, client details, plot location, estimated budget range, anticipated start timeframe, and scope description.
   - Dual-mode submission handling: seamlessly saves to Supabase when credentials exist, or safely processes and logs within the local demo session with simulated latency and honest client feedback.

6. **Production-Ready Supabase Architecture**:
   - Complete PostgreSQL migration schema (`supabase/migrations/20250101000000_viva_infra_schema.sql`) with tables for `projects`, `services`, `testimonials`, `team_members`, `faqs`, `enquiries`, and `site_settings`.
   - Row-Level Security (RLS) policies enforcing public read access for published content and secure, write-only enquiry insertion without exposing client leads.

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to preview the application.

### Production Build

```bash
npm run build
```

---

## 🗄️ Supabase Backend Configuration

By default, the application runs out-of-the-box in **Demo Mode** using seeded local data.

To connect your live Supabase database:
1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. In the Supabase SQL Editor, run the migration script:
   - `supabase/migrations/20250101000000_viva_infra_schema.sql`
   - `supabase/seed.sql`
4. Restart your development server. The repository layer (`src/lib/supabase/repository.ts`) will automatically switch from local demo data to live Supabase queries.

---

## 📐 Project Structure

```
├── src/
│   ├── components/
│   │   ├── hero/            # Hero section with 3D integration
│   │   ├── navigation/      # Header (Top Bar Contract) & Footer
│   │   ├── projects/        # ProjectVisual CAD elevation renderer
│   │   ├── sections/        # Metrics, Process, Services, Testimonials, FAQ, CTA
│   │   └── three/           # Three.js ArchitecturalScene with PBR & controls
│   ├── data/                # Fictional seed data for projects, services, teams, FAQs
│   ├── i18n/                # English & Tamil dictionaries and LanguageContext
│   ├── lib/
│   │   └── supabase/        # Supabase client & repository abstraction
│   ├── pages/               # Home, Projects, ProjectDetail, Services, About, Contact, 404
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Client-side router & layout
│   ├── index.css            # Tailwind CSS & typography tokens
│   └── main.tsx             # Root React entry point
├── supabase/
│   ├── migrations/          # PostgreSQL schema and RLS policies
│   └── seed.sql             # Demo database seeds
└── .env.example             # Environment variable documentation
```

---

## 🛡️ Demonstration Brand Notice

All project case studies, client reviews, and team profiles contained within this build are curated fictional demonstration assets created to exhibit Viva Infra's architectural workflows and digital experience.
