'use client';

import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@nextui-org/react';

import { processNumbers } from '@/util/number.util';
import { useNumerologyStore } from '@/stores/numerology';

export const AttitudeNumber = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function getAttitudeNumber(dayStr: string, monthStr: string): string {
    const digits = (dayStr + monthStr)
      .split('')
      .map(Number)
      .filter((n) => !isNaN(n));

    return processNumbers(digits);
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
            😊 Chỉ số Thái độ (TĐ)
          </Button>

          <p className='text-gray-700'>
            Ngày tháng sinh của bạn: <span className='font-semibold'>{numerology.day}</span>/
            <span className='font-semibold'>{numerology.month}</span>
          </p>

          <p className='text-gray-700'>
            Chỉ số TĐ sau khi rút gọn:{' '}
            <span className='font-semibold text-primary'>{getAttitudeNumber(numerology.day, numerology.month)}</span>
          </p>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>Chỉ số Thái độ (TĐ)</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700'>
                    Chỉ số thái độ cho chúng ta biết thái độ của một người trong công việc, các mối quan hệ và trong
                    cuộc sống nói chung.
                  </p>
                  <br />
                  <p className='text-gray-700'>
                    Nó cho biết xu hướng phản ứng của một người trong những tình huống nhất định.
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
