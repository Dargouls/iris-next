import { Sparkles } from 'lucide-react';
import Button from '../button/button';
import Dropzone from '../dropzone/dropzone';

interface Form1Props {
	analise: () => void;
	files: File[];
	handleSetImage: (files: File[]) => void;
	handleRemoveFile: (file: File) => void; // Add the new prop
	isLoading: boolean;
}

export default function Form1({ analise, files, handleSetImage, handleRemoveFile, isLoading }: Form1Props) {
	return (
		<>
			<div className='flex flex-col items-center gap-4 p-4'>
				<Dropzone
					maxFiles={1}
					maxSize={5 * 1024 * 1024}
					onFilesAdded={handleSetImage}
					onFileRemoved={handleRemoveFile} // Pass the handler to Dropzone
				/>
				<Button onClick={() => analise()} disabled={files?.length === 0} loading={isLoading}>
					<Sparkles size={16} />
					Iniciar análise
				</Button>
			</div>
		</>
	);
}
