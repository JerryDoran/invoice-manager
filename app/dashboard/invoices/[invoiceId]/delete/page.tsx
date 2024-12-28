import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import WarningGif from '@/public/warning-gif.gif';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import SubmitButton from '@/components/submit-button';
import { deleteInvoiceAction } from '@/actions/delete-invoice-action';

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

export default async function DeleteInvoicePage({
  params,
}: {
  params: Params;
}) {
  const session = await requireUser();
  const { invoiceId } = await params;
  await authorize(invoiceId, session.user?.id as string);
  return (
    <div className='flex flex-1 justify-center items-center'>
      <Card className='max-w-[500px]'>
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure that you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={WarningGif} alt='Warning Gif' className='rounded-lg' />
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
              await deleteInvoiceAction(invoiceId);
            }}
          >
            <SubmitButton title='Delete invoice' variant='destructive' />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
