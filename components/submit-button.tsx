'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function SubmitButton({ title = 'Login' }: { title?: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending} className='w-full'>
          <Loader2 className='size-4 mr-2 animate-spin' /> Submitting...
        </Button>
      ) : (
        <Button type='submit'>{title}</Button>
      )}
    </>
  );
}
