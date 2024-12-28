import { Suspense } from 'react';
import Link from 'next/link';
import { PlusCircleIcon } from 'lucide-react';

import { InvoiceList } from '@/components/invoice-list';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'Invoices',
};

export default function InvoicesPage() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className=''>
            <CardTitle className='text-2xl font-bold'>Invoices</CardTitle>
            <CardDescription>View and manage your invoices</CardDescription>
          </div>
          <Link
            href='/dashboard/invoices/new'
            className={buttonVariants({ variant: 'outline' })}
          >
            <PlusCircleIcon className='size-5' />
            Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className='w-full h-[500px]' />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
