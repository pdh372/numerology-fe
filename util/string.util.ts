export const toEnglishLike = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

const letterToNumber: Record<string, number> = {
  a: 1,
  j: 1,
  s: 1,
  b: 2,
  k: 2,
  t: 2,
  c: 3,
  l: 3,
  u: 3,
  d: 4,
  m: 4,
  v: 4,
  e: 5,
  n: 5,
  w: 5,
  f: 6,
  o: 6,
  x: 6,
  g: 7,
  p: 7,
  y: 7,
  h: 8,
  q: 8,
  z: 8,
  i: 9,
  r: 9,
};

const isVowel = (char: string, str: string, index: number): boolean => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  char = char.toLowerCase();

  if (vowels.includes(char)) return true;

  if (char === 'y') {
    const prev = str[index - 1]?.toLowerCase();
    const next = str[index + 1]?.toLowerCase();

    const isConsonant = (c?: string) => !!c && /^[a-z]$/.test(c) && !vowels.includes(c) && c !== 'y';

    return isConsonant(prev) && isConsonant(next);
  }

  return false;
};

export const vowelMap = (str: string, index: number) => {
  const char = str[index]?.toLowerCase();

  if (!char || !/[a-z]/.test(char)) {
    return {
      isVowel: false,
      number: 0,
    };
  }

  return {
    character: str[index]?.toLowerCase(),
    isVowel: isVowel(char, str, index),
    number: letterToNumber[char] ?? 0,
  };
};

export const nameNormalizing = (fullName: string) => toEnglishLike(fullName).toLowerCase().replace(/\s/g, '').split('');

export const getChartMatrix = (name: string): Record<number, number> => {
  const clean = nameNormalizing(name);

  const counts: Record<number, number> = {};

  for (let char of clean) {
    const num = letterToNumber[char];

    counts[num] = (counts[num] || 0) + 1;
  }

  return counts;
};
