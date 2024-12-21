import { cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
	variant?: 'col' | 'row';
}
export default function FormGroup({ children, variant, ...props }: FormGroupProps) {
	const formGroupVariants = cva(`w-full gap-2`, {
		variants: {
			variant: {
				col: 'flex flex-col gap-4',
				row: 'flex flex-row items-center gap-2',
			},
		},
		defaultVariants: {
			variant: 'col',
		},
	});

	return (
		<>
			<div className={twMerge(props.className, formGroupVariants({ variant }))}>{children}</div>
		</>
	);
}
