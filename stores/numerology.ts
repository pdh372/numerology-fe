import { create } from 'zustand';

interface INumerologyStore {
  numerology: { day: string; month: string; year: string };
  setDay: (day: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
}

export const useNumerologyStore = create<INumerologyStore>((set) => ({
  numerology: {
    day: '',
    month: '',
    year: '',
  },

  setDay: (day: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, day } })),
  setMonth: (month: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, month } })),
  setYear: (year: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, year } })),
}));
