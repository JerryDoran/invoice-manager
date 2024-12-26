/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/db';
import { requireUser } from '@/hooks/require-user';
import { emailClient } from '@/lib/mailtrap';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json(
        { message: 'Invoice not found' },
        { status: 404 }
      );
    }

    const sender = {
      email: 'hello@thewebarchitech.com',
      name: 'Jerry Doran',
    };

    emailClient.send({
      from: sender,
      to: [
        {
          email: invoiceData.clientEmail,
        },
      ],
      template_uuid: '3bf49b43-084e-44b3-9ebc-e03fac582eea',
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: 'The Web Architech',
        company_info_address: '2667 Spring Meadow Circle',
        company_info_city: 'Youngstown',
        company_info_zip_code: '44515',
        company_info_country: 'United States',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
