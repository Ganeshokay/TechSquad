import React from 'react';
import { LayoutGrid, Users, MessageSquarePlus, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'marketplace' | 'clubs' | 'requests' | 'my-activity';
  onSelectTab: (tab: 'marketplace' | 'clubs' | 'requests' | 'my-activity') => void;
  unreadCount?: number;
  isClub?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  isClub = false,
}) => {
  return (
    <nav className="bg-white fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 md:hidden border-t border-[#c4c6cf]/60 shadow-[0_-4px_16px_rgba(0,32,69,0.06)] rounded-t-2xl">
      <button
        onClick={() => onSelectTab('marketplace')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          currentTab === 'marketplace'
            ? 'bg-[#86f2e4]/30 text-[#002045] font-bold scale-95'
            : 'text-[#43474e] hover:bg-[#eff4ff]'
        }`}
        id="mobile-nav-browse"
      >
        <LayoutGrid className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">Browse</span>
      </button>

      {isClub && (
        <button
          onClick={() => onSelectTab('clubs')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'clubs'
              ? 'bg-[#86f2e4]/30 text-[#006a61] font-bold scale-95'
              : 'text-[#43474e] hover:bg-[#eff4ff]'
          }`}
          id="mobile-nav-clubs"
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Clubs</span>
        </button>
      )}

      <button
        onClick={() => onSelectTab('requests')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
          currentTab === 'requests'
            ? 'bg-[#86f2e4]/30 text-[#002045] font-bold scale-95'
            : 'text-[#43474e] hover:bg-[#eff4ff]'
        }`}
        id="mobile-nav-requests"
      >
        <MessageSquarePlus className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">Requests</span>
      </button>

      <button
        onClick={() => onSelectTab('my-activity')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          currentTab === 'my-activity'
            ? 'bg-[#86f2e4]/30 text-[#002045] font-bold scale-95'
            : 'text-[#43474e] hover:bg-[#eff4ff]'
        }`}
        id="mobile-nav-profile"
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[11px]">Activity</span>
      </button>
    </nav>
  );
};
