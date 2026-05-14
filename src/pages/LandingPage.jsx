import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Bell, 
  Heart, 
  Clock, 
  Shield, 
  Users, 
  Star, 
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // If user is already logged in, they might want to go straight to dashboard
  // but we'll show the landing page first and give them a button to enter the app.

  const features = [
    {
      icon: Clock,
      title: "Real-time Prayer Timings",
      description: "Get accurate prayer and jama'at timings for all mosques in Pernambut, updated daily.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Bell,
      title: "Instant Announcements",
      description: "Never miss an important update. Get instant notifications about community events and news.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Shield,
      title: "Death (Janaza) Alerts",
      description: "Stay informed about Janaza prayers and death news in the community to offer your support.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: Heart,
      title: "Seamless Donations",
      description: "Support your local mosques easily through integrated UPI and digital payment options.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                <Star className="text-white fill-white" size={24} />
              </div>
              <span className="ml-3 text-xl font-black tracking-tight text-gray-900">
                Pernambut<span className="text-primary-600">Connects</span>
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#about" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">About</a>
              {user ? (
                <button 
                  onClick={() => navigate('/')}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  Enter App
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-primary-600">Login</Link>
                  <Link 
                    to="/login" 
                    className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#features" className="block text-base font-semibold text-gray-600" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#about" className="block text-base font-semibold text-gray-600" onClick={() => setIsMenuOpen(false)}>About</a>
            {user ? (
              <button 
                onClick={() => { navigate('/'); setIsMenuOpen(false); }}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-center"
              >
                Enter App
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <Link to="/login" className="block text-center font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link 
                  to="/login" 
                  className="block w-full bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-primary-50 text-primary-700 mb-6">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  Community-Led Platform
                </span>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                  Stay Connected with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-500">
                    Your Local Mosque
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Pernambut Connects is the ultimate digital bridge between you and your community mosques. 
                  Get real-time updates, prayer timings, and support your local Masjids—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                  <a 
                    href="#features"
                    className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                  >
                    Explore Features
                  </a>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-gray-400">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-600 flex items-center justify-center text-[10px] font-bold text-white">
                      +1k
                    </div>
                  </div>
                  <p className="text-sm font-medium">Joined by 1,000+ Pernambut residents</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 mt-16 lg:mt-0 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                   <img 
                    src="/pernambut_connects_hero_1778673840946.png" 
                    alt="Pernambut Connects App" 
                    className="rounded-[32px] w-full shadow-inner"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-3 z-20"
                >
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Latest Update</p>
                    <p className="text-xs font-bold text-gray-900">Jummah Bayan at 1:15 PM</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-3 z-20"
                >
                  <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                    <Heart size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Donation</p>
                    <p className="text-xs font-bold text-gray-900">₹5,000 received for Masjid</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Core Features</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Everything You Need to Stay Informed</p>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Designed specifically for the Pernambut community, our platform brings modern convenience to your spiritual life.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-black mb-2">4+</p>
              <p className="text-primary-100 text-sm font-bold uppercase tracking-widest">Major Mosques</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black mb-2">1k+</p>
              <p className="text-primary-100 text-sm font-bold uppercase tracking-widest">Active Users</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black mb-2">₹1L+</p>
              <p className="text-primary-100 text-sm font-bold uppercase tracking-widest">Donations Sent</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black mb-2">24/7</p>
              <p className="text-primary-100 text-sm font-bold uppercase tracking-widest">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
            <div className="mb-16 lg:mb-0 relative">
              <div className="bg-gray-100 rounded-[48px] overflow-hidden aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1590076215667-875d45469502?q=80&w=2070&auto=format&fit=crop" 
                  alt="Community" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Overlay card */}
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 max-w-xs hidden sm:block">
                <div className="flex items-center space-x-2 text-primary-600 mb-3">
                  <Star size={20} className="fill-current" />
                  <Star size={20} className="fill-current" />
                  <Star size={20} className="fill-current" />
                  <Star size={20} className="fill-current" />
                  <Star size={20} className="fill-current" />
                </div>
                <p className="text-sm italic text-gray-600 mb-4">
                  "This platform has made it so much easier for us to stay updated with our local mosque's activities. Truly a blessing for our town."
                </p>
                <p className="text-sm font-black text-gray-900">— A Local Resident</p>
              </div>
            </div>

            <div>
              <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Our Mission</h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Empowering the <br /> Pernambut Community</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Pernambut Connects was born out of a need for better communication within our community. 
                We believe that technology should serve to bring people closer to their faith and their neighbors.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Centralized mosque information for all",
                  "Transparent donation tracking",
                  "Fastest Janaza and emergency alerts",
                  "Unified community calendar"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700 font-semibold">
                    <div className="bg-primary-100 text-primary-600 p-1 rounded-full mr-3">
                      <CheckCircle size={18} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-primary-900 rounded-[48px] p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Ready to Join Your Community?</h2>
            <p className="text-primary-100 text-lg sm:text-xl mb-12 max-w-2xl mx-auto opacity-80">
              Create your account today and start receiving updates from your favorite mosques in Pernambut.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all active:scale-95"
              >
                Get Started for Free
              </button>
              <button 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
                  <Star className="text-white fill-white" size={24} />
                </div>
                <span className="ml-3 text-xl font-black tracking-tight text-gray-900">
                  Pernambut<span className="text-primary-600">Connects</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                The digital heartbeat of Pernambut. Connecting residents with their mosques through technology and community spirit.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-primary-600 transition-colors">How it works</a></li>
                <li><a href="#features" className="hover:text-primary-600 transition-colors">Features</a></li>
                <li><a href="/login" className="hover:text-primary-600 transition-colors">Join Community</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Admin Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#about" className="hover:text-primary-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm font-medium">
              © 2026 Pernambut Connects. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-primary-600 transition-colors font-bold">Twitter</a>
              <a href="#" className="hover:text-primary-600 transition-colors font-bold">Facebook</a>
              <a href="#" className="hover:text-primary-600 transition-colors font-bold">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
