import React, { useState } from 'react';
import { 
  Camera, 
  Music, 
  Cpu, 
  Compass, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  ShieldCheck, 
  User,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CampusClub, GearItem } from '../types';

interface ClubsViewProps {
  clubs: CampusClub[];
  onBorrowItem: (item: GearItem) => void;
  onOpenClubDetail: (club: CampusClub) => void;
}

export const ClubsView: React.FC<ClubsViewProps> = ({
  clubs,
  onBorrowItem,
  onOpenClubDetail
}) => {
  // Let PAC (Photography & Cinematography Club) be the featured club
  const featuredClub = clubs.find(c => c.id === 'club_pac') || clubs[0];
  const otherClubs = clubs.filter(c => c.id !== featuredClub?.id);

  const getClubIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-[#d6e3ff] text-[#002045] px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
          <Building2 className="w-4 h-4 text-[#006a61]" />
          <span>Officially Recognized BMU Societies</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-extrabold text-[#002045] mb-2 tracking-tight">
          University Clubs
        </h1>
        <p className="text-base sm:text-lg text-[#43474e] max-w-2xl leading-relaxed">
          Discover specialized gear available for short-term borrowing from officially recognized campus clubs. Support peer-to-peer sharing and fuel our campus community.
        </p>
      </div>

      {/* Featured Club: Photography Club (Matching Design Prototype) */}
      {featuredClub && (
        <section className="mb-12">
          <div className="bg-white rounded-2xl border border-[#c4c6cf]/70 shadow-[0px_4px_20px_rgba(26,54,93,0.05)] overflow-hidden flex flex-col lg:flex-row hover:shadow-[0px_12px_24px_rgba(26,54,93,0.1)] transition-shadow duration-300">
            {/* Left Info Panel */}
            <div className="lg:w-2/5 p-6 md:p-8 bg-[#eff4ff]/60 border-b lg:border-b-0 lg:border-r border-[#c4c6cf]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1a365d] text-[#86a0cd] flex items-center justify-center shadow-sm">
                    {getClubIcon(featuredClub.iconName)}
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-headline font-bold text-[#002045]">
                      {featuredClub.name}
                    </h2>
                    <span className="text-xs text-[#006a61] font-semibold tracking-wide uppercase">
                      Official Campus Inventory
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#43474e] mb-6 leading-relaxed">
                  {featuredClub.description}
                </p>

                <div className="space-y-2.5 mb-6 bg-white/80 p-4 rounded-xl border border-[#c4c6cf]/50">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#43474e]">
                    <Clock className="w-4 h-4 text-[#006a61] shrink-0" />
                    <span><strong>Lending:</strong> {featuredClub.lendingSchedule}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#43474e]">
                    <MapPin className="w-4 h-4 text-[#002045] shrink-0" />
                    <span><strong>Location:</strong> {featuredClub.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#43474e]">
                    <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span><strong>Lead:</strong> {featuredClub.leadName} ({featuredClub.leadRole})</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenClubDetail(featuredClub)}
                className="w-full border-2 border-[#002045] text-[#002045] hover:bg-[#d3e4fe] py-2.5 px-4 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
                id="featured-club-view-all"
              >
                <span>View All Gear ({featuredClub.items.length} Items)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Gear Items Showcase (Matches HTML Prototype) */}
            <div className="lg:w-3/5 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white">
              {featuredClub.items.slice(0, 2).map((item) => {
                const isAvailable = item.status === 'available';
                return (
                  <div
                    key={item.id}
                    className="bg-[#f8f9ff] rounded-xl border border-[#c4c6cf]/70 p-4 flex flex-col hover:border-[#adc7f7] transition-all"
                  >
                    <div className="aspect-[4/3] rounded-lg bg-[#e5eeff] mb-3 overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {isAvailable ? (
                          <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase">
                            Available
                          </span>
                        ) : (
                          <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fecaca] px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase">
                            In Use
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-headline font-bold text-sm text-[#002045] truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#43474e] mb-3">{item.category}</p>

                    <div className="mt-auto">
                      {isAvailable ? (
                        <button
                          onClick={() => onBorrowItem(item)}
                          className="bg-[#006a61] text-white hover:bg-[#0b8276] px-3 py-2 rounded-full text-xs font-bold transition-all w-full shadow-sm active:scale-95"
                          id={`club-borrow-btn-${item.id}`}
                        >
                          Request Borrow
                        </button>
                      ) : (
                        <button
                          disabled
                          className="border border-[#74777f]/40 text-[#43474e] px-3 py-2 rounded-full text-xs font-medium opacity-60 cursor-not-allowed w-full bg-white"
                        >
                          Currently Borrowed
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bento Grid for Other Campus Clubs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-headline font-bold text-[#002045]">More Campus Clubs</h2>
          <span className="text-xs text-[#43474e]">Click any club to see available gear</span>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherClubs.map((club) => {
            const availableCount = club.items.filter(i => i.status === 'available').length;

            return (
              <div
                key={club.id}
                onClick={() => onOpenClubDetail(club)}
                className="bg-white rounded-2xl border border-[#c4c6cf]/70 shadow-[0px_4px_20px_rgba(26,54,93,0.05)] p-6 hover:shadow-[0px_12px_24px_rgba(26,54,93,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                id={`club-card-${club.id}`}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${club.accentBg} ${club.accentText} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    {getClubIcon(club.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-headline font-bold text-[#002045] group-hover:text-[#006a61] transition-colors">
                      {club.name}
                    </h3>
                    <span className="text-xs text-[#74777f]">{club.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#43474e] mb-5 flex-1 leading-relaxed">
                  {club.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#c4c6cf]/40 mt-auto">
                  <span className="text-xs font-semibold text-[#006a61] bg-[#86f2e4]/20 px-2.5 py-1 rounded-full">
                    {availableCount} / {club.items.length} Items Available
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#002045] group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 text-[#006a61]" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
