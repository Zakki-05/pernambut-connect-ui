import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, Bell, Heart, Clock, Shield, Users, Star, 
  CheckCircle, ArrowRight, Menu, X, Twitter, Facebook, 
  Instagram, MapPin, Compass, Sparkles, Zap, HeartHandshake,
  BookOpen, Building2, ExternalLink, Globe2
} from 'lucide-react';
import ourStoryImg from '../our-story.jpg';

const masjidsList = [
  { id: 1, name: "Chowk Masjid", location: "Central Pernambut", description: "The historic spiritual anchor of Pernambut, facilitating daily prayers and major community gatherings since generations.", image: "https://images.unsplash.com/photo-1564683214965-3619addd900d?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Jamiya Masjid", location: "Town Center", description: "The primary congregational hub for Friday prayers and central Islamic celebrations in the heart of town.", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Road Masjid", location: "Main Highway", description: "A vibrant center for the Ahle Hadees community, known for educational seminars and local outreach.", image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    { icon: Clock, title: "Precision Timings", desc: "Live-updated Jama'at timings for all 23+ local masjids in Pernambut.", color: "bg-emerald-50 text-emerald-600" },
    { icon: Bell, title: "Janaza Alerts", desc: "Stay informed about community departures and Janaza timings instantly.", color: "bg-amber-50 text-amber-600" },
    { icon: Shield, title: "Verified Updates", desc: "Official announcements directly from mosque administrations and committees.", color: "bg-blue-50 text-blue-600" },
    { icon: Heart, title: "Sadaqah Hub", desc: "A transparent, integrated way to support your local masjid's maintenance.", color: "bg-red-50 text-red-600" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] selection:bg-emerald-500 selection:text-white">
      
      {/* ── Modern Navbar ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] bg-white/80 dark:bg-[#020617]/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] shadow-2xl shadow-slate-900/5 overflow-hidden transition-all duration-300">
        <div className="px-6 lg:px-10 flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">ﺑ</div>
            <span className="text-xl font-black tracking-tighter dark:text-white">Pernambut <span className="text-emerald-500">Connect</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Masjids', 'About'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-black text-slate-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">{link}</a>
            ))}
            <button onClick={() => navigate('/select-mosque')} 
              className="px-8 py-3.5 bg-slate-950 dark:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-950/10 hover:scale-105 active:scale-95 transition-all">
              Launch App
            </button>
          </div>

          <button className="md:hidden p-3 text-slate-900 dark:text-white hover:text-emerald-500 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-slate-100 dark:border-slate-800/50"
            >
              <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
                {['Features', 'Masjids', 'About'].map(link => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-black text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 uppercase tracking-widest transition-colors py-2 block"
                  >
                    {link}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/select-mosque');
                  }} 
                  className="w-full py-4 bg-slate-950 dark:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-center mt-2 block"
                >
                  Launch App
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-40 pb-24 lg:pt-60 lg:pb-40 overflow-hidden">
        <div className="w-full px-6 lg:px-10 relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
               <Sparkles size={14} /> The Digital Pulse of Pernambut
            </div>
            <h1 className="text-6xl lg:text-[90px] font-black tracking-tighter leading-[0.95] mb-10 dark:text-white">
              Stay <span className="gradient-text">Connected</span> <br/>
              With Your <br/>
              <span className="gold-text">Local Masjid.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl mb-12 leading-relaxed">
              Pernambut Connects is the unified community platform providing real-time prayer timings, janaza alerts, and seamless mosque support.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button onClick={() => navigate('/select-mosque')} className="w-full sm:w-auto h-18 px-12 bg-emerald-500 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all flex items-center justify-center gap-3">
                Get Started <ArrowRight size={20} strokeWidth={3} />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('about');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="w-full sm:w-auto h-18 px-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-[24px] font-black text-lg hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-16 flex items-center justify-center lg:justify-start gap-12">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-slate-100 overflow-hidden"><img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="user" /></div>)}
                  <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-950 bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white">+5k</div>
               </div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Joined by 5,000+ <br/> local residents</p>
            </div>
          </motion.div>

          <div className="relative group">
             <div className="absolute inset-0 bg-emerald-500/20 rounded-[60px] blur-[100px] group-hover:scale-110 transition-transform duration-700" />
             <div className="relative premium-card p-4 rounded-[60px] transform rotate-2 hover:rotate-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop" alt="Pernambut" className="rounded-[48px] w-full h-[600px] object-cover" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                   <Zap size={32} fill="currentColor" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section id="features" className="py-32 px-6 lg:px-10 bg-slate-50 dark:bg-[#0f172a]/20">
        <div className="w-full">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">Core Capabilities</h2>
            <h3 className="text-5xl font-black dark:text-white tracking-tighter mb-6">Modernizing Faith Connection</h3>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Built with a focus on speed and clarity, Pernambut Connects brings your spiritual routine into the digital age.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
                key={f.title} className="premium-card group">
                <div className={`w-16 h-16 rounded-[24px] ${f.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                  <f.icon size={30} />
                </div>
                <h4 className="text-xl font-black dark:text-white mb-3">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masjid Explorer ── */}
      <section id="masjids" className="py-40 px-6 lg:px-10">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
             <div>
                <h2 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6">Community Map</h2>
                <h3 className="text-5xl font-black dark:text-white tracking-tighter">Pernambut Registry</h3>
             </div>
             <p className="text-slate-500 font-medium max-w-md text-lg">Explore 23+ active masjids integrated into the platform for real-time data sync.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {masjidsList.map((m, i) => (
              <div key={m.id} className="premium-card group p-0 overflow-hidden">
                <div className="h-64 relative overflow-hidden">
                   <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                   <div className="absolute bottom-6 left-8">
                      <h4 className="text-2xl font-black text-white tracking-tight">{m.name}</h4>
                      <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1">
                         <MapPin size={12} /> {m.location}
                      </div>
                   </div>
                </div>
                <div className="p-8">
                   <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed mb-10">{m.description}</p>
                   <button onClick={() => navigate('/select-mosque')} className="w-full h-14 bg-slate-950 dark:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors">Select as Primary</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button onClick={() => navigate('/select-mosque')} className="px-10 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl font-black text-sm uppercase tracking-[0.3em] dark:text-white hover:border-emerald-500 transition-all shadow-xl shadow-slate-900/5">Explore Full Registry <ChevronRight className="inline-block ml-3" size={18} /></button>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-36 px-6 lg:px-10 bg-gradient-to-b from-white via-slate-50/70 to-white dark:from-[#020617] dark:via-[#0b1329]/30 dark:to-[#020617] relative overflow-hidden border-t border-slate-100 dark:border-slate-800/80">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-emerald-500/20 shadow-sm">
              <HeartHandshake size={14} /> Our Heritage & Mission
            </div>
            <h2 className="text-5xl lg:text-6xl font-black dark:text-white tracking-tighter mb-6 leading-tight">
              The Story Behind <br />
              <span className="gradient-text">Pernambut Connects</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
              Uniting over 23 neighborhood masjids and thousands of families across Pernambut, Tamil Nadu into one digital heartbeat for prayer, welfare, and community solidarity.
            </p>
          </div>

          {/* Two-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            
            {/* Left Column: Narrative & Values */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-8"
            >
              <div className="space-y-5 text-slate-600 dark:text-slate-400 font-medium text-base sm:text-lg leading-relaxed">
                <p>
                  Rooted in the historic artisan and leathercraft town of Pernambut, our community has flourished for generations around our sacred houses of Allah. With over 23 masjids spanning historic landmarks like <strong className="text-slate-900 dark:text-white font-black">Chowk Masjid</strong>, <strong className="text-slate-900 dark:text-white font-black">Jamiya Masjid</strong>, and <strong className="text-slate-900 dark:text-white font-black">Road Masjid</strong>, our town's pulse is guided by the five daily calls to prayer.
                </p>
                <p>
                  Yet, coordinating Jama'at timings across seasons, sharing urgent Janaza bereavements, and organizing charity traditionally relied on word of mouth or fragmented groups. Pernambut Connects was born as a non-profit, volunteer-led bridge ensuring every resident—at home, at work, or abroad—stays synchronized with their neighborhood masjid.
                </p>
              </div>

              {/* 4 Pillars Mini-Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black mb-3">
                    <Clock size={20} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Spiritual Synchrony</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">Live Jama'at timetables updated directly by local imams & committees.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:border-amber-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 flex items-center justify-center font-black mb-3">
                    <Bell size={20} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Instant Janaza Alerts</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">Verified bereavement notices so the community can join the funeral prayer.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:border-rose-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 flex items-center justify-center font-black mb-3">
                    <Heart size={20} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Direct Sadaqah Hub</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">100% direct mosque contributions with zero platform deductions.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center font-black mb-3">
                    <Globe2 size={20} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Trilingual Access</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">Native English, தமிழ் (Tamil), and اردو (Urdu) for all generations.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link 
                  to="/about"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-950 dark:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  Read Full Story & FAQs <ArrowRight size={16} />
                </Link>
                <button 
                  onClick={() => navigate('/select-mosque')}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:border-emerald-500 transition-all text-center"
                >
                  Explore Masjids
                </button>
              </div>
            </motion.div>

            {/* Right Column: Visual Artwork */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-[50px] blur-[80px] group-hover:scale-105 transition-transform duration-700" />
                
                <div className="relative rounded-[48px] p-3 sm:p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden">
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest border border-white/20 shadow-lg">
                    <Building2 size={14} className="text-emerald-400" /> 23+ Mosques Synchronized
                  </div>

                  {/* Floating Corner Badge */}
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <Sparkles size={12} /> Community Hub
                  </div>

                  <div className="rounded-[36px] overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img 
                      src={ourStoryImg} 
                      alt="Pernambut Community & Mosque Ecosystem" 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  <div className="p-6 text-center">
                    <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                      "Connecting and empowering the Muslim community through technology, unity, education, support, and local digital services."
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      <MapPin size={12} /> Pernambut, Tamil Nadu • 100% Community Initiative
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[36px] bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 shadow-sm">
            <div className="text-center p-4">
              <div className="text-4xl lg:text-5xl font-black gradient-text mb-2">23+</div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Active Masjids</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Across Pernambut Mohallas</p>
            </div>
            <div className="text-center p-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-4xl lg:text-5xl font-black gold-text mb-2">5,000+</div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Local Residents</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Connected Daily</p>
            </div>
            <div className="text-center p-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-4xl lg:text-5xl font-black text-emerald-500 mb-2">100%</div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Verified Bulletins</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Direct From Mosques</p>
            </div>
            <div className="text-center p-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-4xl lg:text-5xl font-black text-blue-500 mb-2">3</div>
              <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Languages</p>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">English • தமிழ் • اردو</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA Block ── */}
      <section className="py-40 px-6">
         <div className="w-full bg-slate-950 rounded-[80px] p-16 lg:p-32 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
               <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-10 leading-[1.1]">Ready to join the <br/> <span className="gradient-text">community?</span></h2>
               <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto mb-16">Download the hub or launch the web explorer to stay synchronized with Pernambut's Islamic beat.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button onClick={() => navigate('/register')} className="w-full sm:w-auto h-20 px-16 bg-white text-slate-950 rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Join Registry</button>
                  <button onClick={() => navigate('/login')} className="w-full sm:w-auto h-20 px-16 bg-emerald-500 text-white rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all">Sign In</button>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />
         </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white dark:bg-[#020617] pt-32 pb-20 px-6 lg:px-10 border-t border-slate-100 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
             <div className="col-span-2">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl">ﺑ</div>
                  <span className="text-xl font-black tracking-tighter dark:text-white">Pernambut <span className="text-emerald-500">Connect</span></span>
                </div>
                <p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-10">Pernambut's digital bridge. Empowering our community with real-time connectivity and transparent mosque management.</p>
                <div className="flex items-center gap-6 text-slate-300">
                  {[Twitter, Facebook, Instagram].map((Icon, i) => <Icon key={i} size={24} className="hover:text-emerald-500 cursor-pointer transition-colors" />)}
                </div>
             </div>
             <div>
                <h5 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] mb-10">Navigation</h5>
                <ul className="space-y-6">
                   {[
                     { label: 'Features', to: '#features' },
                     { label: 'Masjids', to: '#masjids' },
                     { label: 'About Us', to: '/about' },
                     { label: 'Community FAQ', to: '/about#faq' }
                   ].map(item => (
                     <li key={item.label}>
                       {item.to.startsWith('#') ? (
                         <a href={item.to} className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">
                           {item.label}
                         </a>
                       ) : (
                         <Link to={item.to} className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">
                           {item.label}
                         </Link>
                       )}
                     </li>
                   ))}
                </ul>
             </div>
             <div>
                <h5 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] mb-10">Legal & Support</h5>
                <ul className="space-y-6">
                   <li className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">
                     <Link to="/about">Privacy & Trust</Link>
                   </li>
                   <li className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">
                     <Link to="/about">Terms of Service</Link>
                   </li>
                   <li className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">
                     <a href="mailto:zakkiadnan05@gmail.com">Contact Helpline</a>
                   </li>
                </ul>
             </div>
          </div>
          <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Pernambut Connects • Built for Community</p>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Network Operational</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
