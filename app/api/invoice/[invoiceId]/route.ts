/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/db';
import { NextResponse } from 'next/server';
import jsPDF from 'jspdf';
import { formatCurrency } from '@/lib/utils';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientEmail: true,
      clientAddress: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
      status: true,
    },
  });

  if (!data) {
    return NextResponse.json(
      {
        error: 'Invoice not found',
      },
      { status: 404 }
    );
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [8.5, 11],
  });

  // set font
  pdf.setFont('helvetica');

  // set header
  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 1, 1);

  // from section
  pdf.setFontSize(14);
  pdf.text('From:', 1, 1.5);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 1, 1.7, {
    lineHeightFactor: 1.4,
  });

  // to client section
  pdf.setFontSize(14);
  pdf.text('Bill to:', 1, 2.6);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 1, 2.8, {
    lineHeightFactor: 1.4,
  });

  // invoice details section
  pdf.setFontSize(14);
  pdf.text('Invoice Details', 6, 1.5);
  pdf.setFontSize(10);

  const statusText = data.status === 'PAID' ? 'Paid' : 'Unpaid';
  const startY = 1.7;
  const lineHeight = 0.2;

  // Invoice Number
  pdf.text(`Invoice Number: ${data.invoiceNumber}`, 6, startY);

  // Date
  pdf.text(
    `Date: ${new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(new Date(data.date))}`,
    6,
    startY + lineHeight
  );

  // Status line with bold value
  pdf.text('Status:', 6, startY + lineHeight * 2);
  pdf.setFont('helvetica', 'bold');
  pdf.text(statusText, 6.45, startY + lineHeight * 2);
  pdf.setFont('helvetica', 'normal');

  // Due date
  pdf.text(`Due: Net ${data.dueDate}`, 6, startY + lineHeight * 3);

  // Currency
  pdf.text(`Currency: ${data.currency}`, 6, startY + lineHeight * 4);

  // Item table
  const tableStartY = startY + lineHeight * 12;
  const colWidths = [3.5, 1, 0.85, 0.95];
  const rowHeight = 0.3;
  const textPadding = 0.15;
  const tableStartX = 1;
  const headerColor = '#e6e6e6'; // Darker shade of gray (reduced from 240)

  // Draw table borders
  pdf.setDrawColor(0);
  pdf.setLineWidth(0.01);

  // Header row
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  let currentX = tableStartX;

  // Draw header cells with background
  // First header cell
  pdf.setFillColor(headerColor);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[0], rowHeight, 'F');
  pdf.setDrawColor(0);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[0], rowHeight);
  pdf.text('Description', currentX + textPadding, tableStartY - rowHeight / 3);
  currentX += colWidths[0];

  // Second header cell
  pdf.setFillColor(headerColor);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[1], rowHeight, 'F');
  pdf.setDrawColor(0);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[1], rowHeight);
  pdf.text('Quantity', currentX + textPadding, tableStartY - rowHeight / 3);
  currentX += colWidths[1];

  // Third header cell
  pdf.setFillColor(headerColor);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[2], rowHeight, 'F');
  pdf.setDrawColor(0);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[2], rowHeight);
  pdf.text('Rate', currentX + textPadding, tableStartY - rowHeight / 3);
  currentX += colWidths[2];

  // Fourth header cell
  pdf.setFillColor(headerColor);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[3], rowHeight, 'F');
  pdf.setDrawColor(0);
  pdf.rect(currentX, tableStartY - rowHeight, colWidths[3], rowHeight);
  pdf.text('Amount', currentX + textPadding, tableStartY - rowHeight / 3);

  // Data row
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  currentX = tableStartX;

  // Draw data cells
  pdf.rect(currentX, tableStartY, colWidths[0], rowHeight);
  pdf.text(
    data.invoiceItemDescription,
    currentX + textPadding,
    tableStartY + rowHeight * 0.6
  );
  currentX += colWidths[0];

  pdf.rect(currentX, tableStartY, colWidths[1], rowHeight);
  pdf.text(
    data.invoiceItemQuantity.toString(),
    currentX + textPadding,
    tableStartY + rowHeight * 0.6
  );
  currentX += colWidths[1];

  pdf.rect(currentX, tableStartY, colWidths[2], rowHeight);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    currentX + textPadding,
    tableStartY + rowHeight * 0.6
  );
  currentX += colWidths[2];

  pdf.rect(currentX, tableStartY, colWidths[3], rowHeight);
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any,
    }),
    currentX + textPadding,
    tableStartY + rowHeight * 0.6
  );

  // Total amount
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`SubTotal (${data.currency}):`, 5, startY + lineHeight * 15);
  pdf.text(
    `${formatCurrency({
      amount: data.total,
      currency: data.currency as any,
    })}`,
    6.5,
    startY + lineHeight * 15
  );

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total (${data.currency}):`, 5.21, startY + lineHeight * 17);
  pdf.text(
    `${formatCurrency({
      amount: data.total * 1.15,
      currency: data.currency as any,
    })}`,
    6.5,
    startY + lineHeight * 17
  );

  // sales tax note
  pdf.setFontSize(8);
  pdf.text('Invoice amount includes 15% sales tax', 5.2, 3.72);

  // generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

  // return pdf as response
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    },
  });

  // return new NextResponse(JSON.stringify(data), {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
}
