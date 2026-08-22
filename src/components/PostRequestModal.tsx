import React, { useState } from 'react';
import { X, Send, AlertCircle, Sparkles, MapPin, Calendar } from 'lucide-react';
import { CategoryType, CampusRequest } from '../types';

interface PostRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (reqData: Partial<CampusRequest>) => void;
}

const CATEGORIES: CategoryType[] = [
  'Photography (PAC)',
  'Modelling (Blaze)',
  'Drama & Theatre (Mritunjay)',
  'Electronics',
  'Textbooks',
  'Lab Gear',
  'Calculators',
  'Sports & Outdoor',
  'Tools & Hardware',
  'Music & Audio'
];

const CAMPUS_LOCATIONS = [
  'Student Center & Food Court',
  'Library Ground Floor / Cafe',
  'Hostel 1 Quad',
  'Hostel 2 Courtyard',
  'Hostel 3 Entrance',
  'Academic Block 1 Lobby',
  'Academic Block 2 Atrium',
  'FabLab / Tinkering Hub',
  'Sports Complex'
];

export const PostRequestModal: React.FC<PostRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Electronics');
  const [description, setDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [neededFrom, setNeededFrom] = useState(new Date().toISOString().split('T')[0]);
  const [neededTo, setNeededTo] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [preferredLocation, setPreferredLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a brief title of what you need.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your requirement.');
      return;
    }

    setError('');
    onSubmitRequest({
      title: title.trim(),
      category,
      description: description.trim(),
      isUrgent,
      neededFrom,
      neededTo,
      preferredLocation,
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
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">Post a Campus Need</h3>
              <p className="text-[11px] text-[#74777f]">Ask BMU students & clubs for temporary borrowing</p>
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
          {/* Urgent Need Toggle */}
          <div className="p-3 bg-[#fef3c7]/70 border border-[#fde68a] rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Urgent
              </span>
              <span className="text-xs font-bold text-[#92400e]">
                Is this needed within 24 hours?
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F59E0B]"></div>
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              What do you need? *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Need a 128GB SD Card for film project"
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              id="request-title-input"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Needed Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Needed From
              </label>
              <input
                type="date"
                value={neededFrom}
                onChange={(e) => setNeededFrom(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Needed Until
              </label>
              <input
                type="date"
                value={neededTo}
                onChange={(e) => setNeededTo(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          {/* Preferred Location */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Preferred Campus Meetup Spot
            </label>
            <select
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            >
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Details & Context *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide specs, why you need it, and how carefully you will maintain it..."
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {error && (
            <div className="p-2.5 bg-[#fee2e2] text-[#991b1b] rounded-xl text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
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
              className="flex-1 bg-[#F59E0B] hover:bg-[#d97706] text-white py-2.5 rounded-full text-xs font-bold shadow flex items-center justify-center gap-1.5"
              id="submit-post-request-btn"
            >
              <Send className="w-4 h-4" />
              <span>Post Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
