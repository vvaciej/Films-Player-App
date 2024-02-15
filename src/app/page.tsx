'use client';

import '../style/css/global.css';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';

import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 150);
	}, []);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='home-wrapper'>
				{isLoaded ? (
					<>
						<main className='main-wrapper'>
							<div className='content-wrapper'>
								<HeadingFilmsInteraction />
								<FilmsCategories />
							</div>
						</main>
						<Footer />
					</>
				) : (
					<div className='loader-container flex justify-center w-full h-full'>
						<div className='loader'></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
