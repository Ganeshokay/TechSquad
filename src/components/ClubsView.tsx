import React from 'react';
import { 
  Camera, 
  Music, 
  Cpu, 
  Compass, 
  ArrowRight, 
  Building2, 
  Sparkles,
  Mic
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
  const getClubIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Drama': return <Mic className="w-6 h-6" />;
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

      {/* Grid for All Campus Clubs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-headline font-bold text-[#002045]">Campus Clubs & Societies</h2>
          <span className="text-xs text-[#43474e]">Click any club to see available gear</span>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
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
