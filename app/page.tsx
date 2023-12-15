import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import {buttonVariants} from '@/components/ui/button';
import { getSession } from '@auth0/nextjs-auth0';


const IndexPage = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Marketplace TP
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Alumnos:
          <br />
          Benjamin Jaime (Legajo: 45861)
          <br />
          Altuzarra Tomas (Legajo: 45840)
          <br />
          Mateo Emilio (Legajo: 46792)
          <br />
          Emiliano Rios (Legajo: 46408)
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="https://github.com/emilianorios1/dsw-front"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Repositorio Front
        </Link>

        <Link
          href="https://github.com/emilianorios1/dsw-back"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Repositorio Back
        </Link>

        <Link
          href="/api/auth/login"
          className={buttonVariants()}
        >
          Login
        </Link>

        <Link
          href="/profile"
          className={buttonVariants()}
        >
          Mi perfil
        </Link>
      </div>
    </section>
  );
};

export default IndexPage;
