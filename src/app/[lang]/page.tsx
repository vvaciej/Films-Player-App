'use client';

import { FilmsCategories } from './components/FilmsCategories';
import { HeadingFilmsInteraction } from './components/HeadingContainer';
import useDocumentTitle from './helpers/PageTitle';

import { Navbar } from './layouts/Navbar';
import { Footer } from './layouts/Footer';
import SiteNotFound from './[...not_found]/page';

interface params {
	params: {
		lang: string;
	};
}

const Home: React.FC<params> = ({ params }) => {
	useDocumentTitle('vvaciej.app - Darmowe filmy i seriale');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{params.lang === 'pl' || params.lang === 'en' ? (
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
			) : (
				<SiteNotFound />
			)}
		</div>
	);
};

export default Home;
