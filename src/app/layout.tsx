'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { Footer } from './layouts/Footer';

import './globals.css';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import CookieConsentComponent from './layouts/cookie/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
	children?: React.ReactNode;
};

interface LayoutPropsExtended {
	children?: React.ReactNode;
	componentsVisible?: boolean;
}

const RootLayout = (props: LayoutProps | LayoutPropsExtended) => {
		const { children, componentsVisible } = props;


	return (
		<html lang='en' className='cc--darkmode dark'>
			<Head>
				<link rel='icon' href='/vercel.svg' />
				<meta name='theme-color' content='#121212' />
			</Head>
			<body className={inter.className}>
				{children}
				{componentsVisible && <Footer />}
				<CookieConsentComponent />
			</body>
			<SpeedInsights />
			<Analytics />
		</html>
	);
};

export default RootLayout;
