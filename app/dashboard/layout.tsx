/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from 'next/navigation';
import { requireUser } from '@/hooks/require-user';
import Link from 'next/link';
import logo2 from '@/public/logo.svg';
import Image from 'next/image';
import DashboardLinks from './_components/dashboard-links';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/sonner';
import { ModeToggle } from '@/components/mode-toggle';
import { signOut } from '@/auth';
import prisma from '@/db';

// Need to check that the user actually finished the onboarding process
async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (!data?.firstName || !data?.lastName || !data?.address) {
    redirect('/onboarding');
  }
  return data;
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireUser();

  const data = await getUser(session.user?.id as string);

  return (
    <>
      <div className='grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-muted/40 md:block'>
          <div className='flex flex-col max-h-screen w-full gap-2'>
            <div className='h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6'>
              <Link href='/' className='flex items-center gap-2'>
                <Image src={logo2} alt='logo' className='size-7' />
                <p className='lg:text-xl text-lg font-bold bg-gradient-to-br from-blue-400 via-indigo-500 to-indigo-900 dark:from-blue-200 dark:via-indigo-300 dark:to-indigo-500 text-transparent bg-clip-text'>
                  Invoice
                  <span className=''>Maestro</span>
                </p>
              </Link>
            </div>
            <div className='flex-1'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='md:hidden'>
                  <Menu className='size-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetTitle>Invoice Maestro</SheetTitle>
                <nav className='grid gap-2 mt-10'>
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className='flex items-center gap-4 ml-auto'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className='rounded-full'
                    variant='outline'
                    size='icon'
                  >
                    <User2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard'>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/invoices'>Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className='w-full'
                      action={async () => {
                        'use server';
                        await signOut();
                      }}
                    >
                      <button className='w-full text-left'>Logout</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle />
            </div>
          </header>
          <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 '>
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton theme='light' />
    </>
  );
}
