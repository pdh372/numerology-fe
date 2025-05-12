'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { processNumbers } from '@/util/number.util';
import { useNumerologyStore } from '@/store/numerology';
import { toEnglishLike, vowelMap, nameNormalizing } from '@/util/string.util';

export const MissionNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getMissionNumber(fullName: string): string {
    const nameNormalized = nameNormalizing(fullName);

    const mapped = nameNormalized.map((char) => vowelMap(char, 0));

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
            🌟 Chỉ số Sứ mệnh (SM)
          </Button>

          <p className='text-gray-700'>
            Họ tên khai sinh: <span className='font-semibold'>{numerology.name}</span>
          </p>

          <p className='text-gray-700'>
            Họ tên tính toán:{' '}
            <span className='font-semibold'>{toEnglishLike(numerology.name).toLocaleLowerCase()}</span>
          </p>

          <p className='text-gray-700'>
            Chỉ số SM sau khi rút gọn:{' '}
            <span className='font-semibold text-primary'>{getMissionNumber(numerology.name)}</span>
          </p>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>Chỉ số Sứ mệnh (SM)</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700'>
                    Chỉ số Sứ mệnh tiết lộ <span className='font-medium'>mục đích sống</span> của bạn — những điều bạn
                    cần làm và đạt được trong cuộc sống.
                    <br />
                    <br />
                    Nó phản ánh <span className='font-medium'>lý tưởng, tham vọng</span> và các yếu tố giúp bạn cảm thấy
                    hoàn thành trong cuộc sống.
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
