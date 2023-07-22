import {ReactNode} from 'react';
import Link from 'next/link';
import '@/assets/scss/pages/_auth.scss';
import Logo from '@/components/Logo';


type Props = {
  children: ReactNode;
};

export default async function AuthLayout({
  children,
}: Props) {

  return (
    <main className='main'>
      <section className='auth'>
        <div className='auth__container-fluid'>
          <Link href="/">
            <Logo/>
          </Link>
          {children}
          </div>
      </section>
    </main>
  );
}