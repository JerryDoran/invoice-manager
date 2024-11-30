'use client';

import { cn } from '@/lib/utils';
import { HomeIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const dashboardLinks = [
  {
    id: 0,
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 1,
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: Users,
  },
];

export default function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            pathname === link.href
              ? 'text-foreground bg-gray-200 dark:text-foreground dark:bg-gray-800'
              : 'text-muted-foreground hover:text-foreground duration-300',
            'flex items-center gap-2 rounded-lg px-3 py-2 transition-all text-base'
          )}
        >
          <link.icon className='size-5' />
          {link.name}
        </Link>
      ))}
    </>
  );
}
