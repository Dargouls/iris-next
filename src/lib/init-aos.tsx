'use client';

import Aos from 'aos';
import { useEffect } from 'react';

export default function InitAOS() {
	useEffect(() => {
		Aos.init({ duration: 2000, once: true, disable: 'mobile' });
	});
	return <></>;
}
