'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const LastAddedFilms: React.FC = () => {
	useDocumentTitle('Ostatnio dodane filmy - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastadded');

	return <Filters headingTitlePage='Ostatnio dodane filmy' mappingBy={filteredMovies} />;
};

export default LastAddedFilms;
