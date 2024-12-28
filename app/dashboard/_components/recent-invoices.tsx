import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { formatCurrency } from '@/lib/utils';

async function getRecentInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7, // Limit to 7 invoices
  });

  return data;
}

export async function RecentInvoices() {
  const session = await requireUser();
  const recentInvoices = await getRecentInvoices(session.user?.id as string);

  return (
    <Card className='dark:bg-gradient-to-br dark:from-gray-800 dark:via-neutral-900 dark:to-gray-900'>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-8'>
        {recentInvoices?.map((invoice) => (
          <div key={invoice.id} className='flex items-center gap-4'>
            <Avatar className='hidden sm:flex size-10'>
              <AvatarFallback>
                {invoice.clientName.split(' ')[0].slice(0, 1).toUpperCase()}
                {invoice.clientName.split(' ')[1].slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-1'>
              <p className='font-medium text-sm leading-none'>
                {invoice.clientName}
              </p>
              <p className='font-medium text-xs text-muted-foreground'>
                {invoice.clientEmail}
              </p>
            </div>
            <div className='ml-auto text-sm font-semibold'>
              +{formatCurrency({ amount: invoice.total, currency: 'USD' })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
