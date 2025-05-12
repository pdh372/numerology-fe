'use client';

export const LifeStages = () => {
  return (
    <div className='flex justify-center p-6 bg-white rounded-2xl shadow-2xl'>
      <svg className='text-sm' height='340' viewBox='0 0 320 340' width='320'>
        {/* Tam giác lớn ngoài cùng */}
        <polygon fill='none' points='160,20 20,300 300,300' stroke='black' strokeWidth='2' />

        {/* Tam giác giữa */}
        <polygon fill='none' points='160,90 80,230 240,230' stroke='black' strokeWidth='2' />

        {/* Tam giác ngược nhỏ trong cùng */}
        <polygon fill='none' points='110,230 210,230 160,160' stroke='black' strokeWidth='2' />

        {/* Đường nét đứt */}
        <line stroke='gray' strokeDasharray='5,5' strokeWidth='2' x1='160' x2='160' y1='20' y2='60' />
        <line stroke='gray' strokeDasharray='5,5' strokeWidth='2' x1='160' x2='110' y1='90' y2='230' />
        <line stroke='gray' strokeDasharray='5,5' strokeWidth='2' x1='160' x2='210' y1='90' y2='230' />

        {/* Dấu tròn đỏ các đỉnh có label */}
        <circle cx='160' cy='20' fill='red' r='8' />
        <circle cx='160' cy='90' fill='red' r='8' />
        <circle cx='110' cy='230' fill='red' r='8' />
        <circle cx='210' cy='230' fill='red' r='8' />

        {/* Dấu tròn xám ở đáy */}
        <circle cx='80' cy='300' fill='#666' r='6' />
        <circle cx='160' cy='300' fill='#666' r='6' />
        <circle cx='240' cy='300' fill='#666' r='6' />

        {/* Text labels tuổi + năm */}
        <text fill='red' fontSize='12' x='165' y='15'>
          60 tuổi -{' '}
        </text>
        <text fill='blue' fontSize='12' x='165' y='30'>
          (2060)
        </text>

        <text fill='red' fontSize='12' x='60' y='160'>
          33 tuổi -{' '}
        </text>
        <text fill='blue' fontSize='12' x='60' y='175'>
          (2033)
        </text>

        <text fill='red' fontSize='12' textAnchor='end' x='235' y='160'>
          42 tuổi -{' '}
        </text>
        <text fill='blue' fontSize='12' textAnchor='end' x='235' y='175'>
          (2042)
        </text>

        <text fill='red' fontSize='12' x='130' y='105'>
          51 tuổi -{' '}
        </text>
        <text fill='blue' fontSize='12' x='130' y='120'>
          (2051)
        </text>
      </svg>
    </div>
  );
};
