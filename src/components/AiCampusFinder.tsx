import React, { useState } from 'react';
import { X, Sparkles, Search, ArrowRight, MapPin, CheckCircle, Clock } from 'lucide-react';
import { GearItem } from '../types';

interface AiCampusFinderProps {
  isOpen: boolean;
  onClose: () => void;
  items: GearItem[];
  onBorrowItem: (item: GearItem) => void;
}

const SAMPLE_QUERIES = [
  'I have a robotics lab in 30 mins and need a multimeter & soldering iron',
  'Shooting an outdoor festival film this weekend, need camera & lighting',
  'Need a scientific calculator fx-991EX for my morning midterm',
  'Going on a weekend trek, need camping tent and poles'
];

export const AiCampusFinder: React.FC<AiCampusFinderProps> = ({
  isOpen,
  onClose,
  items,
  onBorrowItem
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<GearItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (queryText: string) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      // Intelligent campus semantic matching
      const matches = items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const catMatch = item.category.toLowerCase().includes(q);
        const tagMatch = item.tags.some(t => q.includes(t.toLowerCase()) || t.toLowerCase().includes(q));

        // Contextual keywords mapping
        let contextMatch = false;
        if (q.includes('film') || q.includes('photo') || q.includes('video') || q.includes('shoot') || q.includes('camera')) {
          contextMatch = item.category === 'Cameras & Media';
        } else if (q.includes('exam') || q.includes('math') || q.includes('calc') || q.includes('midterm')) {
          contextMatch = item.category === 'Calculators' || item.category === 'Textbooks';
        } else if (q.includes('chem') || q.includes('circuit') || q.includes('lab') || q.includes('meter')) {
          contextMatch = item.category === 'Lab Gear' || item.category === 'Electronics' || item.category === 'Tools & Hardware';
        } else if (q.includes('hike') || q.includes('camp') || q.includes('trek') || q.includes('tent')) {
          contextMatch = item.category === 'Sports & Outdoor';
        } else if (q.includes('audio') || q.includes('music') || q.includes('mic') || q.includes('jam')) {
          contextMatch = item.category === 'Music & Audio';
        }

        return titleMatch || descMatch || catMatch || tagMatch || contextMatch;
      });

      setResults(matches);
      setIsSearching(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#002045] to-[#1a365d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#86f2e4] text-[#002045] flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4 text-[#002045]" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-white">AI Campus Gear Matcher</h3>
              <p className="text-[11px] text-[#86f2e4]">Smart semantic matching for BMU students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-5 border-b border-[#eff4ff]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(prompt);
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what class or project you're working on..."
              className="w-full text-xs p-3.5 pr-24 bg-[#eff4ff] border border-[#adc7f7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006a61] text-[#002045] font-medium"
              id="ai-prompt-input"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isSearching}
              className="absolute right-2 bg-[#006a61] hover:bg-[#0b8276] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
            >
              {isSearching ? 'Finding...' : 'Match'}
            </button>
          </form>

          {/* Quick sample prompts */}
          <div className="mt-3">
            <span className="text-[10px] font-bold text-[#74777f] uppercase tracking-wider block mb-1.5">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_QUERIES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setPrompt(sample);
                    handleSearch(sample);
                  }}
                  className="text-[11px] bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#43474e] border border-[#c4c6cf]/60 px-2.5 py-1 rounded-lg text-left transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results section */}
        <div className="p-5 overflow-y-auto max-h-96">
          {hasSearched ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#002045]">
                  AI Recommended Campus Matches ({results.length})
                </span>
                <span className="text-[11px] text-[#006a61] font-semibold">Verified BMU Inventory</span>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#74777f]">
                  No direct equipment match found. You can post a custom request to the student feed!
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#f8f9ff] rounded-2xl border border-[#c4c6cf]/70 flex items-center justify-between gap-3 hover:border-[#adc7f7] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-[#c4c6cf]"
                        />
                        <div className="text-xs">
                          <span className="text-[10px] font-bold text-[#006a61] uppercase">{item.category}</span>
                          <h4 className="font-bold text-[#002045] line-clamp-1">{item.title}</h4>
                          <div className="text-[11px] text-[#74777f] flex items-center gap-2 mt-0.5">
                            <span>{item.ownerName}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-[#002045]">
                              <MapPin className="w-3 h-3 text-[#006a61]" /> {item.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onBorrowItem(item);
                        }}
                        className="bg-[#006a61] hover:bg-[#0b8276] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap"
                      >
                        Borrow
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[#74777f]">
              <Sparkles className="w-8 h-8 text-[#F59E0B] mx-auto mb-2 opacity-80" />
              <p>Type your class, lab, or weekend project need above to find available gear across all BMU clubs and peers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
