import type { Metadata } from 'next';
import { Geist, Geist_Mono, Sen } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const sen = Sen({
	subsets: ['latin'],
	variable: '--font-sen',
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
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${sen.variable} bg-background text-text antialiased`}>
				{children}

				<Toaster position='bottom-right' />
			</body>
		</html>
	);
}
