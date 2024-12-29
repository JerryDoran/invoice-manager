import Link from 'next/link';
import { RainbowButton } from './ui/rainbow-button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className='relative flex flex-col items-center justify-center py-12 lg:py-20'>
      <div className='text-center'>
        <span className='text-sm text-primary font-medium tracking-wide bg-primary/20 py-2 px-4 rounded-full'>
          Introducing IvoiceMaestro
        </span>
        <h1 className='mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900  dark:text-gray-400 '>
          Invoicing made{' '}
          <span className='bg-gradient-to-br from-blue-400 via-indigo-500 to-indigo-900 dark:from-blue-200 dark:via-indigo-300 dark:to-indigo-500 text-transparent bg-clip-text block'>
            super easy!
          </span>
        </h1>
        <p className='mt-4 md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto'>
          Creating invoices can be a daunting task, but with InvoiceMaestro,
          it&apos;s a breeze. Whether you&apos;re a small business or a large
          corporation, InvoiceMaestro has got you covered.
        </p>
        <div className='mt-8 mb-12'>
          <Link href='/login'>
            <RainbowButton>Get unlimited access</RainbowButton>
          </Link>
        </div>
      </div>
      <div className='relative items-center w-full mx-auto mt-12'>
        <Image
          src='/hero.png'
          alt='Hero'
          width={800}
          height={800}
          className='w-full rounded-lg shadow-2xl border border-gray-800 shadow-slate-500'
        />
      </div>
    </section>
  );
}
