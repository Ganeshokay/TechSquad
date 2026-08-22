import React, { useState, useEffect } from 'react';
import { X, Plus, Package, MapPin, Sparkles, AlertCircle, Image as ImageIcon, Building } from 'lucide-react';
import { CategoryType, GearItem, ItemCondition, UserProfile } from '../types';

interface ListItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitItem: (itemData: Partial<GearItem>) => void;
  user?: UserProfile;
}

const PRESET_IMAGES = [
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80', cat: 'Calculators' },
  { label: 'Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', cat: 'Textbooks' },
  { label: 'Camera / Lens', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIyTbM9ouQE8MKlvhrPO55JJJy5EcWRZhrC6J5skhw4qgoYPBe_2fzTaQe_kV9j5JRTWkYcpyHQhc8ZgW2bcVzBsI41t-V0ugdjb7xwz6XkpObxBh3tgZo8kYs9VF1nJwp4rmS3LMKY2Mh6ULBhjTfpF--irJ_MDPNxzvZVtk4DU7EPB1sPRqiJ7WQ6UNBTwmAbR_ZOLS879HScSV_WQaeTkur-e0zw70o9CLbWPiMwKRfbclDbW-XpQ', cat: 'Cameras & Media' },
  { label: 'Electronics / Pi', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80', cat: 'Electronics' },
  { label: 'Lab Coat / Gear', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80', cat: 'Lab Gear' },
  { label: 'Audio / Mic', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80', cat: 'Music & Audio' },
  { label: 'Tent / Outdoor', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80', cat: 'Sports & Outdoor' }
];

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

export const ListItemModal: React.FC<ListItemModalProps> = ({
  isOpen,
  onClose,
  onSubmitItem,
  user
}) => {
  if (!isOpen) return null;

  const isClub = user?.role === 'club';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>(isClub ? 'Cameras & Media' : 'Calculators');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [description, setDescription] = useState('');
  const [maxBorrowDays, setMaxBorrowDays] = useState(isClub ? 7 : 3);
  const [location, setLocation] = useState(user?.hostelRoom || 'Hostel 3, Room 308');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.hostelRoom) {
      setLocation(user.hostelRoom);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an item title.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a short description.');
      return;
    }

    const finalImage = customImageUrl.trim() || selectedImage;

    onSubmitItem({
      title: title.trim(),
      category,
      condition,
      description: description.trim(),
      maxBorrowDays: Number(maxBorrowDays),
      location: location.trim(),
      imageUrl: finalImage,
      status: 'available',
      depositRequired: 0,
      rating: 5.0,
      reviewCount: 1,
      ownerType: isClub ? 'club' : 'student',
      clubName: isClub ? user?.clubName : undefined,
      tags: [category, condition, isClub ? (user?.clubName || 'ClubInventory') : 'PeerShare']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl ${isClub ? 'bg-[#006a61]' : 'bg-[#002045]'} text-white flex items-center justify-center font-bold`}>
              {isClub ? <Building className="w-4 h-4 text-[#86f2e4]" /> : <Package className="w-4 h-4 text-[#86f2e4]" />}
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">
                {isClub ? `List Available Item (${user?.clubName || 'Club Gear'})` : 'List an Item to Share'}
              </h3>
              <p className="text-[11px] text-[#74777f]">
                {isClub ? 'Publish available society equipment for students to borrow' : 'Help peers and build your campus trust score'}
              </p>
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
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Item Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Casio fx-991EX Scientific Calculator"
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              id="list-item-title-input"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Max Borrow Days & Pickup Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Max Borrow Days
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={maxBorrowDays}
                onChange={(e) => setMaxBorrowDays(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                Pickup Spot
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Hostel 3 Room 308 or Library"
                className="w-full text-xs p-2.5 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
              Description & Accessories Included *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention what's included (cables, covers, manuals) and any specific care instructions..."
              className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
            />
          </div>

          {/* Image Selector */}
          <div>
            <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-2">
              Select Item Photo Preset
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setCustomImageUrl('');
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    selectedImage === preset.url && !customImageUrl
                      ? 'border-[#006a61] ring-2 ring-[#86f2e4]'
                      : 'border-[#c4c6cf]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-[#002045]/80 text-white text-[9px] py-0.5 truncate text-center">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-[#fee2e2] text-[#991b1b] rounded-xl text-xs flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Buttons */}
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
              id="submit-list-item-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
