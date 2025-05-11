import { create } from 'zustand';

interface INumerologyStore {
  numerology: { day: string; month: string; year: string; name: string };
  setName: (year: string) => void;
  setDay: (day: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
}

export const useNumerologyStore = create<INumerologyStore>((set) => ({
  numerology: {
    name: '',
    day: '',
    month: '',
    year: '',
  },

  setName: (name: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, name } })),
  setDay: (day: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, day } })),
  setMonth: (month: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, month } })),
  setYear: (year: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, year } })),
}));
