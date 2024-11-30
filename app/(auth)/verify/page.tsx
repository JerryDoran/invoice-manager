import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <Card className='w-[380px] px-5'>
        <CardHeader className='text-center'>
          <div className='mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-indigo-200'>
            <Mail className='size-12 text-indigo-500' />
          </div>
          <CardTitle className='text-2xl font-semibold'>
            Check your email
          </CardTitle>
          <CardDescription>
            We have sent a verification link to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mt-4 rounded-md bg-yellow-100 border-yellow-300 p-4'>
            <div className='flex items-center gap-x-2'>
              <AlertCircle className='size-5 text-yellow-600' />
              <p className='text-yellow-600 text-sm'>
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href='/'
            className={buttonVariants({
              className: 'w-full',
              variant: 'outline',
            })}
          >
            <ArrowLeft className='size-4' /> Back to home page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
