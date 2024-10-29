import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import localFont from 'next/font/local';
import { Toaster } from '@/components/toaster';
import ReactQueryProvider from './react-query-provider';
import ProgressBarProvider from './progress-bar-provider';
import GlobalStyles from '@/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HorizonVault -  Admin',
  description: 'HorizonVault - Admin',
};

const proximaNova = localFont({
  src: [
    {
      path: '../fonts/Proxima-Nova-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Proxima-Nova-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Proxima-Nova-Bold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={proximaNova.className}>
        <ReactQueryProvider>
          <Toaster />
          <main>
            <ProgressBarProvider>
              <StyledComponentsRegistry>
                <GlobalStyles />
                {children}
              </StyledComponentsRegistry>
            </ProgressBarProvider>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
