'use client';

import * as React from 'react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ResultIrisProps } from '@/interfaces/results';
import { api } from '@/lib/axios';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { ArrowLeft, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../button/button';
import CircularProgress from '../circularProgress/circularProgress';
import Dropzone from '../dropzone/dropzone';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import Hidden from '../ui/hidden';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip';

export function UploadImages() {
	const [open, onOpenChange] = React.useState(true);
	const [form, setForm] = React.useState(1);
	const [files, setFiles] = React.useState<File[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [results, setResults] = React.useState<ResultIrisProps>();

	const handleSetImage = (files: File[]) => {
		setFiles(files);
	};
	const handleTogglePage = () => {
		onOpenChange(false);
		setTimeout(() => {
			setForm(2);
			onOpenChange(true);
		}, 500);
	};
	const returnPage = () => {
		onOpenChange(false);
		setTimeout(() => {
			setForm(1);
			onOpenChange(true);
		}, 500);
	};

	const analise = async () => {
		setIsLoading(true);
		handleTogglePage();
		try {
			const formData = new FormData();
			formData.append('file', files[0]);

			const response = await api.post('/analisar-iris', formData);
			console.log(response.data);
			setResults(response.data);
		} catch (error) {
			console.log(error);
			toast.error('Não foi possível analisar as imagens');
		}

		setIsLoading(false);
	};

	return (
		<Drawer open={open} onOpenChange={onOpenChange} direction='right'>
			<DrawerContent>
				<Hidden>
					<DrawerHeader>
						<DrawerTitle></DrawerTitle>
					</DrawerHeader>
				</Hidden>
				{form === 1 ? (
					<>
						<Form1 analise={analise} files={files} handleSetImage={handleSetImage} isLoading={isLoading} />
					</>
				) : (
					<Form2 results={results} handleReturn={returnPage} />
				)}
			</DrawerContent>
		</Drawer>
	);
}

interface Form1Props {
	analise: () => void;
	files: File[];
	handleSetImage: (files: File[]) => void;
	isLoading: boolean;
}

const Form1 = ({ analise, files, handleSetImage, isLoading }: Form1Props) => {
	return (
		<>
			<Hidden>
				<DrawerHeader>
					<DrawerTitle></DrawerTitle>
				</DrawerHeader>
			</Hidden>
			<div className='flex flex-col items-center gap-4 p-4'>
				<Dropzone maxFiles={1} maxSize={5 * 1024 * 1024} onFilesAdded={handleSetImage} />
				<Button onClick={() => analise()} disabled={files?.length === 0} loading={isLoading}>
					<Sparkles size={16} />
					Iniciar análise
				</Button>
			</div>
		</>
	);
};

interface Form2Props {
	handleReturn: () => void;
	results: ResultIrisProps | undefined;
}

const Form2 = ({ handleReturn, results, ...props }: Form2Props) => {
	if (!results)
		return (
			<>
				<CircularProgress size={40} />
			</>
		);
	const { informacoes_imagem, imagem_processada, interpretacao, medidas_estruturais } =
		results as ResultIrisProps;

	return (
		<>
			<div className='flex h-screen w-[50vw] flex-col p-4'>
				<DrawerHeader>
					<DrawerTitle>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='icon' onClick={() => handleReturn()}>
										<ArrowLeft />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Escolher uma nova imagem</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</DrawerTitle>
				</DrawerHeader>
				{imagem_processada && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<img src={`data:image/jpeg;base64,${imagem_processada}`} alt='Uploaded Image' width={200} />
							</TooltipTrigger>
							<TooltipContent>{informacoes_imagem?.dimensoes}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				<Accordion className='w-full' defaultValue={['1', '2']} type='multiple'>
					<AccordionItem value='1'>
						<AccordionTrigger className='font-bold'>Interpretação</AccordionTrigger>
						<AccordionContent>
							<li>{interpretacao?.pupila}</li>
							<li>
								<span>{interpretacao?.iris}</span>
							</li>
							<li>
								<span>{interpretacao?.collarette}</span>
							</li>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='2'>
						<AccordionTrigger className='font-bold'>Medidas estruturais</AccordionTrigger>
						<AccordionContent className='space-y-1'>
							<p>{medidas_estruturais?.pupila.tamanho_relativo}</p>
							<p>{medidas_estruturais?.pupila.forma}</p>

							<Separator />
							<p>
								<span>{medidas_estruturais?.iris.textura}</span>
							</p>
							<p>
								<span>{medidas_estruturais?.iris.densidade}</span>
							</p>
							<Separator />

							<p>
								<span>{medidas_estruturais?.collarette.circularidade}</span>
							</p>
							<p>
								<span>{medidas_estruturais?.collarette.regularidade}</span>
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};
