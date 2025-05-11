import { AttitudeIndex, DateOfBirthIndex, LifePathIndex } from '@/components/formula';

const Analysis = () => {
  return (
    <div className='flex flex-col gap-3'>
      <DateOfBirthIndex />

      <AttitudeIndex />

      <LifePathIndex />
    </div>
  );
};

export default Analysis;
