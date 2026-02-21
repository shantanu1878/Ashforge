import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, logout, isAuthed } from '../lib/auth';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const session = getSession();

    useEffect(() => {
        document.title = "ASHFORGE | Operative Dossier";
        if (!isAuthed()) {
            navigate('/login');
        }
    }, [navigate]);

    if (!session) return null; // Let the navigate hook handle unauthenticated renders.

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const joinedDate = new Date(session.user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-24 min-h-[70vh] animate-in fade-in slide-in-from-bottom-6 duration-1000">

            <div className="mb-12 border-b border-white/10 pb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-zinc-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-colors mb-4 flex items-center gap-2"
                    >
                        ← Back to HQ
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Operative Dossier
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium tracking-wide text-xs md:text-sm">
                        Registry Profile: {session.user.id.substring(0, 8)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Dossier Card */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8">
                        <h3 className="text-lg font-black text-white tracking-widest uppercase mb-8 flex items-center gap-3">
                            <span className="w-6 h-[2px] bg-[#ff3333]"></span>
                            Identity Matrix
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-1">Designation</p>
                                <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{session.user.name}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-1">Comm Link</p>
                                    <p className="text-sm font-mono text-zinc-300">{session.user.email}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-1">Grid Ping</p>
                                    <p className="text-sm font-mono text-zinc-300">{session.user.phone || 'UNREGISTERED'}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <p className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase mb-1">Network Initiation</p>
                                <p className="text-xs font-mono text-[#ff3333]">{joinedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/orders')}
                        className="w-full bg-[#ff3333]/10 border border-[#ff3333]/30 hover:bg-[#ff3333]/20 hover:border-[#ff3333]/50 text-[#ff3333] p-6 text-left transition-all group"
                    >
                        <h4 className="text-sm font-black tracking-widest uppercase mb-2 group-hover:translate-x-1 transition-transform">
                            Ops Ledger →
                        </h4>
                        <p className="text-[10px] font-medium text-[#ff3333]/70 font-mono">
                            View deployment records and logistical manifests.
                        </p>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white p-6 text-left transition-all group mt-6"
                    >
                        <h4 className="text-sm font-black tracking-widest uppercase mb-2 group-hover:translate-x-1 transition-transform">
                            Terminate Link
                        </h4>
                        <p className="text-[10px] font-medium text-zinc-500 font-mono text-left">
                            Sever connection to the local node securely.
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
