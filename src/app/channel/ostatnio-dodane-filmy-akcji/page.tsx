'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const LastAddedActionFilms: React.FC = () => {
	useDocumentTitle('Ostatnio dodane filmy akcji - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastaddedaction');

	return <Filters headingTitlePage='Popularne filmy akcji' mappingBy={filteredMovies} />;
};

export default LastAddedActionFilms;
