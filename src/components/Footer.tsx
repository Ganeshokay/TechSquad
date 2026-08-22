import React from 'react';

interface FooterProps {
  onOpenSafetyModal?: () => void;
  onOpenAboutModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSafetyModal, onOpenAboutModal }) => {
  return (
    <footer className="bg-[#e5eeff] text-[#002045] w-full border-t border-[#c4c6cf]/60 mt-auto pb-20 md:pb-0">
      <div className="w-full py-10 px-4 md:px-6 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#002045] flex items-center justify-center text-[#86f2e4] text-sm font-black font-headline">
              N!
            </div>
            <span className="text-xl font-headline font-black text-[#002045]">NeeD It!</span>
          </div>
          <span className="text-xs text-[#43474e] mt-1 text-center md:text-left">
            © 2026 NeeD It! BML Munjal University. Fueling the Campus Community & Resource Sharing.
          </span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#43474e]">
          <button 
            onClick={onOpenAboutModal}
            className="hover:text-[#002045] hover:underline transition-colors cursor-pointer"
          >
            About Campus Sharing
          </button>
          <button 
            onClick={onOpenSafetyModal}
            className="hover:text-[#002045] hover:underline transition-colors cursor-pointer"
          >
            Safety & Return Guidelines
          </button>
          <span className="text-[#c4c6cf]">•</span>
          <span className="text-[#006a61] font-medium">Built for BMU Students & Clubs</span>
        </nav>
      </div>
    </footer>
  );
};
