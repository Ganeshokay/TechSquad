import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Building, 
  MapPin, 
  Clock, 
  Star, 
  Plus, 
  GraduationCap,
  Camera,
  Shirt,
  Mic,
  SlidersHorizontal,
  Handshake,
  HeartHandshake,
  CheckCircle2,
  Package
} from 'lucide-react';
import { CategoryType, GearItem, UserProfile } from '../types';

interface MarketplaceViewProps {
  items: GearItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onBorrowItem: (item: GearItem) => void;
  onOpenListItem: () => void;
  onOpenPostRequest: () => void;
  onNavigateToClubs: () => void;
  onOpenAiFinder: () => void;
  user: UserProfile;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Photography (PAC)',
  'Modelling (Blaze)',
  'Drama & Theatre (Mritunjay)'
];

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onBorrowItem,
  onOpenListItem,
  onOpenPostRequest,
  onNavigateToClubs,
  onOpenAiFinder,
  user
}) => {
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'duration'>('recommended');

  const isClub = user.role === 'club';

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (filterAvailability === 'available' && item.status !== 'available') return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        const matchesOwner = item.ownerName.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCategory || matchesTags || matchesOwner || matchesLocation;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return b.maxBorrowDays - a.maxBorrowDays;
      // Recommended: Available first
      if (a.status === 'available' && b.status !== 'available') return -1;
      if (b.status === 'available' && a.status !== 'available') return 1;
      return 0;
    });
  }, [items, selectedCategory, filterAvailability, searchQuery, sortBy]);

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'Photography (PAC)':
        return <Camera className="w-4 h-4 text-[#006a61]" />;
      case 'Modelling (Blaze)':
        return <Sparkles className="w-4 h-4 text-[#d97706]" />;
      case 'Drama & Theatre (Mritunjay)':
        return <Mic className="w-4 h-4 text-[#8b5cf6]" />;
      default:
        return <Building className="w-4 h-4 text-[#002045]" />;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 px-4 md:px-6 bg-gradient-to-b from-[#e5eeff]/70 via-[#f8f9ff] to-[#f8f9ff] border-b border-[#c4c6cf]/30 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_CwGjd-Pu_RU79DBe6QgoLaynzwj2ITktkR_DYEK_BpYXWWCgSbf_wQtBO1HaBUY0UffY1omwX9S--SKuHT838yD6lvZtsA02eR7I8NmngAMC_4BQ3EabSzf7mKpHHe3da8GrfhFqUtO_TdEb6lSABJuCz5IE6EwiwO1uXZYwW5e16xAkaTL5nMCtFK1zdQukWgTlMYo2JOzaJQtF9jclyk4b_JCsunofZm6wgauOmF0K1HXpD6U-hg')`
          }}
        />

        <div className="max-w-[1280px] mx-auto relative z-10 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-extrabold text-[#002045] tracking-tight mb-4 max-w-4xl">
            {isClub ? (
              <>
                Manage Club Inventory. <br className="hidden sm:block" />
                <span className="text-[#006a61]">Equip Student Creators.</span>
              </>
            ) : (
              'Borrow/Share'
            )}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#43474e] max-w-3xl mb-7 leading-relaxed font-medium">
            {isClub 
              ? `Welcome ${user.name}! List and publish available ${user.clubName || 'club'} equipment, approve borrow requests, and support student projects across campus.`
              : 'Everything you need without buying everything.'
            }
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-lg">
            {isClub ? (
              <>
                <button
                  onClick={onOpenListItem}
                  className="bg-[#006a61] hover:bg-[#0b8276] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-[0px_8px_20px_rgba(0,106,97,0.25)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none"
                  id="hero-list-item-btn"
                >
                  <Plus className="w-4 h-4 text-[#86f2e4]" />
                  <span>List Available Items</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('marketplace-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white border-2 border-[#002045] text-[#002045] hover:bg-[#eff4ff] px-6 py-3.5 rounded-full text-sm font-bold shadow-sm transition-all flex-1 sm:flex-none"
                  id="hero-start-borrowing-btn"
                >
                  View Inventory
                </button>
              </>
            ) : (
              <button
                onClick={onOpenPostRequest}
                className="bg-[#F59E0B] hover:bg-[#d97706] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-[0px_8px_20px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                id="hero-post-request-btn"
              >
                <Plus className="w-4 h-4" />
                <span>Post a Request</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8" id="marketplace-grid">
        {/* Categories Horizontal Carousel */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-headline font-bold text-[#002045]">Club Categories</h2>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' 
                ? items.length 
                : items.filter(i => i.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#002045] text-white shadow-md'
                      : 'bg-white border border-[#c4c6cf]/70 text-[#43474e] hover:bg-[#eff4ff] hover:text-[#002045]'
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#eff4ff] text-[#002045]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#c4c6cf]/60 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterAvailability('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filterAvailability === 'all'
                  ? 'bg-[#eff4ff] text-[#002045] font-bold border border-[#adc7f7]'
                  : 'text-[#43474e] hover:bg-[#f8f9ff]'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setFilterAvailability('available')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterAvailability === 'available'
                  ? 'bg-[#dcfce7] text-[#166534] font-bold border border-[#bbf7d0]'
                  : 'text-[#43474e] hover:bg-[#f8f9ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#166534]"></span>
              <span>Available for Pickup</span>
            </button>
          </div>

          {/* Search Controls */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#74777f]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tripods, cameras, scarves, mics..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-[#f8f9ff] border border-[#c4c6cf]/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#006a61]"
              />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#c4c6cf]/60 p-12 text-center my-8">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center mx-auto mb-4 text-[#002045]">
              <Search className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="text-lg font-headline font-bold text-[#002045] mb-2">No items match your filter</h3>
            <p className="text-sm text-[#43474e] max-w-md mx-auto mb-6">
              Need a specific camera model, prop, or blazer that's currently reserved? Post an urgent campus request.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenPostRequest}
                className="bg-[#F59E0B] hover:bg-[#d97706] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm"
              >
                Post Urgent Request
              </button>
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onSearchChange('');
                  setFilterAvailability('all');
                }}
                className="border border-[#002045] text-[#002045] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#eff4ff]"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => {
              const isAvailable = item.status === 'available';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#c4c6cf]/70 shadow-[0px_4px_16px_rgba(26,54,93,0.04)] hover:shadow-[0px_12px_24px_rgba(26,54,93,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                  id={`item-card-${item.id}`}
                >
                  {/* Item Image with status badge */}
                  <div className="aspect-[4/3] bg-[#e5eeff] relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      {item.status === 'available' ? (
                        <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          Available
                        </span>
                      ) : item.status === 'in_use' ? (
                        <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          In Use
                        </span>
                      ) : (
                        <span className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          Reserved
                        </span>
                      )}
                    </div>

                    {/* Club Name Badge */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="bg-[#002045]/90 backdrop-blur-sm text-[#86f2e4] px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                        <Building className="w-2.5 h-2.5 text-[#86f2e4]" />
                        <span>{item.clubName || 'Official Club'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-[#006a61] uppercase tracking-wide truncate">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#002045] shrink-0">
                        <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                        <span>{item.rating}</span>
                        <span className="text-[#74777f] font-normal">({item.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-headline font-bold text-sm text-[#002045] leading-snug line-clamp-1 group-hover:text-[#006a61] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#43474e] mt-1 line-clamp-2 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-[#f8f9ff] text-[#43474e] text-[10px] px-2 py-0.5 rounded-md border border-[#c4c6cf]/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="mt-3 pt-3 border-t border-[#eff4ff] space-y-1.5 text-xs text-[#43474e]">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1 text-[#74777f]">
                          <Clock className="w-3 h-3 text-[#006a61]" />
                          <span>Max: <strong>{item.maxBorrowDays} days</strong></span>
                        </span>
                        <span className="bg-[#eff4ff] text-[#002045] px-2 py-0.5 rounded-md font-medium text-[10px]">
                          {item.condition}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#74777f] truncate">
                        <MapPin className="w-3 h-3 shrink-0 text-[#002045]" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    {/* Owner row & action */}
                    <div className="mt-4 pt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <img
                          src={item.ownerAvatar}
                          alt={item.ownerName}
                          className="w-6 h-6 rounded-full object-cover border border-[#c4c6cf]"
                        />
                        <span className="text-xs font-semibold text-[#002045] truncate">
                          {item.ownerName}
                        </span>
                      </div>

                      {isAvailable ? (
                        <button
                          onClick={() => onBorrowItem(item)}
                          className="bg-[#006a61] hover:bg-[#0b8276] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
                          id={`borrow-btn-${item.id}`}
                        >
                          Request Borrow
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-[#eff4ff] text-[#74777f] px-3 py-1.5 rounded-full text-xs font-medium cursor-not-allowed opacity-75 shrink-0"
                        >
                          Currently In Use
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* How It Works Section */}
        <section className="mt-16 pt-12 border-t border-[#c4c6cf]/60">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-[#002045] mb-2">
              Official Club Lending Workflow
            </h2>
            <p className="text-sm text-[#43474e] max-w-xl mx-auto">
              Transparent, verified, and free equipment access provided by university societies across BML Munjal University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#c4c6cf]/60 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#002045] flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-[#006a61]" />
              </div>
              <h3 className="font-headline font-bold text-lg text-[#002045] mb-2">1. Select Club Gear</h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Choose cameras, gimbals & mics from PAC, runway blazers & scarves from Blaze, or stage mics & props from Mritunjay.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#c4c6cf]/60 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-lg text-[#002045] mb-2">2. Collect at Club Room</h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Pick up items during official club desk hours (Student Center Rm 204, Hostel 1 Studio, or Auditorium Green Room A).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#c4c6cf]/60 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="font-headline font-bold text-lg text-[#002045] mb-2">3. Return on Time</h3>
              <p className="text-xs sm:text-sm text-[#43474e] leading-relaxed">
                Return items in clean condition after your film shoot, runway rehearsal, or stage play to maintain high trust score.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
