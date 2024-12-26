import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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

type Params = Promise<{ invoiceId: string; userId: string }>;

export default async function DeleteInvoicePage({ params }: Params) {
  const session = await requireUser();
  const userId = session.user?.id as string;

  const { invoiceId } = await params;

  await authorize(invoiceId, userId);

  return (
    <div className='flex flex-1 items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src='/warning-gif.gif'
            width={200}
            height={200}
            alt='delete'
            className='rounded-lg'
          />
        </CardContent>
        <CardFooter>
          <Link
            href={'/dashboard/invoices'}
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
