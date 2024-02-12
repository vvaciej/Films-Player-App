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

const PopularSerials: React.FC = () => {
	useDocumentTitle('Popularne seriale - vvaciej.app');

	const uniqueMovieTitles = new Set<string>();
	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();
		const isPopularSerial = filmTypeLowerCase === 'popularserial';

		if (isPopularSerial && !uniqueMovieTitles.has(movie.title)) {
			return uniqueMovieTitles.add(movie.title);
		}
	});

	return <Filters headingTitlePage='Popularne seriale' mappingBy={filteredMovies} />;
};

export default PopularSerials;
