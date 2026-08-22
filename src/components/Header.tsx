import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  UserCheck, 
  X,
  ExternalLink,
  ChevronDown,
  Building2,
  GraduationCap,
  LogOut,
  Package,
  Send
} from 'lucide-react';
import { AppNotification, UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'marketplace' | 'clubs' | 'requests' | 'my-activity';
  onSelectTab: (tab: 'marketplace' | 'clubs' | 'requests' | 'my-activity') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenPostRequest: () => void;
  onOpenListItem: () => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  user: UserProfile;
  onOpenAiFinder: () => void;
  onSwitchRoleOrLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onOpenPostRequest,
  onOpenListItem,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  user,
  onOpenAiFinder,
  onSwitchRoleOrLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isClub = user.role === 'club';
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#c4c6cf]/60 shadow-[0_1px_3px_rgba(0,32,69,0.04)] sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-[1280px] mx-auto w-full">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button 
            onClick={() => onSelectTab('marketplace')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-[#002045] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1a365d] transition-colors">
              <span className="font-headline font-black text-xl tracking-tight text-[#86f2e4]">N!</span>
            </div>
            <div>
              <div className="text-xl font-headline font-extrabold text-[#002045] tracking-tight leading-none">
                NeeD It!
              </div>
              <div className="text-[10px] text-[#006a61] font-semibold tracking-wide uppercase">
                BML Munjal Univ.
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onSelectTab('marketplace')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                currentTab === 'marketplace'
                  ? 'text-[#002045] font-bold bg-[#eff4ff]'
                  : 'text-[#43474e] hover:text-[#002045] hover:bg-[#f8f9ff]'
              }`}
              id="nav-marketplace-btn"
            >
              Marketplace
            </button>
            {isClub && (
              <button
                onClick={() => onSelectTab('clubs')}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                  currentTab === 'clubs'
                    ? 'text-[#006a61] font-bold bg-[#86f2e4]/20'
                    : 'text-[#43474e] hover:text-[#002045] hover:bg-[#f8f9ff]'
                }`}
                id="nav-clubs-btn"
              >
                Clubs Hub
              </button>
            )}
            <button
              onClick={() => onSelectTab('requests')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                currentTab === 'requests'
                  ? 'text-[#002045] font-bold bg-[#eff4ff]'
                  : 'text-[#43474e] hover:text-[#002045] hover:bg-[#f8f9ff]'
              }`}
              id="nav-requests-btn"
            >
              <span>Requests</span>
              <span className="bg-[#F59E0B]/20 text-[#b45309] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                Active
              </span>
            </button>
            <button
              onClick={() => onSelectTab('my-activity')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                currentTab === 'my-activity'
                  ? 'text-[#002045] font-bold bg-[#eff4ff]'
                  : 'text-[#43474e] hover:text-[#002045] hover:bg-[#f8f9ff]'
              }`}
              id="nav-my-activity-btn"
            >
              My Activity
            </button>
          </nav>
        </div>

        {/* Search & AI Campus Finder */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6 relative items-center">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search gear, textbooks, cameras, lab tools..."
              className="w-full bg-[#eff4ff] border border-[#c4c6cf]/80 rounded-full py-2 pl-10 pr-24 text-sm text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:bg-white transition-all"
              id="global-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isClub ? (
            /* Club View Actions: List Item is Primary */
            <button
              onClick={onOpenListItem}
              className="bg-[#006a61] hover:bg-[#0b8276] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              id="header-list-item-btn"
            >
              <Package className="w-4 h-4 text-[#86f2e4]" />
              <span>List Available Item</span>
            </button>
          ) : null}

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#43474e] hover:text-[#002045] hover:bg-[#eff4ff] rounded-full transition-colors relative"
              id="notifications-bell-btn"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#c4c6cf] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3.5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#002045]" />
                    <span className="font-headline font-bold text-sm text-[#002045]">Campus Notifications</span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearAllNotifications}
                      className="text-xs text-[#006a61] hover:underline font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#eff4ff]">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-[#74777f] text-sm">
                      No notifications right now.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          onMarkNotificationRead(notif.id);
                          if (notif.linkTab) onSelectTab(notif.linkTab);
                          setShowNotifications(false);
                        }}
                        className={`p-3.5 text-left cursor-pointer hover:bg-[#f8f9ff] transition-colors ${
                          !notif.read ? 'bg-[#eff4ff]/60' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-[#002045]">{notif.title}</h4>
                          <span className="text-[10px] text-[#74777f] whitespace-nowrap">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#43474e] mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[#eff4ff] transition-colors focus:outline-none"
              id="header-user-avatar-btn"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#002045]/20"
              />
              <ChevronDown className="w-3.5 h-3.5 text-[#74777f] hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#c4c6cf] shadow-xl z-50 p-2 animate-in fade-in duration-150">
                <div className="p-3 border-b border-[#eff4ff] mb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-headline font-bold text-sm text-[#002045] truncate">{user.name}</span>
                    {isClub ? (
                      <span className="bg-[#86f2e4]/30 text-[#006a61] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-[#86f2e4] shrink-0">
                        <Building2 className="w-2.5 h-2.5" /> Club Lead
                      </span>
                    ) : (
                      <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                        <GraduationCap className="w-2.5 h-2.5" /> Student
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-0.5 text-xs text-[#74777f]">
                    <span className="truncate">{user.email}</span>
                    <span className="font-mono text-[10px] bg-[#eff4ff] text-[#002045] px-1.5 py-0.2 rounded shrink-0">{user.studentId}</span>
                  </div>
                  <p className="text-[11px] text-[#006a61] mt-0.5 font-medium">
                    {isClub ? `${user.clubName || 'Campus Club'} (${user.clubRole || 'Lead'})` : user.department}
                  </p>
                </div>

                <div className="space-y-0.5 text-xs text-[#43474e]">
                  <button
                    onClick={() => {
                      onSelectTab('my-activity');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#eff4ff] hover:text-[#002045] font-medium flex items-center justify-between"
                  >
                    <span>{isClub ? 'My Club Activity & Inventory' : 'My Activity & Requests'}</span>
                    <span className="bg-[#002045] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                      {user.completedBorrows + user.completedLends}
                    </span>
                  </button>

                  {isClub ? (
                    <button
                      onClick={() => {
                        onOpenListItem();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#86f2e4]/20 hover:text-[#006a61] font-semibold text-[#006a61] flex items-center gap-1.5"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>+ List Available Item</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenPostRequest();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#fef3c7] hover:text-[#b45309] font-semibold text-[#b45309] flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>+ Post Urgent Request</span>
                    </button>
                  )}

                  <div className="pt-1.5 mt-1.5 border-t border-[#eff4ff]">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onSwitchRoleOrLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#fee2e2] text-[#ba1a1a] font-semibold flex items-center gap-1.5 transition-colors"
                      id="header-switch-role-btn"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Switch Role / Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
