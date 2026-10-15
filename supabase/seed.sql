-- ==============================================================================
-- Viva Infra — Optional Fictional Demonstration Seed Content
-- File: supabase/seed.sql
-- Note: All entries here are fictional demonstrations for website presentation.
-- ==============================================================================

-- 1. Site Settings
insert into public.site_settings (key, value)
values 
  ('brand_profile', '{
    "name": "Viva Infra",
    "descriptor": "Architecture, Construction & Infrastructure",
    "established": 2008,
    "region": "Tamil Nadu, India",
    "license": "Registered Class-1 Engineering Contractor & Architectural Practice",
    "is_demonstration": true
  }'::jsonb),
  ('contact_info', '{
    "email": "contact@vivainfra-demo.com",
    "phone": "+91 98765 43210",
    "address": "124, Architecture Avenue, Anna Nagar, Chennai 600040",
    "working_hours": "Monday - Saturday: 9:00 AM - 6:30 PM IST"
  }'::jsonb)
on conflict (key) do nothing;

-- 2. Services Seed Data
insert into public.services (
  slug, title, title_ta, short_desc, short_desc_ta, full_desc, full_desc_ta,
  target_audience, target_audience_ta, scope_items, scope_items_ta,
  deliverables, deliverables_ta, typical_timeline, typical_timeline_ta,
  icon_name, display_order, published
) values
(
  'architectural-design',
  'Architectural Design & Planning',
  'கட்டடக்கலை வடிவமைப்பு & திட்டமிடல்',
  'Climate-responsive, contextual spatial planning balancing aesthetics with pragmatic structural efficiency.',
  'அழகியல் மற்றும் கட்டமைப்பு திறனை இணைக்கும் தட்பவெப்ப நிலைக்கு ஏற்ற கட்டடக்கலை வடிவமைப்பு.',
  'From initial spatial zoning and climatic wind-flow modeling to detailed BIM drawings and local municipal approval documentation, our architectural service delivers complete construction-ready design blueprints.',
  'தொடக்க இட ஒதுக்கீடு முதல் உள்ளூர் நகராட்சி ஒப்புதல் வரை அனைத்து வரைபடங்களையும் துல்லியமாக வழங்குகிறோம்.',
  'Individual plot owners, property developers, institutions, and family offices.',
  'தனிப்பட்ட நில உரிமையாளர்கள், ரியல் எஸ்டேட் டெவலப்பர்கள் மற்றும் நிறுவனங்கள்.',
  '["Site topography and solar orientation analysis", "Conceptual massing & spatial floor zoning", "Comprehensive BIM 3D models & renders", "Municipal statutory approval sanction sets", "Detailed architectural joinery & door/window schedules"]'::jsonb,
  '["நில அமைப்பு மற்றும் சூரிய ஒளி பகுப்பாய்வு", "3D மாதிரி வடிவமைப்பு", "நகராட்சி சட்டரீதியான ஒப்புதல் வரைபடங்கள்"]'::jsonb,
  '["Sanction drawing sets", "Architectural Working Drawings (GFC)", "Interior joinery packages", "3D architectural elevation visuals"]'::jsonb,
  '["அங்கீகரிக்கப்பட்ட வரைபடங்கள்", "கட்டுமான பயன்பாட்டு வரைபடங்கள்", "உள்துறை வடிவமைப்பு தொகுப்புகள்"]'::jsonb,
  '6 – 10 Weeks (Subject to municipal sanction cycles)',
  '6 – 10 வாரங்கள்',
  'compass',
  1,
  true
),
(
  'residential-construction',
  'Turnkey Residential Construction',
  'முழுமையான குடியிருப்பு கட்டுமானம்',
  'End-to-end luxury residence execution with fixed-price Bill of Quantities (BOQ) and structural warranties.',
  'நிலையான விலை ஒப்பந்தம் மற்றும் கட்டமைப்பு உத்தரவாதத்துடன் கூடிய முழுமையான ஆடம்பர இல்ல கட்டுமானம்.',
  'We oversee all aspects of residential building from deep foundation piling and RCC frame casting through electrical, plumbing, plastering, stone masonry, and final commissioning.',
  'அடித்தளம் முதல் இறுதி சாவி ஒப்படைப்பு வரை அனைத்து குடியிருப்பு கட்டுமானப் பணிகளையும் முழுமையாக நிர்வகிக்கிறோம்.',
  'Homeowners seeking zero-compromise bespoke villas, independent houses, and multi-generational family homes.',
  'சொகுசு வில்லாக்கள் மற்றும் தனிப்பட்ட வீடுகளை கட்ட விரும்பும் உரிமையாளர்கள்.',
  '["Soil testing & structural foundation engineering", "Class-A TMT bar reinforced concrete framing", "Double-coat waterproofing with polymer membranes", "Factory-finished bespoke joinery & stone flooring", "Smart MEP integration & rainwater harvesting systems"]'::jsonb,
  '["மண் பரிசோதனை மற்றும் அடித்தள பொறியியல்", "தரமான கான்கிரீட் கட்டமைப்பு", "நீர் கசிவு தடுப்பு பூச்சுகள்"]'::jsonb,
  '["Handover key & occupancy documentation", "As-built MEP infrastructure drawings", "10-Year structural integrity warranty deed", "Material test certification dossier"]'::jsonb,
  '["சாவி மற்றும் குடியிருப்பு ஆவணங்கள்", "10 ஆண்டு கட்டமைப்பு உத்தரவாதம்", "பொருட்கள் தர பரிசோதனை சான்றிதழ்"]'::jsonb,
  '10 – 16 Months depending on square footage',
  '10 – 16 மாதங்கள்',
  'home',
  2,
  true
),
(
  'commercial-buildings',
  'Commercial Buildings & Workspaces',
  'வணிக வளாகங்கள் & பணியிடங்கள்',
  'High-performance commercial spaces, tech offices, and retail showrooms designed for durability and workflow efficiency.',
  'தொழில்நுட்ப அலுவலகங்கள் மற்றும் வணிக வளாகங்களுக்கான நீடித்த, நவீன கட்டுமான சேவைகள்.',
  'Engineered for maximum floor-plate efficiency, high acoustic dampening, and rapid execution. Our commercial works integrate modular curtain-wall facades, central HVAC ducting, and advanced fire-safety standards.',
  'அதிக இடப்பயன்பாடு மற்றும் நவீன தீயணைப்பு வசதிகளுடன் கூடிய வணிக அலுவலகங்களை உருவாக்குகிறோம்.',
  'Enterprises, retail brands, healthcare groups, and commercial real estate investors.',
  'நிறுவனங்கள், சில்லறை வணிக பிராண்டுகள் மற்றும் முதலீட்டாளர்கள்.',
  '["Large-span post-tensioned RCC slabs", "Energy-efficient double-glazed structural facades", "Complete HVAC, firefighting & power backup infrastructure", "Acoustic ceiling baffles and raised access flooring", "Barrier-free accessible ramps and vertical circulation"]'::jsonb,
  '["வலுவூட்டப்பட்ட கான்கிரீட் தளங்கள்", "மின் மற்றும் ஏசி அமைப்புகள்", "பாதுகாப்பு வசதிகள்"]'::jsonb,
  '["Commercial completion certificate", "Fire safety NOC compliance dossier", "HVAC balancing test reports", "Emergency backup system commissioning sheets"]'::jsonb,
  '["வணிக நிறைவு சான்றிதழ்", "தீயணைப்பு துறை அனுமதி ஆவணங்கள்", "சோதனை அறிக்கைகள்"]'::jsonb,
  '12 – 24 Months',
  '12 – 24 மாதங்கள்',
  'building',
  3,
  true
),
(
  'structural-engineering',
  'Structural Engineering & Retrofitting',
  'கட்டமைப்பு பொறியியல் & வலுவூட்டல்',
  'Earthquake-resistant RCC and steel framing, seismic analysis, and structural capacity audits.',
  'நிலநடுக்கத்தை தாங்கும் கட்டமைப்பு வடிவமைப்பு மற்றும் ஸ்திரத்தன்மை தணிக்கை.',
  'Our licensed civil structural engineers compute load calculations according to Indian Standard codes (IS 456, IS 1893, IS 13920) ensuring resilient safety factors against high wind, seismic activity, and soil shifts.',
  'இந்திய தர நிர்ணய விதிகளின்படி துல்லியமான சுமை கணக்கீடுகளை செய்து பாதுகாப்பு உத்தரவாதம் அளிக்கிறோம்.',
  'Builders requiring third-party engineering vetting, building owners observing settlement, and industrial plants.',
  'பொறியியல் தணிக்கை தேவைப்படும் கட்டிட உரிமையாளர்கள்.',
  '["Finite-element seismic and wind load simulation", "Bar-bending schedules with zero steel wastage", "Non-destructive rebound hammer & ultrasonic tests", "Carbon-fiber wrapping for structural member strengthening", "Foundation underpinning and soil stabilization"]'::jsonb,
  '["நிலநடுக்க சுமை கணக்கீடு", "கார்பன் ஃபைபர் வலுவூட்டல்", "அடித்தள உறுதிப்படுத்தல்"]'::jsonb,
  '["Licensed Structural Engineer Stability Certificate", "Detailed bar bending schedules (BBS)", "Foundation soil interaction calculation book", "Material grade compliance affidavits"]'::jsonb,
  '["ஸ்திரத்தன்மை சான்றிதழ்", "கட்டமைப்பு கணக்கீட்டு ஆவணங்கள்"]'::jsonb,
  '3 – 6 Weeks',
  '3 – 6 வாரங்கள்',
  'layers',
  4,
  true
),
(
  'renovation-restoration',
  'Adaptive Reuse & Heritage Renovation',
  'புதுப்பித்தல் & பாரம்பரிய புனரமைப்பு',
  'Breathing new life into vintage residences and historical vernacular properties with modern amenities.',
  'பழமையான கட்டிடங்களை அதன் பாரம்பரிய தன்மை மாறாமல் நவீன வசதிகளுடன் புதுப்பித்தல்.',
  'Sensitive architectural conservation of Chettinad, Anglo-Indian, and mid-century residences. We repair distressed timber rafters, restore lime plaster masonry, and discretely conceal modern electrical and HVAC conduits.',
  'பாரம்பரிய காரைக்குடி மற்றும் நவீன கால வீடுகளை கவனமாக புதுப்பித்து நவீன வசதிகளை இணைக்கிறோம்.',
  'Inherited heritage home custodians, boutique hospitality operators, and adaptive reuse developers.',
  'பாரம்பரிய வீடுகளைக் கொண்ட குடும்பங்கள் மற்றும் விருந்தோம்பல் நிறுவனங்கள்.',
  '["Traditional lime plaster slaking & application", "Burma teak wood rafter structural restoration", "Careful demolition of unreinforced non-loadbearing partitions", "Discreet trenching for concealed conduits & VRF cooling", "Athangudi handmade tile restoration and sealant buffing"]'::jsonb,
  '["சுண்ணாம்பு பூச்சு மறுசீரமைப்பு", "தேக்கு மர கட்டமைப்பு புனரமைப்பு", "ஆத்தங்குடி தரை ஓடுகள் மெருகூட்டல்"]'::jsonb,
  '["Condition assessment report", "Historic conservation methodology log", "Restored facility as-built documentation", "Maintenance guide for natural lime & wood elements"]'::jsonb,
  '["நிலை மதிப்பீட்டு அறிக்கை", "பராமரிப்பு வழிகாட்டி புத்தகம்"]'::jsonb,
  '4 – 9 Months',
  '4 – 9 மாதங்கள்',
  'hammer',
  5,
  true
),
(
  'project-management',
  'Comprehensive Project Management Consultancy (PMC)',
  'திட்ட மேலாண்மை ஆலோசனை (PMC)',
  'Rigorous client-side quality assurance, contractor auditing, timeline enforcement, and site supervision.',
  'வாடிக்கையாளர் தரப்பில் இருந்து திட்டங்களை கண்காணிக்கும் நம்பகமான மேலாண்மை சேவை.',
  'Acting exclusively in the client''s fiduciary interest, our independent site engineers audit materials delivered to site, review contractor measurement sheets, maintain daily digital logs, and prevent cost creep.',
  'வாடிக்கையாளரின் நலன் கருதி, கட்டுமானத் தரம், வரவு-செலவு மற்றும் காலக்கெடுவை நேரில் கண்காணிக்கிறோம்.',
  'NRIs, private family offices, and developers managing multiple concurrent building sites.',
  'வெளிநாடு வாழ் இந்தியர்கள் (NRI) மற்றும் நில உரிமையாளர்கள்.',
  '["Daily drone & 360-degree digital progress reporting", "Contractor bill verification & quantity surveying", "Incoming material cube crushing & tensile test witness", "Milestone Gantt chart critical path tracking", "Snag list generation & defect rectification sign-off"]'::jsonb,
  '["தினசரி டிஜிட்டல் முன்னேற்ற அறிக்கை", "கட்டுமான பில் சரிபார்ப்பு", "தர ஆய்வு"]'::jsonb,
  '["Bi-weekly executive milestone dashboards", "Verified contractor clearance certificates", "Comprehensive defect liability audit list", "Final project close-out financial reconciliation"]'::jsonb,
  '["வாராந்திர முன்னேற்ற அறிக்கை", "இறுதி நிதி கணக்கு அறிக்கை"]'::jsonb,
  'Full construction project duration',
  'முழு கட்டுமான காலம்',
  'shield',
  6,
  true
)
on conflict (slug) do nothing;

