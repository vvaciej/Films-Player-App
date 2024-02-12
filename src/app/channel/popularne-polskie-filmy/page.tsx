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

const PopularPolishFilms: React.FC = () => {
	useDocumentTitle('Popularne polskie filmy - vvaciej.app');

	const uniqueMovieTitles = new Set<string>();
	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();
		const isPopularPolish = filmTypeLowerCase === 'popularpolish';

		if (isPopularPolish && !uniqueMovieTitles.has(movie.title)) {
			return uniqueMovieTitles.add(movie.title);
		}
	});

	return <Filters headingTitlePage='Popularne polskie filmy' mappingBy={filteredMovies} />;
};

export default PopularPolishFilms;
