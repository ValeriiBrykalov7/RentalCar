import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/helpers/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Page not found',
  description:
    'The page you are looking for does not exist or has been moved.',
  path: '/not-found',
  imageAlt: 'RentalCar page not found',
});

export default function NotFound() {
  return (
    <main className='min-h-[calc(100vh-68px)]'>
      <section className='flex min-h-[calc(100vh-68px)] items-center py-[84px]'>
        <div className='container'>
          <div className='mx-auto flex max-w-[640px] flex-col items-center rounded-2xl bg-(--white) px-[32px] py-[56px] text-center shadow-[0_18px_50px_rgb(16_24_40_/_10%)]'>
            <p className='mb-[16px] text-[96px] leading-none font-bold tracking-normal text-(--light-blue)'>
              404
            </p>
            <h1 className='mb-[16px] text-[32px] leading-[1.25] font-bold text-(--main)'>
              Page not found
            </h1>
            <p className='mb-[32px] max-w-[460px] text-base leading-[1.5] font-medium text-(--gray)'>
              The page may have been moved, deleted, or the link is no longer
              available.
            </p>
            <div className='flex flex-wrap justify-center gap-[16px]'>
              <Link className='button w-[180px]' href='/catalog'>
                View catalog
              </Link>
              <Link className='button button-outline w-[180px]' href='/'>
                Go home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
