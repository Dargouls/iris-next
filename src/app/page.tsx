'use client';

import { UploadImages } from '@/components/uploadImages/uploadImages';
import { Eye, UploadIcon } from 'lucide-react';

export default function Home() {
	return (
		<>
			<div className='flex min-h-screen flex-col items-start justify-center gap-16 pl-4 md:pl-16'>
				<main className='row-start-2 flex items-center gap-8 sm:items-start'>
					<div className='space-y-6'>
						<h1 className='mb-8 text-5xl font-light'>Análise ocular rápida</h1>
						<div className='overflow-hidden p-6 transition-all hover:shadow-lg'>
							<div className='flex items-start gap-4'>
								<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
									<UploadIcon className='h-4 w-4' />
								</div>
								<div className='space-y-2'>
									<h3 className='text-xl font-medium'>1. Faça o Upload</h3>
									<p className='text-gray-600'>Envie uma foto clara e nítida da sua íris para análise</p>
								</div>
							</div>
						</div>

						<div className='overflow-hidden p-6 transition-all hover:shadow-lg'>
							<div className='flex items-start gap-4'>
								<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
									<Eye className='h-4 w-4' />
								</div>
								<div className='space-y-2'>
									<h3 className='text-xl font-medium'>2. Receba a Análise</h3>
									<p className='text-gray-600'>
										Nossa IA avançada analisará sua íris e fornecerá resultados detalhados
									</p>
								</div>
							</div>
						</div>
					</div>

					<UploadImages />
				</main>
				<div className='fixed left-1/2 top-96 z-[-1] h-[1000px] w-[1000px] -translate-x-1/2 rotate-[219deg] rounded-full'>
					<svg viewBox='0 0 200 200' className='opacity-65 blur-3xl' xmlns='http://www.w3.org/2000/svg'>
						<defs>
							<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
								<stop offset='0%' stopColor='#8A3FFC' />
								<stop offset='100%' stopColor='#ea00ff' />
							</linearGradient>
						</defs>
						<path
							fill='url(#gradient)'
							d='M61.5,-13.7C70.6,7.8,62.4,41.2,41.9,55.5C21.5,69.9,-11.3,65.2,-29.8,49.7C-48.3,34.2,-52.6,7.8,-45.3,-11.3C-38,-30.4,-19,-42.3,3.6,-43.4C26.2,-44.6,52.5,-35.1,61.5,-13.7Z'
							transform='translate(100 100)'
						/>
					</svg>
				</div>
			</div>
		</>
	);
}
