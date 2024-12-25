import { requireUser } from '@/hooks/require-user';
import { CreateInvoiceForm } from '../../_components/invoice-form';
import prisma from '@/db';

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  return data;
}

export default async function NewInvoicePage() {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <CreateInvoiceForm
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  );
}