-- 3. Projects Demonstration Seed Data
insert into public.projects (
  slug, title, title_ta, category, status, location, location_ta,
  summary, summary_ta, description, description_ta, scope, scope_ta,
  specifications, architectural_style, architectural_style_ta, accent_color,
  featured, year, display_order, published
) values
(
  'the-courtyard-pavilion',
  'The Courtyard Pavilion',
  'தி கோர்ட்யார்ட் பெவிலியன்',
  'residential',
  'completed',
  'ECR Coastal Corridor, Chennai',
  'ஈசிஆர் கடற்கரை சாலை, சென்னை',
  'A tropical modernist private villa centered around a reflecting pool, crafted with local Sadarahalli granite and exposed terracotta brickwork.',
  'சதராஹல்லி கிரானைட் மற்றும் சுட்ட செங்கற்களால் கட்டப்பட்ட நவீன தனியார் வில்லா இல்லம்.',
  'Designed for an extended multi-generational family, this residence embraces climate-conscious design principles suitable for coastal Tamil Nadu. A central open-to-sky courtyard acts as a thermal chimney, drawing ocean breezes through louvered teak screens while keeping interior spaces naturally cool.',
  'கடற்கரை காற்றின் குளிர்ச்சியை உள்வாங்கும் வகையில் அமைக்கப்பட்ட மத்திய முற்றம் கொண்ட நவீன ஆடம்பர குடியிருப்பு.',
  '["Architectural Master Planning", "Full Turnkey Civil Construction", "Structural RCC Engineering", "Bespoke Joinery & Millwork", "Integrated Landscape & Courtyard Reflecting Pool"]'::jsonb,
  '["கட்டடக்கலை திட்டமிடல்", "முழுமையான சிவில் கட்டுமானம்", "மரவேலை மற்றும் உட்புற வடிவமைப்பு"]'::jsonb,
  '{"plotArea": "9,600 sq.ft", "builtUpArea": "6,800 sq.ft", "floors": "G + 1 Floor", "structuralSystem": "Post-Tensioned RCC Frame with Exposed Brickwork Infill", "timeline": "14 Months (Completed)", "energyRating": "IGBC Green Homes Gold Equivalent"}'::jsonb,
  'Tropical Modernism with Vernacular Courtyard Typology',
  'பாரம்பரிய முற்றம் கொண்ட நவீன வெப்பமண்டல வடிவமைப்பு',
  '#A9563B',
  true,
  2024,
  1,
  true
),
(
  'lumina-tech-park',
  'Lumina Workspace Headquarters',
  'லுமினா தலைமை அலுவலகம்',
  'commercial',
  'completed',
  'OMR IT Expressway, Chennai',
  'ஓஎம்ஆர் தகவல் தொழில்நுட்ப சாலை, சென்னை',
  'A high-performance corporate workspace featuring energy-efficient double-glazed facades and terracotta ceramic solar louvers.',
  'சூரிய வெப்பத்தை தடுக்கும் நவீன கண்ணாடி முகப்பு கொண்ட பிரம்மாண்ட கார்ப்பரேட் பணியிடம்.',
  'Developed as the regional hub for an international technology firm, Lumina Workspace incorporates flexible 1,200 sq.m column-free floor plates. The building features an active double-skin terracotta facade that significantly cuts solar heat gain while flooding work areas with daylight.',
  'தூண்களற்ற பெரிய அலுவலக தளங்கள் மற்றும் குறைந்த மின் நுகர்வு கொண்ட சூழல் நட்பு வணிக கட்டிடம்.',
  '["Commercial Architectural Blueprint", "Heavy Civil & Structural Steel Engineering", "Curtain Wall Facade Engineering", "Centralized HVAC & MEP Execution", "Fire Safety & Statutory Clearance"]'::jsonb,
  '["வணிக கட்டடக்கலை வரைபடம்", "கட்டமைப்பு பொறியியல்", "முகப்பு கண்ணாடி வடிவமைப்பு"]'::jsonb,
  '{"plotArea": "24,000 sq.ft", "builtUpArea": "38,500 sq.ft", "floors": "Stilt + 4 Office Floors + Rooftop Garden", "structuralSystem": "Composite Steel & Post-Tensioned Concrete", "timeline": "18 Months (Completed)", "energyRating": "GRIHA 4-Star Certified Rating"}'::jsonb,
  'Contemporary Commercial with Terracotta Louver Kinetic Facade',
  'டெரகோட்டா அமைப்பு கொண்ட நவீன வணிக கட்டடக்கலை',
  '#68715A',
  true,
  2024,
  2,
  true
),
(
  'the-granite-monolith',
  'The Granite Monolith Residence',
  'தி கிரானைட் மோனோலித் இல்லம்',
  'residential',
  'completed',
  'Race Course, Coimbatore',
  'ரேஸ் கோர்ஸ், கோயம்புத்தூர்',
  'An imposing cantilevered concrete and fluted stone villa balancing bold monolithic massing with private garden courtyards.',
  'வலுவான கான்கிரீட் மற்றும் செதுக்கப்பட்ட இயற்கை கல் கொண்டு கட்டப்பட்ட தனித்துவமான இல்லம்.',
  'Situated on a corner plot, the Granite Monolith responds to urban privacy requirements with an austere exterior of dry-clad granite and fluted form-finished concrete. Once inside, the residence reveals double-height living spaces that open onto lush private peripheral courtyards.',
  'நகர்ப்புற சூழலில் முழுமையான தனிமையையும், உள்ளே இயற்கை பசுமையையும் தரும் நவீன இல்லம்.',
  '["Architectural Concept & Detail Design", "Civil Structural Construction", "Acoustic Design & Automation", "Dry-Clad Granite Facade Engineering", "Bespoke Landscape Integration"]'::jsonb,
  '["கட்டடக்கலை வடிவமைப்பு", "சிவில் கட்டுமானம்", "இயற்கை தோட்ட அமைப்பு"]'::jsonb,
  '{"plotArea": "7,800 sq.ft", "builtUpArea": "5,400 sq.ft", "floors": "G + 2 Floors", "structuralSystem": "Fair-Faced Concrete & Cantilevered Steel Beams", "timeline": "15 Months (Completed)", "energyRating": "Low Carbon Passive Design"}'::jsonb,
  'Brutalist Luxury with Biophilic Micro-Courtyards',
  'புரூட்டலிஸ்ட் பாணி சொகுசு இல்லம்',
  '#85432F',
  true,
  2023,
  3,
  true
),
(
  'chettinad-heritage-restoration',
  'Chettinad Heritage Mansion',
  'செட்டிநாடு பாரம்பரிய மாளிகை புனரமைப்பு',
  'renovation',
  'completed',
  'Kanadukathan, Sivaganga',
  'கானாடுகாத்தான், சிவகங்கை',
  'Painstaking architectural conservation and structural stabilization of a century-old heritage estate with Athangudi tiles and Burma teak woodwork.',
  'பாரம்பரிய ஆத்தங்குடி தரை ஓடுகள் மற்றும் பர்மா தேக்கு மர வேலைப்பாடுகளை பாதுகாத்து புதுப்பிக்கப்பட்ட மாளிகை.',
  'This sensitive conservation project rejuvenated a magnificent 1912 Chettinad ancestral residence. Work included structural underpinning of settling lime brick foundations, slaking authentic herbal lime mortars, rebuilding water-damaged teak roofs, and integrating modern concealed plumbing.',
  'நூற்றாண்டு பழமையான பாரம்பரிய இல்லத்தின் அழகை சிதைக்காமல் நவீன வசதிகளுடன் பாதுகாக்கப்பட்ட திட்டம்.',
  '["Historic Structural Condition Assessment", "Traditional Herbal Lime Plastering", "Burma Teak Timber Structural Restoration", "Athangudi Tile Cleaning & Re-laying", "Concealed 3-Phase Electrical & Modern Bathrooms"]'::jsonb,
  '["பாரம்பரிய கட்டமைப்பு மதிப்பீடு", "சுண்ணாம்பு பூச்சு வேலைகள்", "நவீன குளியலறை மற்றும் மின் வசதிகள்"]'::jsonb,
  '{"plotArea": "18,500 sq.ft", "builtUpArea": "14,200 sq.ft", "floors": "G + 1 Floor + Valavu Courtyards", "structuralSystem": "Load-Bearing Lime Masonry with Timber Rafter Roofs", "timeline": "11 Months (Completed)", "energyRating": "Heritage Passive Climate Conservation"}'::jsonb,
  'Heritage Vernacular Conservation & Adaptive Restoration',
  'செட்டிநாடு பாரம்பரிய கட்டடக்கலை பாதுகாப்பு',
  '#A9563B',
  true,
  2023,
  4,
  true
)
on conflict (slug) do nothing;

