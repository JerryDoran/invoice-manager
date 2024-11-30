import { auth, signIn } from '@/auth';
import SubmitButton from '@/components/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <>
      <div className='flex h-screen w-full items-center justify-center px-4'>
        <Card className='max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription className='text-sm'>
              Enter your email below to log into your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                'use server';
                await signIn('nodemailer', formData);
              }}
              className='flex flex-col gap-y-4'
            >
              <div className='flex flex-col gap-y-2'>
                <Label>Email</Label>
                <Input
                  placeholder='email@email.com'
                  name='email'
                  type='email'
                  required
                />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
