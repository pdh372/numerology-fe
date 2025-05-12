'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { useNumerologyStore } from '@/stores/numerology';

export const DateOfBirthNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getBirthDayNumber(dayString: string): string {
    const day = parseInt(dayString, 10);

    if (isNaN(day) || day <= 0 || day > 31) return '—';

    if (day === 11 || day === 29) return '11/2';
    if (day === 22) return '22/4';

    let sum = [...day.toString()].reduce((acc, digit) => acc + Number(digit), 0);

    if (sum > 9) sum = [...sum.toString()].reduce((acc, digit) => acc + Number(digit), 0);

    return sum.toString();
  }

  return (
    <div>
      <Card className='p-6 rounded-2xl rounded-2xl bg-white relative'>
        <CardBody className='space-y-4'>
          <Button
            aria-label='Xem ý nghĩa chỉ số ngày sinh'
            className='text-xl font-bold text-primary cursor-pointer inline-block p-0 border-3'
            variant='light'
            onPress={onOpen}
          >
            📅 Chỉ số Ngày sinh (NS)
          </Button>

          <p className='text-gray-700'>
            Ngày sinh của bạn: <span className='font-semibold'>{numerology.day}</span>
          </p>

          <p className='text-gray-700'>
            Chỉ số NS sau khi rút gọn:{' '}
            <span className='font-semibold text-primary'>{getBirthDayNumber(numerology.day)}</span>
          </p>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>📅 Chỉ số Ngày sinh (NS)</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700'>
                    Chỉ số ngày sinh là một chỉ số quan trọng hàng đầu trong Thần số học.
                    <br />
                    <br />
                    Nó tiết lộ <span className='font-medium'>tính cách</span>,{' '}
                    <span className='font-medium'>năng lực của bản thân</span> cũng như{' '}
                    <span className='font-medium'>ấn tượng đầu tiên</span> mà bạn tạo ra cho người khác.
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
