import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bell, Calendar, Heart, User, BookOpen } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Alerts', path: '/announcements', icon: Bell },
    { name: 'Wafat', path: '/death-news', icon: BookOpen },
    { name: 'Donate', path: '/donate', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'stroke-2' : 'stroke-[1.5]'} />
                <span className={`text-[10px] ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
