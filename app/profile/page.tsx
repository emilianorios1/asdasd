'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useUser} from '@auth0/nextjs-auth0/client';

import {buttonVariants} from '@/components/ui/button';

const Page = () => {
  const {user, error, isLoading} = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log(user);
  if (user && user.picture && user.name && user.email) {
    return (
      <div>
        <Image src={user.picture} alt={user.name} width={100} height={100} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href="/api/auth/logout" className={buttonVariants()}>
          Logout
        </Link>
        <Link href="/" className={buttonVariants()}>
          Home
        </Link>
      </div>
    );
  }
  return <div />; // or any other JSX/element you want to show if the user is not defined
};

export default Page;
