'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { useNumerologyStore } from '@/stores/numerology';
import { toEnglishLike, vowelMap } from '@/util/string.util';

export const SoulUrgeNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getSoulNumber(fullName: string): string {
    const nameNormalize = toEnglishLike(fullName).toLowerCase();

    const mapped = nameNormalize
      .replace(/\s/g, '')
      .split('')
      .map((_, index, chars) => vowelMap(chars.join(''), index))
      .filter((item) => item.isVowel);

    let sum = mapped.reduce((acc, item) => acc + item.number, 0);

    // Master numbers
    if (sum === 11) return '11/2';
    if (sum === 22) return '22/4';
    if (sum === 33) return '33/6';

    while (sum > 9) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, digit) => acc + Number(digit), 0);
    }

    return sum.toString();
  }

  return (
    <div>
      <Card className='p-6 rounded-2xl shadow-2xl bg-white relative'>
        <CardBody className='space-y-4'>
          <Button
            className='text-xl font-bold text-primary cursor-pointer inline-block p-0 border-3'
            variant='light'
            onPress={onOpen}
          >
            💫 Chỉ số Linh hồn (LH)
          </Button>

          <p className='text-gray-700'>
            Họ tên khai sinh: <span className='font-semibold'>{numerology.name}</span>
          </p>

          <p className='text-gray-700'>
            Họ tên tính toán:{' '}
            <span className='font-semibold'>{toEnglishLike(numerology.name).toLocaleLowerCase()}</span>
          </p>

          <p className='text-gray-700'>
            Chỉ số LH sau khi rút gọn:{' '}
            <span className='font-semibold text-primary'>{getSoulNumber(numerology.name)}</span>
          </p>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>💫 Chỉ số Linh hồn (LH)</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700'>
                    Chỉ số Linh hồn tiết lộ <span className='font-medium'>mong muốn sâu thẳm</span> bên trong bạn — điều
                    thúc đẩy bạn hành động và cảm nhận.
                    <br />
                    <br />
                    Nó phản ánh <span className='font-medium'>bản chất nội tâm</span>, và những{' '}
                    <span className='font-medium'>động lực cảm xúc</span> khó thấy từ bên ngoài.
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
