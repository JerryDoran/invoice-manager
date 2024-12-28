import { Ban, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center rounded-md border-dashed border-2 p-8 text-center animate-in fade-in'>
      <div className='flex items-center justify-center size-20 rounded-full bg-primary/20 p-4'>
        <Ban className='size-10 text-muted-foreground' />
      </div>
      <h2 className='text-xl font-semibold mt-6'>{title}</h2>
      <p className='text-sm text-muted-foreground mt-2 mb-8'>{description}</p>
      <Link href={href} className={buttonVariants({ variant: 'secondary' })}>
        <PlusCircle className='size-5' />
        {buttonText}
      </Link>
    </div>
  );
}
