import React from 'react';
import { X, Heart, Shield, Users, Sparkles, Building2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002045]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#c4c6cf] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 bg-[#f8f9ff] border-b border-[#c4c6cf]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#002045] text-[#86f2e4] flex items-center justify-center font-black">
              N!
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#002045]">About NeeD It!</h3>
              <p className="text-[11px] text-[#74777f]">BML Munjal University Resource Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#43474e] leading-relaxed">
          <p className="text-sm font-medium text-[#002045]">
            <strong>NeeD It!</strong> was built to solve a simple campus reality: university students and clubs possess thousands of valuable textbooks, lab tools, camera gear, and electronics that sit idle for 90% of the semester, while peers urgently scramble to buy or rent them for specific exams, projects, or weekend trips.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-[#eff4ff] p-3.5 rounded-2xl border border-[#adc7f7]/60">
              <span className="font-headline font-bold text-[#002045] block mb-1">🌱 Sustainable</span>
              <span>Reduces redundant purchasing and campus electronic waste through circular reuse.</span>
            </div>

            <div className="bg-[#dcfce7]/60 p-3.5 rounded-2xl border border-[#bbf7d0]">
              <span className="font-headline font-bold text-[#166534] block mb-1">🤝 Community-First</span>
              <span>Connects students across engineering, management, and law schools via mutual peer trust.</span>
            </div>
          </div>

          <p>
            For questions, society onboarding, or feedback, reach out to the campus coordinator team at <strong>support@bmu.edu.in</strong>.
          </p>
        </div>

        <div className="p-4 bg-[#f8f9ff] border-t border-[#c4c6cf]/60 text-right">
          <button
            onClick={onClose}
            className="bg-[#002045] hover:bg-[#1a365d] text-white px-6 py-2 rounded-full text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
