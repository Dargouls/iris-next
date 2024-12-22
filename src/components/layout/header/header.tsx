import logo from '@/assets/brand/logo.svg';
import Image from 'next/image';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	return (
		<>
			<header className='fixed left-0 right-0 top-0 flex items-center justify-between p-4'>
				<Image src={logo} alt='logo' height={40} />
			</header>
		</>
	);
}
