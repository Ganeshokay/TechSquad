export type CategoryType =
  | 'All'
  | 'Photography (PAC)'
  | 'Modelling (Blaze)'
  | 'Drama & Theatre (Mritunjay)'
  | 'Cameras & Media'
  | 'Fashion & Attire'
  | 'Props & Stage Gear'
  | 'Electronics'
  | 'Textbooks'
  | 'Lab Gear'
  | 'Calculators'
  | 'Sports & Outdoor'
  | 'Tools & Hardware'
  | 'Music & Audio';

export type ItemStatus = 'available' | 'in_use' | 'reserved';
export type OwnerType = 'student' | 'club';
export type ItemCondition = 'Like New' | 'Good' | 'Fair';

export interface GearItem {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  imageUrl: string;
  status: ItemStatus;
  ownerType: OwnerType;
  ownerName: string;
  ownerAvatar: string;
  ownerDepartment?: string;
  clubId?: string;
  clubName?: string;
  location: string;
  maxBorrowDays: number;
  depositRequired: number;
  rating: number;
  reviewCount: number;
  condition: ItemCondition;
  tags: string[];
  createdAt: string;
}

export interface CampusClub {
  id: string;
  name: string;
  iconName: string;
  category: string;
  description: string;
  lendingSchedule: string;
  location: string;
  leadName: string;
  leadRole: string;
  leadEmail: string;
  leadAvatar: string;
  accentBg: string;
  accentText: string;
  items: GearItem[];
}

export interface RequestOffer {
  id: string;
  requestId: string;
  offererName: string;
  offererAvatar: string;
  offererDepartment: string;
  itemDescription: string;
  meetupSpot: string;
  meetupTime: string;
  contactNote: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface CampusRequest {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  isUrgent: boolean;
  status: 'pending' | 'fulfilled';
  neededFrom: string;
  neededTo: string;
  preferredLocation: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: string;
  authorYear: string;
  timeAgo: string;
  offers: RequestOffer[];
  createdAt: string;
}

export interface BorrowTransaction {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemCategory: CategoryType;
  ownerName: string;
  ownerType: OwnerType;
  borrowerName: string;
  startDate: string;
  dueDate: string;
  status: 'active' | 'pending_pickup' | 'returned' | 'overdue';
  pickupLocation: string;
  depositPaid: number;
  notes?: string;
}

export interface AppNotification {
  id: string;
  type: 'borrow_approved' | 'offer_received' | 'return_reminder' | 'item_returned' | 'new_request';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkTab?: 'marketplace' | 'clubs' | 'requests' | 'my-activity';
}

export type UserRole = 'student' | 'club';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar: string;
  department: string;
  year: string;
  studentId: string;
  trustScore: number;
  completedBorrows: number;
  completedLends: number;
  onTimeRate: number;
  verified: boolean;
  bio: string;
  phone: string;
  hostelRoom: string;
  clubId?: string;
  clubName?: string;
  clubRole?: string;
}
