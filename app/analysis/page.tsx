'use client';

import { Button } from '@heroui/button';
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { AttitudeNumber, DateOfBirthNumber, LifePathNumber } from '@/components/formula';
import { SoulUrgeNumber } from '@/components/formula/soul-urge-number';

const Analysis = () => {
  const router = useRouter();

  return (
    <div>
      <Button className='w-full' size='lg' onPress={() => router.push('/')}>
        Quay Lại Trang Trước
      </Button>

      <Divider className='my-1' />

      <div className='flex flex-col gap-3'>
        <DateOfBirthNumber />

        <AttitudeNumber />

        <LifePathNumber />

        <SoulUrgeNumber />
      </div>
    </div>
  );
};

export default Analysis;
