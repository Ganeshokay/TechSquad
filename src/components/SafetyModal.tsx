import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Users, MapPin } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#006a61] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">Campus Safety Guidelines</h3>
              <p className="text-[11px] text-[#74777f]">Guidelines for respectful resource sharing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#43474e] leading-relaxed">
          <div className="p-3.5 bg-[#eff4ff] rounded-2xl border border-[#adc7f7]/60">
            <h4 className="font-headline font-bold text-sm text-[#002045] mb-1">1. Public Campus Meetups</h4>
            <p>Always arrange item pickups and returns in well-lit, public campus locations (e.g., Student Center, Library Ground Floor, Central Lawn Cafe, or Hostel common areas).</p>
          </div>

          <div className="p-3.5 bg-[#dcfce7]/60 rounded-2xl border border-[#bbf7d0]">
            <h4 className="font-headline font-bold text-sm text-[#166534] mb-1">2. Equipment Inspection</h4>
            <p>Borrowers and lenders must test electronic devices and inspect textbook conditions together during the initial handoff to confirm baseline condition.</p>
          </div>

          <div className="p-3.5 bg-[#fef3c7] rounded-2xl border border-[#fde68a]">
            <h4 className="font-headline font-bold text-sm text-[#92400e] mb-1">3. Punctual Returns</h4>
            <p>Return items strictly on or before the agreed return time. Extensions must be requested and accepted through the app before the due date.</p>
          </div>

          <div className="p-3.5 bg-[#f8f9ff] rounded-2xl border border-[#c4c6cf]/60">
            <h4 className="font-headline font-bold text-sm text-[#002045] mb-1">4. Community Credibility Points</h4>
            <p>Every successful on-time return boosts your peer trust rating and unlocks access to high-value club equipment like full-frame DSLRs and digital oscilloscopes.</p>
          </div>
        </div>

        <div className="p-4 bg-[#f8f9ff] border-t border-[#c4c6cf]/60 text-right">
          <button
            onClick={onClose}
            className="bg-[#002045] hover:bg-[#1a365d] text-white px-6 py-2 rounded-full text-xs font-bold transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
