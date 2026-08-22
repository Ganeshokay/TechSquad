import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  Send, 
  UserCheck, 
  MessageSquarePlus,
  AlertCircle
} from 'lucide-react';
import { CategoryType, CampusRequest } from '../types';

interface RequestsViewProps {
  requests: CampusRequest[];
  onOpenPostRequest: () => void;
  onOfferHelp: (request: CampusRequest) => void;
}

export const RequestsView: React.FC<RequestsViewProps> = ({
  requests,
  onOpenPostRequest,
  onOfferHelp
}) => {
  const [statusFilter, setStatusFilter] = useState<'pending' | 'fulfilled' | 'all'>('pending');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryType[] = [
    'All',
    'Photography (PAC)',
    'Modelling (Blaze)',
    'Drama & Theatre (Mritunjay)',
    'Electronics',
    'Textbooks',
    'Lab Gear',
    'Calculators',
    'Sports & Outdoor',
    'Tools & Hardware'
  ];

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Status filter
      if (statusFilter === 'pending' && req.status !== 'pending') return false;
      if (statusFilter === 'fulfilled' && req.status !== 'fulfilled') return false;

      // Category filter
      if (categoryFilter !== 'All' && req.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          req.title.toLowerCase().includes(q) ||
          req.description.toLowerCase().includes(q) ||
          req.authorName.toLowerCase().includes(q) ||
          req.authorDepartment.toLowerCase().includes(q) ||
          req.preferredLocation.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [requests, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters (Matching Design) */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-5">
          {/* Status Filter Box */}
          <div className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-5 shadow-[0px_4px_20px_rgba(26,54,93,0.05)]">
            <h3 className="text-xs font-bold text-[#002045] uppercase tracking-wider mb-3.5">
              Status Filter
            </h3>
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === 'pending'}
                  onChange={() => setStatusFilter('pending')}
                  className="text-[#002045] focus:ring-[#002045] h-4 w-4"
                />
                <span className="text-sm font-medium text-[#43474e] group-hover:text-[#002045] transition-colors">
                  Pending Needs
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === 'fulfilled'}
                  onChange={() => setStatusFilter('fulfilled')}
                  className="text-[#002045] focus:ring-[#002045] h-4 w-4"
                />
                <span className="text-sm font-medium text-[#43474e] group-hover:text-[#002045] transition-colors">
                  Recently Fulfilled
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  checked={statusFilter === 'all'}
                  onChange={() => setStatusFilter('all')}
                  className="text-[#002045] focus:ring-[#002045] h-4 w-4"
                />
                <span className="text-sm font-medium text-[#43474e] group-hover:text-[#002045] transition-colors">
                  All Requests ({requests.length})
                </span>
              </label>
            </div>
          </div>

          {/* Post Request Prompt Card */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#002045] rounded-2xl p-5 text-white shadow-md">
            <h4 className="font-headline font-bold text-sm text-[#86f2e4] mb-1">Need something urgently?</h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">
              Post your requirement to the entire campus community in 30 seconds.
            </p>
            <button
              onClick={onOpenPostRequest}
              className="w-full bg-[#F59E0B] hover:bg-[#d97706] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center gap-2"
              id="sidebar-post-request-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Post Request</span>
            </button>
          </div>
        </aside>

        {/* Requests Feed Section */}
        <section className="flex-1 flex flex-col gap-5">
          {/* Header & Action */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#c4c6cf]/40">
            <div>
              <h1 className="text-2xl sm:text-3xl font-headline font-extrabold text-[#002045] mb-1">
                Campus Requests
              </h1>
              <p className="text-sm text-[#43474e]">
                Help out your peers by lending items they urgently need for classes, labs, and projects.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#74777f]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search requests..."
                  className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#c4c6cf]/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                />
              </div>

              <button
                onClick={onOpenPostRequest}
                className="bg-[#F59E0B] hover:bg-[#d97706] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all whitespace-nowrap hidden sm:flex items-center gap-1.5"
                id="main-post-request-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Request</span>
              </button>
            </div>
          </div>

          {/* Requests List */}
          <div className="flex flex-col gap-4">
            {filteredRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#c4c6cf]/60 p-12 text-center my-4">
                <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center mx-auto mb-3 text-[#002045]">
                  <MessageSquarePlus className="w-6 h-6 opacity-60" />
                </div>
                <h3 className="font-headline font-bold text-base text-[#002045] mb-1">No requests found</h3>
                <p className="text-xs text-[#43474e] mb-4">No active requests matching your current filters.</p>
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setCategoryFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#006a61] font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isFulfilled = req.status === 'fulfilled';

                if (isFulfilled) {
                  return (
                    <article
                      key={req.id}
                      className="bg-[#eff4ff]/60 opacity-80 rounded-2xl border border-[#c4c6cf]/60 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                      id={`request-item-${req.id}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="bg-[#86f2e4]/40 text-[#006a61] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#006a61]" />
                            <span>Fulfilled</span>
                          </span>
                          <span className="text-[11px] text-[#74777f]">{req.timeAgo}</span>
                        </div>

                        <h2 className="text-base font-headline font-bold text-[#002045] line-through decoration-[#74777f]">
                          {req.title}
                        </h2>

                        <div className="flex items-center gap-2.5 mt-3 text-xs text-[#43474e]">
                          <img
                            src={req.authorAvatar}
                            alt={req.authorName}
                            className="w-6 h-6 rounded-full object-cover grayscale"
                          />
                          <span className="font-bold text-[#002045]">{req.authorName}</span>
                          <span className="text-[#c4c6cf]">•</span>
                          <span>{req.authorDepartment}</span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-[#006a61] bg-white px-3.5 py-2 rounded-xl border border-[#86f2e4]">
                        ✓ Peer connected & item lent
                      </div>
                    </article>
                  );
                }

                return (
                  <article
                    key={req.id}
                    className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-5 md:p-6 shadow-[0px_4px_20px_rgba(26,54,93,0.04)] hover:shadow-[0px_12px_24px_rgba(26,54,93,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                    id={`request-item-${req.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {req.isUrgent && (
                          <span className="bg-[#F59E0B]/15 text-[#b45309] border border-[#fde68a] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5" />
                            <span>Urgent</span>
                          </span>
                        )}
                        <span className="bg-[#eff4ff] text-[#002045] px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          {req.category}
                        </span>
                        <span className="text-xs text-[#74777f] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {req.timeAgo}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-headline font-bold text-[#002045] mb-1.5 leading-snug">
                        {req.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#43474e] mb-4 leading-relaxed">
                        {req.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#eff4ff]">
                        {/* Author info */}
                        <div className="flex items-center gap-2.5">
                          <img
                            src={req.authorAvatar}
                            alt={req.authorName}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#002045]/10"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-[#002045]">{req.authorName}</span>
                            <div className="text-[11px] text-[#74777f]">
                              {req.authorDepartment} • {req.authorYear}
                            </div>
                          </div>
                        </div>

                        {/* Needed Date & Location */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#43474e]">
                          <div className="flex items-center gap-1 bg-[#f8f9ff] px-2.5 py-1 rounded-md">
                            <Calendar className="w-3 h-3 text-[#006a61]" />
                            <span>Needed: <strong>{req.neededFrom}</strong> to <strong>{req.neededTo}</strong></span>
                          </div>
                          <div className="flex items-center gap-1 bg-[#f8f9ff] px-2.5 py-1 rounded-md">
                            <MapPin className="w-3 h-3 text-[#002045]" />
                            <span>{req.preferredLocation}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full sm:w-auto shrink-0 flex sm:flex-col gap-2">
                      <button
                        onClick={() => onOfferHelp(req)}
                        className="w-full sm:w-36 bg-[#006a61] hover:bg-[#0b8276] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                        id={`help-btn-${req.id}`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>I Can Help</span>
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
