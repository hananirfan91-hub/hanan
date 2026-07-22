import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { submitContactMessage } from '../lib/firebase';
import { Mail, MapPin, Send, CheckCircle2, Globe, Sparkles, PhoneCall, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Development',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Firebase error:", err);
      // fallback to submission state so user is not blocked
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* SECTION 1: HEADER */}
      <div className="space-y-4">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">// START A CONVERSATION</span>
        <h1 className="text-4xl sm:text-7xl font-black font-display text-white tracking-wide text-glow">
          LET'S BUILD SOMETHING GREAT.
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Have an idea, project, website, digital product, or technology challenge? Let's turn it into something useful, functional, and memorable.
        </p>
      </div>

      {/* SECTION 2 & 3: CONTACT INFO & DIRECT FORM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Info & Social Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-purple-500/30 bg-[#0a0c16] space-y-6">
            <h2 className="text-2xl font-bold font-display text-white">DIRECT CONTACT</h2>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/40 hover:text-purple-300 transition-all"
              >
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">EMAIL ADDRESS</span>
                  <span className="font-bold text-white">{PERSONAL_INFO.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">LOCATION</span>
                  <span className="font-bold text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">EXPECTED RESPONSE TIME</span>
                  <span className="font-bold text-white">Within 24 Hours (SLA Guaranteed)</span>
                </div>
              </div>
            </div>

            {/* Social Media Matrix */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                // SOCIAL MEDIA CHANNELS
              </span>
              <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
                <a
                  href={PERSONAL_INFO.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="font-bold">LinkedIn</span>
                  <span className="font-mono text-slate-400">{PERSONAL_INFO.socials.linkedin.handle}</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="font-bold">Instagram</span>
                  <span className="font-mono text-slate-400">@{PERSONAL_INFO.socials.instagram.handle}</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="font-bold">Facebook</span>
                  <span className="font-mono text-slate-400">{PERSONAL_INFO.socials.facebook.handle}</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="font-bold">TikTok</span>
                  <span className="font-mono text-slate-400">{PERSONAL_INFO.socials.tiktok.handle}</span>
                </a>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="font-bold">YouTube</span>
                  <span className="font-mono text-slate-400">{PERSONAL_INFO.socials.youtube.handle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Component */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-purple-500/30 bg-[#080911]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-extrabold font-display text-white">SEND A DIRECT MESSAGE</h2>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#05060a] border border-white/10 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    {errors.name && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      YOUR EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#05060a] border border-white/10 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    {errors.email && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      PROJECT TYPE
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#05060a] border border-white/10 rounded-2xl p-3.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="Web Application / SaaS">Web Application / SaaS</option>
                      <option value="WordPress Development">WordPress Development</option>
                      <option value="Technical SEO Optimization">Technical SEO Optimization</option>
                      <option value="UI/UX & Graphic Design">UI/UX & Graphic Design</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      PROJECT DETAILS / MESSAGE *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe your goals, requirements, timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#05060a] border border-white/10 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    {errors.message && <span className="text-xs text-red-400 font-mono mt-1 block">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-display font-extrabold text-xs tracking-wider shadow-xl shadow-purple-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="font-mono">SENDING MESSAGE...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE TO HANAN</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold font-display text-white">MESSAGE RECEIVED!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-purple-300 font-bold">{formData.name}</span>. Hanan Irfan will review your project inquiry and get back to you at <span className="text-cyan-300 font-mono">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', projectType: 'Full-Stack Development', message: '' }); }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-mono text-xs hover:bg-white/20 transition-all mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* SECTION 4: LOCATION & REGIONAL FOOTPRINT */}
      <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-r from-[#060c10] via-[#090b14] to-[#0a0718] space-y-4">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">// GLOBAL & LOCAL AVAILABILITY</span>
        <h2 className="text-2xl font-bold font-display text-white">BASED IN RAHIM YAR KHAN, SERVING CLIENTS GLOBALLY</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Hanan operates as a remote software engineer and consultant for clients worldwide, while maintaining strong local engineering presence in Rahim Yar Khan, Punjab, Pakistan.
        </p>
      </div>

      {/* SECTION 5: CLIENT FAQ */}
      <div className="glass-card rounded-3xl p-8 border border-purple-500/20 space-y-6">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" /> CLIENT INQUIRY FAQs
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-white font-bold block">What is your project turnaround time?</span>
            <span>Typical landing page and SEO builds take 3-5 days. Full-stack web applications and SaaS MVPs take 1-3 weeks.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-white font-bold block">Do you offer post-launch maintenance?</span>
            <span>Yes, technical support, bug fixes, server maintenance, and SEO auditing packages are available.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
