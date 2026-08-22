import React, { useState, useEffect } from 'react';
import { 
  initialClubs, 
  initialMarketplaceItems, 
  initialRequests, 
  initialTransactions, 
  initialNotifications, 
  currentUser 
} from './data/mockData';
import { 
  CategoryType, 
  CampusClub, 
  CampusRequest, 
  GearItem, 
  BorrowTransaction, 
  AppNotification, 
  UserProfile, 
  RequestOffer 
} from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { MarketplaceView } from './components/MarketplaceView';
import { ClubsView } from './components/ClubsView';
import { RequestsView } from './components/RequestsView';
import { MyActivityView } from './components/MyActivityView';
import { BorrowModal } from './components/BorrowModal';
import { PostRequestModal } from './components/PostRequestModal';
import { ListItemModal } from './components/ListItemModal';
import { OfferHelpModal } from './components/OfferHelpModal';
import { ClubDetailModal } from './components/ClubDetailModal';
import { AiCampusFinder } from './components/AiCampusFinder';
import { SafetyModal } from './components/SafetyModal';
import { AboutModal } from './components/AboutModal';
import { LoginPage } from './components/LoginPage';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  // Authentication & Role State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('needit_logged_in');
    return saved === 'true';
  });

  // Navigation & Search State
  const [currentTab, setCurrentTab] = useState<'marketplace' | 'clubs' | 'requests' | 'my-activity'>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  // Persistence / Local State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('needit_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserProfile;
        // If student role with old avatar placeholder, update to college student photo
        if (parsed.role === 'student' && (!parsed.avatar || parsed.avatar.includes('AB6AXuCDtUB'))) {
          parsed.avatar = currentUser.avatar;
          localStorage.setItem('needit_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return currentUser;
      }
    }
    return currentUser;
  });

  const [items, setItems] = useState<GearItem[]>(() => {
    const version = localStorage.getItem('needit_data_version');
    if (version !== 'v3_bmu_clubs') {
      localStorage.setItem('needit_data_version', 'v3_bmu_clubs');
      localStorage.setItem('needit_items', JSON.stringify(initialMarketplaceItems));
      localStorage.setItem('needit_clubs', JSON.stringify(initialClubs));
      return initialMarketplaceItems;
    }
    const saved = localStorage.getItem('needit_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GearItem[];
        // Filter out legacy p2p / out / robo items
        const cleaned = parsed.filter(i => 
          !i.id.startsWith('gear_p2p_') && 
          !i.id.startsWith('gear_out_') && 
          !i.id.startsWith('gear_robo_') && 
          !i.id.startsWith('gear_chem_') && 
          !i.id.startsWith('gear_calc_') && 
          !i.id.startsWith('gear_book_')
        );
        return cleaned.length > 0 ? cleaned : initialMarketplaceItems;
      } catch {
        return initialMarketplaceItems;
      }
    }
    return initialMarketplaceItems;
  });

  const [clubs, setClubs] = useState<CampusClub[]>(() => {
    const version = localStorage.getItem('needit_data_version');
    if (version !== 'v3_bmu_clubs') {
      return initialClubs;
    }
    const saved = localStorage.getItem('needit_clubs');
    return saved ? JSON.parse(saved) : initialClubs;
  });

  const [requests, setRequests] = useState<CampusRequest[]>(() => {
    const saved = localStorage.getItem('needit_requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [transactions, setTransactions] = useState<BorrowTransaction[]>(() => {
    const saved = localStorage.getItem('needit_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('needit_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Modal Dialog States
  const [borrowModalItem, setBorrowModalItem] = useState<GearItem | null>(null);
  const [isPostRequestOpen, setIsPostRequestOpen] = useState(false);
  const [isListItemOpen, setIsListItemOpen] = useState(false);
  const [offerHelpRequest, setOfferHelpRequest] = useState<CampusRequest | null>(null);
  const [selectedClubDetail, setSelectedClubDetail] = useState<CampusClub | null>(null);
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('needit_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('needit_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('needit_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('needit_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('needit_user', JSON.stringify(user));
  }, [user]);

  // Handler: Confirm Borrow Request
  const handleConfirmBorrow = (item: GearItem, durationDays: number, purpose: string) => {
    // 1. Update item status to in_use
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, status: 'in_use' as const } : i
    );
    setItems(updatedItems);

    // Also update club item if applicable
    const updatedClubs = clubs.map((c) => ({
      ...c,
      items: c.items.map((i) =>
        i.id === item.id ? { ...i, status: 'in_use' as const } : i
      )
    }));
    setClubs(updatedClubs);

    // 2. Create new transaction
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(durationDays));

    const newTx: BorrowTransaction = {
      id: `tx_${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.imageUrl,
      itemCategory: item.category,
      ownerName: item.ownerName,
      ownerType: item.ownerType,
      borrowerName: user.name,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'active',
      pickupLocation: item.location,
      depositPaid: item.depositRequired,
      notes: purpose || 'Standard campus borrowing'
    };
    setTransactions([newTx, ...transactions]);

    // 3. Add notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'borrow_approved',
      title: `Borrow Confirmed: ${item.title}`,
      message: `Pickup confirmed with ${item.ownerName} at ${item.location}. Due on ${newTx.dueDate}.`,
      timestamp: 'Just now',
      read: false,
      linkTab: 'my-activity'
    };
    setNotifications([newNotif, ...notifications]);

    // 4. Update user completed borrows
    setUser({ ...user, completedBorrows: user.completedBorrows + 1 });

    setBorrowModalItem(null);
    showToast(`Borrow confirmed for ${item.title}! Added to My Activity.`, 'success');
  };

  // Handler: Mark Item as Returned
  const handleReturnItem = (transactionId: string) => {
    const tx = transactions.find((t) => t.id === transactionId);
    if (!tx) return;

    // Update transaction
    setTransactions(
      transactions.map((t) =>
        t.id === transactionId ? { ...t, status: 'returned' as const } : t
      )
    );

    // Make item available again
    setItems(
      items.map((i) =>
        i.id === tx.itemId ? { ...i, status: 'available' as const } : i
      )
    );

    setClubs(
      clubs.map((c) => ({
        ...c,
        items: c.items.map((i) =>
          i.id === tx.itemId ? { ...i, status: 'available' as const } : i
        )
      }))
    );

    // Notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'item_returned',
      title: `Return Completed: ${tx.itemTitle}`,
      message: `Thank you for returning on time! +10 Campus Credibility Points added.`,
      timestamp: 'Just now',
      read: false,
      linkTab: 'my-activity'
    };
    setNotifications([newNotif, ...notifications]);

    showToast(`Returned ${tx.itemTitle} successfully! Credibility score boosted.`, 'success');
  };

  // Handler: Post New Campus Request
  const handleSubmitRequest = (reqData: Partial<CampusRequest>) => {
    const newReq: CampusRequest = {
      id: `req_${Date.now()}`,
      title: reqData.title || '',
      description: reqData.description || '',
      category: reqData.category || 'Electronics',
      isUrgent: !!reqData.isUrgent,
      status: 'pending',
      neededFrom: reqData.neededFrom || new Date().toISOString().split('T')[0],
      neededTo: reqData.neededTo || new Date().toISOString().split('T')[0],
      preferredLocation: reqData.preferredLocation || 'Student Center',
      authorName: user.name,
      authorAvatar: user.avatar,
      authorDepartment: user.department,
      authorYear: user.year,
      timeAgo: 'Just now',
      offers: [],
      createdAt: new Date().toISOString()
    };

    setRequests([newReq, ...requests]);

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'new_request',
      title: 'Your Campus Request is Live',
      message: `Peers across BMU can now see your request for "${newReq.title}".`,
      timestamp: 'Just now',
      read: false,
      linkTab: 'requests'
    };
    setNotifications([notif, ...notifications]);

    showToast(`Request "${newReq.title}" posted to campus feed!`, 'success');
  };

  // Handler: Publish List Item
  const handleSubmitListItem = (itemData: Partial<GearItem>) => {
    const newItem: GearItem = {
      id: `gear_user_${Date.now()}`,
      title: itemData.title || '',
      category: itemData.category || 'Calculators',
      description: itemData.description || '',
      imageUrl: itemData.imageUrl || 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
      status: 'available',
      ownerType: 'student',
      ownerName: user.name,
      ownerAvatar: user.avatar,
      ownerDepartment: user.department,
      location: itemData.location || user.hostelRoom,
      maxBorrowDays: itemData.maxBorrowDays || 3,
      depositRequired: 0,
      rating: 5.0,
      reviewCount: 0,
      condition: itemData.condition || 'Like New',
      tags: itemData.tags || ['StudentShare'],
      createdAt: new Date().toISOString()
    };

    setItems([newItem, ...items]);
    setUser({ ...user, completedLends: user.completedLends + 1 });

    showToast(`Item "${newItem.title}" published to marketplace!`, 'success');
  };

  // Handler: Offer Help to a Request
  const handleSubmitOffer = (requestId: string, offerData: Partial<RequestOffer>) => {
    const newOffer: RequestOffer = {
      id: `off_${Date.now()}`,
      requestId,
      offererName: user.name,
      offererAvatar: user.avatar,
      offererDepartment: user.department,
      itemDescription: offerData.itemDescription || '',
      meetupSpot: offerData.meetupSpot || 'Student Center',
      meetupTime: offerData.meetupTime || 'Today',
      contactNote: offerData.contactNote || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setRequests(
      requests.map((r) =>
        r.id === requestId
          ? { ...r, offers: [newOffer, ...r.offers] }
          : r
      )
    );

    const targetReq = requests.find((r) => r.id === requestId);

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      type: 'offer_received',
      title: `Offer Sent to ${targetReq?.authorName || 'Peer'}`,
      message: `You offered to lend for "${targetReq?.title}". Meetup: ${newOffer.meetupSpot}.`,
      timestamp: 'Just now',
      read: false,
      linkTab: 'requests'
    };
    setNotifications([notif, ...notifications]);

    showToast(`Help offer sent to ${targetReq?.authorName}!`, 'success');
  };

  // Handler: Accept Incoming Offer on My Request
  const handleAcceptOffer = (requestId: string, offerId: string) => {
    setRequests(
      requests.map((r) => {
        if (r.id !== requestId) return r;
        return {
          ...r,
          status: 'fulfilled' as const,
          offers: r.offers.map((o) =>
            o.id === offerId ? { ...o, status: 'accepted' as const } : o
          )
        };
      })
    );

    showToast('Offer accepted! You can now coordinate pickup with your peer.', 'success');
  };

  // Handler: Toggle item available/in use
  const handleToggleItemStatus = (itemId: string) => {
    setItems(
      items.map((item) => {
        if (item.id !== itemId) return item;
        const newStatus = item.status === 'available' ? 'in_use' : 'available';
        return { ...item, status: newStatus as any };
      })
    );
  };

  // Handler: Delete my item listing
  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter((i) => i.id !== itemId));
    showToast('Listing removed from marketplace.', 'info');
  };

  // Filter items owned by the current user
  const myListedItems = items.filter((i) => i.ownerName === user.name);
  const myPostedRequests = requests.filter((r) => r.authorName === user.name);

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('needit_logged_in', 'true');
    localStorage.setItem('needit_user', JSON.stringify(newUser));

    if (newUser.role === 'student') {
      showToast(`Welcome ${newUser.name}! You can now post requests or borrow gear.`, 'success');
    } else {
      showToast(`Welcome ${newUser.name}! You can now list available items from ${newUser.clubName || 'your club'}.`, 'success');
    }
  };

  const handleSwitchRoleOrLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('needit_logged_in');
    showToast('Signed out. Select a campus role to continue.', 'info');
  };

  // If user is not logged in, show the Login Page first
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] font-body selection:bg-[#86f2e4] selection:text-[#002045]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'clubs' && user.role === 'student') {
            setCurrentTab('marketplace');
          } else {
            setCurrentTab(tab);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenPostRequest={() => setIsPostRequestOpen(true)}
        onOpenListItem={() => setIsListItemOpen(true)}
        notifications={notifications}
        onMarkNotificationRead={(id) => {
          setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
        onClearAllNotifications={() => setNotifications([])}
        user={user}
        onOpenAiFinder={() => setIsAiFinderOpen(true)}
        onSwitchRoleOrLogout={handleSwitchRoleOrLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-24 md:pb-12">
        {currentTab === 'marketplace' && (
          <MarketplaceView
            items={items}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onBorrowItem={(item) => setBorrowModalItem(item)}
            onOpenListItem={() => setIsListItemOpen(true)}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
            onNavigateToClubs={() => setCurrentTab('clubs')}
            onOpenAiFinder={() => setIsAiFinderOpen(true)}
            user={user}
          />
        )}

        {currentTab === 'clubs' && user.role === 'club' && (
          <ClubsView
            clubs={clubs}
            onBorrowItem={(item) => setBorrowModalItem(item)}
            onOpenClubDetail={(club) => setSelectedClubDetail(club)}
          />
        )}

        {currentTab === 'requests' && (
          <RequestsView
            requests={requests}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
            onOfferHelp={(req) => setOfferHelpRequest(req)}
          />
        )}

        {currentTab === 'my-activity' && (
          <MyActivityView
            user={user}
            transactions={transactions}
            myItems={myListedItems}
            myRequests={myPostedRequests}
            onReturnItem={handleReturnItem}
            onToggleItemStatus={handleToggleItemStatus}
            onDeleteItem={handleDeleteItem}
            onOpenListItem={() => setIsListItemOpen(true)}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
            onAcceptOffer={handleAcceptOffer}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        isClub={user.role === 'club'}
        onSelectTab={(tab) => {
          if (tab === 'clubs' && user.role === 'student') {
            setCurrentTab('marketplace');
          } else {
            setCurrentTab(tab);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer 
        onOpenSafetyModal={() => setIsSafetyOpen(true)}
        onOpenAboutModal={() => setIsAboutOpen(true)}
      />

      {/* Modals & Dialogs */}
      <BorrowModal
        item={borrowModalItem}
        isOpen={!!borrowModalItem}
        onClose={() => setBorrowModalItem(null)}
        onConfirmBorrow={handleConfirmBorrow}
      />

      <PostRequestModal
        isOpen={isPostRequestOpen}
        onClose={() => setIsPostRequestOpen(false)}
        onSubmitRequest={handleSubmitRequest}
      />

      <ListItemModal
        isOpen={isListItemOpen}
        onClose={() => setIsListItemOpen(false)}
        onSubmitItem={handleSubmitListItem}
        user={user}
      />

      <OfferHelpModal
        request={offerHelpRequest}
        isOpen={!!offerHelpRequest}
        onClose={() => setOfferHelpRequest(null)}
        onSubmitOffer={handleSubmitOffer}
      />

      <ClubDetailModal
        club={selectedClubDetail}
        isOpen={!!selectedClubDetail}
        onClose={() => setSelectedClubDetail(null)}
        onBorrowItem={(item) => setBorrowModalItem(item)}
      />

      <AiCampusFinder
        isOpen={isAiFinderOpen}
        onClose={() => setIsAiFinderOpen(false)}
        items={items}
        onBorrowItem={(item) => setBorrowModalItem(item)}
      />

      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Toast Alert Popup */}
      {toast && (
        <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3 max-w-md ${
            toast.type === 'success'
              ? 'bg-[#002045] text-white border-[#86f2e4]'
              : toast.type === 'error'
              ? 'bg-[#ba1a1a] text-white border-[#ffdad6]'
              : 'bg-[#1a365d] text-white border-[#adc7f7]'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-[#86f2e4] shrink-0" />
            <p className="text-xs sm:text-sm font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
