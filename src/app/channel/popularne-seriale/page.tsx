'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularSerials: React.FC = () => {
	useDocumentTitle('Popularne seriale - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularserial');

	return <Filters headingTitlePage='Popularne seriale' mappingBy={filteredMovies} />;
};

export default PopularSerials;
