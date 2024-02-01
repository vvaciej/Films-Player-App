'use client';

import '../style/css/home.css';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';

import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';

const Home: React.FC = () => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');

	return (
		<>
			<Navbar isCutted={false} />

			<main className='main-wrapper'>
				<div className='content-wrapper'>
					<HeadingFilmsInteraction />
					<FilmsCategories />
				</div>
			</main>

			<Footer isVisible={true} />
		</>
	);
};

export default Home;
