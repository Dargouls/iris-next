import Header from '@/components/layout/header/header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Sen } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const sen = Sen({
	subsets: ['latin'],
	variable: '--font-sen',
});
const ag = Inter({
	subsets: ['latin'],
	variable: '--font-agbalumo',
});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Irisy AI',
	description: 'Análise de pupila ocular com IA',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${sen.variable} font-sen bg-background text-text antialiased`}>
				<Header />
				{children}

				<Toaster position='bottom-right' />
			</body>
		</html>
	);
}
