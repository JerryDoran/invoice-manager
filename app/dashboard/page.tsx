/* eslint-disable @typescript-eslint/no-unused-vars */
import { signOut } from '@/auth';
import { requireUser } from '@/hooks/require-user';

export default async function DashboardPage() {
  const session = await requireUser();
  return (
    <main>
      Dashboard Page
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </main>
  );
}
