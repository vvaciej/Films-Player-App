'use client';

import '../style/css/home.css';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';
import { useState, useEffect } from 'react';

import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';

const Home: React.FC = () => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const handleLoad = () => {
			setIsLoaded(true);
		};

		const loaderTimeout = setTimeout(() => {
			requestAnimationFrame(handleLoad);
		}, 80);

		return () => clearTimeout(loaderTimeout);
	}, []);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLoaded ? (
				<div className='home-wrapper'>
					<main className='main-wrapper'>
						<div className='content-wrapper'>
							<HeadingFilmsInteraction />
							<FilmsCategories />
						</div>
					</main>

					<Footer />
				</div>
			) : (
				<div className='loader-container'>
					<div className='loader'></div>
				</div>
			)}
		</div>
	);
};

export default Home;
