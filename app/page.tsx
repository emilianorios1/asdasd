import Link from 'next/link';

import {siteConfig} from '@/config/site';
import {buttonVariants} from '@/components/ui/button';

const IndexPage = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Marketplace TP 
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Alumnos:<br/>
           Benjamin Jaime<br/>
           Altuzarra Tomas<br/>
           Mateo Emilio<br/> 
           Emiliano Rios
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
        
      </div>
    </section>
  );
};

export default IndexPage;
