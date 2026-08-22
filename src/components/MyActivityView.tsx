import React, { useState } from 'react';
import { 
  User, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Package, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  MapPin, 
  RotateCcw, 
  Plus, 
  ExternalLink,
  Sparkles,
  Layers,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BorrowTransaction, CampusRequest, GearItem, UserProfile } from '../types';

interface MyActivityViewProps {
  user: UserProfile;
  transactions: BorrowTransaction[];
  myItems: GearItem[];
  myRequests: CampusRequest[];
  onReturnItem: (transactionId: string) => void;
  onToggleItemStatus: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onOpenListItem: () => void;
  onOpenPostRequest: () => void;
  onAcceptOffer: (requestId: string, offerId: string) => void;
}

export const MyActivityView: React.FC<MyActivityViewProps> = ({
  user,
  transactions,
  myItems,
  myRequests,
  onReturnItem,
  onToggleItemStatus,
  onDeleteItem,
  onOpenListItem,
  onOpenPostRequest,
  onAcceptOffer
}) => {
  const isClub = user.role === 'club';
  const [activeTab, setActiveTab] = useState<'borrows' | 'my-gear' | 'my-requests' | 'history'>('borrows');

  const activeBorrows = transactions.filter(t => t.status === 'active' || t.status === 'pending_pickup');
  const pastBorrows = transactions.filter(t => t.status === 'returned');

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 md:py-10">
      {/* Student / Club Credibility Card */}
      <section className="bg-white rounded-3xl border border-[#c4c6cf]/70 p-6 md:p-8 shadow-[0px_4px_20px_rgba(26,54,93,0.05)] mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#002045]/10 shadow-sm"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-[#006a61] text-white p-1 rounded-full text-xs shadow">
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-headline font-extrabold text-[#002045]">
                  {user.name}
                </h1>
                <span className="bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified BMU Member
                </span>
                {isClub && (
                  <span className="bg-[#86f2e4]/30 text-[#006a61] border border-[#86f2e4] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {user.clubName || 'Club Lead'}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#43474e] mt-0.5">
                {isClub ? `${user.clubName} (${user.clubRole || 'Lead'})` : `${user.department} • ${user.year}`} • <span className="font-mono font-medium">ID: {user.studentId}</span>
              </p>
              <p className="text-xs text-[#006a61] font-medium mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {user.hostelRoom}
              </p>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="w-full md:w-auto flex justify-start md:justify-end">
            <div className="bg-[#eff4ff] p-3 sm:p-4 rounded-2xl text-center border border-[#adc7f7]/50 min-w-[130px]">
              <div className="text-lg sm:text-2xl font-headline font-black text-[#F59E0B]">
                {isClub ? (user.completedBorrows + user.completedLends) : user.completedBorrows}
              </div>
              <div className="text-[11px] text-[#43474e] font-semibold">
                {isClub ? 'Items & Borrows' : 'Total Borrows'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-tabs Navigation */}
      <div className="flex items-center justify-between gap-3 border-b border-[#c4c6cf]/60 pb-3 mb-6 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('borrows')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'borrows'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Active Borrows</span>
            <span className="bg-white/20 text-white text-[11px] px-2 py-0.2 rounded-full">
              {activeBorrows.length}
            </span>
          </button>

          {isClub && (
            <button
              onClick={() => setActiveTab('my-gear')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'my-gear'
                  ? 'bg-[#002045] text-white shadow-sm'
                  : 'text-[#43474e] hover:bg-[#eff4ff]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Club Inventory</span>
              <span className="bg-white/20 text-white text-[11px] px-2 py-0.2 rounded-full">
                {myItems.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('my-requests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my-requests'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>My Posted Needs</span>
            <span className="bg-white/20 text-white text-[11px] px-2 py-0.2 rounded-full">
              {myRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-[#002045] text-white shadow-sm'
                : 'text-[#43474e] hover:bg-[#eff4ff]'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>

        {isClub && activeTab === 'my-gear' && (
          <button
            onClick={onOpenListItem}
            className="bg-[#006a61] hover:bg-[#0b8276] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        )}

        {activeTab === 'my-requests' && (
          <button
            onClick={onOpenPostRequest}
            className="bg-[#F59E0B] hover:bg-[#d97706] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Need</span>
          </button>
        )}
      </div>

      {/* Tab 1: Active Borrows */}
      {activeTab === 'borrows' && (
        <div className="space-y-4">
          {activeBorrows.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#c4c6cf]/60 p-12 text-center">
              <Package className="w-12 h-12 text-[#74777f] mx-auto mb-3 opacity-50" />
              <h3 className="font-headline font-bold text-base text-[#002045] mb-1">
                No items currently borrowed
              </h3>
              <p className="text-xs text-[#43474e] mb-4">
                Explore the marketplace or official club inventories to borrow gear.
              </p>
            </div>
          ) : (
            activeBorrows.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={tx.itemImage}
                    alt={tx.itemTitle}
                    className="w-20 h-20 rounded-xl object-cover border border-[#c4c6cf]"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#dcfce7] text-[#166534] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Active Borrow
                      </span>
                      <span className="text-xs text-[#74777f]">{tx.itemCategory}</span>
                    </div>

                    <h3 className="text-base font-headline font-bold text-[#002045]">
                      {tx.itemTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#43474e]">
                      <span>Lender: <strong>{tx.ownerName}</strong></span>
                      <span className="text-[#c4c6cf]">•</span>
                      <span className="flex items-center gap-1 text-[#006a61]">
                        <MapPin className="w-3 h-3" /> {tx.pickupLocation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#b45309] bg-[#fef3c7] px-2.5 py-1 rounded-lg w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due for return: <strong>{tx.dueDate}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex md:flex-col gap-2">
                  <button
                    onClick={() => onReturnItem(tx.id)}
                    className="flex-1 md:flex-none bg-[#006a61] hover:bg-[#0b8276] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
                    id={`return-btn-${tx.id}`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark as Returned</span>
                  </button>
                  <button 
                    onClick={() => alert(`Pickup / Return Coordinator: Meet ${tx.ownerName} at ${tx.pickupLocation}. Contact via campus WhatsApp / Email.`)}
                    className="flex-1 md:flex-none border border-[#002045] text-[#002045] hover:bg-[#eff4ff] px-4 py-2 rounded-xl text-xs font-semibold text-center"
                  >
                    Meetup Info
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Club Listed Inventory (Only for Clubs) */}
      {isClub && activeTab === 'my-gear' && (
        <div className="space-y-4">
          {myItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#c4c6cf]/60 p-12 text-center">
              <Package className="w-12 h-12 text-[#74777f] mx-auto mb-3 opacity-50" />
              <h3 className="font-headline font-bold text-base text-[#002045] mb-1">
                Your club has not listed any equipment yet
              </h3>
              <p className="text-xs text-[#43474e] mb-4">
                List cameras, sound systems, electronics, or lab tools to make them accessible to BMU students.
              </p>
              <button
                onClick={onOpenListItem}
                className="bg-[#006a61] hover:bg-[#0b8276] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm"
              >
                List Your First Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-[#e5eeff] relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'available'
                          ? 'bg-[#dcfce7] text-[#166534]'
                          : 'bg-[#fee2e2] text-[#991b1b]'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#006a61] font-semibold mb-1">{item.category}</div>
                    <h3 className="text-sm font-headline font-bold text-[#002045]">{item.title}</h3>
                    <p className="text-xs text-[#43474e] mt-1 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onToggleItemStatus(item.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-colors ${
                        item.status === 'available'
                          ? 'border-[#c4c6cf] text-[#43474e] hover:bg-[#fee2e2] hover:text-[#991b1b]'
                          : 'border-[#166534] bg-[#dcfce7] text-[#166534]'
                      }`}
                    >
                      {item.status === 'available' ? 'Mark In Use' : 'Mark Available'}
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors"
                      title="Remove Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Posted Needs */}
      {activeTab === 'my-requests' && (
        <div className="space-y-4">
          {myRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#c4c6cf]/60 p-12 text-center">
              <Clock className="w-12 h-12 text-[#74777f] mx-auto mb-3 opacity-50" />
              <h3 className="font-headline font-bold text-base text-[#002045] mb-1">
                No active requests posted
              </h3>
              <p className="text-xs text-[#43474e] mb-4">
                Need an item for class or project? Ask your campus community.
              </p>
              <button
                onClick={onOpenPostRequest}
                className="bg-[#F59E0B] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm"
              >
                Post a Request
              </button>
            </div>
          ) : (
            myRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-5 md:p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      req.status === 'fulfilled'
                        ? 'bg-[#86f2e4]/30 text-[#006a61]'
                        : 'bg-[#F59E0B]/20 text-[#b45309]'
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-xs text-[#74777f]">{req.category}</span>
                  </div>
                  <span className="text-xs text-[#74777f]">Posted {req.timeAgo}</span>
                </div>

                <h3 className="text-base font-headline font-bold text-[#002045] mb-1">{req.title}</h3>
                <p className="text-xs sm:text-sm text-[#43474e] mb-4">{req.description}</p>

                {/* Offers from peers */}
                <div className="mt-4 pt-4 border-t border-[#eff4ff]">
                  <h4 className="text-xs font-bold text-[#002045] mb-2.5 flex items-center gap-1.5">
                    <span>Incoming Peer Offers ({req.offers.length})</span>
                  </h4>

                  {req.offers.length === 0 ? (
                    <div className="text-xs text-[#74777f] italic bg-[#f8f9ff] p-3 rounded-xl">
                      Waiting for peer offers. You will get a notification when someone clicks "I Can Help".
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {req.offers.map((offer) => (
                        <div
                          key={offer.id}
                          className="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#c4c6cf]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={offer.offererAvatar}
                              alt={offer.offererName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="text-xs">
                              <span className="font-bold text-[#002045]">{offer.offererName}</span>
                              <p className="text-[#43474e]">{offer.itemDescription}</p>
                              <div className="text-[11px] text-[#006a61] mt-0.5">
                                Meetup: {offer.meetupSpot} @ {offer.meetupTime}
                              </div>
                            </div>
                          </div>

                          {offer.status === 'accepted' ? (
                            <span className="text-xs font-bold text-[#166534] bg-[#dcfce7] px-3 py-1 rounded-full">
                              Offer Accepted
                            </span>
                          ) : (
                            <button
                              onClick={() => onAcceptOffer(req.id, offer.id)}
                              className="bg-[#006a61] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#0b8276] transition-all shadow-sm"
                            >
                              Accept & Meet
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-[#c4c6cf]/70 p-6 shadow-sm">
          <h3 className="font-headline font-bold text-base text-[#002045] mb-4">
            Completed Campus Exchanges
          </h3>
          <div className="divide-y divide-[#eff4ff]">
            {pastBorrows.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={tx.itemImage}
                    alt={tx.itemTitle}
                    className="w-12 h-12 rounded-xl object-cover border border-[#c4c6cf]"
                  />
                  <div className="text-xs">
                    <h4 className="font-bold text-[#002045]">{tx.itemTitle}</h4>
                    <p className="text-[#74777f]">Lent by {tx.ownerName} • Returned on time</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#166534] bg-[#dcfce7] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Returned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
