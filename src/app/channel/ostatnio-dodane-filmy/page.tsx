'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';

import {
	popularFilms,
	lastAddedFilms,
	popularActionFilms,
	popularComediaFilms,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../../data/main-films';

const allFilmsData = [
	...popularFilms,
	...lastAddedFilms,
	...popularActionFilms,
	...popularComediaFilms,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

const LastAddedFilms: React.FC = () => {
	useDocumentTitle('Ostatnio dodane filmy - vvaciej.app');

	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();

		return filmTypeLowerCase === 'lastadded';
	});

	return <Filters headingTitlePage='Ostatnio dodane filmy' mappingBy={filteredMovies} />;
};

export default LastAddedFilms;