-- 4. Testimonials Demonstration Seed Data
insert into public.testimonials (
  author, author_ta, role_or_project, role_or_project_ta,
  location, location_ta, quote, quote_ta, year, project_type,
  is_demo_review, approved, display_order
) values
(
  'K. Sundaram',
  'கே. சுந்தரம்',
  'Villa Client — The Courtyard Pavilion',
  'வில்லா உரிமையாளர் — தி கோர்ட்யார்ட் பெவிலியன்',
  'Chennai, Tamil Nadu',
  'சென்னை, தமிழ்நாடு',
  'Viva Infra delivered our family residence strictly on budget without the typical friction of construction. Their guaranteed BOQ meant no unexpected price spikes during excavation or finishing.',
  'விவா இன்ஃப்ராவின் வெளிப்படையான விலை நிர்ணயம் மற்றும் தரமான மேற்பார்வை எங்கள் இல்லக் கனவை எந்தவித மன உளைச்சலும் இன்றி நிறைவேற்றியது.',
  2024,
  'Residential Villa',
  true,
  true,
  1
),
(
  'Dr. Meenakshi Ramanathan',
  'டாக்டர் மீனாட்சி ராமநாதன்',
  'Heritage Client — Chettinad Restoration',
  'பாரம்பரிய இல்ல உரிமையாளர் — செட்டிநாடு மாளிகை',
  'Kanadukathan',
  'கானாடுகாத்தான்',
  'Restoring our century-old ancestral home was an emotional journey. Viva Infra treated the Burma teak pillars and Athangudi flooring with immense architectural respect while introducing discreet modern plumbing.',
  'எங்கள் 100 ஆண்டு பழமையான மூதாதையர் வீட்டை பாரம்பரியம் மாறாமல், அதே சமயம் நவீன வசதிகளுடன் அற்புதமாக புதுப்பித்துக் கொடுத்துள்ளனர்.',
  2023,
  'Heritage Restoration',
  true,
  true,
  2
),
(
  'Rajesh Varghese',
  'ராஜேஷ் வர்கீஸ்',
  'Director, Zenith Logistics Park',
  'இயக்குனர், ஜெனித் லாஜிஸ்டிக்ஸ்',
  'Coimbatore',
  'கோயம்புத்தூர்',
  'The engineering rigor Viva Infra brought to our 40,000 sq.ft warehouse floor casting was exceptional. Level surveys and core compression testing were documented daily in digital logs.',
  'தொழில்துறை கட்டிடங்களில் இவர்கள் காட்டிய கட்டமைப்பு துல்லியம் மற்றும் தினசரி டிஜிட்டல் கண்காணிப்பு மிகுந்த பாராட்டுக்குரியது.',
  2024,
  'Commercial Infrastructure',
  true,
  true,
  3
)
on conflict do nothing;

