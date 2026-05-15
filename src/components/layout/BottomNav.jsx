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
  <nav className="bottom-nav">
    {navItems.map(({ name, path, icon: Icon }) => (
      <NavLink
        key={name}
        to={path}
        className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
      >
        {({ isActive }) => (
          <>
            <span className="nav-pill">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} />
            </span>
            <span className="nav-label">{name}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
