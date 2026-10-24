import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, HeartHandshake, Compass, Clock, Bell, Shield, Heart, 
  MapPin, Users, Globe2, BookOpen, CheckCircle, ChevronDown, 
  Mail, MessageSquare, ExternalLink, Sparkles, Building2, 
  HelpCircle, Send, Check, Phone, ArrowRight, Share2, Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import ourStoryImg from '../our-story.jpg';

const faqs = [
  {
    q: "What is the mission of Pernambut Connects?",
    a: "Pernambut Connects is a non-profit, community-driven digital platform created to unify all 23+ masjids in Pernambut, Tamil Nadu. It provides real-time Jama'at prayer timings, verified Janaza (bereavement) announcements, transparent Sadaqah support, and timely community notices—bridging the gap between our historic faith traditions and modern technology."
  },
  {
    q: "How are Jama'at prayer timings kept accurate?",
    a: "Each registered masjid in Pernambut has authorized mosque committee representatives and imams who update prayer schedules directly through the Admin Hub. Whenever seasons change or daylight shifts occur, updates reflect instantly across web and mobile apps for all followers."
  },
  {
    q: "How are Janaza and Wafat announcements verified?",
    a: "To eliminate misinformation and rumors during sensitive times, Janaza notices can only be posted or verified by verified mosque administrations or central community moderators. Every notice includes verified timings, name, residential mohalla, and specific burial ground/qabristan details."
  },
  {
    q: "Does Pernambut Connects deduct any fee from Sadaqah or donations?",
    a: "No. Pernambut Connects operates on a 100% transparent policy. Donations made to specific masjids go directly to the verified official bank accounts/UPI IDs of those respective mosques. The platform takes zero commission and does not charge any service fees."
  },
  {
    q: "How can a local Pernambut masjid join or get committee access?",
    a: "Any mosque committee member or trustee in Pernambut can reach out via the Contact & Registry Helpline or email zakkiadnan05@gmail.com. After quick identity verification by our local committee, admin credentials are provided to manage their mosque profile, timings, and notices."
  },
  {
    q: "Is the platform accessible in Tamil and Urdu?",
    a: "Yes! Pernambut Connects features native trilingual support in English, Tamil (தமிழ்), and Urdu (اردو). You can switch your preferred language at any time in Settings or using the language selector in the top bar."
  }
];

const pillars = [
  {
    icon: Clock,
    title: "Precision Jama'at Timings",
    desc: "Synchronized live prayer countdowns for Fajr, Dhuhr, Asr, Maghrib, and Isha across 23+ neighborhood masjids.",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
  },
  {
    icon: Bell,
    title: "Instant Janaza Alerts",
    desc: "Prompt, verified bereavement announcements ensuring the community can fulfill the funeral rights of our brothers and sisters.",
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
  },
  {
    icon: Heart,
    title: "Transparent Sadaqah Hub",
    desc: "Direct support for mosque electricity, repairs, water filtration, and discreet aid to needy families with 0% platform deductions.",
    color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
  },
  {
    icon: Users,
    title: "Unified Town Registry",
    desc: "Connecting mohallas from Chowk Masjid, Jamiya Masjid, Road Masjid to Rahmathabad and Biyabani under one harmonious umbrella.",
    color: "from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
  }
];

const stats = [
  { value: "23+", label: "Active Masjids", sub: "Covering every mohalla in Pernambut" },
  { value: "5,000+", label: "Community Members", sub: "Residents, students & diaspora" },
  { value: "100%", label: "Verified Bulletins", sub: "Direct from mosque committees" },
  { value: "3", label: "Supported Languages", sub: "English, தமிழ் & اردو" },
];

