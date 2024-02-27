'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import './[lang]/data/i18-next';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from './[lang]/layouts/cookie/CookieConsent';
import getCookie from './[lang]/helpers/GetCookie';

import '../../styles/globals.css';
import '../../styles/css/film-page.css';
import '../../styles/css/filteres-page.css';
import '../../styles/css/series&movies.css';
import '../../styles/css/global.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const url = window.location.pathname;
			const urlLang = url.startsWith('/en') ? 'angielski' : 'polski';
			document.cookie = `langChoosed=${urlLang}; path=/`;
		}
	});

	useEffect(() => {
		const scrollYPosition = Number(getCookie('scrollY'));

		window.scrollTo(0, scrollYPosition);
	}, [])

  const handleScroll = () => {
		const scrollYPosition = window.scrollY;
		document.cookie = `scrollY=${scrollYPosition}; path=/`;
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<html lang={`${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}`} className='cc--darkmode dark'>
				<Head>
					<link rel='icon' href='/vercel.svg' />
					<meta name='theme-color' content='#1a1a1a' />
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
						integrity='sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofGJopfM5KNUowFcF5b6UZl2en+*Pi'
						crossOrigin='anonymous'
					/>
				</Head>
				<body className={inter.className}>{children}</body>
			</html>
			<CookieConsentComponent />
			<SpeedInsights />
			<Analytics />
		</>
	);
};

export default RootLayout;
