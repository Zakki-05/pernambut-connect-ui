import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, BookOpen, Heart, User } from 'lucide-react';

const navItems = [
  { name: 'Home',    path: '/home',          icon: Home     },
  { name: 'Alerts',  path: '/announcements', icon: Bell     },
  { name: 'Wafat',   path: '/death-news',    icon: BookOpen },
  { name: 'Donate',  path: '/donate',        icon: Heart    },
  { name: 'Profile', path: '/profile',       icon: User     },
];

const BottomNav = () => (
  <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-2 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-[28px] shadow-2xl z-[200] reveal">
    {navItems.map(({ name, path, icon: Icon }) => (
      <NavLink
        key={name}
        to={path}
        className={({ isActive }) => `
          flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all relative
          ${isActive ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}
        `}
      >
        {({ isActive }) => (
          <>
            {isActive && (
               <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl scale-75 blur-sm" />
            )}
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
            <span className={`text-[9px] font-black uppercase tracking-widest mt-1.5 relative z-10 ${isActive ? 'opacity-100' : 'opacity-0 scale-75'} transition-all`}>{name}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
