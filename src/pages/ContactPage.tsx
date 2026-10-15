import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Info, MapPin, Clock, Phone, Mail, ShieldAlert } from 'lucide-react';
import { EnquiryFormData, EnquirySubmissionResult } from '../types';
import { repository } from '../lib/supabase/repository';
import { useLanguage } from '../i18n/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: 'residential',
    projectLocation: '',
    approximateBudget: '',
    expectedTimeline: '',
    requirements: '',
    consent: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResult | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [checkingConnection, setCheckingConnection] = useState(true);

  // Duplicate submission tracker
  const lastSubmissionRef = useRef<{ hash: string; timestamp: number } | null>(null);

  useEffect(() => {
    let mounted = true;
    repository.isLiveDatabase().then((connected) => {
      if (mounted) {
        setIsLiveConnected(connected);
        setCheckingConnection(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const trimmedName = formData.fullName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errs.fullName = t.contactPage.validationErrors.nameRequired;
    } else if (trimmedName.length > 120) {
      errs.fullName = 'Full name must be under 120 characters.';
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errs.email = t.contactPage.validationErrors.emailRequired;
    } else if (trimmedEmail.length > 150) {
      errs.email = 'Email address must be under 150 characters.';
    }

    const trimmedPhone = formData.phone.trim();
    if (!trimmedPhone || trimmedPhone.length < 7) {
      errs.phone = t.contactPage.validationErrors.phoneRequired;
    } else if (trimmedPhone.length > 25) {
      errs.phone = 'Phone number must be under 25 characters.';
    }

    const trimmedLocation = formData.projectLocation.trim();
    if (!trimmedLocation || trimmedLocation.length < 2) {
      errs.projectLocation = t.contactPage.validationErrors.locationRequired;
    }

    const trimmedReqs = formData.requirements.trim();
    if (!trimmedReqs || trimmedReqs.length < 10) {
      errs.requirements = t.contactPage.validationErrors.requirementsRequired;
    } else if (trimmedReqs.length > 3000) {
      errs.requirements = 'Requirements must be under 3000 characters.';
    }

    if (!formData.consent) {
      errs.consent = t.contactPage.validationErrors.consentRequired;
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!validate()) return;

    // Duplicate submission check
    const currentHash = `${formData.fullName.trim().toLowerCase()}_${formData.email.trim().toLowerCase()}_${formData.requirements.trim().toLowerCase()}`;
    const now = Date.now();
    if (
      lastSubmissionRef.current &&
      lastSubmissionRef.current.hash === currentHash &&
      now - lastSubmissionRef.current.timestamp < 60000
    ) {
      setSubmissionResult({
        success: true,
        message: 'This enquiry has already been submitted. Our architectural team has received your brief.',
        messageTa: 'இந்த ஆலோசனை கோரிக்கை ஏற்கனவே சமர்ப்பிக்கப்பட்டுள்ளது. எங்கள் குழு விவரங்களை பெற்றுள்ளது.',
        isDemoMode: !isLiveConnected,
        submissionId: 'DUPLICATE-PREVENTED',
      });
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await repository.submitEnquiry(formData);
      setSubmissionResult(result);
      if (result.success) {
        lastSubmissionRef.current = {
          hash: currentHash,
          timestamp: now,
        };
        // Reset form fields
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: 'residential',
          projectLocation: '',
          approximateBudget: '',
          expectedTimeline: '',
          requirements: '',
          consent: false,
        });
        setFormErrors({});
      } else if (result.errors) {
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmissionResult({
        success: false,
        message: 'A network error occurred while submitting your enquiry.',
        messageTa: 'விசாரணையை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது.',
        isDemoMode: !isLiveConnected,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const dbHost = repository.getConnectionHost();

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
            Initiate Project Brief
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#272923] leading-tight">
            {t.contactPage.title}
          </h1>
          <p className="mt-3 text-base text-[#55564E] leading-relaxed">
            {t.contactPage.subtitle}
          </p>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 bg-white border border-[#E6E1D8] p-8 sm:p-10 shadow-xs"
          >
            <AnimatePresence mode="wait">
              {submissionResult?.success ? (
                /* Success State with Animation */
                <motion.div
                  key="success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-[#68715A]/10 text-[#68715A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#272923]">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-xs text-[#55564E] leading-relaxed max-w-md mx-auto">
                    {language === 'ta' ? submissionResult.messageTa : submissionResult.message}
                  </p>

                  {submissionResult.submissionId && (
                    <div className="bg-[#F8F7F2] border border-[#E6E1D8] p-3 inline-block font-mono text-xs text-[#272923]">
                      {t.contactPage.successRef}: <span className="text-[#A9563B] font-bold">{submissionResult.submissionId}</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmissionResult(null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#272923] hover:bg-[#A9563B] transition-colors cursor-pointer"
                    >
                      <span>{t.contactPage.submitAnother}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* Form Body */
                <motion.form
                  key="form-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="border-b border-[#E6E1D8] pb-4 mb-6">
                    <h2 className="font-serif text-2xl font-medium text-[#272923]">
                      {t.contactPage.formHeading}
                    </h2>
                  </div>

                  {/* Submission Error Alert */}
                  {submissionResult && !submissionResult.success && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span>{language === 'ta' ? submissionResult.messageTa : submissionResult.message}</span>
                    </div>
                  )}

                  {/* Project Typology Radio Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-2.5">
                      {t.contactPage.projectType} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'residential', label: t.contactPage.typeResidential },
                        { id: 'villa', label: t.contactPage.typeVilla },
                        { id: 'commercial', label: t.contactPage.typeCommercial },
                        { id: 'renovation', label: t.contactPage.typeRenovation },
                      ].map((type) => (
                        <label
                          key={type.id}
                          className={`flex items-center gap-2.5 p-3 text-xs border cursor-pointer transition-colors ${
                            formData.projectType === type.id
                              ? 'bg-[#F8F7F2] border-[#A9563B] text-[#272923] font-semibold'
                              : 'bg-white border-[#E6E1D8] text-[#55564E] hover:bg-[#FAF9F5]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="projectType"
                            value={type.id}
                            checked={formData.projectType === type.id}
                            onChange={() => setFormData({ ...formData, projectType: type.id as 'residential' | 'commercial' | 'renovation' | 'villa' })}
                            className="accent-[#A9563B]"
                            disabled={submitting}
                          />
                          <span>{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.fullName} *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.contactPage.fullNamePlaceholder}
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border ${
                          formErrors.fullName ? 'border-red-500' : 'border-[#E6E1D8]'
                        } focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors`}
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-[11px] text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.email} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contactPage.emailPlaceholder}
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border ${
                          formErrors.email ? 'border-red-500' : 'border-[#E6E1D8]'
                        } focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-[11px] text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* 2-Column Phone & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.phone} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contactPage.phonePlaceholder}
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border ${
                          formErrors.phone ? 'border-red-500' : 'border-[#E6E1D8]'
                        } focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors`}
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-[11px] text-red-600">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.projectLocation} *
                      </label>
                      <input
                        type="text"
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        placeholder={t.contactPage.projectLocationPlaceholder}
                        disabled={submitting}
                        className={`w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border ${
                          formErrors.projectLocation ? 'border-red-500' : 'border-[#E6E1D8]'
                        } focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors`}
                      />
                      {formErrors.projectLocation && (
                        <p className="mt-1 text-[11px] text-red-600">{formErrors.projectLocation}</p>
                      )}
                    </div>
                  </div>

                  {/* 2-Column Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.approximateBudget}
                      </label>
                      <input
                        type="text"
                        value={formData.approximateBudget}
                        onChange={(e) => setFormData({ ...formData, approximateBudget: e.target.value })}
                        placeholder={t.contactPage.budgetPlaceholder}
                        disabled={submitting}
                        className="w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border border-[#E6E1D8] focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                        {t.contactPage.expectedTimeline}
                      </label>
                      <input
                        type="text"
                        value={formData.expectedTimeline}
                        onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                        placeholder={t.contactPage.timelinePlaceholder}
                        disabled={submitting}
                        className="w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border border-[#E6E1D8] focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Requirements Textarea */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#77766F] font-semibold mb-1.5">
                      {t.contactPage.requirements} *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder={t.contactPage.requirementsPlaceholder}
                      disabled={submitting}
                      className={`w-full px-3.5 py-2.5 text-xs text-[#272923] bg-[#F8F7F2] border ${
                        formErrors.requirements ? 'border-red-500' : 'border-[#E6E1D8]'
                      } focus:outline-none focus:border-[#A9563B] focus:bg-white transition-colors leading-relaxed`}
                    />
                    {formErrors.requirements && (
                      <p className="mt-1 text-[11px] text-red-600">{formErrors.requirements}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div>
                    <label className="flex items-start gap-2.5 text-xs text-[#55564E] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 accent-[#A9563B]"
                        disabled={submitting}
                      />
                      <span>{t.contactPage.consent}</span>
                    </label>
                    {formErrors.consent && (
                      <p className="mt-1 text-[11px] text-red-600">{formErrors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button with Loading State */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white bg-[#A9563B] hover:bg-[#85432F] disabled:bg-[#A9563B]/60 transition-colors cursor-pointer shadow-sm"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t.contactPage.submitting}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.contactPage.submitButton}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Studio Information & Consultation Logistics */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-[#E6E1D8] p-6 sm:p-7 shadow-xs space-y-5"
            >
              <h3 className="font-serif text-xl font-semibold text-[#272923] pb-3 border-b border-[#E6E1D8]">
                {t.contactPage.officeTitle}
              </h3>

              <div className="space-y-4 text-xs text-[#55564E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A9563B] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.contactPage.officeAddress}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#68715A] shrink-0 mt-0.5" />
                  <p>{t.contactPage.workingHours}</p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#85432F] shrink-0 mt-0.5" />
                  <p>consultations@vivainfra.com</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1]">
                <p className="text-[11px] text-[#77766F] leading-relaxed italic">
                  {t.contactPage.consultationNotice}
                </p>
              </div>
            </motion.div>

            {/* Architecture Consultation Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-[#272923] text-white p-6 sm:p-7 shadow-xs space-y-3"
            >
              <h4 className="font-serif text-lg font-medium text-white">
                What happens after you submit?
              </h4>
              <ul className="space-y-2.5 text-xs text-[#D8D7CE] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#FDBA74]">01.</span>
                  <span>Our architectural director reviews your site location and zoning bylaws within 24 business hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#FDBA74]">02.</span>
                  <span>We schedule an exploratory virtual or site session to review topographic orientation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-[#FDBA74]">03.</span>
                  <span>You receive an initial spatial feasibility brief and transparent BOQ preliminary estimate.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
