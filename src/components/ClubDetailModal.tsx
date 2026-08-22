import React from 'react';
import { X, Clock, MapPin, ShieldCheck, Mail, ArrowRight, Camera, Music, Cpu, Compass, Building2 } from 'lucide-react';
import { CampusClub, GearItem } from '../types';

interface ClubDetailModalProps {
  club: CampusClub | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrowItem: (item: GearItem) => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({
  club,
  isOpen,
  onClose,
  onBorrowItem
}) => {
  if (!isOpen || !club) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-[#eff4ff] border-b border-[#c4c6cf]/60 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${club.accentBg} ${club.accentText} flex items-center justify-center shadow-sm`}>
              {getClubIcon(club.iconName)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-0.5 rounded-full">
                {club.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#002045] mt-1">
                {club.name}
              </h2>
              <p className="text-xs text-[#43474e] mt-1 max-w-xl">{club.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#adc7f7]/50 text-xs">
            <div className="flex items-center gap-2 text-[#43474e]">
              <Clock className="w-4 h-4 text-[#006a61]" />
              <span><strong>Lending:</strong> {club.lendingSchedule}</span>
            </div>
            <div className="flex items-center gap-2 text-[#43474e]">
              <MapPin className="w-4 h-4 text-[#002045]" />
              <span><strong>Room:</strong> {club.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#43474e]">
              <Mail className="w-4 h-4 text-[#F59E0B]" />
              <span><strong>Contact:</strong> {club.leadName}</span>
            </div>
          </div>
        </div>

        {/* Club Gear Inventory */}
        <div className="p-6 overflow-y-auto">
          <h3 className="font-headline font-bold text-base text-[#002045] mb-4 flex items-center justify-between">
            <span>Available Gear Inventory ({club.items.length})</span>
            <span className="text-xs font-normal text-[#74777f]">100% Free Borrowing for BMU Students</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {club.items.map((item) => {
              const isAvailable = item.status === 'available';

              return (
                <div
                  key={item.id}
                  className="bg-[#f8f9ff] rounded-2xl border border-[#c4c6cf]/70 p-4 flex flex-col justify-between hover:border-[#adc7f7] transition-all"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-[#e5eeff] relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isAvailable
                          ? 'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]'
                          : 'bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]'
                      }`}>
                        {isAvailable ? 'Available' : 'In Use'}
                      </span>
                    </div>

                    <h4 className="font-headline font-bold text-sm text-[#002045] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#43474e] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    <div className="text-[11px] text-[#74777f] space-y-1 mb-3">
                      <div>Condition: <strong>{item.condition}</strong> • Max: <strong>{item.maxBorrowDays} days</strong></div>
                      <div>Rating: <strong>{item.rating}★</strong> ({item.reviewCount} returns)</div>
                    </div>
                  </div>

                  <div>
                    {isAvailable ? (
                      <button
                        onClick={() => {
                          onClose();
                          onBorrowItem(item);
                        }}
                        className="w-full bg-[#006a61] hover:bg-[#0b8276] text-white py-2 rounded-xl text-xs font-bold shadow-sm transition-all text-center"
                      >
                        Request Borrow
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-[#eff4ff] text-[#74777f] py-2 rounded-xl text-xs font-medium cursor-not-allowed opacity-60"
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
      </div>
    </div>
  );
};
