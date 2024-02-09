'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from './layouts/cookie/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<>
			<html lang='en' className='cc--darkmode dark'>
				<Head>
					<link rel='icon' href='/vercel.svg' />
					<meta name='theme-color' content='#1a1a1a' />
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
