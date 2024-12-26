'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CheckCircle,
  DownloadCloudIcon,
  Edit,
  Mail,
  MoreHorizontal,
  Trash,
} from 'lucide-react';
import { toast } from 'sonner';

type InvoiceActionsProps = {
  id: string;
};

export function InvoiceActions({ id }: InvoiceActionsProps) {
  function handleSendReminder() {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Sending reminder email...',
        success: 'Reminder email sent successfully',
        error: 'Error sending reminder email',
      }
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon'>
          <MoreHorizontal className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/edit/${id}`}
            className='text-muted-foreground'
          >
            <Edit className='size-4' />
            Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/api/invoice/${id}`}
            target='_blank'
            className='text-muted-foreground'
          >
            <DownloadCloudIcon className='size-4' />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className='size-4' />
          Reminder Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/delete/${id}`}
            className='text-muted-foreground'
          >
            <Trash className='size-4' />
            Delete Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={'/dashboard/invoices/delete'}
            className='text-muted-foreground'
          >
            <CheckCircle className='size-4' />
            Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
