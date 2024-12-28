import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { formatCurrency } from '@/lib/utils';
import { Activity, CreditCard, DollarSign, Layers } from 'lucide-react';

async function getStatData(userId: string) {
  const [revenue, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }), // revenue
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PENDING',
      },
      select: {
        id: true,
      },
    }), // total invoices
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: 'PAID',
      },
      select: { id: true },
    }), // paid invoices
  ]);

  return {
    revenue: revenue.reduce((acc, invoice) => acc + invoice.total, 0),
    openInvoices: openInvoices.length,
    paidInvoices: paidInvoices.length,
  };
}

export async function DashboardCards() {
  const session = await requireUser();
  const { revenue, openInvoices, paidInvoices } = await getStatData(
    session.user?.id as string
  );
  return (
    <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-4 md:gap-8'>
      <Card className='dark:bg-gradient-to-br dark:from-gray-700 dark:via-neutral-800 dark:to-gray-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-medium'>Total revenue</CardTitle>
          <DollarSign className='size-5 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <h2 className='text-2xl font-bold'>
            {formatCurrency({ amount: revenue, currency: 'USD' })}
          </h2>
          <p className='text-xs text-muted-foreground mt-2'>
            Base on the last 30 days
          </p>
        </CardContent>
      </Card>
      <Card className='dark:bg-gradient-to-br dark:from-gray-700 dark:via-neutral-800 dark:to-gray-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-medium'>
            Total invoices
          </CardTitle>
          <Layers className='size-5 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <h2 className='text-2xl font-bold'>+{openInvoices + paidInvoices}</h2>
          <p className='text-xs text-muted-foreground mt-2'>
            Total invoices created
          </p>
        </CardContent>
      </Card>
      <Card className='dark:bg-gradient-to-br dark:from-gray-700 dark:via-neutral-800 dark:to-gray-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-medium'>Paid invoices</CardTitle>
          <CreditCard className='size-5 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <h2 className='text-2xl font-bold'>{paidInvoices}</h2>
          <p className='text-xs text-muted-foreground mt-2'>
            Total invoices paid
          </p>
        </CardContent>
      </Card>
      <Card className='dark:bg-gradient-to-br dark:from-gray-700 dark:via-neutral-800 dark:to-gray-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-base font-medium'>
            Pending invoices
          </CardTitle>
          <Activity className='size-5 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <h2 className='text-2xl font-bold'>{openInvoices}</h2>
          <p className='text-xs text-muted-foreground mt-2'>Unpaid invoices</p>
        </CardContent>
      </Card>
    </div>
  );
}
