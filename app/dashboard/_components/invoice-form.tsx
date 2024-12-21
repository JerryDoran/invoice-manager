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
import { useState } from 'react';

export function CreateInvoiceForm() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardContent className='p-6'>
        <div className='flex flex-col gap-2 w-fit mb-6'>
          <div className='flex items-center gap-3'>
            <Badge variant='secondary'>Draft</Badge>
            <Input placeholder='Test 123' />
          </div>
        </div>
        <div className='grid md:grid-cols-3 gap-6 mb-6'>
          <div>
            <Label>Invoice No.</Label>
            <div className='flex'>
              <span className='text-muted-foreground px-3 border border-r-0 rounded-l-md bg-muted flex items-center'>
                #
              </span>
              <Input className='rounded-l-none' placeholder='1234' />
            </div>
          </div>
          <div>
            <Label>Currency</Label>
            <Select defaultValue='USD'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a currency' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='USD'>USD</SelectItem>
                <SelectItem value='EUR'>EUR</SelectItem>
                <SelectItem value='GBP'>GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-6 mb-6'>
          <div className=''>
            <Label>From</Label>
            <div className='space-y-2'>
              <Input placeholder='Name' />
              <Input placeholder='Email' />
              <Input placeholder='Address' />
            </div>
          </div>
          <div>
            <Label>To</Label>
            <div className='space-y-2'>
              <Input placeholder='Client name' />
              <Input placeholder='Client email' />
              <Input placeholder='Client address' />
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
          </div>
          <div>
            <Label>Due Date</Label>
            <Select>
              <SelectTrigger className=''>
                <SelectValue placeholder='Select due date' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='0'>Due on receipt</SelectItem>
                <SelectItem value='15'>Net 15</SelectItem>
                <SelectItem value='30'>Net 30</SelectItem>
              </SelectContent>
            </Select>
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
              <Textarea placeholder='Item name & description' />
            </div>
            <div className='col-span-2'>
              <Input placeholder='0' type='number' />
            </div>
            <div className='col-span-2'>
              <Input placeholder='0' type='number' />
            </div>
            <div className='col-span-2'>
              <Input placeholder='0' type='number' disabled />
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <div className='w-1/3'>
            <div className='flex justify-between py-2 text-sm'>
              <span>Subtotal</span>
              <span>$5.00</span>
            </div>
            <div className='flex justify-between py-2 border-t'>
              <span>
                Total <span className='text-sm'>(USD)</span>
              </span>
              <span className='font-semibold'>$5.00</span>
            </div>
          </div>
        </div>
        <div>
          <Label>Note</Label>
          <Textarea placeholder='Notes' />
        </div>
        <div className='flex items-center justify-end mt-6'>
          <SubmitButton title='Send invoice to client' />
        </div>
      </CardContent>
    </Card>
  );
}
