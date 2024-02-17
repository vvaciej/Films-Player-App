'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularFilms: React.FC = () => {
	useDocumentTitle('Popularne filmy - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popular');

	return <Filters headingTitlePage='Popularne filmy' mappingBy={filteredMovies} />;
};

export default PopularFilms;
