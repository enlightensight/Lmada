'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Badge from '@/components/Badge';
import FormButton from '@/components/FormButton';
import CinematicCTA from '@/components/CinematicCTA';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    scale: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    
    // Simulate API request call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: '',
        scale: '',
        message: '',
      });
    }, 1800);
  };

  return (
    <div className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto select-none">
      
      {/* Page Header */}
      <div className="max-w-2xl text-left mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4">Contact</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.1] mb-4">
            Let&apos;s talk about your biologics program
          </h1>
          <p className="text-sm sm:text-base text-muted font-normal leading-relaxed">
            Have a cell line, process scale-up, or cGMP manufacturing requirement? Share a few details and our scientific team will get back to you soon.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mt-10">
        
        {/* Left Column: Interactive Form Card */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center justify-center"
                  >
                    <CheckCircle className="w-16 h-16 text-neutral-400 mb-4" />
                    <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-2">Technical Inquiry Received</h3>
                    <p className="text-sm text-muted font-normal max-w-sm leading-relaxed">
                      Thank you for sharing your project specifications. Our development directors will evaluate your requirements and contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-xs font-semibold tracking-wider text-neutral-500 uppercase border-b border-neutral-300/35 pb-0.5 hover:text-neutral-900 hover:border-neutral-900 cursor-pointer font-mono"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 select-none"
                  >
                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Contact Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Corporate Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Service Type & Scale Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="projectType" className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Service Requested</label>
                        <select
                          id="projectType"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer"
                        >
                          <option value="">Select...</option>
                          <option value="cell-line">Cell Line Engineering</option>
                          <option value="process-scale">Process Development & Scaling</option>
                          <option value="gmp-substance">cGMP Drug Substance Manufacturing</option>
                          <option value="aseptic-fill">Aseptic Drug Product Fill/Finish</option>
                          <option value="analytical-testing">Analytical Validation & Characterization</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="scale" className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Project Phase / Scale</label>
                        <select
                          id="scale"
                          value={formData.scale}
                          onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer"
                        >
                          <option value="">Select...</option>
                          <option value="pilot">Early Pilot / Pre-clinical run</option>
                          <option value="phase-1">Phase I Clinical Batch</option>
                          <option value="phase-2-3">Phase II / III Clinical Quantities</option>
                          <option value="commercial">Commercial Supply</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Technical Specifications</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell us about your lead molecule target format, expression titers, and timeline expectations..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {/* Form Submit Button */}
                    <div className="mt-2">
                      <FormButton loading={status === 'loading'}>
                        Submit Technical Inquiry
                      </FormButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Dark Contact Information Card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="rounded-2xl sm:rounded-3xl dark-glass-card text-white p-6 md:p-8 flex flex-col justify-between min-h-[460px] relative overflow-hidden select-none">
              <div className="absolute inset-0 radial-glow opacity-80 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-semibold tracking-widest text-neutral-400 uppercase font-mono">Available slots</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-white mb-2">Booking slots for May - June 2026</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mb-6">
                  Get in touch with our technical directors to map out equipment trains and technology transfer schedules.
                </p>
              </div>

              {/* Rows contact */}
              <div className="flex flex-col gap-5 border-t border-white/10 pt-6 mt-8 relative z-10 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-semibold text-neutral-500 uppercase tracking-widest font-mono">Email</span>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">hello@lambda-cdmo.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-semibold text-neutral-500 uppercase tracking-widest font-mono">Location</span>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">Tallinn, Estonia / Remote</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[8px] font-semibold text-neutral-500 uppercase tracking-widest font-mono">Responsive time</span>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200">Within 24 hours (Business Days)</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* CINEMATIC CTA SECTION */}
      <CinematicCTA
        headingLine1="EXPLORE OUR"
        headingLine2="CAPABILITIES"
        subtitle="Discover our integrated approach to biologics development — from cell line construction through cGMP manufacturing to regulatory filing support."
        ctaLabel="View Services"
        ctaHref="/services/cell-line"
        secondaryLabel="About Lambda"
        secondaryHref="/overview/about"
      />

    </div>
  );
}
