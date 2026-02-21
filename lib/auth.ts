import { User, Session } from '../types';

const USERS_KEY = 'ashforge_users_v1';
const SESSION_KEY = 'ashforge_session_v1';

// Internal type holding the MVP password for local simulation
type StoreUser = User & { passwordHash: string };

const getUsers = (): StoreUser[] => {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            localStorage.setItem(USERS_KEY, JSON.stringify([]));
            return [];
        }
        return parsed;
    } catch {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
        return [];
    }
};

/**
 * Super lightweight hash simulation.
 * TODO: Replace entirely with Supabase Auth later.
 */
const mockHash = (str: string) => btoa(str).split('').reverse().join('');

export const signup = (data: { name: string; email: string; password: string; phone?: string }): { success: boolean; error?: string } => {
    const users = getUsers();

    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { success: false, error: 'Email already registered to an operative.' };
    }

    const newUser: StoreUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10),
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        passwordHash: mockHash(data.password), // MVP plain-text obscuring
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Auto-login after signup
    return login({ email: data.email, password: data.password });
};

export const login = (data: { email: string; password: string }): { success: boolean; error?: string } => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());

    if (!user || user.passwordHash !== mockHash(data.password)) {
        return { success: false, error: 'Invalid credentials. Access denied.' };
    }

    // Strip password out for the session object
    const { passwordHash, ...cleanUser } = user;

    const token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10);

    const session: Session = {
        user: cleanUser,
        token,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
};

export const logout = (): void => {
    localStorage.removeItem(SESSION_KEY);
};

export const getSession = (): Session | null => {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(SESSION_KEY);
        return null;
    }
};

export const isAuthed = (): boolean => {
    return getSession() !== null;
};
