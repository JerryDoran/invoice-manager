'use client';

import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { onboardUserAction } from '@/actions/onboard-user-action';
import { onboardingSchema } from '@/lib/zod-schemas';

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
import { useActionState } from 'react';

export default function OnboardingPage() {
  // Get the data from the action into my form
  const [lastResult, formAction] = useActionState(onboardUserAction, undefined);

  const [form, fields] = useForm({
    // sync result with the last submission with client side state
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'></div>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle className='text-xl'>You are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className='grid gap-4'
            action={formAction}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label>First Name</Label>
                <Input
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                  placeholder='John'
                />
                <p className='text-xs text-red-500'>
                  {fields.firstName.errors}
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Last Name</Label>
                <Input
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue}
                  placeholder='Doe'
                />
                <p className='text-xs text-red-500'>{fields.lastName.errors}</p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Address</Label>
              <Input
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
                placeholder='999 Park Place, New York, NY 12345'
              />
              <p className='text-xs text-red-500'>{fields.address.errors}</p>
            </div>
            <SubmitButton title='Complete Onboarding'></SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
