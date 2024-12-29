import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingFormCreation() {
  return (
    <>
      <h1>Loading...</h1>
      <Skeleton className='w-full h-full flex-1' />
    </>
  );
}