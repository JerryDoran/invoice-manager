import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'></div>
      <Navbar />
      <Hero />
    </main>
  );
}
