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

const Movies: React.FC = () => {
	useDocumentTitle('Wyszukiwarka filmów - vvaciej.app');

	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'film';
	});

	return <Filters headingTitlePage='Wyszukiwarka filmów' mappingBy={filteredMovies} />;
};

export default Movies;
