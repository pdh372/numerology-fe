import React from 'react';
import { Button } from '@heroui/button';
import { useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@nextui-org/react';
import { Card, CardBody } from '@heroui/card';

import { useNumerologyStore } from '@/stores/numerology';
import { getChartMatrix } from '@/util/string.util';

const matrixMap = [
  [3, 6, 9],
  [2, 5, 8],
  [1, 4, 7],
];

export const NumerologyChart = () => {
  const { numerology } = useNumerologyStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const counts = getChartMatrix(numerology.name);

  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const present = Object.keys(counts).map((k) => Number(k));
  const missingNumbers = allNumbers.filter((n) => !present.includes(n));

  const maxCount = Math.max(...Object.values(counts));
  const innerFeelings = Object.entries(counts)
    .filter(([_, v]) => v === maxCount)
    .map(([k]) => Number(k));

  return (
    <div>
      <Card className='flex justify-center flex-col rounded-2xl shadow-2xl bg-white items-center p-2'>
        <CardBody className='space-y-4'>
          <Button
            className='text-xl font-bold text-primary cursor-pointer inline-block border-3 w-full'
            variant='light'
            onPress={onOpen}
          >
            🧭 Danh Đồ
          </Button>

          <div className='flex justify-center'>
            <div className='grid grid-cols-3 gap-2 w-fit p-4 bg-white shadow  rounded-2xl relative'>
              {matrixMap.flat().map((num) => (
                <div
                  key={num}
                  className='border border-gray-400 w-20 h-20 flex flex-wrap justify-center items-center text-lg font-bold text-blue-700'
                >
                  {Array(counts[num])
                    .fill(num)
                    .map((n, i) => (
                      <span key={i}>{counts[num] >= 1 ? n : '-'}</span>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 text-center space-y-2'>
            <p className='text-sm text-gray-700'>
              <span className='font-semibold'>🔍 Số khuyết:</span>{' '}
              {missingNumbers.length > 0 ? missingNumbers.join(', ') : 'Không có'}
            </p>
            <p className='text-sm text-gray-700'>
              <span className='font-semibold'>💓 Số nội cảm:</span>{' '}
              {innerFeelings.length > 0 ? innerFeelings.join(', ') : 'Không xác định'}
            </p>
          </div>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} radius='none' size='sm' onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>🧭 Danh Đồ</DrawerHeader>
              <DrawerBody>
                <div className='text-sm p-4 rounded-xl border shadow-sm bg-gray-50'>
                  <p className='font-semibold mb-2 text-gray-800'>📖 Ý nghĩa:</p>
                  <p className='text-gray-700 leading-relaxed'>
                    Phân tích danh đồ cho chúng ta thông tin chính về nền tảng tính cách của một người.
                    <br />
                    <br />
                    Khi phân tích danh đồ, chúng ta <span className='font-medium'>xét từng hàng ngang</span> và
                    <span className='font-medium'> chỉ lựa chọn những hàng mà cả 3 ô vuông có chứa các con số</span>.
                    <span className='text-red-600 font-medium'>
                      {' '}
                      Nếu hàng ngang nào khuyết 1, 2, 0 hay khuyết cả 3 ô thì bỏ qua, không xét đến.
                    </span>
                    <br />
                    <br />
                    Như vậy cũng sẽ có trường hợp không có hàng ngang nào đầy đủ, ta cũng bỏ qua, không phân tích, không
                    nhận xét hoặc đánh giá.
                    <br />
                    <br />
                    Nền tảng tính cách theo danh đồ được chia làm ba nhóm:
                    <span className='font-medium'> Lý trí, nền tảng logic</span>;
                    <span className='font-medium'> Tình cảm, cảm xúc</span>;
                    <span className='font-medium'> Sáng tạo, ý tưởng</span>.
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
