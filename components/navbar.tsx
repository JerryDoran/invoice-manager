import Image from 'next/image';
import Link from 'next/link';
import { RainbowButton } from './ui/rainbow-button';

export function Navbar() {
  return (
    <div className='flex justify-between items-center py-4'>
      <Link href='/' className='flex items-center space-x-2'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={40}
          height={40}
          className='md:size-10 size-7'
        />
        <p className='md:text-3xl text-xl font-bold bg-gradient-to-br from-blue-400 via-indigo-500 to-indigo-900 dark:from-blue-200 dark:via-indigo-300 dark:to-indigo-500 text-transparent bg-clip-text '>
          Invoice
          <span className=''>Maestro</span>
        </p>
      </Link>
      {/* <Link
        className='bg-gradient-to-br from-blue-400 via-indigo-500 to-indigo-700  text-white px-4 py-2 rounded-md hover:bg-gradient-to-br hover:from-blue-500 hover:via-indigo-600 hover:to-indigo-700 transition duration-300'
        href='/login'
      >
        Get Started
      </Link> */}
      <Link href='/login'>
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
