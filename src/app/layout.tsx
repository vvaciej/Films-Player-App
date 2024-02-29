'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import './[lang]/data/i18-next';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from './[lang]/layouts/cookie/CookieConsent';
import getCookie from '../helpers/GetCookie';

import '../../styles/globals.css';
import '../../styles/css/global.css';
import { useTranslation } from 'react-i18next';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	const { t } = useTranslation();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const url = window.location.pathname;
			const urlLang = url.startsWith('/en') ? 'english' : 'polish';
			document.cookie = `langChoosed=${urlLang}; path=/`;
		}
	});

	useEffect(() => {
		const scrollYPosition = Number(getCookie('scrollY'));

		window.scrollTo(0, scrollYPosition);

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const scrollYPosition = window.scrollY;
		document.cookie = `scrollY=${scrollYPosition}; path=/`;
	};

	return (
		<>
			<html
				lang={`${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}
				className='cc--darkmode dark text-base h-max w-full text-white transition-opacity relative bg-1a1a'>
				<head>
					<link rel='icon' href='/next.svg' />
					<meta name='theme-color' content='#1a1a1a' />
					<meta property='og:title' content={t('Free films and serials online!')} />
					<meta property='og:image' content={t('/next.svg')} />
					<meta
						name='description'
						content={t('vvaciej.app is a popular database with movies and series fully free of charge')}
					/>
					<meta
						name='keywords'
						content='filmy, seriale, filmy i seriale za darmo, filmy za darmo, seriale za darmo, vvaciej, vvaciej.app, vvaciej.codes, films, serials, free films, free serials'
					/>
					<meta property='og:site_name' content='vvaciej.codes' />
				</head>
				<body className={`${inter.className} h-max w-full`}>{children}</body>
			</html>
			<CookieConsentComponent />
			<SpeedInsights />
			<Analytics />
		</>
	);
};

export default RootLayout;
