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

export default function OnboardingPage() {
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle className='text-xl'>You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4'>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label>First Name</Label>
                <Input placeholder='John' />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Last Name</Label>
                <Input placeholder='Doe' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Address</Label>
              <Input placeholder='999 Park Place, New York, NY 12345' />
            </div>
            <SubmitButton title='Complete Onboarding'></SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
