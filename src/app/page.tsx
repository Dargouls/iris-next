'use client';

import { useState } from 'react';

import logo from '@/assets/brand/logo.svg';

import { UploadImages } from '@/components/uploadImages/uploadImages';
import Image from 'next/image';

export default function Home() {
	const [openPage, setOpenPage] = useState(true);

	const handleTogglePage = () => setOpenPage(!openPage);

	return (
		<>
			<div className='flex min-h-screen flex-col items-start justify-center gap-16 pl-40'>
				<main className='row-start-2 flex items-center gap-8 sm:items-start'>
					<div className='flex flex-col gap-4'>
						<Image src={logo} alt='Next.js logo' width={100} priority />
						<ol className='list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left'>
							<li className='mb-2'>Insira uma imagem no campo abaixo.</li>
							<li>Aguarde sua análise ocular</li>
						</ol>
					</div>

					<UploadImages />
				</main>
				<footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
					<a
						className='flex items-center gap-2 hover:underline hover:underline-offset-4'
						href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image aria-hidden src='/file.svg' alt='File icon' width={16} height={16} />
						Learn
					</a>
					<a
						className='flex items-center gap-2 hover:underline hover:underline-offset-4'
						href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image aria-hidden src='/window.svg' alt='Window icon' width={16} height={16} />
						Examples
					</a>
					<a
						className='flex items-center gap-2 hover:underline hover:underline-offset-4'
						href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Image aria-hidden src='/globe.svg' alt='Globe icon' width={16} height={16} />
						Go to nextjs.org →
					</a>
				</footer>
			</div>
		</>
	);
}
