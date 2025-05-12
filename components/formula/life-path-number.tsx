'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { useNumerologyStore } from '@/stores/numerology';

export const LifePathNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getLifePathNumber(day: string, month: string, year: string): string {
    const allDigits = (day + month + year)
      .split('')
      .map(Number)
      .filter((n) => !isNaN(n));

    let sum = allDigits.reduce((acc, n) => acc + n, 0);

    if (sum === 11) return '11/2';
    if (sum === 22) return '22/4';
    if (sum === 33) return '33/6';

    if (sum > 9) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, n) => acc + Number(n), 0);
    }

    return sum.toString();
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
            🛤️ Chỉ số Đường đời (ĐĐ)
          </Button>

          <p className='text-gray-700'>
            Ngày tháng năm sinh: <span className='font-semibold'>{numerology.day}</span>/
            <span className='font-semibold'>{numerology.month}</span>/
            <span className='font-semibold'>{numerology.year}</span>
          </p>

          <p className='text-gray-700'>
            Chỉ số Đường đời của bạn là:{' '}
            <span className='font-semibold text-primary'>
              {getLifePathNumber(numerology.day, numerology.month, numerology.year)}
            </span>
          </p>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>🛤️ Chỉ số Đường đời (ĐĐ)</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700'>
                    Đây là chỉ số quan trọng nhất trong Thần số học. Nó tiết lộ về{' '}
                    <span className='font-medium'>con người bên trong</span>,{' '}
                    <span className='font-medium'>tính cách chủ đạo</span>,{' '}
                    <span className='font-medium'>năng lực</span>, <span className='font-medium'>tâm lý</span>,{' '}
                    <span className='font-medium'>nhu cầu</span>, v.v.
                  </p>
                  <br />
                  <p className='text-gray-700'>
                    Đặc biệt, nó còn là <span className='font-medium'>chỉ dấu về con đường</span> bạn nên đi và những
                    <span className='font-medium'> bài học</span> lớn bạn sẽ gặp.
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
