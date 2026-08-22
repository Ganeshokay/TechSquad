import React, { useState } from 'react';
import { X, Send, MapPin, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { CampusRequest, RequestOffer } from '../types';

interface OfferHelpModalProps {
  request: CampusRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitOffer: (requestId: string, offer: Partial<RequestOffer>) => void;
}

const MEETUP_SPOTS = [
  'Student Center & Cafe',
  'Library Ground Floor Lobby',
  'Hostel 1 Quad',
  'Hostel 2 Courtyard',
  'Hostel 3 Entrance',
  'Academic Block 1 Entrance',
  'Academic Block 2 Atrium',
  'FabLab / Tinkering Hub'
];

export const OfferHelpModal: React.FC<OfferHelpModalProps> = ({
  request,
  isOpen,
  onClose,
  onSubmitOffer
}) => {
  if (!isOpen || !request) return null;

  const [itemDescription, setItemDescription] = useState(`I have a ${request.category.toLowerCase()} item you can borrow.`);
  const [meetupSpot, setMeetupSpot] = useState(request.preferredLocation || MEETUP_SPOTS[0]);
  const [meetupTime, setMeetupTime] = useState('Today at 5:00 PM');
  const [contactNote, setContactNote] = useState('Available to hand over right after class!');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemDescription.trim()) {
      setError('Please describe what item you can provide.');
      return;
    }

    setError('');
    onSubmitOffer(request.id, {
      itemDescription: itemDescription.trim(),
      meetupSpot,
      meetupTime: meetupTime.trim(),
      contactNote: contactNote.trim(),
      status: 'pending'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#006a61] text-white flex items-center justify-center font-bold">
              🤝
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">Offer to Lend</h3>
              <p className="text-[11px] text-[#74777f]">Help a fellow campus peer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Request summary */}
          <div className="p-3.5 bg-[#eff4ff] rounded-2xl border border-[#adc7f7]/60">
            <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-full uppercase">
              Request by {request.authorName}
            </span>
            <h4 className="font-headline font-bold text-sm text-[#002045] mt-1.5">{request.title}</h4>
            <p className="text-xs text-[#43474e] mt-1 line-clamp-2">{request.description}</p>
          </div>

          {/* Item description */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Your Item Description *
            </label>
            <input
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="e.g., SanDisk Extreme 128GB V30 SD Card with case"
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {/* Meetup Spot */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Campus Meetup Spot
            </label>
            <select
              value={meetupSpot}
              onChange={(e) => setMeetupSpot(e.target.value)}
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            >
              {MEETUP_SPOTS.map((spot) => (
                <option key={spot} value={spot}>{spot}</option>
              ))}
            </select>
          </div>

          {/* Meetup Time */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Suggested Time
            </label>
            <input
              type="text"
              value={meetupTime}
              onChange={(e) => setMeetupTime(e.target.value)}
              placeholder="e.g., Today at 5:00 PM / Tomorrow 9 AM"
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Message to {request.authorName}
            </label>
            <textarea
              rows={2}
              value={contactNote}
              onChange={(e) => setContactNote(e.target.value)}
              placeholder="Let them know where you are or how to reach you..."
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {error && (
            <div className="p-2.5 bg-[#fee2e2] text-[#991b1b] rounded-xl text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#c4c6cf] text-[#43474e] py-2.5 rounded-full text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#006a61] hover:bg-[#0b8276] text-white py-2.5 rounded-full text-xs font-bold shadow flex items-center justify-center gap-1.5"
              id="submit-help-offer-btn"
            >
              <Send className="w-4 h-4" />
              <span>Send Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
