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

export async function editInvoiceAction(prevState: any, formData: FormData) {
  // console.log('Server Action - Form Data:', Object.fromEntries(formData));

  // Makes sure only authenticated users can edit an invoice
  const session = await requireUser();
  // console.log('Server Action - User Session:', session);

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  // console.log('Server Action - Submission Result:', submission);

  // status of submission is either 'success' or 'error'
  if (submission.status !== 'success') {
    console.log('Server Action - Validation Failed:', submission.error);
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get('id') as string,
      userId: session.user?.id,
    },
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
    template_uuid: '249a9270-e652-475c-a6b0-30c669c8c727',
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
      invoiceLink:
        process.env.NODE_ENV !== 'production'
          ? `http://localhost:3000/api/invoice/${data.id}`
          : `https://invoicemanagerpro.vercel.app/api/invoice/${data.id}`,
    },
  });

  // console.log('Server Action - Created Invoice:', data);
  return redirect('/dashboard/invoices');
}
