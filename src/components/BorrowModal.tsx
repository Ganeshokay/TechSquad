import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { GearItem } from '../types';

interface BorrowModalProps {
  item: GearItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBorrow: (item: GearItem, durationDays: number, purpose: string) => void;
}

export const BorrowModal: React.FC<BorrowModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmBorrow
}) => {
  if (!isOpen || !item) return null;

  const [durationDays, setDurationDays] = useState(Math.min(2, item.maxBorrowDays));
  const [purpose, setPurpose] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Campus Safety & Return Pledge to continue.');
      return;
    }
    setError('');
    onConfirmBorrow(item, durationDays, purpose);
  };

  const today = new Date().toISOString().split('T')[0];
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + Number(durationDays));
  const returnDateStr = returnDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#006a61] text-white flex items-center justify-center font-bold">
              N!
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">Borrow Request</h3>
              <p className="text-[11px] text-[#74777f]">Peer-to-peer campus sharing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Item Preview Card */}
          <div className="flex gap-4 p-3.5 bg-[#eff4ff] rounded-2xl border border-[#adc7f7]/60">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-16 h-16 rounded-xl object-cover border border-[#c4c6cf]"
            />
            <div className="flex-1 text-xs">
              <span className="text-[10px] font-bold text-[#006a61] uppercase tracking-wider">
                {item.category}
              </span>
              <h4 className="font-headline font-bold text-sm text-[#002045]">{item.title}</h4>
              <p className="text-[#74777f] mt-0.5">Lender: <strong>{item.ownerName}</strong></p>
              <p className="text-[#006a61] font-medium mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {item.location}
              </p>
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-2">
              Borrow Duration (Max {item.maxBorrowDays} Days)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, item.maxBorrowDays].filter((v, i, a) => v <= item.maxBorrowDays && a.indexOf(v) === i).map((days) => (
                <button
                  type="button"
                  key={days}
                  onClick={() => setDurationDays(days)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    durationDays === days
                      ? 'bg-[#002045] text-white border-[#002045] shadow-sm'
                      : 'bg-white border-[#c4c6cf] text-[#43474e] hover:bg-[#eff4ff]'
                  }`}
                >
                  {days} {days === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#43474e] mt-2 bg-[#f8f9ff] p-2 rounded-lg">
              <span>Pickup: <strong>{today}</strong></span>
              <span>Due: <strong className="text-[#b45309]">{returnDateStr}</strong></span>
            </div>
          </div>

          {/* Purpose / Project Note */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1.5">
              Academic or Project Purpose (Optional)
            </label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Capstone project filming, Chem 201 lab experiment, mid-term revision..."
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {/* Safety Pledge */}
          <div className="p-3.5 bg-[#dcfce7]/60 rounded-2xl border border-[#bbf7d0] space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
              <div className="text-xs text-[#166534]">
                <strong className="block font-bold">Campus Safety & Return Pledge</strong>
                I agree to treat this item with care, return it in original condition by the due date, and coordinate respectful handoff at the designated campus meetup spot.
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-[#006a61] rounded focus:ring-[#006a61]"
              />
              <span className="text-xs font-bold text-[#002045]">I agree to the Campus Pledge</span>
            </label>
          </div>

          {error && (
            <div className="p-2.5 bg-[#fee2e2] text-[#991b1b] rounded-xl text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#c4c6cf] text-[#43474e] py-2.5 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#006a61] hover:bg-[#0b8276] text-white py-2.5 rounded-full text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
              id="confirm-borrow-btn"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Borrow</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
