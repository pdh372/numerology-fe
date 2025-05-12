import { create } from 'zustand';

import { processNumbers } from '@/util/number.util';

interface INumerologyStore {
  numerology: { day: string; month: string; year: string; name: string };
  setName: (year: string) => void;
  setDay: (day: string) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  getLifePathNumber: () => string;
  getLifeStages: () => any;
}

export const useNumerologyStore = create<INumerologyStore>((set, get) => ({
  numerology: {
    // name: 'Phạm Đức Huy',
    // day: '3',
    // month: '7',
    // year: '2000',
    name: '',
    day: '',
    month: '',
    year: '',
  },

  setName: (name: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, name } })),
  setDay: (day: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, day } })),
  setMonth: (month: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, month } })),
  setYear: (year: string) => set((store: INumerologyStore) => ({ numerology: { ...store.numerology, year } })),

  getLifePathNumber: () => {
    const { day, month, year } = get().numerology;

    const allDigits = (day + month + year)
      .split('')
      .map(Number)
      .filter((n) => !isNaN(n));

    return processNumbers(allDigits);
  },

  getLifeStages: () => {
    const { day, month, year } = get().numerology;

    const stage1 = processNumbers(day.split('').map(Number)); // Tuổi trẻ
    const stage2 = processNumbers(month.split('').map(Number)); // Trưởng thành
    const stage3 = processNumbers(year.split('').map(Number)); // Tuổi già

    const stage1AgeEnd = 36 - parseInt(stage1); // Kết thúc giai đoạn tuổi trẻ
    const stage2AgeEnd = stage1AgeEnd + 27; // Kết thúc giai đoạn trưởng thành

    return {
      stages: {
        youth: stage1,
        maturity: stage2,
        oldAge: stage3,
      },
      ageRange: {
        youth: `0 - ${stage1AgeEnd}`,
        maturity: `${stage1AgeEnd + 1} - ${stage2AgeEnd}`,
        oldAge: `${stage2AgeEnd + 1}+`,
      },
    };
  },
}));
