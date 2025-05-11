// app/numerology/layout.tsx

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='relative min-h-screen w-full bg-gradient-to-br from-white to-purple-100'>
      <div className="absolute inset-0 bg-[url('/background-noise.svg')] opacity-5 pointer-events-none" />

      <div className='w-full max-w-4xl mx-auto px-2 sm:px-3 py-12 relative z-10'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold text-primary mb-2'>📊 Kết quả Thần số học</h2>
          <p className='text-sm text-gray-500'>Những chỉ số được phân tích dựa trên ngày sinh và họ tên của bạn</p>
        </div>

        <div className='bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-2 border border-gray-200'>{children}</div>
      </div>
    </section>
  );
}
