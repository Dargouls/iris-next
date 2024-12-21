import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ReactNode } from 'react';

export default function Hidden({ children }: { children: ReactNode }) {
	return <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>;
}
