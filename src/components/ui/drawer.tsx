'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';
import { ScrollArea } from './scroll-area';

const snapPoints = ['148px', '355px', 1];

const Drawer = ({
	shouldScaleBackground = true,
	modal = false,
	dismissible = false,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
	return (
		<DrawerPrimitive.Root
			shouldScaleBackground={shouldScaleBackground}
			dismissible={dismissible}
			modal={modal}
			{...props}
		/>
	);
};
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerContent = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DrawerPortal>
		<DrawerPrimitive.Content
			ref={ref}
			className={cn('fixed right-0 top-0 z-50 flex h-full w-max min-w-[500px] items-center', className)}
			{...props}
		>
			<ScrollArea className='bg-background border-border h-max min-h-40 w-full rounded-l-[10px] border-y border-l'>
				{/* <div className='bg-muted mx-auto mt-4 h-2 w-[100px] rounded-full' /> */}
				{children}
			</ScrollArea>
		</DrawerPrimitive.Content>
	</DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn('text-lg font-semibold leading-none tracking-tight', className)}
		{...props}
	/>
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
	React.ElementRef<typeof DrawerPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
};
