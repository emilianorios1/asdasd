import '@/styles/globals.css';

import {Metadata} from 'next';

import {siteConfig} from '@/config/site';
import {fontSans} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import {Toaster} from '@/components/ui/toaster';
import {SiteHeader} from '@/components/site-header';
import {TailwindIndicator} from '@/components/tailwind-indicator';
import {ThemeProvider} from '@/components/theme-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({children}: RootLayoutProps) => {
  return (
    <html lang="en">
      <head />
      <UserProvider>
        
      <body
        className={cn(
          'min-h-screen overflow-hidden bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}
          <TailwindIndicator />
        </ThemeProvider>
        <Toaster />
      </body>
      
      </UserProvider>
    </html>
  );
};

export default RootLayout;