-- 5. Team Members Demonstration Seed Data
insert into public.team_members (
  name, name_ta, role, role_ta, bio, bio_ta,
  experience_years, credentials, is_demo_profile, display_order, published
) values
(
  'Ar. Vignesh Ramachandran',
  'ஆர். விக்னேஷ் ராமச்சந்திரன்',
  'Principal Architect & Co-Founder',
  'முதன்மை கட்டிடக் கலைஞர் & இணை நிறுவனர்',
  'Specializing in climate-responsive tropical modernism and contextual spatial planning across southern India.',
  'தென்னிந்திய தட்பவெப்ப நிலைக்கு ஏற்ற சூழல் நட்பு கட்டடங்களை வடிவமைப்பதில் நிபுணர்.',
  18,
  'B.Arch (SPA Delhi), M.Arch (CEPT), Council of Architecture Reg. CA/2007/34981',
  true,
  1,
  true
),
(
  'Er. Karthik Balasubramanian',
  'பொறி. கார்த்திக் பாலசுப்ரமணியன்',
  'Director of Structural Engineering',
  'கட்டமைப்பு பொறியியல் இயக்குனர்',
  'Overseeing high-rise post-tensioned RCC framing, deep foundation soil mechanics, and seismic safety compliance.',
  'உயரமான கட்டடங்களின் கட்டமைப்பு ஸ்திரத்தன்மை மற்றும் அடித்தள பாதுகாப்பை மேற்பார்வையிடுகிறார்.',
  20,
  'B.E. Civil (Anna Univ), M.Tech Structures (IIT Madras), Fellow IEI',
  true,
  2,
  true
),
(
  'Sowmya Natarajan',
  'சௌமியா நடராஜன்',
  'Head of Project Management & Quality',
  'திட்ட மேலாண்மை & தரக்கட்டுப்பாட்டு தலைவர்',
  'Leading on-site quality assurance audits, contractor milestone compliance, and client digital tracking dashboards.',
  'கட்டுமானப் பொருட்களின் தர ஆய்வு மற்றும் காலக்கெடு நிர்வாகத்தை முன்னின்று நடத்துகிறார்.',
  14,
  'B.Tech Civil, PMP® Certified, IGBC Accredited Professional (AP)',
  true,
  3,
  true
),
(
  'D. Muralidharan',
  'டி. முரளிதரன்',
  'Chief Quantity Surveyor & Contracts Lead',
  'தலைமை மதிப்பீட்டாளர் & ஒப்பந்த அதிகாரி',
  'Ensuring zero-variance Bill of Quantities (BOQ), material specifications auditing, and statutory approvals.',
  'துல்லியமான திட்ட மதிப்பீடு மற்றும் சட்டரீதியான அனுமதிகளை உறுதி செய்கிறார்.',
  16,
  'B.Sc QS, MRICS (Royal Institution of Chartered Surveyors)',
  true,
  4,
  true
)
on conflict do nothing;

