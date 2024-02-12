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

const PopularFilms: React.FC = () => {
	useDocumentTitle('Popularne filmy - vvaciej.app');

	const uniqueMovieTitles = new Set<string>();
	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();
		const isPopular = filmTypeLowerCase === 'popular';

		if (isPopular && !uniqueMovieTitles.has(movie.title)) {
			return uniqueMovieTitles.add(movie.title);
		}
	});

	return <Filters headingTitlePage='Popularne filmy' mappingBy={filteredMovies} />;
};

export default PopularFilms;
