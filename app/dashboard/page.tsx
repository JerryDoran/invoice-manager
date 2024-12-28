/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOut } from '@/auth';
import { DashboardCards } from '@/components/dashboard-cards';
import { requireUser } from '@/hooks/require-user';
import { InvoiceChart } from './_components/invoice-chart';
import { RecentInvoices } from './_components/recent-invoices';
import prisma from '@/db';
import { EmptyState } from '@/components/empty-state';

async function getInvoiceData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const invoices = await getInvoiceData(session.user?.id as string);
  return (
    <>
      {invoices.length < 1 ? (
        <EmptyState
          title='No invoices found'
          description='Create an invoice to get started'
          buttonText='Create invoice'
          href='/dashboard/invoices/new'
        />
      ) : (
        <>
          <DashboardCards />
          <div className='grid gap-4 grid-cols-1 xl:grid-cols-3 md:gap-8 '>
            <InvoiceChart />
            <RecentInvoices />
          </div>
        </>
      )}
    </>
  );
}
