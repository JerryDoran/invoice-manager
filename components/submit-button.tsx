'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type SubmitButtonProps = {
  title?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
};
export default function SubmitButton({
  title = 'Login',
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending} variant={variant}>
          <Loader2 className='size-4 mr-2 animate-spin' /> Submitting...
        </Button>
      ) : (
        <Button type='submit' variant={variant}>
          {title}
        </Button>
      )}
    </>
  );
}
