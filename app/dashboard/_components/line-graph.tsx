'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type LineGraphProps = {
  data: {
    date: string;
    total: number;
  }[];
};

export function LineGraph({ data }: LineGraphProps) {
  return (
    <ChartContainer
      config={{
        total: {
          label: 'Total',
          color: 'hsl(var(--primary))',
        },
      }}
      className='min-h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <XAxis dataKey='date' />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator='line' />} />
          <Line
            type='monotone'
            dataKey='total'
            stroke='var(--color-total)'
            strokeWidth={2}
          />
          {/* This is the line */}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
