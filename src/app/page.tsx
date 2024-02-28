'use client';
import getCookie from '../helpers/GetCookie';
import { useEffect } from 'react';

const Page = () => {
	const getPageLangFromUrl = () => {
		const match = window.location.pathname.match(/^\/([a-z]{2})\//);
		return match ? match[1] : null;
	};

	useEffect(() => {
		if (window.location.pathname === '/' && window.location.hostname === 'www.vvaciej.codes') {
			window.location.href = `/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`;
			document.cookie = `langChoosed=${getPageLangFromUrl()}`;
		}
	}, []);
};

export default Page;
