import { IconProps } from '@/interfaces/iconProps';
import { twMerge } from 'tailwind-merge';

export interface CardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	icon?: IconProps;
}
interface CardContentProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function CardRoot({ icon: Icon, children, ...props }: CardProps) {
	return (
		<>
			<div
				{...props}
				className={twMerge(
					'border-border bg-foreground min-w-32 rounded-lg border shadow-sm',
					props.className
				)}
			>
				<CardHeader>
					{Icon && <Icon size={16} />}
					<h3 className='text-sm font-semibold'>{props.title}</h3>
				</CardHeader>

				{children}
			</div>
		</>
	);
}

export function CardHeader({ children, ...props }: CardContentProps) {
	return (
		<div className='flex items-center gap-2 p-4' {...props}>
			{children}
		</div>
	);
}
export function CardContent({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={twMerge(`px-4 pb-4`, props.className)}>
			{children}
		</div>
	);
}

export function CardFooter({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={twMerge(`flex items-center gap-2 p-4`, props.className)}>
			{children}
		</div>
	);
}

export default function Card({ children, ...props }: CardProps) {
	return <CardRoot {...props}>{children}</CardRoot>;
}

Card.Content = CardContent;
Card.Footer = CardFooter;
