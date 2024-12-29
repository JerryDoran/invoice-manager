import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { redirect } from 'next/navigation';

export async function deleteInvoiceAction(invoiceId: string) {
  const session = await requireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect('/dashboard/invoices');
}
