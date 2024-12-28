import { EditInvoice } from '@/app/dashboard/_components/edit-invoice';
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { notFound } from 'next/navigation';

async function getInvoice(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoicePage({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getInvoice(invoiceId, session.user?.id as string);

  return <EditInvoice invoice={data} />;
}
