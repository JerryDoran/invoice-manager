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

type InvoiceActionsProps = {
  id: string;
};

export function InvoiceActions({ id }: InvoiceActionsProps) {
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
            href={'/dashboard/invoices/delete'}
            className='text-muted-foreground'
          >
            <DownloadCloudIcon className='size-4' />
            Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={'/dashboard/invoices/delete'}
            className='text-muted-foreground'
          >
            <Mail className='size-4' />
            Reminder Email
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={'/dashboard/invoices/delete'}
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
