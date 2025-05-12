'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { processNumbers } from '@/util/number.util';
import { useNumerologyStore } from '@/store/numerology';
import { toEnglishLike, vowelMap, nameNormalizing } from '@/util/string.util';

export const SoulUrgeNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getSoulNumber(fullName: string): string {
    const nameNormalized = nameNormalizing(fullName);

    const mapped = nameNormalized
      .map((_, index, chars) => vowelMap(chars.join(''), index))
      .filter((item) => item.isVowel);

    return processNumbers(mapped.map((item) => item.number));
  }

  return (
    <div>
      <Card className='p-2 rounded-2xl shadow-2xl bg-white relative'>
        <CardBody className='space-y-4'>
          <Button
            className='text-xl font-bold text-primary cursor-pointer inline-block p-0 border-3'
            variant='light'
            onPress={onOpen}
          >
            🕊️ Chỉ số Linh hồn (LH)
          </Button>

          <p className='text-gray-700'>
            Họ tên khai sinh: <span className='font-semibold'>{numerology.name}</span>
          </p>

          <p className='text-gray-700'>
            Ký tự được tính (nguyên âm):{' '}
            <span className='font-semibold text-blue-500'>
              {toEnglishLike(numerology.name)
                .toLowerCase()
                .split('')
                .map((ch, i, arr) => {
                  const isVowel = vowelMap(arr.join(''), i)?.isVowel;

                  return (
                    <span key={i} className={isVowel ? 'text-blue-500' : 'text-gray-300'}>
                      {ch}
                    </span>
                  );
                })}
            </span>
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
              <DrawerHeader className='flex flex-col gap-1'>Chỉ số Linh hồn (LH)</DrawerHeader>
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
