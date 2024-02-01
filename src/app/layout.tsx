'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer } from './layouts/Footer';

import './globals.css';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from './layouts/cookie/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<html lang='en' className='cc--darkmode dark'>
				<Head>
					<link rel='icon' href='/vercel.svg' />
					<meta name='theme-color' content='#121212' />
				</Head>
				<body className={inter.className}>
					{children}
					<Footer />
					<CookieConsentComponent />
				</body>
				<SpeedInsights />
			</html>
		</>
	);
};

export default RootLayout;
