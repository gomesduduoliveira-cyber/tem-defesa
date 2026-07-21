import './globals.css';
import type { Metadata } from 'next';
import { EB_Garamond, Lato } from 'next/font/google';

// Tipografia "Trust & Authority" para serviços jurídicos: serifada nos títulos + sans no corpo.
const fontSerif = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-serif', display: 'swap' });
const fontSans = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'TEM Defesa — Defesa de Contraordenações Rodoviárias',
  description: 'Conteste a sua coima de trânsito com Inteligência Artificial especializada no Código da Estrada português.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${fontSerif.variable} ${fontSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
