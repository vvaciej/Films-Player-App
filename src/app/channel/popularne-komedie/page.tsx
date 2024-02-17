'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import { allFilms } from '@/app/data/films-data';

const PopularComedyFilms: React.FC = () => {
	useDocumentTitle('Popularne komedie - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularcomedia');

	return <Filters headingTitlePage='Popularne komedie' mappingBy={filteredMovies} />;
};

export default PopularComedyFilms;