const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [openFaq, setOpenFaq] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [senderEmail, setSenderEmail] = useState(user?.email || "");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackText("");
      setFeedbackSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      
      {/* ── Modern Floating Header ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] bg-white/85 dark:bg-[#020617]/85 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800/60 rounded-[28px] shadow-2xl shadow-slate-950/5">
        <div className="px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all border border-slate-200/50 dark:border-slate-700/50"
              title="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                ﺑ
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black tracking-tighter block leading-none">Pernambut <span className="text-emerald-500">Connect</span></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">About & Heritage</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Pills */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-2xl p-1 border border-slate-200/50 dark:border-slate-700/50 text-xs font-black">
              {[
                { code: 'en', label: 'EN' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'ur', label: 'اردو' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    i18n.language === lang.code 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => navigate(user ? '/home' : '/select-mosque')}
              className="px-6 py-2.5 bg-slate-950 dark:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {user ? 'Open App' : 'Explore Masjids'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-emerald-500/20 shadow-sm">
              <Sparkles size={14} /> Our Story & Heritage
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-8">
              Uniting <span className="gradient-text">Pernambut's Mosques</span> <br />
              & Hearts Into One <span className="gold-text">Digital Rhythm.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Deeply rooted in our historic town of Pernambut, Tamil Nadu. Bridging generations of Islamic heritage with cutting-edge technology for prayer sync, Janaza alerts, and collective community uplift.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin size={16} className="text-emerald-500" /> Pernambut, Tamil Nadu</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5"><Building2 size={16} className="text-amber-500" /> 23+ Registered Mosques</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5"><Award size={16} className="text-emerald-500" /> 100% Non-Profit Initiative</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── By The Numbers ── */}
      <section className="py-12 px-6 lg:px-10 border-y border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <div className="text-4xl lg:text-5xl font-black gradient-text mb-2 tracking-tight">{s.value}</div>
              <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1">{s.label}</div>
              <div className="text-[11px] font-bold text-slate-400">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Community Artwork Showcase ── */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">The Visual Blueprint</h2>
            <h3 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">Our Community Ecosystem</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
              Every neighborhood mosque is more than a prayer space—it is the hub of education, charity, elder care, and local commerce. Pernambut Connects digitizes this sacred web without losing its warmth.
            </p>
          </div>

          <div className="relative rounded-[48px] p-4 sm:p-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-950/80 border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="relative rounded-[36px] overflow-hidden border border-slate-200/60 dark:border-slate-700/60 shadow-inner group">
              <img 
                src={ourStoryImg} 
                alt="Pernambut Community & Mosque Ecosystem" 
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8 sm:p-12">
                <div className="text-white max-w-3xl">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest inline-block mb-3 shadow-lg">
                    Town of Pernambut
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black mb-2">Connecting and empowering the Pernambut community</h4>
                  <p className="text-slate-200 text-sm sm:text-base font-medium">Through technology, unity, education, support, and local digital services.</p>
                </div>
              </div>
            </div>

            {/* Feature Highlights beneath artwork */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black mb-4">1</div>
                <h5 className="font-black text-lg mb-2">The Central Mosque</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  The spiritual nucleus anchoring daily congregation, Jum'ah prayers, Taraweeh updates, and verified public announcements.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center font-black mb-4">2</div>
                <h5 className="font-black text-lg mb-2">Welfare & Elder Care</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Transparent Sadaqah and emergency relief supporting widows, destitute families, and urgent medical assistance with honor.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center font-black mb-4">3</div>
                <h5 className="font-black text-lg mb-2">Local Trade & Youth Circles</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Madarasa notifications, educational halaqas, and uplifting ethical neighborhood businesses across Pernambut.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pernambut Town Heritage ── */}
      <section className="py-24 px-6 lg:px-10 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Compass size={14} /> Historic Roots
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">
              The Living Spirit of <br />
              <span className="gold-text">Pernambut, Tamil Nadu</span>
            </h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-base sm:text-lg">
              <p>
                Nestled along the picturesque hills of the Eastern Ghats in northern Tamil Nadu, Pernambut is celebrated throughout India for its skilled craftsmanship, vibrant commerce, and legendary hospitality.
              </p>
              <p>
                From generations past, our town has flourished around its grand minarets. Historic masjids such as <strong className="text-slate-900 dark:text-white font-black">Chowk Masjid</strong>, <strong className="text-slate-900 dark:text-white font-black">Jamiya Masjid</strong>, and <strong className="text-slate-900 dark:text-white font-black">Road Masjid</strong> along with more than 20 neighborhood mosques form the spiritual cadence of our lives.
              </p>
              <p>
                Historically, when an elderly member passed away or prayer timings shifted with winter or summer, news traveled through loudspeakers or handwritten noticeboards. Pernambut Connects ensures that every resident—whether at home, working in Chennai or Bengaluru, or living abroad in the Gulf—stays instantly united with their home masjid.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/select-mosque')}
                className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
              >
                Browse Pernambut Masjids
              </button>
              <a 
                href="#faq"
                className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:border-emerald-500 transition-all"
              >
                Read FAQs
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-[32px] bg-white dark:bg-slate-900 border ${pillar.color} shadow-sm group hover:-translate-y-1 transition-transform`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-sm">
                  <pillar.icon size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">{pillar.title}</h4>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section id="faq" className="py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Common Questions</h2>
            <h3 className="text-4xl font-black tracking-tight mb-4">Everything You Need to Know</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Clear, honest answers about Pernambut Connects and how we operate.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left gap-6 group"
                  >
                    <span className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {faq.q}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all transform ${isOpen ? 'rotate-180 bg-emerald-500 text-white' : ''}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-8 pt-2 text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact & Support Form ── */}
      <section className="py-24 px-6 lg:px-10 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Mail size={14} /> Contact & Support
            </div>
            <h3 className="text-4xl font-black tracking-tight mb-6">Get in Touch with the Community Team</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base leading-relaxed mb-8">
              Are you a mosque trustee, imam, or resident who would like to register your masjid, suggest improvements, or volunteer with Pernambut Connects? We'd love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</p>
                  <a href="mailto:zakkiadnan05@gmail.com" className="font-black text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                    zakkiadnan05@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Jurisdiction</p>
                  <p className="font-black text-slate-900 dark:text-white">Pernambut - 635810, Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Feedback Form */}
          <div className="p-8 sm:p-10 rounded-[36px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
            <h4 className="text-xl font-black mb-2">Send Community Feedback</h4>
            <p className="text-xs text-slate-400 font-bold mb-6">Your suggestion will be sent straight to our Pernambut team.</p>

            {feedbackSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4">
                  <Check size={24} />
                </div>
                <h5 className="font-black text-emerald-800 dark:text-emerald-300 text-lg mb-1">Jazakallah Khair!</h5>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Thank you for your feedback. We appreciate your contribution to Pernambut Connects.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Your Email</label>
                  <input 
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block">Feedback or Mosque Request</label>
                  <textarea 
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share your suggestions, mosque registration queries, or feedback..."
                    required
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Send size={16} /> Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-20 pb-16 px-6 lg:px-10 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">ﺑ</div>
            <div>
              <span className="text-xl font-black tracking-tighter">Pernambut <span className="text-emerald-500">Connect</span></span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Built with Sincerity for Pernambut</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <Link to="/select-mosque" className="hover:text-emerald-500 transition-colors">Masjids</Link>
            <Link to="/register" className="hover:text-emerald-500 transition-colors">Join Registry</Link>
            <Link to="/login" className="hover:text-emerald-500 transition-colors">Sign In</Link>
          </div>

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            © 2026 Pernambut Connects • 100% Free Community Service
          </p>
        </div>
      </footer>

    </div>
  );
};

export default About;
