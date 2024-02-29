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
import { NextSeo } from 'next-seo';

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
				<Head>
					<NextSeo
						title={t('Free films and serials online!')}
						description={t('vvaciej.app is a popular database with movies and series fully free of charge')}
						openGraph={{
							images: [
								{
									url: '/next.svg',
									width: 16,
									height: 16,
									alt: 'Short Cut Icon',
								},
							],
							siteName: 'vvaciej.codes',
						}}
						additionalLinkTags={[
							{
								rel: 'icon',
								href: '/next.svg',
							},
						]}
						themeColor='#1a1a1a'
					/>
				</Head>
				<body className={`${inter.className} h-max w-full`}>{children}</body>
			</html>
			<CookieConsentComponent />
			<SpeedInsights />
			<Analytics />
		</>
	);
};

export default RootLayout;
