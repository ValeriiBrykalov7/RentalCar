import Link from 'next/link';

export default function Hero() {
  return (
    <section className="h-[700px] bg-[url('/images/hero-banner.jpg')] bg-center bg-no-repeat">
      <div className='mx-auto flex h-full max-w-[1440px] flex-col items-center px-0 pt-[436px] pb-[60px]'>
        <h1 className='mb-[16px] text-center text-[60px] leading-[1.2] font-bold text-(--white)'>
          Find your perfect rental car
        </h1>
        <p className='mb-[40px] text-center text-2xl leading-[1.33333] font-semibold text-(--white)'>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className='button w-[276px]' href='/catalog'>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
