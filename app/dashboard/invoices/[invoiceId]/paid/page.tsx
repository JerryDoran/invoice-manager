import SubmitButton from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { markInvoicePaidAction } from '@/actions/mark-paid-action';
import prisma from '@/db';
import { redirect } from 'next/navigation';
import { requireUser } from '@/hooks/require-user';

async function authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect('/dashboard/invoices');
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function PaidInvoicePage({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();

  await authorize(invoiceId, session.user?.id as string);

  return (
    <div className='flex flex-1 items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Mark as paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src='/paid-gif.gif'
            width={400}
            height={400}
            alt='paid'
            className='rounded-lg'
          />
        </CardContent>
        <CardFooter className='flex items-center justify-between'>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href='/dashboard/invoices'
          >
            Cancel
          </Link>
          <form
            action={async () => {
              'use server';
              await markInvoicePaidAction(invoiceId);
            }}
          >
            <SubmitButton title='Mark as paid!' />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
