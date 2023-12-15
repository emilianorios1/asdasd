'use client';

import { buttonVariants } from '@/components/ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link  from 'next/link';
import Image from 'next/image';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
    console.log(user);
  if (user && user.picture && user.name && user.email) {
    return (
      <div>
        <Image src={user.picture} alt={user.name} width={100} height={100} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <Link
          href="/api/auth/logout"
          className={buttonVariants()}
        >
          Logout
        </Link>

        <Link
          href="/"
          className={buttonVariants()}
        >
          Home
        </Link>


      </div>
    );
  }

  return null; // o algún otro JSX/elemento que desees mostrar si el usuario no está definido
}
