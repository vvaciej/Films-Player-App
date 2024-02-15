'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

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

	const filteredMovies = IteratingFilmsPage(allFilmsData, 'category', 'lastaddedaction');

	return <Filters headingTitlePage='Popularne filmy akcji' mappingBy={filteredMovies} />;
};

export default LastAddedActionFilms;
