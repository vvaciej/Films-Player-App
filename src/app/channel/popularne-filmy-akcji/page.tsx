'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularActionFilms: React.FC = () => {
	useDocumentTitle('Popularne filmy akcji - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularaction');

	return <Filters headingTitlePage='Popularne filmy akcji' mappingBy={filteredMovies} />;
};

export default PopularActionFilms;
