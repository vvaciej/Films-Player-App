'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularPolishFilms: React.FC = () => {
	useDocumentTitle('Popularne polskie filmy - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularpolish');

	return <Filters headingTitlePage='Popularne polskie filmy' mappingBy={filteredMovies} />;
};

export default PopularPolishFilms;
