'use client';

import { useNumerologyStore } from '@/stores/numerology';

const Analysis = () => {
  const { numerology } = useNumerologyStore();

  return (
    <div>
      {numerology.day} {numerology.month} {numerology.year}
    </div>
  );
};

export default Analysis;
