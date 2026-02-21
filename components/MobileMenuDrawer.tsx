import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, User } from 'lucide-react';
import AshforgeMark from './AshforgeMark';
import { isAuthed } from '../lib/auth';

interface MobileMenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-x-0`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-safe mt-6 pb-6 border-b border-zinc-900">
                    <div className="flex items-center gap-3">
                        <AshforgeMark className="w-5 h-5 text-white" />
                        <span className="text-sm font-black tracking-[0.2em] text-white uppercase">Menu</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
                    {[
                        { label: 'Profile', path: isAuthed() ? '/account' : '/login', icon: User },
                        { label: 'About', path: '/about' },
                        { label: 'Contact', path: '/contact' }
                    ].map(link => (
                        <button
                            key={link.label}
                            onClick={() => handleNavigate(link.path)}
                            className="w-full flex items-center justify-between py-5 border-b border-zinc-900/50 group"
                        >
                            <div className="flex items-center gap-4">
                                {link.icon && <link.icon size={16} className="text-zinc-500 group-hover:text-white" />}
                                <span className="text-sm font-black tracking-[0.25em] text-zinc-300 group-hover:text-white uppercase transition-colors">{link.label}</span>
                            </div>
                            <ChevronRight size={16} className="text-zinc-700 group-hover:text-[#ff3333] transition-colors group-hover:translate-x-1" />
                        </button>
                    ))}

                    {/* Placeholders for future pages */}
                    <div className="mt-12 space-y-4">
                        <p className="text-[10px] font-black text-[#ff3333] tracking-[0.4em] uppercase mb-6">Support Logistics</p>
                        {['Shipping & Returns', 'Privacy Policy', 'Terms of Service'].map(label => (
                            <button key={label} className="w-full flex items-center justify-between py-3 group opacity-50 cursor-not-allowed">
                                <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-900 bg-black/50">
                    <p className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase text-center focus:outline-none select-none">
                        ASHFORGE SYS. // V4.0.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuDrawer;
