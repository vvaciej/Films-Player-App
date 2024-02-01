'use client';

import '../style/css/home.css';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';
import RootLayout from './layout';

import { Navbar } from './layouts/Navbar';

const Home: React.FC = () => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');

	return (
		<RootLayout componentsVisible={true}>
			<Navbar isCutted={false} />

			<main className='main-wrapper'>
				<div className='content-wrapper'>
					<HeadingFilmsInteraction />
					<FilmsCategories />
				</div>
			</main>
		</RootLayout>
	);
};

export default Home;
