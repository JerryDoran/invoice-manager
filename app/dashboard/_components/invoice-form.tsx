'use client';

import SubmitButton from '@/components/submit-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { useActionState, useState } from 'react';

import { createInvoiceAction } from '@/actions/create-invoice-action';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { invoiceSchema } from '@/lib/zod-schemas';
import { formatCurrency } from '@/lib/utils';

type CreateInvoiceFormProps = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};

export function CreateInvoiceForm({
  firstName,
  lastName,
  email,
  address,
}: CreateInvoiceFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('USD');

  const totalAmount = (Number(rate) || 0) * (Number(quantity) || 0);

  // const totalAmount = subTotal + subTotal * 0.15;

  const [lastResult, formAction] = useActionState(
    createInvoiceAction,
    undefined
  );

  const [form, fields] = useForm({
    lastResult, // sync result with the last submission on server with client side state
    onValidate({ formData }) {
      // console.log('Form Data being validated:', Object.fromEntries(formData));
      const result = parseWithZod(formData, {
        schema: invoiceSchema,
      });
      // console.log('Validation result:', result);
      return result;
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={formAction}
        noValidate
      >
        <input
          type='hidden'
          name={fields.date.name}
          value={selectedDate.toISOString()} // converts a date object to a string
        />
        <input type='hidden' name={fields.total.name} value={totalAmount} />
        <CardContent className='p-6'>
          <div className='flex flex-col gap-2 w-fit mb-6'>
            <div className='flex items-center gap-3'>
              <Badge variant='secondary'>Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder='Test 123'
              />
              <p className='text-xs text-red-500'>
                {fields.invoiceName.errors}
              </p>
            </div>
          </div>
          <div className='grid md:grid-cols-3 gap-6 mb-6'>
            <div>
              <Label>Invoice No.</Label>
              <div className='flex'>
                <span className='text-muted-foreground px-3 border border-r-0 rounded-l-md bg-muted flex items-center'>
                  #
                </span>
                <Input
                  className='rounded-l-none'
                  placeholder='1234'
                  type='number'
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className='text-xs text-red-500 mt-2'>
                {fields.invoiceNumber.errors}
              </p>
            </div>
            <div>
              <Label>Currency</Label>
              <Select
                defaultValue='USD'
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select a currency' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='USD'>USD</SelectItem>
                  <SelectItem value='EUR'>EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className='text-xs text-red-500 mt-2'>
              {fields.currency.errors}
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* From Section */}
            <div className=''>
              <Label>From</Label>
              <div className='space-y-2'>
                <Input
                  placeholder='Your Name'
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={firstName + ' ' + lastName}
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.fromName.errors}
                </p>
                <Input
                  placeholder='Your Email'
                  type='email'
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email}
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder='Your Address'
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className='space-y-2'>
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder='Client name'
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder='Client email'
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder='Client address'
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            <div>
              <div>
                <Label>Invoice Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[250px] text-left justify-start'
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'long',
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    fromDate={new Date()}
                    className='bg-muted my-2'
                  />
                </PopoverContent>
              </Popover>
              <p className='text-xs text-red-500 mt-2'>{fields.date.errors}</p>
            </div>
            <div>
              <Label>Due Date</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger className=''>
                  <SelectValue placeholder='Select due date' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>Due on receipt</SelectItem>
                  <SelectItem value='15'>Net 15</SelectItem>
                  <SelectItem value='30'>Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className='text-xs text-red-500 mt-2'>
                {fields.dueDate.errors}
              </p>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-12 gap-4 mb-2 font-medium text-sm'>
              <p className='col-span-6'>Description</p>
              <p className='col-span-2'>Quantity</p>
              <p className='col-span-2'>Rate</p>
              <p className='col-span-2'>Amount</p>
            </div>
            <div className='grid grid-cols-12 gap-4 mb-4'>
              <div className='col-span-6'>
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                  placeholder='Item name & description'
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className='col-span-2'>
                <Input
                  type='number'
                  placeholder='Quantity'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className='col-span-2'>
                <Input
                  type='number'
                  placeholder='Rate'
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                />
                <p className='text-xs text-red-500 mt-2'>
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className='col-span-2'>
                <Input
                  value={formatCurrency({
                    amount: totalAmount,
                    currency: currency as any,
                  })}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='w-1/3'>
              <div className='flex justify-between py-2 text-sm'>
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: totalAmount,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className='flex justify-between py-2 border-t'>
                <span>
                  Total <span className='text-sm'>({currency})</span>
                </span>
                <span className='font-semibold'>
                  {formatCurrency({
                    amount: totalAmount,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label>Note</Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder='Notes'
            />
          </div>
          <div className='flex items-center justify-end mt-6'>
            <SubmitButton title='Send invoice to client' />
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
