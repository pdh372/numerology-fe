'use client';

import { useState, ChangeEventHandler } from 'react';
import { Input, Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { useNumerologyStore } from '@/stores/numerology';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [error, setError] = useState<string>('');
  const { setDay, setMonth, setYear, setName, numerology } = useNumerologyStore();
  const router = useRouter();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handleChangeYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    const year = e.target.value;

    setMonth('');
    setDay('');

    if (+year <= 0) {
      return setYear('');
    }

    if (+year > currentYear) {
      return setYear(currentYear.toString());
    }

    setYear(year);
  };

  const handleChangeMonth: ChangeEventHandler<HTMLInputElement> = (e) => {
    const month = e.target.value;

    setMonth(month);

    if (+month >= 12) setMonth('12');
    if (+month <= 0) setMonth('');

    setDay('');
  };

  const handleChangeDay: ChangeEventHandler<HTMLInputElement> = (e) => {
    const day = e.target.value;
    const maxDayInMonth = getDaysInMonth(+numerology.month, +numerology.year);

    setDay(day);

    if (+day >= maxDayInMonth) setDay(maxDayInMonth + '');
    if (+day <= 1) setDay('');
  };

  const validateDate = () => {
    const { day, month, year } = numerology;

    if (!day || !month || !year) {
      setError('Vui lòng điền đầy đủ ngày, tháng và năm');

      return false;
    }

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (monthNum < 1 || monthNum > 12) {
      setError('Tháng không hợp lệ. Vui lòng nhập từ 1 đến 12.');

      return false;
    }

    const daysInMonth = getDaysInMonth(monthNum, yearNum);

    if (dayNum < 1 || dayNum > daysInMonth) {
      setError(`Ngày không hợp lệ. Tháng ${monthNum} chỉ có ${daysInMonth} ngày.`);

      return false;
    }

    if (yearNum <= 0 || yearNum > currentYear) {
      setError('Năm không hợp lệ. Vui lòng nhập năm hợp lệ.');

      return false;
    }

    setError('');

    return true;
  };

  const handleDateChange = () => {
    if (validateDate()) {
      router.push('/analysis');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-white to-purple-100 flex items-center justify-center px-4'>
      <Card className='w-full max-w-sm shadow-md'>
        <CardHeader className='text-lg font-bold text-center text-pink-500'>Thần Số Học</CardHeader>
        <CardBody className='space-y-4'>
          <div className='space-y-2'>
            <Input
              label='Tên'
              placeholder='Nhập tên ví dụ: Phạm Thị Thu Hà'
              size='sm'
              type='text'
              value={numerology.name}
              variant='bordered'
              onChange={(e) => setName(e.target.value)}
            />

            {/* Năm nhập */}
            <Input
              label='Năm'
              placeholder='Nhập năm'
              size='sm'
              type='number'
              value={numerology.year}
              variant='bordered'
              onChange={handleChangeYear}
            />

            {/* Tháng chọn với NextUI Select */}
            <Input
              label='Tháng'
              placeholder='Nhập tháng'
              size='sm'
              type='number'
              value={numerology.month}
              variant='bordered'
              onChange={handleChangeMonth}
            />

            {/* Ngày chọn với NextUI Select */}
            <Input
              label='Ngày'
              placeholder='Nhập ngày'
              size='sm'
              type='number'
              value={numerology.day}
              variant='bordered'
              onChange={handleChangeDay}
            />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}

          <Button
            fullWidth
            color='primary'
            isDisabled={Object.values(numerology).some((value) => !value)}
            size='sm'
            onPress={handleDateChange}
          >
            Xem kết quả
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
