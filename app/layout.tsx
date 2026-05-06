import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TEM Defesa — Defesa de Contraordenações Rodoviárias',
  description: 'Conteste a sua coima de trânsito com Inteligência Artificial especializada no Código da Estrada português.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
