export const processNumbers = (mapped: number[]): string => {
  let sum = mapped.map((item) => item).reduce((acc, item) => acc + item, 0);

  while (sum > 9) {
    // Master numbers
    if (sum === 11) return '11/2';
    if (sum === 22) return '22/4';
    if (sum === 33) return '33/6';

    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }

  return sum.toString();
};
