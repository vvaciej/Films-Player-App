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

const LastAddedActionFilms: React.FC = () => {
	useDocumentTitle('Ostatnio dodane filmy akcji - vvaciej.app');

	const uniqueMovieTitles = new Set<string>();
	const filteredMovies = allFilmsData.filter(movie => {
		const filmTypeLowerCase = movie.category.toLowerCase();
		const isLastAddedAction =  filmTypeLowerCase === 'lastaddedaction';

		if (isLastAddedAction && !uniqueMovieTitles.has(movie.title)) {
			return uniqueMovieTitles.add(movie.title);
		}
	});

	return <Filters headingTitlePage='Popularne filmy akcji' mappingBy={filteredMovies} />;
};

export default LastAddedActionFilms;