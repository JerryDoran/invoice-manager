/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';
import { requireUser } from '@/hooks/require-user';
import { invoiceSchema } from '@/lib/zod-schemas';
import prisma from '@/db';
import { emailClient } from '@/lib/mailtrap';
import { formatCurrency } from '@/lib/utils';

export async function createInvoiceAction(prevState: any, formData: FormData) {
  // console.log('Server Action - Form Data:', Object.fromEntries(formData));
  const session = await requireUser();
  console.log('Server Action - User Session:', session);

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  // console.log('Server Action - Submission Result:', submission);

  // status of submission is either 'success' or 'error'
  if (submission.status !== 'success') {
    console.log('Server Action - Validation Failed:', submission.error);
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      invoiceName: submission.value.invoiceName,
      total: submission.value.total,
      status: submission.value.status,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromAddress: submission.value.fromAddress,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      clientAddress: submission.value.clientAddress,
      currency: submission.value.currency,
      invoiceNumber: submission.value.invoiceNumber,
      note: submission.value.note,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      userId: session.user?.id,
    },
  });

  const sender = {
    email: 'hello@thewebarchitech.com',
    name: 'Jerry Doran',
  };

  emailClient.send({
    from: sender,
    to: [
      {
        email: submission.value.clientEmail,
      },
    ],
    template_uuid: 'ea3d7ec2-34fd-4a95-ae60-8d90edd013f6',
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
        new Date(submission.value.date)
      ),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: 'Test_InvoiceLink',
    },
  });

  // console.log('Server Action - Created Invoice:', data);
  return redirect('/dashboard/invoices');
}
