/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceActions } from '@/app/dashboard/_components/invoice-actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { formatCurrency } from '@/lib/utils';
import { Badge } from './ui/badge';
import { EmptyState } from './empty-state';

async function getInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}
export async function InvoiceList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const session = await requireUser();
  const invoices = await getInvoices(session.user?.id as string);
  return (
    <>
      {invoices.length === 0 ? (
        <EmptyState
          title='No invoices found'
          description='Create an invoice to get started'
          buttonText='Create invoice'
          href='/dashboard/invoices/new'
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>
                  {formatCurrency({
                    amount: invoice.total,
                    currency: invoice.currency as any,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      invoice.status === 'PAID' ? 'bg-green-600' : 'bg-blue-500'
                    } px-2 py-1 rounded-lg text-xs font-semibold text-white`}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                  }).format(invoice.createdAt)}
                </TableCell>
                <TableCell className='text-right'>
                  <InvoiceActions status={invoice.status} id={invoice.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
