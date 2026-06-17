import { create } from 'zustand';

interface AuthState {
  email: string;
  password: string;
  name: string;
  username: string;
  avatarIndex: number;
  interests: string[];
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setName: (v: string) => void;
  setUsername: (v: string) => void;
  setAvatarIndex: (v: number) => void;
  toggleInterest: (v: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  name: '',
  username: '',
  avatarIndex: 0,
  interests: [],
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setUsername: (username) => set({ username }),
  setAvatarIndex: (avatarIndex) => set({ avatarIndex }),
  toggleInterest: (interest) =>
    set((state) => ({
      interests: state.interests.includes(interest)
        ? state.interests.filter((i) => i !== interest)
        : [...state.interests, interest],
    })),
  reset: () =>
    set({ email: '', password: '', name: '', username: '', avatarIndex: 0, interests: [] }),
}));
