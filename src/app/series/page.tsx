'use client';

import useDocumentTitle from '../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';

import {
	popularFilms,
	lastAddedFilms,
	popularActionFilms,
	popularComediaFilms,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../data/main-films';

const allFilmsData = [
	...popularFilms,
	...lastAddedFilms,
	...popularActionFilms,
	...popularComediaFilms,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

const Series = () => {
	useDocumentTitle('Wyszukiwarka seriali - vvaciej.app');

	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'serial';
	});

	return <Filters headingTitlePage='Seriale' mappingBy={filteredMovies} />;
};

export default Series;
