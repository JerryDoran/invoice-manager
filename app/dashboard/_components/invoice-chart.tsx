import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { LineGraph } from './line-graph';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: 'PAID',
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Group and aggregate the data by data

  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    },
    {}
  );

  const transformedData = Object.keys(aggregatedData).map((key) => ({
    date: key,
    total: aggregatedData[key],
  }));

  return transformedData;
}

export async function InvoiceChart() {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);

  return (
    <Card className='xl:col-span-2 dark:bg-gradient-to-br dark:from-gray-800 dark:via-neutral-900 dark:to-gray-900 overflow-auto'>
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>Based on the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <LineGraph data={data} />
      </CardContent>
    </Card>
  );
}
