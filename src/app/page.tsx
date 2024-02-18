'use client';

import '../style/css/global.css';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';

import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';

const Home: React.FC = () => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='home-wrapper'>
				<>
					<main className='main-wrapper'>
						<div className='content-wrapper'>
							<HeadingFilmsInteraction />
							<FilmsCategories />
						</div>
					</main>
					<Footer />
				</>
			</div>
		</div>
	);
};

export default Home;
