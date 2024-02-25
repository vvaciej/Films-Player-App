'use client';
import getCookie from './[lang]/helpers/GetCookie';
import { useEffect } from 'react';

const Page = () => {
	useEffect(() => {
		if (window.location.pathname === '/' && window.location.hostname === 'www.vvaciej.codes') {
			window.location.href = `/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}`;
		}
	}, []);
};

export default Page;
