'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularHorrorFilms: React.FC = () => {
	useDocumentTitle('Popularne horrory - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularhorror');

	return <Filters headingTitlePage='Popularne horrory' mappingBy={filteredMovies} />;
};

export default PopularHorrorFilms;
