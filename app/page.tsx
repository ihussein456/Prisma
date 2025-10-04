import prisma from '@/lib/prisma'
import Link from 'next/link';


export default async function Home() {
  const users = await prisma.user.findMany()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
       {users.map(user => 
        <li key={user.id}>
          {user.name}
        </li>
       )}
      </ol>
      <Link href="/posts" className='text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors'>View Posts</Link>
    </div>
  );
}