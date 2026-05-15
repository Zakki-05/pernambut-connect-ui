import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Bell, Heart, Clock, Shield, Users, Star, 
  CheckCircle, ArrowRight, Menu, X, Twitter, Facebook, 
  Instagram, MapPin, Compass, Sparkles, Zap
} from 'lucide-react';

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
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 dark:bg-[#020617]/70 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-800/50">
        <div className="w-full px-6 lg:px-10 flex justify-between items-center h-20">
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

          <button className="md:hidden p-3 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
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
              <button className="w-full sm:w-auto h-18 px-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-[24px] font-black text-lg hover:bg-white transition-all">
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
        <div className="w-full">
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
                   {['Features', 'Masjids', 'Support', 'Contact'].map(l => <li key={l} className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">{l}</li>)}
                </ul>
             </div>
             <div>
                <h5 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.4em] mb-10">Legal</h5>
                <ul className="space-y-6">
                   {['Privacy', 'Terms', 'Credits'].map(l => <li key={l} className="text-sm font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest cursor-pointer transition-colors">{l}</li>)}
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
