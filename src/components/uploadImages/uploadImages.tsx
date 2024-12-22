'use client';

import * as React from 'react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ResultIrisProps } from '@/interfaces/results';
import { api } from '@/lib/axios';
import toast from 'react-hot-toast';
import Hidden from '../ui/hidden';
import Form1 from './form1';
import Form2 from './form2';

export function UploadImages() {
	const [open, onOpenChange] = React.useState(true);
	const [form, setForm] = React.useState(1);
	const [files, setFiles] = React.useState<File[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [results, setResults] = React.useState<ResultIrisProps>();

	const handleSetImage = (files: File[]) => {
		setFiles(files);
	};
	const handleRemoveFile = (file: File) => {
		setFiles((prev) => prev.filter((f) => f !== file));
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
		<>
			<Drawer open={open} onOpenChange={onOpenChange} direction='right'>
				<DrawerContent className='bg-transparent'>
					<Hidden>
						<DrawerHeader>
							<DrawerTitle></DrawerTitle>
						</DrawerHeader>
					</Hidden>
					{form === 1 ? (
						<>
							<Form1
								analise={analise}
								files={files}
								handleSetImage={handleSetImage}
								handleRemoveFile={handleRemoveFile} // Pass the new handler
								isLoading={isLoading}
							/>
						</>
					) : (
						<>
							<Form2 results={results} handleReturn={returnPage} />
						</>
					)}
				</DrawerContent>
			</Drawer>

			<div className='bg-foreground border-border w-full border lg:hidden'>
				{form === 1 ? (
					<>
						<Form1
							analise={analise}
							files={files}
							handleSetImage={handleSetImage}
							handleRemoveFile={handleRemoveFile} // Pass the new handler
							isLoading={isLoading}
						/>
					</>
				) : (
					<Form2 results={results} handleReturn={returnPage} />
				)}
			</div>
		</>
	);
}
