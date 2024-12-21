'use client';

import Button from '@/components/button/button';
import Card from '@/components/card/card';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

interface FileWithPreview extends File {
	preview: string;
}

interface DropzoneProps {
	onFilesAdded: (files: File[]) => void;
	maxFiles?: number;
	maxSize?: number;
	accept?: Record<string, string[]>;
}

export default function Dropzone({
	onFilesAdded,
	maxFiles = 5,
	maxSize = 5 * 1024 * 1024, // 5MB
	accept = {
		'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
		'application/pdf': ['.pdf'],
	},
}: DropzoneProps) {
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);

			setFiles(newFiles);
			onFilesAdded(acceptedFiles);
		},
		[files, maxFiles, onFilesAdded]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
		maxSize,
		maxFiles: maxFiles - files.length,
	});

	const removeFile = (file: FileWithPreview) => {
		const newFiles = files.filter((f) => f !== file);
		setFiles(newFiles);
		URL.revokeObjectURL(file.preview);
	};

	return (
		<>
			<Card title='Upload your files' icon={Upload} className='w-full max-w-3xl'>
				<Card.Content className='flex gap-4'>
					<div
						{...getRootProps()}
						className={cn(
							'flex w-full flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
							isDragActive
								? 'border-primary bg-primary/10'
								: 'border-muted-foreground/25 hover:border-primary/50'
						)}
					>
						<input {...getInputProps()} />
						<Upload className='text-muted-foreground mb-3 h-10 w-10' />
						<p className='text-muted-foreground mb-2 text-center text-sm'>
							<span className='font-semibold'>Clique para fazer upload</span> ou arraste uma pasta com os
							arquivos
						</p>
						<p className='text-muted-foreground text-center text-xs'>
							{Object.keys(accept).join(', ')} (max {maxFiles} files, up to {maxSize / 1024 / 1024}MB each)
						</p>
					</div>

					<div className={twMerge('transition-all', files.length > 0 ? 'w-40' : 'w-0')}>
						{files.map((file) => (
							<div
								key={file.name}
								className='bg-background group relative aspect-square overflow-hidden rounded-lg border'
							>
								{file.type.startsWith('image/') ? (
									<Image
										src={file.preview}
										alt={file.name}
										width={160}
										height={160}
										className='h-full w-full object-cover transition-transform group-hover:scale-105'
										onLoad={() => {
											URL.revokeObjectURL(file.preview);
										}}
									/>
								) : (
									<div className='flex h-full items-center justify-center p-4'>
										<span className='text-muted-foreground text-center text-sm'>
											{file.name.split('.').pop()?.toUpperCase()}
										</span>
									</div>
								)}
								<div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
									<Button
										variant='icon'
										className='text-white hover:text-rose-500'
										onClick={(e) => {
											e.stopPropagation();
											removeFile(file);
										}}
									>
										<X className='h-6 w-6' />
										<span className='sr-only'>Remove file</span>
									</Button>
								</div>
								<div className='absolute bottom-0 left-0 right-0 bg-black/50 p-2'>
									<p className='truncate text-xs text-white'>{file.name}</p>
								</div>
							</div>
						))}
					</div>
				</Card.Content>
			</Card>
		</>
	);
}
