import { Relatorio } from '@/interfaces/results';
import { ArrowLeft } from 'lucide-react';
import Button from '../button/button';
import CircularProgress from '../circularProgress/circularProgress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Form2Props {
	handleReturn: () => void;
	results: Relatorio | undefined;
}

export default function Form2({ handleReturn, results, ...props }: Form2Props) {
	if (!results)
		return (
			<div className='mt-16 flex h-full items-center justify-center'>
				<CircularProgress size={40} />
			</div>
		);

	const { imagem_processada, relatorio } = results;

	const { interpretacao, medidas_estruturais, analise_collarette, analise_setorial } = results.relatorio;

	return (
		<>
			<div className='flex flex-col p-4 lg:h-screen lg:w-[50vw]'>
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
					<img src={`data:image/jpeg;base64,${imagem_processada}`} alt='Uploaded Image' width={200} />
				)}

				<h4 className='mt-2 text-2xl font-bold'>Análise iridológica detalhada</h4>
				<Accordion className='w-full' defaultValue={['1', '2', '3']} type='multiple'>
					<AccordionItem value='1'>
						<AccordionTrigger className='font-bold'>Interpretação</AccordionTrigger>
						<AccordionContent>
							<li>Pupila: {interpretacao?.pupila}</li>
							<li>
								<span>Íris: {interpretacao?.iris}</span>
							</li>
							<li>
								<span>Colarette: {interpretacao?.collarette}</span>
							</li>
							<li>
								<span>Estrutura: {interpretacao?.estrutura}</span>
							</li>
							<li>
								<span>Forma pupilar: {interpretacao?.forma_pupilar}</span>
							</li>
							<li>
								<span>Textura: {interpretacao?.textura}</span>
							</li>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='2'>
						<AccordionTrigger className='font-bold'>Análise Colarette</AccordionTrigger>
						<AccordionContent className='space-y-1'>
							<p>Circularidade: {analise_collarette?.circularidade}</p>
							<p>Regularidade: {analise_collarette?.regularidade}</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='3'>
						<AccordionTrigger className='font-bold'>Análise setorial</AccordionTrigger>
						<AccordionContent className='space-y-1'>
							{analise_setorial?.map((item, index) => (
								<div key={index}>
									<p>Setor: {item.setor}</p>
									<p>Contraste: {item.contraste}</p>
									<p>Homogeneidade: {item.homogeneidade}</p>
									<Separator />
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
}
