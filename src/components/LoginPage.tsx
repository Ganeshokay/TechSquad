import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  Package, 
  CheckCircle2, 
  Users, 
  Camera, 
  Cpu, 
  Compass, 
  Music,
  Info,
  AtSign,
  UserCheck
} from 'lucide-react';
import { UserProfile, UserRole, CampusClub } from '../types';
import { sampleStudentUsers, sampleClubUsers, initialClubs } from '../data/mockData';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  // Student form state
  const [studentId, setStudentId] = useState(sampleStudentUsers[0].studentId);
  const [studentName, setStudentName] = useState(sampleStudentUsers[0].name);
  const [studentEmail, setStudentEmail] = useState(sampleStudentUsers[0].email);
  const [studentDept, setStudentDept] = useState(sampleStudentUsers[0].department);
  const [studentYear, setStudentYear] = useState(sampleStudentUsers[0].year);
  const [studentHostel, setStudentHostel] = useState(sampleStudentUsers[0].hostelRoom);

  // Club form state
  const [selectedClubId, setSelectedClubId] = useState(sampleClubUsers[0].clubId || 'club_pac');
  const [clubLeadName, setClubLeadName] = useState(sampleClubUsers[0].name);
  const [clubEmail, setClubEmail] = useState(sampleClubUsers[0].email);
  const [clubRoleTitle, setClubRoleTitle] = useState(sampleClubUsers[0].clubRole || 'Club President');
  const [clubLocation, setClubLocation] = useState(sampleClubUsers[0].hostelRoom);

  // When student ID changes, auto-format email if standard format
  const handleStudentIdChange = (val: string) => {
    setStudentId(val);
    const cleaned = val.trim().toLowerCase();
    if (cleaned && !cleaned.includes('@')) {
      setStudentEmail(`${cleaned}@bmu.edu.in`);
    } else if (cleaned.includes('@')) {
      setStudentEmail(cleaned);
    }
  };

  const handleSelectClub = (clubId: string) => {
    setSelectedClubId(clubId);
    const club = initialClubs.find(c => c.id === clubId);
    if (club) {
      setClubLeadName(club.leadName);
      setClubEmail(club.leadEmail);
      setClubRoleTitle(club.leadRole);
      setClubLocation(club.location);
    }
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedId = studentId.trim().toLowerCase() || 'ganesh.26cse';
    const formattedEmail = studentEmail.trim().toLowerCase() || `${formattedId}@bmu.edu.in`;

    const studentUser: UserProfile = {
      id: `usr_${Date.now()}`,
      role: 'student',
      name: studentName.trim() || 'Student User',
      email: formattedEmail,
      avatar: sampleStudentUsers[0].avatar,
      department: studentDept.trim() || 'Computer Science & Engineering',
      year: studentYear.trim() || '3rd Year B.Tech',
      studentId: formattedId,
      trustScore: 4.9,
      completedBorrows: 8,
      completedLends: 14,
      onTimeRate: 100,
      verified: true,
      bio: 'Enthusiastic student borrower & lender at BML Munjal University.',
      phone: '+91 98765 43210',
      hostelRoom: studentHostel.trim() || 'Hostel 3, Room 308'
    };
    onLogin(studentUser);
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const club = initialClubs.find(c => c.id === selectedClubId) || initialClubs[0];
    const finalEmail = clubEmail.trim().toLowerCase() || club.leadEmail;

    const clubUser: UserProfile = {
      id: `usr_club_${Date.now()}`,
      role: 'club',
      name: clubLeadName.trim() || club.leadName,
      email: finalEmail,
      avatar: club.leadAvatar || sampleClubUsers[0].avatar,
      department: club.category,
      year: 'Club Representative',
      studentId: finalEmail,
      trustScore: 5.0,
      completedBorrows: 1,
      completedLends: 45,
      onTimeRate: 100,
      verified: true,
      bio: `Official representative for ${club.name}. Managing gear lending for BMU students.`,
      phone: '+91 91234 56780',
      hostelRoom: clubLocation.trim() || club.location,
      clubId: club.id,
      clubName: club.name,
      clubRole: clubRoleTitle.trim() || club.leadRole
    };
    onLogin(clubUser);
  };

  const quickLoginStudent = (index: number) => {
    const user = sampleStudentUsers[index] || sampleStudentUsers[0];
    onLogin(user);
  };

  const quickLoginClub = (index: number) => {
    const user = sampleClubUsers[index] || sampleClubUsers[0];
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-between selection:bg-[#86f2e4] selection:text-[#002045]">
      {/* Top Banner / Navigation Brand */}
      <header className="w-full bg-white border-b border-[#c4c6cf]/60 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002045] flex items-center justify-center text-white shadow-sm">
              <span className="font-headline font-black text-xl tracking-tight text-[#86f2e4]">N!</span>
            </div>
            <div>
              <div className="text-xl font-headline font-extrabold text-[#002045] tracking-tight leading-none">
                NeeD It!
              </div>
              <div className="text-[10px] text-[#006a61] font-semibold tracking-wider uppercase mt-0.5">
                BML Munjal University Resource Network
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#002045] bg-[#eff4ff] px-3.5 py-1.5 rounded-full border border-[#adc7f7]/60">
            <ShieldCheck className="w-4 h-4 text-[#006a61]" />
            <span>Official University SSO Portal</span>
          </div>
        </div>
      </header>

      {/* Main Login Canvas */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 md:py-12 w-full flex flex-col items-center justify-center">
        {/* Intro Tagline */}
        <div className="text-center max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 bg-[#d6e3ff] text-[#002045] px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>BMU Peer-to-Peer & Society Exchange</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-[#002045] tracking-tight mb-3">
            Choose Your Campus Role
          </h1>
          <p className="text-sm sm:text-base text-[#43474e] leading-relaxed">
            Sign in with your student ID (e.g. <code className="bg-[#eff4ff] text-[#002045] px-1.5 py-0.5 rounded font-mono text-xs font-bold">ganesh.26cse</code>) or official club email (e.g. <code className="bg-[#86f2e4]/30 text-[#006a61] px-1.5 py-0.5 rounded font-mono text-xs font-bold">pac@bmu.edu.in</code>, <code className="bg-[#86f2e4]/30 text-[#006a61] px-1.5 py-0.5 rounded font-mono text-xs font-bold">mitrun@bmu.edu.in</code>).
          </p>
        </div>

        {/* Role Toggle Switch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8">
          {/* Option 1: Student */}
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`p-5 rounded-3xl text-left border-2 transition-all flex flex-col justify-between relative overflow-hidden group ${
              selectedRole === 'student'
                ? 'bg-white border-[#002045] shadow-lg ring-4 ring-[#d6e3ff]'
                : 'bg-white/70 border-[#c4c6cf]/80 hover:bg-white hover:border-[#002045]/40 opacity-80 hover:opacity-100'
            }`}
            id="role-select-student-card"
          >
            {selectedRole === 'student' && (
              <span className="absolute top-4 right-4 bg-[#002045] text-[#86f2e4] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected
              </span>
            )}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#002045] flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-[#006a61]" />
              </div>
              <h3 className="text-lg font-headline font-bold text-[#002045] mb-1">
                I am a Student
              </h3>
              <p className="text-xs text-[#43474e] leading-relaxed mb-4">
                Borrow what you need and share what someone else needs
              </p>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between">
              <span className="bg-[#F59E0B]/20 text-[#b45309] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Send className="w-3 h-3" /> Post Campus Requests
              </span>
              <span className="text-[11px] font-mono text-[#002045] bg-[#eff4ff] px-2 py-0.5 rounded">
                name.yearbranch
              </span>
            </div>
          </button>

          {/* Option 2: Club / Society */}
          <button
            type="button"
            onClick={() => setSelectedRole('club')}
            className={`p-5 rounded-3xl text-left border-2 transition-all flex flex-col justify-between relative overflow-hidden group ${
              selectedRole === 'club'
                ? 'bg-white border-[#006a61] shadow-lg ring-4 ring-[#86f2e4]/40'
                : 'bg-white/70 border-[#c4c6cf]/80 hover:bg-white hover:border-[#006a61]/40 opacity-80 hover:opacity-100'
            }`}
            id="role-select-club-card"
          >
            {selectedRole === 'club' && (
              <span className="absolute top-4 right-4 bg-[#006a61] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected
              </span>
            )}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-headline font-bold text-[#002045] mb-1">
                I Represent a Campus Club / Society
              </h3>
              <p className="text-xs text-[#43474e] leading-relaxed mb-4">
                Publish all the available club gear for students to borrow
              </p>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex items-center justify-between">
              <span className="bg-[#86f2e4] text-[#006a61] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Package className="w-3 h-3" /> List Available Items
              </span>
              <span className="text-[11px] font-mono text-[#006a61] bg-[#86f2e4]/20 px-2 py-0.5 rounded">
                club@bmu.edu.in
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic Form Area Based on Selected Role */}
        <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#c4c6cf] shadow-xl p-6 sm:p-8">
          {selectedRole === 'student' ? (
            /* Student Form */
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-4">
                <div>
                  <h2 className="text-lg font-headline font-bold text-[#002045]">
                    Student Portal Sign-In
                  </h2>
                  <p className="text-xs text-[#74777f]">
                    Enter your BMU student ID to post requests and borrow resources.
                  </p>
                </div>
                <span className="bg-[#eff4ff] text-[#002045] text-xs font-bold px-3 py-1 rounded-full border border-[#adc7f7]/60">
                  Student Member
                </span>
              </div>

              {/* Quick 1-Click Demo Profiles */}
              <div className="p-3 bg-[#eff4ff]/60 border border-[#adc7f7]/50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#002045] uppercase tracking-wider block">
                    ⚡ Quick Demo Login (Select Sample Student):
                  </span>
                  <span className="text-[10px] text-[#74777f] font-mono">Format: name.yearbranch</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {sampleStudentUsers.map((user, idx) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setStudentId(user.studentId);
                        setStudentName(user.name);
                        setStudentEmail(user.email);
                        setStudentDept(user.department);
                        setStudentYear(user.year);
                        setStudentHostel(user.hostelRoom);
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all text-xs ${
                        studentId === user.studentId 
                          ? 'bg-[#002045] text-white border-[#002045] shadow-xs'
                          : 'bg-white hover:bg-[#d6e3ff]/60 border-[#adc7f7] text-[#002045]'
                      }`}
                    >
                      <div className="font-bold truncate text-[11px]">{user.name}</div>
                      <span className={`font-mono text-[10px] truncate px-1.5 py-0.5 rounded ${
                        studentId === user.studentId ? 'bg-white/20 text-[#86f2e4]' : 'bg-[#eff4ff] text-[#006a61]'
                      }`}>
                        {user.studentId}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Student ID *</span>
                    <span className="text-[10px] text-[#74777f] font-mono font-normal">e.g. ganesh.26cse</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => handleStudentIdChange(e.target.value)}
                      placeholder="e.g. ganesh.26cse, rekha.26bcom, anjali.25llb"
                      className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61] font-mono text-[#002045]"
                      id="student-id-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Ganesh B."
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    id="student-name-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    University Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="e.g. ganesh.26cse@bmu.edu.in"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    id="student-email-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Department & Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentDept}
                    onChange={(e) => setStudentDept(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering (3rd Year)"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Hostel / Primary Meetup Spot *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentHostel}
                    onChange={(e) => setStudentHostel(e.target.value)}
                    placeholder="e.g. Hostel 3, Room 308"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  />
                </div>
              </div>

              {/* Student Role Benefits Highlight */}
              <div className="p-3 bg-[#fef3c7]/60 border border-[#fde68a] rounded-xl text-xs text-[#92400e] flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-[#F59E0B]" />
                <span>
                  <strong>Student Feature Access:</strong> You can post urgent item requests to the campus feed, borrow gear from peers & clubs, and build your trust score.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#002045] hover:bg-[#1a365d] text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                id="submit-student-login-btn"
              >
                <span>Enter as Student ({studentId || 'ganesh.26cse'})</span>
                <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
              </button>
            </form>
          ) : (
            /* Club Form */
            <form onSubmit={handleClubSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-4">
                <div>
                  <h2 className="text-lg font-headline font-bold text-[#002045]">
                    Club & Society Representative Portal
                  </h2>
                  <p className="text-xs text-[#74777f]">
                    Select your official club ID/email (e.g. <span className="font-mono font-bold text-[#006a61]">pac@bmu.edu.in</span>, <span className="font-mono font-bold text-[#006a61]">mitrun@bmu.edu.in</span>).
                  </p>
                </div>
                <span className="bg-[#86f2e4]/30 text-[#006a61] text-xs font-bold px-3 py-1 rounded-full border border-[#86f2e4]">
                  Club Inventory Lead
                </span>
              </div>

              {/* Club Selector with official emails */}
              <div>
                <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1.5">
                  Select University Club / Society *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {initialClubs.map((club) => {
                    const isSelected = selectedClubId === club.id;
                    return (
                      <button
                        key={club.id}
                        type="button"
                        onClick={() => handleSelectClub(club.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-[#006a61] text-white border-[#006a61] shadow-sm ring-2 ring-[#86f2e4]'
                            : 'bg-[#f8f9ff] text-[#43474e] border-[#c4c6cf]/80 hover:bg-[#eff4ff]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold line-clamp-1">{club.name}</div>
                          <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-[#86f2e4]' : 'text-[#006a61]'}`}>
                            {club.leadEmail}
                          </div>
                        </div>
                        <span className={`text-[10px] self-start px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {club.items.length} items
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clubLeadName}
                    onChange={(e) => setClubLeadName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    id="club-lead-name-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Club Official Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={clubEmail}
                    onChange={(e) => setClubEmail(e.target.value)}
                    placeholder="e.g. pac@bmu.edu.in or mitrun@bmu.edu.in"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61] font-mono font-bold text-[#006a61]"
                    id="club-email-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Leadership Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={clubRoleTitle}
                    onChange={(e) => setClubRoleTitle(e.target.value)}
                    placeholder="e.g. Club President / Hardware Lead"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#002045] uppercase tracking-wider mb-1">
                    Club Room / Lending Station *
                  </label>
                  <input
                    type="text"
                    required
                    value={clubLocation}
                    onChange={(e) => setClubLocation(e.target.value)}
                    placeholder="e.g. Student Center, Room 204"
                    className="w-full text-xs p-3 bg-[#f8f9ff] border border-[#c4c6cf] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  />
                </div>
              </div>

              {/* Club Role Benefits Highlight */}
              <div className="p-3 bg-[#86f2e4]/30 border border-[#86f2e4] rounded-xl text-xs text-[#006a61] flex items-center gap-2">
                <Package className="w-4 h-4 shrink-0 text-[#006a61]" />
                <span>
                  <strong>Club Feature Access:</strong> You can list and publish available club gear (PAC cameras & tripods, Blaze runway blazers & scarves, Mritunjay stage mics & props) for BMU students.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#006a61] hover:bg-[#0b8276] text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                id="submit-club-login-btn"
              >
                <span>Enter as Club Lead ({clubEmail || 'pac@bmu.edu.in'})</span>
                <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Login Footer */}
      <footer className="w-full py-6 px-4 text-center text-xs text-[#74777f] border-t border-[#c4c6cf]/40 bg-white/60">
        <p>BML Munjal University • Peer-to-Peer Campus Resource & Gear Exchange Platform</p>
      </footer>
    </div>
  );
};
