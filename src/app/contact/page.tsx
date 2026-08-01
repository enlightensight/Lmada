'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Check, ArrowRight, Clock, Shield } from 'lucide-react';
import Reveal from '@/components/Reveal';

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

  const inputClass =
    'w-full px-4 py-3 rounded-[10px] border border-neutral-200 bg-neutral-50 text-black text-sm focus:outline-none focus:border-brand-blue focus:bg-white transition-colors';

  const labelClass = 'text-xs font-semibold text-black tracking-wider uppercase';

  return (
    <div className="select-none">
      {/* HERO — light band with grid overlay */}
      <section className="relative bg-molecules-hero overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative w-full px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1.5 rounded-[10px] text-[10px] uppercase font-bold tracking-wider bg-brand-yellow text-black mb-6">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.1] mb-4">
              Let&apos;s Advance Your <span className="text-black">Next Biologics</span> Program
            </h1>
            {/* animated yellow underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="h-1 w-24 bg-brand-yellow rounded-full origin-left mb-5"
            />
            <p className="text-base text-neutral-600 leading-relaxed">
              Whether you&apos;re developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="px-6 py-12 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative glass-card rounded-[10px] p-6 md:p-8 shadow-sm overflow-hidden">
                {/* yellow top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow" />
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-12 flex flex-col items-center text-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                        className="w-20 h-20 rounded-[10px] bg-brand-yellow flex items-center justify-center mb-6"
                      >
                        <Check className="w-10 h-10 text-black" strokeWidth={3} />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-black mb-2">Technical Inquiry Received</h3>
                      <p className="text-sm text-neutral-600 font-normal max-w-sm leading-relaxed">
                        Thank you for sharing your project specifications. Our development directors will evaluate your requirements and contact you within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-blue uppercase"
                      >
                        <span className="w-6 h-0.5 bg-brand-yellow group-hover:w-10 transition-all duration-300" />
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 select-none"
                    >
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className={labelClass}>Contact Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className={labelClass}>Corporate Email</label>
                        <input
                          type="email"
                          id="email"
                          required
                          placeholder="jane@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="projectType" className={labelClass}>Service Requested</label>
                          <select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className={`${inputClass} cursor-pointer`}
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
                          <label htmlFor="scale" className={labelClass}>Project Phase / Scale</label>
                          <select
                            id="scale"
                            value={formData.scale}
                            onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="">Select...</option>
                            <option value="pilot">Early Pilot / Pre-clinical run</option>
                            <option value="phase-1">Phase I Clinical Batch</option>
                            <option value="phase-2-3">Phase II / III Clinical Quantities</option>
                            <option value="commercial">Commercial Supply</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className={labelClass}>Technical Specifications</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          placeholder="Tell us about your lead molecule target format, expression titers, and timeline expectations..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <div className="mt-2">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === 'loading' ? (
                            <>
                              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Technical Inquiry
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Information — blue card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative bg-brand-blue rounded-[10px] text-white p-6 md:p-8 flex flex-col justify-between min-h-[460px] overflow-hidden select-none shadow-sm">
                {/* grid overlay */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">Available for discussion</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    Connect with our <span className="text-black">scientific team</span>
                  </h3>
                  <p className="text-sm text-white/70 font-normal leading-relaxed mb-6">
                    Get in touch with our technical directors to map out development strategies, equipment trains, and technology transfer schedules.
                  </p>
                </div>

                <div className="flex flex-col gap-5 border-t border-white/10 pt-6 mt-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-yellow flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Email</span>
                      <p className="text-sm font-semibold text-white">info@lambdacdmo.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-yellow flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Location</span>
                      <p className="text-sm font-semibold text-white">Ahmedabad, India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-yellow flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Phone</span>
                      <p className="text-sm font-semibold text-white">+91 79 0000 0000</p>
                    </div>
                  </div>
                </div>

                {/* assurance chips */}
                <div className="flex flex-wrap gap-3 mt-8 relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white/10 border border-white/20 text-white text-[11px] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                    Response within 24 hours
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white/10 border border-white/20 text-white text-[11px] font-semibold">
                    <Shield className="w-3.5 h-3.5 text-brand-yellow" />
                    NDA on request
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </div>
  );
}