-- 6. FAQs Demonstration Seed Data
insert into public.faqs (
  category, question, question_ta, answer, answer_ta, display_order, published
) values
(
  'process',
  'How does Viva Infra manage the project schedule and site supervision?',
  'விவா இன்ஃப்ரா எவ்வாறு திட்ட அட்டவணை மற்றும் தள மேற்பார்வையை நிர்வகிக்கிறது?',
  'Every project is assigned a dedicated full-time site civil engineer who reports to our Project Management Director. Clients receive a comprehensive digital milestone Gantt chart before foundation excavation, with weekly photo/drone updates and material testing logs accessible on your private portal.',
  'ஒவ்வொரு திட்டத்திற்கும் ஒரு முழுநேர சிவில் பொறியாளர் நியமிக்கப்பட்டு, வாராந்திர டிஜிட்டல் முன்னேற்ற அறிக்கைகள் வாடிக்கையாளருக்கு வழங்கப்படுகின்றன.',
  1,
  true
),
(
  'costing',
  'What is your pricing model and how do you prevent unexpected budget escalation?',
  'உங்கள் விலை நிர்ணய முறை என்ன? கூடுதல் செலவுகள் ஏற்படுவதை எவ்வாறு தடுக்கிறீர்கள்?',
  'We work on a guaranteed, itemized Bill of Quantities (BOQ) with clearly defined material brands, grades, and structural quantities. Once the scope and specifications are finalized, that cost is fixed. We do not introduce hidden escalation charges mid-construction.',
  'வெளிப்படையான மற்றும் நிலையான BOQ மதிப்பீட்டின் அடிப்படையில் நாங்கள் பணியாற்றுகிறோம். நடுவில் எதிர்பாராத கூடுதல் கட்டணங்கள் ஏதும் இருக்காது.',
  2,
  true
),
(
  'approvals',
  'Do you handle government building sanctions and statutory approvals?',
  'அரசு கட்டிட அனுமதிகள் மற்றும் சட்டரீதியான ஒப்புதல்களை நீங்கள் கையாளுகிறீர்களா?',
  'Yes. Our architectural team prepares all necessary submission drawings, structural stability certificates, and environmental NOC documentation for municipal bodies across Chennai, Coimbatore, and Tamil Nadu.',
  'ஆம். தேவையான அனைத்து சட்டரீதியான வரைபடங்கள் மற்றும் ஒப்புதல்களை எங்கள் குழுவே முழுமையாக கவனித்துக்கொள்கிறது.',
  3,
  true
),
(
  'quality',
  'What warranties and quality assurances are provided upon handover?',
  'கட்டடம் ஒப்படைக்கப்படும்போது என்ன உத்தரவாதங்கள் வழங்கப்படுகின்றன?',
  'We issue a legally binding 10-Year Structural Integrity Warranty deed backed by our licensed structural engineers, along with a 1-Year comprehensive defect liability warranty covering plumbing, waterproofing, and electrical networks.',
  '10 ஆண்டுகால கட்டமைப்பு உத்தரவாதப் பத்திரம் மற்றும் 1 ஆண்டு முழுமையான பராமரிப்பு உத்தரவாதம் வழங்கப்படுகிறது.',
  4,
  true
)
on conflict do nothing;
