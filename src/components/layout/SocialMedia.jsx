import React, { useEffect, useState } from 'react';
import { Youtube, Facebook, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import { getSocialLinks } from '../../services/api';

export default function SocialMedia() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSocialLinks()
      .then(res => {
        setLinks(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching links:', err);
        setIsLoading(false);
      });
  }, []);

  const getPlatformData = (platform) => {
    switch(platform) {
      case 'YOUTUBE': return { name: 'YouTube', icon: Youtube, color: 'bg-red-50 text-red-600 border-red-100', iconColor: 'text-red-500', desc: 'Watch Live Bayans & Events' };
      case 'FACEBOOK': return { name: 'Facebook', icon: Facebook, color: 'bg-blue-50 text-blue-600 border-blue-100', iconColor: 'text-blue-600', desc: 'Join Community Discussions' };
      case 'INSTAGRAM': return { name: 'Instagram', icon: Instagram, color: 'bg-pink-50 text-pink-600 border-pink-100', iconColor: 'text-pink-600', desc: 'Follow Photo Updates' };
      case 'WHATSAPP': return { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-50 text-green-600 border-green-100', iconColor: 'text-green-500', desc: 'Official Community Updates' };
      default: return null;
    }
  };

  if (isLoading || links.length === 0) return null;

  return (
    <div className="mt-8 px-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Connect With Us</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">Official</span>
      </div>
      <div className="flex flex-col space-y-3">
        {links.map((link) => {
          const data = getPlatformData(link.platform);
          if (!data) return null;
          return (
            <a 
              key={link.id}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-4 rounded-2xl border ${data.color} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center">
                <div className="bg-white p-2.5 rounded-xl shadow-sm mr-4">
                  <data.icon size={22} className={data.iconColor} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{data.name}</h3>
                  <p className="text-xs font-medium opacity-80 mt-0.5">{data.desc}</p>
                </div>
              </div>
              <div className="bg-white/50 p-2 rounded-full shadow-inner">
                <ExternalLink size={16} className="opacity-70" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
