/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { redirect } from 'next/navigation';
import { requireUser } from '@/hooks/require-user';
import prisma from '@/db';

export async function markInvoicePaidAction(invoiceId: string) {
  // console.log('Server Action - Form Data:', Object.fromEntries(formData));

  // Makes sure only authenticated users can edit an invoice
  const session = await requireUser();

  const data = await prisma.invoice.update({
    where: {
      id: invoiceId,
      userId: session.user?.id,
    },
    data: {
      status: 'PAID',
    },
  });

  // console.log('Server Action - Created Invoice:', data);
  return redirect('/dashboard/invoices');
}
