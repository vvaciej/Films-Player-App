'use client';

import useDocumentTitle from '../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';

import { allFilms } from '@/app/data/films-data';

const Series = () => {
	useDocumentTitle('Wyszukiwarka seriali - vvaciej.app');

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'serial';
	});

	return <Filters headingTitlePage='Seriale' mappingBy={filteredMovies} />;
};

export default Series;
