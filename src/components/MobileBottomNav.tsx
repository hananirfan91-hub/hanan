import React from 'react';
import { motion } from 'motion/react';
import { Home, User, LayoutGrid, Cpu, Mail } from 'lucide-react';
import { PageId } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const items: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: LayoutGrid, badge: PROJECTS.length },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 safe-bottom bg-[#080D1B]/92 backdrop-blur-2xl border-t border-white/[0.12] shadow-[0_-10px_32px_rgba(4,8,20,0.8)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              id={`mobile-bottom-nav-${item.id}`}
              className={`relative flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer select-none ${
                isActive ? 'text-[#3B82F6]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-bottom-active-bar"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute top-0 w-9 h-[2.5px] rounded-full bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.65)]"
                />
              )}

              <div className="relative flex items-center justify-center">
                <Icon className="w-5 h-5" />
                {typeof item.badge === 'number' && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#3B82F6] text-[#F8FAFC] text-[9px] font-mono font-bold flex items-center justify-center leading-none shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-medium tracking-tight leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
