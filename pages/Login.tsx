import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup, isAuthed } from '../lib/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        document.title = isLoginMode ? "ASHFORGE | Access Terminal" : "ASHFORGE | Register Operative";
        if (isAuthed()) {
            navigate('/account');
        }
    }, [isLoginMode, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        let result;
        if (isLoginMode) {
            result = login({ email, password });
        } else {
            if (!name || !email || !password) {
                setError('MISSING CRITICAL IDENTIFIERS. FILL REQUIRED FIELDS.');
                return;
            }
            result = signup({ name, email, password, phone });
        }

        if (result.success) {
            navigate('/account');
        } else {
            setError(result.error || 'Authentication sequence failed.');
        }
    };

    return (
        <div className="max-w-xl mx-auto px-6 pt-32 pb-24 min-h-[80vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000">

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {isLoginMode ? 'Access Terminal' : 'Register Operative'}
                </h1>
                <p className="text-zinc-500 max-w-sm mx-auto text-xs md:text-sm font-medium tracking-wide leading-relaxed">
                    {isLoginMode
                        ? 'Enter credentials to authorize access to your deployment sector history.'
                        : 'Initialize your operative profile. Securing communication channels.'}
                </p>
            </div>

            <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 relative overflow-hidden group">
                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3333]/5 blur-3xl group-hover:bg-[#ff3333]/10 transition-colors pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    {error && (
                        <div className="p-4 bg-[#ff3333]/10 border border-[#ff3333]/20 text-[#ff3333] text-[10px] font-black tracking-widest uppercase">
                            {error}
                        </div>
                    )}

                    {!isLoginMode && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">Given Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#ff3333]/50 focus:ring-1 focus:ring-[#ff3333]/50 transition-all"
                                placeholder="OPERATIVE DESIGNATION"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">Comm Link (Email)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#ff3333]/50 focus:ring-1 focus:ring-[#ff3333]/50 transition-all"
                            placeholder="ENCRYPTED INBOX"
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">Grid Coordinates (Phone)</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#ff3333]/50 focus:ring-1 focus:ring-[#ff3333]/50 transition-all"
                                placeholder="OPTIONAL COMMS"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">Security Hash (Password)</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#ff3333]/50 focus:ring-1 focus:ring-[#ff3333]/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-transparent border border-[#ff3333] hover:bg-[#ff3333]/10 text-white p-4 font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(255,51,51,0)] hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] text-xs"
                    >
                        {isLoginMode ? 'Initiate Link' : 'Forge Profile'}
                    </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/5 pt-6">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError(null);
                        }}
                        className="text-zinc-500 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-colors"
                    >
                        {isLoginMode ? 'No profile found? Request Registration' : 'Return to Authorization Panel'}
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => navigate('/collection')}
                    className="text-zinc-600 hover:text-[#ff3333] text-[10px] font-black tracking-[0.3em] uppercase transition-colors group flex items-center justify-center gap-2 mx-auto"
                >
                    ← Continue Deployment (Shop)
                </button>
            </div>

        </div>
    );
};

export default Login;
