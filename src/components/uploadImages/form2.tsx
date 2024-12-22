import { ResultIrisProps } from '@/interfaces/results';
import { ArrowLeft } from 'lucide-react';
import Button from '../button/button';
import CircularProgress from '../circularProgress/circularProgress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Form2Props {
	handleReturn: () => void;
	results: ResultIrisProps | undefined;
}

export default function Form2({ handleReturn, results, ...props }: Form2Props) {
	if (!results)
		return (
			<div className='mt-16 flex h-full items-center justify-center'>
				<CircularProgress size={40} />
			</div>
		);
	const { informacoes_imagem, imagem_processada, interpretacao, medidas_estruturais } =
		results as ResultIrisProps;

	return (
		<>
			<div className='flex flex-col p-4 lg:h-screen'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button className='mb-4' variant='icon' onClick={() => handleReturn()}>
								<ArrowLeft />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Escolher uma nova imagem</TooltipContent>
					</Tooltip>
				</TooltipProvider>
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
}
