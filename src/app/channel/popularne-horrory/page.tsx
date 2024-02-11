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

const PopularHorrorFilms: React.FC = () => {
	useDocumentTitle('Popularne horrory - vvaciej.app');

	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();

		return filmTypeLowerCase === 'popularhorror';
	});

	return <Filters headingTitlePage='Popularne horrory' mappingBy={filteredMovies} />;
};

export default PopularHorrorFilms;
